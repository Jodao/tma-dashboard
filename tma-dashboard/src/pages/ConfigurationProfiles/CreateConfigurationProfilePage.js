import { Button, Divider, Label, Header, Grid, Form, Container, Segment, Message,Table, Modal} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect, useRef} from "react"
import {useNavigate,useLocation} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';
import TableHeader from "../../components/tables/TableHeader"
import ValidInputs from '../../utils/ValidInputs';

function CreateConfigurationProfilePage(){
    const tableHeaders = [
        "metricName", 
        <p>weight<font color='red'>*</font></p>,
        <p>threshold<font color='red'>*</font></p>
    ]

    //formData
    const [preferences,setPreferences] = useState(null)
    const [profileName,setProfileName] = useState("")
    
    
    const [qualityModelListOfMetrics,setQualityModelListOfMetrics] = useState(null)
    
    //holds message from API response to request and any other messages to be presented to the user
    const [postResponseMessage, setPostResponseMessage] = useState({"openModal": false})

    //read quality model from passed variable
    const qm = useLocation()["state"]["qm"]

    //ref for the metric tree representation, so updates can be performed during form filling
    const metricsTreeRef = useRef();

    let navigate = useNavigate();

    useEffect(()=>{
        let listOfMetrics = []
        getMetricsList(qm["metric"], listOfMetrics);
        let newPreferencesTemp = {}
        for(let metric of listOfMetrics){
            newPreferencesTemp[metric["metricId"]]= {}
        }
        setQualityModelListOfMetrics(listOfMetrics)
        setPreferences(newPreferencesTemp)
    },[])


    //from quality model's tree of metrics, find all the metric nodes and their names and ids, to later construct the form
    function getMetricsList(metric, listOfMetrics){
        listOfMetrics.push(
            {
                "metricName": metric["metricName"],
                "metricId": metric["metricId"]
            })
        for(let child of metric["childMetrics"]){
            getMetricsList(child,listOfMetrics)
        }
    }


    function generateCustomTableBody(){
        let uniqueId = -4;
        return (
            <Table.Body>
                {
                    qualityModelListOfMetrics.map((metric) => 
                        {
                            uniqueId = uniqueId+4
                            return generateCustomTableRow(metric,uniqueId); 
                        }
                    )
                }
            </Table.Body>
        )
    }

    function generateCustomTableRow(metric,uniqueId){
        return(
            <Table.Row key={uniqueId++}>
                <Table.Cell key={uniqueId++}>
                    <Label color='grey'> {metric["metricName"]} </Label>
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Input name="weight" metricid={metric["metricId"]} 
                    onChange={formFieldInputChangeHandler} required
                    error={validInput("weight",metric["metricId"])}
                    />
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Input name="threshold" metricid={metric["metricId"]} 
                    onChange={formFieldInputChangeHandler} required
                    error={validInput("threshold",metric["metricId"])}
                    />
                </Table.Cell>
            </Table.Row>
        )
    }
    
    function validInput(formInputName,metricId){
        if (formInputName === "weight" || formInputName === "threshold"){
            if(!ValidInputs().validFloatBetweenZeroAndOne(preferences[metricId][formInputName])){
                return { content: 'Please enter a float number where  0.0 <= number <= 1.0', pointing: 'above' }
            }
        }
        else if (formInputName === "profileName"){
            if(!ValidInputs().validStringOrDropDownSelection(profileName)){
                return { content: 'Please enter a name for the Configuration Profile', pointing: 'above' }
            }
        }
        //null => doesn't show error/tip message
        return null;
    }

    async function formFieldInputChangeHandler(ev,atts){
        //then it is the weight or threshold field
        if("metricid" in atts){     
            let newPreferences = {...preferences}
            newPreferences[atts["metricid"]][atts["name"]]  = atts["value"]
            setPreferences(newPreferences)
            //update metrics tree if change was made on weight field
            if(atts["name"] === "weight"){
                metricsTreeRef.current.updateWeightsHandler(atts["metricid"], atts["value"])
            }
        }
        else{
            setProfileName(ev.currentTarget.value)
        }
    }
    
    async function submitHandler(ev){
        ev.preventDefault()
        let valid = true
        //validate form fields => maybe not necessary because as the form fields show errors it is not allowed to submit
        if (ValidInputs().validStringOrDropDownSelection(profileName)){
            let aux
            for(let metricId in preferences){
                aux = ValidInputs().validFloatBetweenZeroAndOne(preferences[metricId]["weight"]) 
                || ValidInputs().validFloatBetweenZeroAndOne(preferences[metricId]["threshold"]);
                if(aux === false){
                    valid=false
                    break;
                }
            }
        }
        else{
            valid = false
        }

        if(valid){
            //process data into a format acceptable by the API
            let postData = {preferences:[]}
            for(let [key, value] of Object.entries(preferences)){
                postData.preferences.push(
                    {
                        metricId: key,
                        weight: value["weight"],
                        threshold: value["threshold"]

                    }
                )
            }
            postData["qualityModelId"] = qm["qualityModelId"]
            postData["profileName"] = profileName

            //contains message and messageType
            let resData = await ApiModule().createConfigurationProfile(postData)
            resData["openModal"] = true
            setPostResponseMessage(resData)
        }
        else{
            setPostResponseMessage(
                {
                    messageType: "error",
                    message: "Please fill in all the required fields (marked with  * ) and respect the fields notes",
                    openModal: true
                }
            )
        }
    }

    function modalCloseHandler(ev,atts){
        if(postResponseMessage.messageType === "success"){
            //go back to ViewQualityModelPage
            navigate("/getQualityModels/" + qm["qualityModelId"])
        }
        //close modal if API response wasn't successful
        setPostResponseMessage(
            {
                ...postResponseMessage,
                openModal: false
            }
        )
    }

    return(
        <div>
            <Grid centered>
                <Grid.Row >
                    <Grid.Column width={15}>
                        <Divider section horizontal>
                            <Header as="h1" textAlign="center">Create Configuration Profile </Header> 
                        </Divider>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Container >
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment >
                            <Header as="h3" textAlign="center"> Quality Model information</Header>
                            <Divider/>
                            <Form>
                                <Form.Group >
                                    <Form.Field>
                                        <label>qualityModelId</label>
                                        <input type='number' value={qm["qualityModelId"]} readOnly/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>modelName</label>
                                        <input type='text' value={qm["modelName"]} readOnly />
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </Segment>
                        <Segment>
                            <Header as="h3" textAlign="center"> Weighted metrics tree</Header>
                            <Divider/>
                            <TreeRender ref={metricsTreeRef} width={"100%"} height={"50vh"} data={qm["metric"]}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column> 
                        <Segment compact >
                            <Header as="h3" textAlign="center"> Configuration Profile</Header>
                            <Divider/>
                            <Form>
                                <Form.Group grouped>
                                    <Form.Group>
                                        <Grid columns={2}>
                                            <Grid.Column> 
                                                <Form.Input  required label='profileName' name="profileName"
                                                    onChange={formFieldInputChangeHandler}
                                                    error={validInput("profileName",null)} 
                                                />
                                            </Grid.Column>
                                            <Grid.Column> 
                                                <Form.Button
                                                color= "grey" circular type='submit' floated="right" onClick={submitHandler}> 
                                                    Create Profile
                                                </Form.Button> 
                                            </Grid.Column>
                                        </Grid>
                                    </Form.Group>
                                    <Divider section horizontal>
                                        <Header as="h5" textAlign="center">Set metrics weigths and thresholds</Header>     
                                    </Divider>
                                    {preferences !== null ?
                                        <Grid columns={1}>
                                            <Grid.Column>
                                            <Table textAlign="center" 
                                                compact   
                                                celled 
                                                selectable
                                                unstackable
                                            > 
                                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                                {generateCustomTableBody()}
                                            </Table> 
                                        </Grid.Column>
                                        </Grid>  
                                    :null}
                                </Form.Group>
                            </Form>
                        </Segment> 
                    </Grid.Column>          
                </Grid>
                <Modal centered={false} closeIcon open={postResponseMessage["openModal"]} onClose={modalCloseHandler}>
                    <Modal.Header>Message</Modal.Header>
                    <Modal.Content>
                        <Message 
                        color= {
                                postResponseMessage["messageType"] === "success" ? 
                                "green"
                                :postResponseMessage["messageType"] === "warning" ?
                                "orange"
                                : "red" 
                            }
                        >
                            <Message.Header>{postResponseMessage["message"]}</Message.Header>
                        </Message>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='grey' onClick={modalCloseHandler}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </div>
    )
}

export default CreateConfigurationProfilePage;