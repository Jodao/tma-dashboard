import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, Segment, Divider, Header, Form, Loader, Icon, Label } from 'semantic-ui-react';
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
        let plotConfigId = userPlotsConfigs[index].plotConfigId
        fr.addEventListener('load', (event) => {
            let newPlotConfig = JSON.parse(event.target.result)
            newPlotConfig.plotConfigId = plotConfigId

            let newUserPlotsConfigs = JSON.parse(JSON.stringify(userPlotsConfigs))
            newUserPlotsConfigs[index] = newPlotConfig
            
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

            let requestBody = {
                plotConfigName: configObjectTemp.plotConfigName, 
            }
            
            delete configObjectTemp.ready
            delete configObjectTemp.plotConfigName

            console.log(configObjectTemp)
            
            requestBody.configObject = await new Blob(
                [JSON.stringify(configObjectTemp)],
                {type : 'application/json'}
            ).arrayBuffer();
            
            requestBody.configObject = Array.from(new Uint8Array(requestBody.configObject))
            console.log(requestBody)
            
            let plotConfigId = await ApiModule().savePlotConfig(requestBody)
            console.log(plotConfigId)
            setUserPlotsConfigs((prevState) => {
                let newUserPlotsConfigs = JSON.parse(JSON.stringify(prevState))
                newUserPlotsConfigs[atts.plotindex].plotConfigId = plotConfigId
                delete newUserPlotsConfigs[atts.plotindex].ready 
                return newUserPlotsConfigs
            })
            handlePlotData(configObjectTemp, atts.plotindex)
        }
    }

    //replace plot config on database by sending the plotConfigId
    async function replacePlotConfigHandler(ev,atts){
        if(ValidInputs().validStringOrDropDownSelection(userPlotsConfigs[atts.plotindex].plotConfigName)){
            let configObjectTemp = JSON.parse(JSON.stringify(userPlotsConfigs[atts.plotindex]))

            let requestBody = {
                plotConfigName: configObjectTemp.plotConfigName, 
                plotConfigId: configObjectTemp.plotConfigId
            }
            
            delete configObjectTemp.ready
            delete configObjectTemp.plotConfigName

            console.log(configObjectTemp)
            
            requestBody.configObject = await new Blob(
                [JSON.stringify(configObjectTemp)],
                {type : 'application/json'}
            ).arrayBuffer();
            
            requestBody.configObject = Array.from(new Uint8Array(requestBody.configObject))
            console.log(requestBody)
            
            let resStatus = await ApiModule().replacePlotConfig(requestBody)

            //if res is successful handlePlotData
            if(resStatus >= 200 && resStatus < 300){
                handlePlotData(configObjectTemp, atts.plotindex)
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
            
            //if live plot was set, perform API data request each second
            if(config.livePlot){
                newState[plotsindex].liveDataAPIRequestFunctionTimer = setInterval(handleLivePlotData,1000,config,plotsindex)
            }
            return newState
        })
        
    }

    async function handleLivePlotData(config,plotsindex){
        //get current location to verify if navbar was clicked and thereby stop executing this function in a loop
        let currLocation = window.location.href.split("/")
        //May have to change this path when more features considering resources are added
        if(currLocation[currLocation.length-1] !== ""){
            clearInterval(plotConfigsRef.current[plotsindex].liveDataAPIRequestFunctionTimer);
            return;
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

    function generatePlots(row, plotIndex){
        let columnsToReturn = [];
        for(let i = 0; i<2 && plotIndex <= userPlotsConfigs.length; i++){
            columnsToReturn.push(
                <Grid.Column key={i}>
                    <Segment>
                    {plotIndex < userPlotsConfigs.length ?
                        <div>
                        {"plotData" in userPlotsConfigs[plotIndex] ?
                            <React.Fragment>
                                <Header as="h3" textAlign="center"> 
                                    {userPlotsConfigs[plotIndex].plotConfigName}
                                </Header>
                                <Divider/>
                                <Plot plotData = {userPlotsConfigs[plotIndex].plotData}/>
                                <Divider/>
                                <Label  style={{cursor: "pointer",float: "right"}} as="label" size="large">
                                    <input type="file" style={{display: "none"}} 
                                        plotindex={plotIndex} onChange={replaceConfigHandler}
                                    />
                                    Replace Configuration
                                </Label>
                                <br/>
                            </React.Fragment>
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
                        "plotConfigId" in userPlotsConfigs[plotIndex] ?
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
                    <Grid.Column width={12}>
                        <Divider section horizontal>
                            <Header as="h1" textAlign="center"> Imported Favourite Plots</Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <br/>
            { userPlotsConfigs === null ?
                <Loader active inline='centered'> Retrieving plots configurations... </Loader>
            :
            <Container>
                <Grid padded columns={2}>
                    {generateRows()}
                </Grid>
            </Container>
            }
        </div>
    )
}

export default HomePage;