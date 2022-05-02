import { Loader, Divider, Table, Icon, Header, Button, Grid, Form, Container, Segment, GridColumn} from 'semantic-ui-react'
import ApiModule from "../../utils/api/ApiModule"
import {useState, useEffect, useRef} from "react"
import TableHeader from "../../components/tables/TableHeader"
import TableBody from "../../components/tables/TableBody"
import TablePagination from '../../components/tables/TablePagination'
import { useNavigate } from 'react-router-dom';

function ListMetricsPage(props){
    let navigate = useNavigate();
    const currpath = props["currpath"]
    
    const tableHeaders = ["Id","Name","Block Level"] 
    const tableBodyJSONProps = ["metricId","metricName","blockLevel"] 
    
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
                <Grid.Column width={15}>
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

                <Grid columns={1}> 
                    <Grid.Column>
                        <Container>
                            <Form>
                                <Form.Group inline>
                                    <Form.Field width='6'> 
                                        <input ref={refMetricFilter} placeholder='Filter by name or Id' />
                                    </Form.Field>
                                    <Button color='blue' type='submit' icon onClick={filterHandler}>
                                        Filter
                                        <Icon name='filter' />
                                    </Button>
                                    <Button style={{marginLeft: "auto"}} floated='right' color='blue' onClick={createMetricButtonHandler}> Create Metric </Button>
                                </Form.Group>
                            </Form>
                            <Table textAlign="center" compact celled selectable> 
                                <TableHeader tableHeaders = {tableHeaders} ></TableHeader>
                                <TableBody baserowpathlink={currpath} data={apiData} tableHeaders = {tableBodyJSONProps}></TableBody>
                                <TablePagination numberOfColumns={tableHeaders.length}/>
                            </Table>
                        </Container>
                    </Grid.Column>
                </Grid>
            }
        
        </div>
    )
}

export default ListMetricsPage;