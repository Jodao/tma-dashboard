import {Divider, Label, Header, Grid, Form, Container, Segment, Table,Loader} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import React, {useState, useEffect} from "react"
import {useLocation,useParams} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';
import TableHeader from "../../components/tables/TableHeader"

function ViewConfigurationProfilePage(props){
    const configurationProfileId = useParams()["id"];
    const tableHeaders = [
        "metricName", 
        "weight",
        "threshold"
    ]

    //configurationProfile data received from API
    const [configurationProfile,setConfigurationProfile] = useState(null)

    //read quality model from passed variable
    const qualityModelData = useLocation()["state"]["data"]
    
    function makeAPIRequest(){
        ApiModule().getConfigurationProfileById(configurationProfileId, setConfigurationProfile)
    }

    useEffect(()=>{
        //perform API request
        makeAPIRequest()
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
        let listOfMetrics = []
        getMetricsList(qualityModelData["metric"], listOfMetrics);
        let uniqueId = -4;
        return (
            <Table.Body>
                {
                    listOfMetrics.map((metric) => 
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
        let preference = configurationProfile.preferences.find(preference => preference.metricId === metric.metricId)
        return(
            <Table.Row key={uniqueId++}>
                <Table.Cell key={uniqueId++}>
                    <Label color='grey'> {metric["metricName"]} </Label>
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Field>
                        <input type='number' value={preference.weight} readOnly />
                    </Form.Field>
                </Table.Cell>
                <Table.Cell key={uniqueId++}>
                    <Form.Field>
                        <input type='number' value={preference.threshold} readOnly />
                    </Form.Field>
                </Table.Cell>
            </Table.Row>
        )
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={12}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center">Configuration Profile Details</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            {configurationProfile !== null ?
                <Container>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Segment>
                                    <Header as="h3" textAlign="center"> Quality Model information</Header>
                                    <Form widths='equal'>
                                        <Form.Group >
                                            <Form.Field>
                                                <label>qualityModelId</label>
                                                <input type='number' value={qualityModelData["qualityModelId"]} readOnly/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>modelName</label>
                                                <input type='text' value={qualityModelData["modelName"]} readOnly />
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                </Segment>
                                <Segment>
                                    <Header as="h3" textAlign="center"> Weighted metrics tree</Header>
                                    <TreeRender width={"100%"} height={"50vh"} 
                                        preferences={configurationProfile.preferences}
                                        data={qualityModelData["metric"]} 
                                        configurationProfile={true}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <Header as="h3" textAlign="center"> Configuration Profile information</Header>
                                    <Form>
                                        <Form.Group grouped>
                                            <Form.Field width={8} >
                                                <label>profileName</label>
                                                <input type='text' value={configurationProfile["profileName"]} readOnly/>
                                            </Form.Field>
                                            <Divider section horizontal>
                                                <Header as="h5" textAlign="center">Metrics weigths and thresholds</Header>     
                                            </Divider>
                                            <Table  
                                            style = {{marginLeft: "auto", marginRight: "auto"}} 
                                            textAlign="center" 
                                            compact 
                                            collapsing  
                                            celled 
                                            selectable> 
                                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                                {generateCustomTableBody()}
                                            </Table> 
                                        </Form.Group>
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid>           
                    </Segment>
                </Container>
                :<Loader active inline='centered'> Retrieving content </Loader>
            }
        </div>
    )
}

export default ViewConfigurationProfilePage;