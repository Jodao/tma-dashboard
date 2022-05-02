import React, { useEffect, useRef, useState } from 'react';
import { Grid, Segment, Divider, Header, Form, Loader, Icon, Label } from 'semantic-ui-react';
import 'chartjs-adapter-date-fns';
import ApiModule from '../utils/api/ApiModule';
import Plot from '../components/Plot';
import ValidInputs from '../utils/ValidInputs';
import { Buffer } from 'buffer';

function HomePage(){
    const [userPlotsConfigs,setUserPlotsConfigs] = useState(null);

    //do this to access last state variable inside setInterval function for performing live plots
    const plotConfigsRef = useRef(userPlotsConfigs);
    plotConfigsRef.current = userPlotsConfigs
    
    useEffect(() => {
        async function makeAPIRequest(){
            let plotsConfigs = await ApiModule().getPlotsConfigs();
            for(let config of plotsConfigs){
                config.configObject = JSON.parse(Buffer.from(config.configObject,'base64'))
                console.log(config)
            }
            setUserPlotsConfigs(plotsConfigs)
            for(let i=0; i< plotsConfigs.length; i++){
                handlePlotData(plotsConfigs[i].configObject,i)
            }
        }
        makeAPIRequest()

    },[]);

    //read plot config from file
    function readPlotConfigHandler(ev){
        var fr=new FileReader();
        fr.addEventListener('load', (event) => {
            let newPlotConfig = JSON.parse(event.target.result)
            newPlotConfig.ready = false;

            let newUserPlotsConfigs = JSON.parse(JSON.stringify(userPlotsConfigs))
            newUserPlotsConfigs.push(newPlotConfig)
            
            setUserPlotsConfigs(newUserPlotsConfigs)
        });
        fr.readAsText(ev.target.files[0])
    }

    //read plot config from file
    function replaceConfigHandler(ev){
        var fr=new FileReader();
        let index = parseInt(ev.currentTarget.getAttribute("plotindex"))

        fr.addEventListener('load', (event) => {
            let newUserPlotsConfigs = [...userPlotsConfigs]
            
            let newConfigObject = JSON.parse(event.target.result)
            newUserPlotsConfigs[index].configObject = newConfigObject
            newUserPlotsConfigs[index].replace = true

            setUserPlotsConfigs(newUserPlotsConfigs)
        });
        fr.readAsText(ev.target.files[0])
    }

    function onPlotConfigNameChangeHandler(ev,atts){
        //has to consider last state even though it is not rendered, because the user may start adding
        //another config before saving the previous. Hardly that will happen, but do this for precaution. 
        setUserPlotsConfigs((prevState) => {
            let newUserPlotsConfigs = JSON.parse(JSON.stringify(prevState))
            newUserPlotsConfigs[atts.plotindex].plotConfigName = atts.value
            return newUserPlotsConfigs
        })
    }

    //insert plot config on database
    async function savePlotConfigHandler(ev,atts){
        if(ValidInputs().validStringOrDropDownSelection(userPlotsConfigs[atts.plotindex].plotConfigName)){
            let configObjectTemp = JSON.parse(JSON.stringify(userPlotsConfigs[atts.plotindex]))
            let plotConfigTemp = {
                plotConfigName: configObjectTemp.plotConfigName, 
            }

            let requestBody = {
                plotConfigName: configObjectTemp.plotConfigName, 
            }
            
            delete configObjectTemp.ready
            delete configObjectTemp.plotConfigName
            
            requestBody.configObject = await new Blob(
                [JSON.stringify(configObjectTemp)],
                {type : 'application/json'}
            ).arrayBuffer();
            
            requestBody.configObject = Array.from(new Uint8Array(requestBody.configObject))
            
            let plotConfigId = await ApiModule().savePlotConfig(requestBody)

            plotConfigTemp.configObject = configObjectTemp
            plotConfigTemp.plotConfigId = plotConfigId
            
            setUserPlotsConfigs((prevState) => {
                let newUserPlotsConfigs = JSON.parse(JSON.stringify(prevState))
                newUserPlotsConfigs[atts.plotindex] = plotConfigTemp
                return newUserPlotsConfigs
            })
            handlePlotData(configObjectTemp, atts.plotindex)
        }
    }

    //replace plot config on database by sending the plotConfigId
    async function replacePlotConfigHandler(ev,atts){
        if(ValidInputs().validStringOrDropDownSelection(userPlotsConfigs[atts.plotindex].plotConfigName)){
            let plotConfigTemp = JSON.parse(JSON.stringify(userPlotsConfigs[atts.plotindex]))

            let requestBody = {
                plotConfigName: plotConfigTemp.plotConfigName, 
                plotConfigId: plotConfigTemp.plotConfigId
            }
            
            delete plotConfigTemp.replace
            delete plotConfigTemp.plotData
            
            requestBody.configObject = await new Blob(
                [JSON.stringify(plotConfigTemp.configObject)],
                {type : 'application/json'}
            ).arrayBuffer();
            
            requestBody.configObject = Array.from(new Uint8Array(requestBody.configObject))
            
            let resStatus = await ApiModule().replacePlotConfig(requestBody)

            //if res is successful handlePlotData
            if(resStatus === 200){
                let newUserPlotsConfigs = JSON.parse(JSON.stringify(userPlotsConfigs))
                newUserPlotsConfigs[atts.plotindex] = plotConfigTemp
                //console.log(newUserPlotsConfigs)
                setUserPlotsConfigs(newUserPlotsConfigs)
                handlePlotData(plotConfigTemp.configObject, atts.plotindex)
            }
        }
    }

    async function handlePlotData(config, plotsindex){
        let queryParams = {
            metricId: config.metricId,
            dataType: config.dataType,
            addPlansInfo: config.addPlansInfo
        }

        //if it is not a live plot, then dates were defined in inputs
        if(!config.livePlot){
            queryParams.startDate = config.startDate
            queryParams.endDate = config.endDate
        }
        else{
            let currDate = new Date();
            //subtract 60000 to value of currDate to get the timestamp 1 minute ago
            let currDateMinus1Minute = new Date(currDate.getTime() - 60000)

            queryParams.startDate = parseInt(currDateMinus1Minute.valueOf() / 1000)
            queryParams.endDate = parseInt(currDate.valueOf() / 1000)
        }
        
        //get data to plot from API
        let res = await ApiModule().getResourceData(config.resourceId, queryParams)

        let dataSetMetric = {
            label: config.metricLabel,
            data: res[0].listOfDataPoints
        }   

        let newPlotData = {}
        newPlotData.dataSetMetric = dataSetMetric
        
        //define y axis label based on being raw data or metric data. If it is raw data then use the description 
        //information retrieved by the API
        if(config.dataType === "raw"){
            newPlotData.ylabel = res[0].descriptionInfo
        }
        else{
            newPlotData.ylabel = "Metric value ( 0<= y <=1)"

            //access plansInfo data points and add them to the plot if addPlans option was set 
            if(config.addPlansInfo){
                res[0].listOfPlansInfo.forEach((item, index, array) => { 
                    //set y coordinate of plans dataset points to the same value of the metrics dataset
                    item.value = res[0].listOfDataPoints.find(elem => elem.valueTime === item.valueTime).value
                })

                //set the plans dataset after processing y coordinate.
                newPlotData.plansData = res[0].listOfPlansInfo
            }
        }

        //update state variable to trigger render
        setUserPlotsConfigs( (prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState)) 
            newState[plotsindex].plotData = newPlotData
            
            //if live plot was set, perform API data request each second. Pass timerId for updating and clearing purposes
            if(config.livePlot){
                let timerId = setInterval( 
                    () => {
                        handleLivePlotData(config,plotsindex,timerId)
                    },1000)
                newState[plotsindex].liveDataAPIRequestFunctionTimer = timerId
            }
            return newState
        })
        
    }

    async function handleLivePlotData(config,plotsindex, timerId){
        //get current location to verify if navbar was clicked and thereby stop executing this function in a loop
        let currLocation = window.location.href.split("/")
        try{
            if(
                //May have to change this path when more features considering resources are added
                currLocation[currLocation.length-1] !== "" 
                || "replace" in plotConfigsRef.current[plotsindex]){
                clearInterval(plotConfigsRef.current[plotsindex].liveDataAPIRequestFunctionTimer);
                return;
            }
            else if("removed" in plotConfigsRef.current[plotsindex] && plotConfigsRef.current[plotsindex].removed === true){
                clearInterval(plotConfigsRef.current[plotsindex].liveDataAPIRequestFunctionTimer);
               
                setUserPlotsConfigs((prevState) => {
                    let newState = JSON.parse(JSON.stringify(prevState))
                    newState.splice(plotsindex,1)
                    for(let i=plotsindex; i<newState.length; i++){
                        //update timers from live plots that have greater indexes than this one
                        if(newState[i].configObject.livePlot){
                            let timerId = setInterval( 
                                () => {
                                    handleLivePlotData(newState[i].configObject,i,timerId)
                                },1000)
                            newState[i].configObject.liveDataAPIRequestFunctionTimer = timerId
                        }
                    }
                    return newState
                })
    
                return;
            }
        }
        catch(err){
            //if there was an error checking the variables, that means a plot with a index lower than the one from this function
            //was removed. Thereby a new timed function was set and this one needs to be cleared
            clearInterval(timerId);
            return
        }
        
        let queryParams = {
            metricId: config.metricId,
            dataType: config.dataType,
            addPlansInfo: config.addPlansInfo
        }

        let currDate = new Date();
        //subtract 60000 to value of currDate to get the timestamp 1 minute ago
        let currDateMinus1Minute = new Date(currDate.getTime() - 60000)

        queryParams.startDate = parseInt(currDateMinus1Minute.valueOf() / 1000)
        queryParams.endDate = parseInt(currDate.valueOf() / 1000)

        //get data to plot from API 
        let res = await ApiModule().getResourceData(config.resourceId, queryParams)

        //access plansInfo data points
        if(config.addPlansInfo){
            res[0].listOfPlansInfo.forEach((item, index, array) => { 
                //set y coordinate of plans dataset points to the same value of the metrics dataset
                item.value = res[0].listOfDataPoints.find(elem => elem.valueTime === item.valueTime).value
            })
        }

        //update state variable to trigger render. The changes have to be made upon last state submitted that not might be 
        //rendered yet. That's why prevState is used to get last state even though it is not rendered
        setUserPlotsConfigs( (prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState))
            newState[plotsindex].plotData.dataSetMetric.data = res[0].listOfDataPoints
            
            if(config.addPlansInfo){
                config.plansData = res[0].listOfPlansInfo
            }
            return newState
        })
    }

    async function removePlotConfigHandler(ev, atts){
        setUserPlotsConfigs((prevState) => {
            let newState = JSON.parse(JSON.stringify(prevState))
            newState[atts.plotindex].removed = false;
            return newState
        })

        let resStatus = await ApiModule().deletePlotConfig(userPlotsConfigs[atts.plotindex].plotConfigId)

        //if res is successful update 
        if(resStatus === 200){
            if(userPlotsConfigs[atts.plotindex].configObject.livePlot === false){
                setUserPlotsConfigs((prevState) => {
                    let newState = JSON.parse(JSON.stringify(prevState))
                    newState.splice(atts.plotindex,1)
                    for(let i=atts.plotindex; i<newState.length; i++){
                        if(newState[i].configObject.livePlot){
                            let timerId = setInterval( 
                                () => {
                                    handleLivePlotData(newState[i].configObject,i,timerId)
                                },1000)
                            newState[i].configObject.liveDataAPIRequestFunctionTimer = timerId
                        }
                    }
                    return newState
                })
            }
            else{
                setUserPlotsConfigs((prevState) => {
                    let newState = JSON.parse(JSON.stringify(prevState))
                    newState[atts.plotindex].removed = true;
                    return newState
                })
            }
        }
    }

    function generatePlots(row, plotIndex){
        let columnsToReturn = [];
        for(let i = 0; i<2 && plotIndex <= userPlotsConfigs.length; i++){
            columnsToReturn.push(
                <Grid.Column key={i}>
                    <Segment>
                    {plotIndex < userPlotsConfigs.length ?
                        <div>
                        {"replace" in userPlotsConfigs[plotIndex] ?
                            <Form>
                                <Form.Group>
                                    <Form.Input label="Insert new plot configuration name:"
                                    onChange={onPlotConfigNameChangeHandler}
                                    plotindex={plotIndex}
                                    error={
                                    !ValidInputs().validStringOrDropDownSelection(userPlotsConfigs[plotIndex].plotConfigName) ?
                                        { content: 'Please insert a name for the plot configuration', pointing: 'above' } 
                                    : 
                                        null
                                    }
                                    />
                                    <Form.Button plotindex={plotIndex} onClick={replacePlotConfigHandler}>
                                        Replace
                                    </Form.Button>
                                </Form.Group>
                            </Form>
                        :
                        "ready" in userPlotsConfigs[plotIndex] ?
                            <Form>
                                <Form.Group>
                                    <Form.Input label="Insert plot configuration name:"
                                    onChange={onPlotConfigNameChangeHandler}
                                    plotindex={plotIndex}
                                    error={
                                    !ValidInputs().validStringOrDropDownSelection(userPlotsConfigs[plotIndex].plotConfigName) ?
                                        { content: 'Please insert a name for the plot configuration', pointing: 'above' } 
                                    : 
                                        null
                                    }
                                    />
                                    <Form.Button plotindex={plotIndex} onClick={savePlotConfigHandler}>
                                        Save
                                    </Form.Button>
                                </Form.Group>
                            </Form>
                        :
                        "plotData" in userPlotsConfigs[plotIndex] ?
                            <React.Fragment>
                                {"removed" in userPlotsConfigs[plotIndex] ?
                                <Icon
                                    style={
                                        {
                                            position: "absolute", 
                                            top: "-23px", right: "-29px",  
                                            fontSize: "3rem",
                                            background: "white"
                                        }
                                    }
                                    loading
                                    name='circle notch' color='red'
                                />
                                :
                                <Icon 
                                    plotindex={plotIndex}
                                    style={
                                        {
                                            position: "absolute", 
                                            top: "-12px", right: "-21px", 
                                            background: "white", 
                                            fontSize: "3rem",
                                            cursor: "pointer",
                                            height: "0.5em",
                                            width: "0.9em"
                                        }
                                    }
                                    name='remove circle' color='red'
                                    onClick={removePlotConfigHandler}
                                />
                                }
                                <Header as="h3" textAlign="center"> 
                                    {userPlotsConfigs[plotIndex].plotConfigName}
                                </Header>
                                <Divider/>
                                <Plot plotData = {userPlotsConfigs[plotIndex].plotData}/>
                                <Divider/>
                                <Label color='blue'  style={{cursor: "pointer",float: "right"}} as="label" size="large">
                                    <input type="file" style={{display: "none"}} 
                                        plotindex={plotIndex} onChange={replaceConfigHandler}
                                    />
                                    Replace Configuration
                                </Label>
                                <br/>
                            </React.Fragment>
                        :
                            <Loader active inline='centered'> Retrieving plot data... </Loader>
                        }
                        </div>
                        :
                        <Label style={{cursor: "pointer"}} as="label" size="big">
                                <Icon name='plus square outline' />
                                <input type="file" style={{display: "none"}} onChange={readPlotConfigHandler}></input>
                                Plot Configuration
                        </Label>
                    }
                    </Segment>
                </Grid.Column>
            )
            plotIndex++
        }
        return columnsToReturn
    }

    function generateRows(){
        let rowsToReturn = [];
        let plotIndex = 0;
        for(let i =0; i<3 && plotIndex <= userPlotsConfigs.length; i++){
            rowsToReturn.push(
                <Grid.Row key={i}>
                    {generatePlots(i,plotIndex)}
                </Grid.Row>
            )
            plotIndex += 2
        }

        return rowsToReturn
    }

    return( 
        <div>
            <Grid centered>
                <Grid.Row >
                    <Grid.Column width={15}>
                        <Divider  section horizontal>
                            <Header as="h1" textAlign="center"> Imported Favourite Plots</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/>
            { userPlotsConfigs === null ?
                <Loader active inline='centered'> Retrieving plots configurations... </Loader>
            :
            
                <Grid padded columns={2}>
                    {generateRows()}
                </Grid>
            }
        </div>
    )
}

export default HomePage;