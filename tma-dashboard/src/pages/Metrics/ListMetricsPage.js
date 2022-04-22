import { Loader, Divider, Table, Icon, Header, Button, Grid, Form, Container, Segment} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect, useRef} from "react"
import TableHeader from "../../components/tables/TableHeader"
import TableBody from "../../components/tables/TableBody"
import TablePagination from '../../components/tables/TablePagination'
import { useNavigate } from 'react-router-dom';

function ListMetricsPage(props){
    let navigate = useNavigate();
    const currpath = props["currpath"]
    
    //the headers order must be the same as the order received by the API response
    const tableHeaders = ["metricId","metricName","blockLevel"] 
    
    const [apiData, setAPIData] = useState(null);
    const refMetricFilter = useRef();

    async function makeAPIRequest(queryParams){
        let res = await ApiModule().getMetrics(queryParams)
        setAPIData(res)
    }
    
    //Execute upon component rendering
    useEffect(() => {
        //perform API request
        makeAPIRequest(null)
    },[]);
    
    function filterHandler(){
        let queryParams = {"filter": refMetricFilter.current.value}
        makeAPIRequest(queryParams)
    }
    
    function createMetricButtonHandler(){
        navigate("/createMetric")
    }

    return(
        <div>
            <Grid centered>
            <Grid.Row >
                <Grid.Column width={12}>
                <Divider section horizontal>
                    <Header as="h1" textAlign="center">List of Metrics</Header> 
                </Divider>
                </Grid.Column>
            </Grid.Row>
            </Grid>
            <br/>
            {
                //if apiData is null, then it is because the response from the API hasn't arrived
                apiData === null ? <Loader active inline='centered'> Retrieving content</Loader> :
                <Container>
                    
                    <Grid centered> 
                    
                        <Grid.Row centered>
                            <Button onClick={createMetricButtonHandler}> Create Metric </Button>
                        </Grid.Row>
                        
                        <Segment  >
                            <Grid.Row centered>
                                <Form>
                                    <Form.Group>
                                        <Form.Field> 
                                            <input ref={refMetricFilter} placeholder='Filter by name or Id' />
                                        </Form.Field>
                                        <Button type='submit' icon onClick={filterHandler}>
                                            Filter
                                            <Icon name='filter' />
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Grid.Row>
                            <Grid.Row centered>
                                <Table textAlign="center" compact collapsing  celled selectable> 
                                    <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                    <TableBody baserowpathlink={currpath} data={apiData} tableHeaders = {tableHeaders}></TableBody>
                                    <TablePagination numberOfColumns={tableHeaders.length}/>
                                </Table>   
                            </Grid.Row>
                        </Segment>
                    </Grid>
                    
                </Container>
            }
        
        </div>
    )
}

export default ListMetricsPage;