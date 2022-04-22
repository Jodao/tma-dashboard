import { Loader, Divider, Container, Header, Grid, Segment, Form,Table, Button} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import TableHeader from "../../components/tables/TableHeader"
import TableBody from "../../components/tables/TableBody"
import TablePagination from '../../components/tables/TablePagination'
import TreeRender from '../../utils/treeRendering/TreeRender';

function ViewQualityModelPage(){
    const tableHeaders = ["configurationProfileId","profileName"]
    
    const [apiData, setAPIData] = useState(null);
    const qualityModelId = useParams()["id"];

    let navigate = useNavigate();

    function makeAPIRequest(){
        ApiModule().getQualityModelById(qualityModelId, setAPIData)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    function addProfileButtonHandler(){
        console.log(apiData)
        navigate("/createConfigurationProfile",{state: {qm: apiData}})
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={12}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Quality Model Details</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            <br/>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :
                <div>
                    <Container>
                            <Segment>
                                <Form widths="equal">
                                    <Form.Group>
                                        <Form.Field>
                                            <label>qualityModelId</label>
                                            <input type='number' value={apiData["qualityModelId"]} readOnly/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>modelName</label>
                                            <input type='text' value={apiData["modelName"]} readOnly />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>modelDescriptionReference</label>
                                            <input type='number' value={apiData["modelDescriptionReference"]} readOnly />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>businessThreshold</label>
                                            <input type='number' value={apiData["businessThreshold"]} readOnly />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field>
                                            <label>metricId</label>
                                            <input type='number' value={apiData["metric"]["metricId"]} readOnly/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>metricName</label>
                                            <input type='text' value={apiData["metric"]["metricName"]} readOnly/>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                                <Grid columns={2}>
                                        <Grid.Column>
                                            <Segment>
                                                <Grid columns={1}>
                                                    <Grid.Column>
                                                        <Header as="h4" textAlign="center"> Configuration Profiles associated</Header>
                                                        <Button onClick={addProfileButtonHandler} floated='right'>Add Profile</Button>
                                                        <Table  
                                                        style = {{marginLeft: "auto"}} 
                                                        textAlign="center" 
                                                        compact 
                                                        collapsing  
                                                        celled 
                                                        selectable> 
                                                            <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                                            <TableBody 
                                                                rowlinkdata={apiData}
                                                                baserowpathlink={"/getConfigurationProfile"} 
                                                                data={apiData["configurationProfiles"]} 
                                                                tableHeaders = {tableHeaders}
                                                            />
                                                            <TablePagination numberOfColumns={tableHeaders.length}/>
                                                        </Table>   
                                                    </Grid.Column>
                                                </Grid>
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Segment>
                                                <Header as="h4" textAlign="center"> Metrics tree</Header>
                                                <TreeRender width={"100%"} height={"50vh"} data={apiData["metric"]}/>
                                            </Segment>
                                        </Grid.Column> 
                                </Grid>
                            </Segment>
                    </Container>
            </div>
            }
        
        </div>
    )
}

export default ViewQualityModelPage;