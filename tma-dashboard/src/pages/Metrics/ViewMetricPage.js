import { Loader, Divider, Container, Header, Grid, Segment, Form, Icon} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import TreeRender from '../../utils/treeRendering/TreeRender';

function ViewMetricPage(){
    
    const [apiData, setAPIData] = useState(null);
    const metricId = useParams()["id"];

    function makeAPIRequest(){
        ApiModule().getMetricById(metricId, setAPIData)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={12}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center"> Metric Details</Header> 
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
                                <Segment>
                                    <Header as="h3" textAlign="center"> Metric Information</Header>
                                    <Divider/>
                                    <Form widths="equal">
                                        <Form.Group >
                                            <Form.Field>
                                                <label>metricId</label>
                                                <input type='text' value={apiData["metricId"]} readOnly/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>metricName</label>
                                                <input type='text' value={apiData["metricName"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>blockLevel</label>
                                                <input type='text' value={apiData["blockLevel"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Leaf Attribute ?</label>
                                                {
                                                    apiData["leafAttribute"] === null ?
                                                    <Icon 
                                                        color='red' 
                                                        size='big' 
                                                        name='remove' 
                                                    />
                                                    :   
                                                    <Icon
                                                        color='green' 
                                                        size='big'
                                                        name='checkmark' 
                                                    />
                                                }
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                </Segment>
                                {apiData["leafAttribute"] === null ?
                                <Segment >
                                    <Header as="h3" textAlign="center"> Metrics tree</Header>
                                    <Divider/>
                                    <TreeRender width={"100%"} height={"50vh"} data={apiData}/>
                                </Segment>
                                :   
                                <Segment >
                                    <Header as="h3" textAlign="center"> Leaf Attribute information</Header>
                                    <Divider/>
                                    <Form widths="equal">
                                        <Form.Group>
                                            <Form.Field>
                                                <label>Description</label>
                                                <input 
                                                type='text' 
                                                value=
                                                    {
                                                        "[id = " + apiData["leafAttribute"]["description"]["descriptionId"] + "] " + 
                                                        apiData["leafAttribute"]["description"]["descriptionName"] + " (" + 
                                                        apiData["leafAttribute"]["description"]["unit"] + ")"
                                                    } 
                                                readOnly
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>metricAggregationOperator</label>
                                                <input type='number' value={apiData["leafAttribute"]["metricAggregationOperator"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>numSamples</label>
                                                <input type='number' value={apiData["leafAttribute"]["numSamples"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>normalizationMethod</label>
                                                <input type='text' value={apiData["leafAttribute"]["normalizationMethod"]} readOnly />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Field>
                                                <label>normalizationKind</label>
                                                <input type='number' value={apiData["leafAttribute"]["normalizationKind"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>minimumThreshold</label>
                                                <input type='number' value={apiData["leafAttribute"]["minimumThreshold"]} readOnly />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>maximumThreshold</label>
                                                <input type='number' value={apiData["leafAttribute"]["maximumThreshold"]} readOnly />
                                            </Form.Field>
                                        </Form.Group>
                                    </Form>
                                </Segment>
                                }
                            </Segment>
                        
                    </Container>
            </div>
            }
        
        </div>
    )
}

export default ViewMetricPage;