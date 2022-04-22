import axios from 'axios';
import Configurations from '../../configurations/Configurations';

function ApiModule() {
  const apiURL = Configurations().API_BASE_URL;

  //return list of metrics
  function getMetrics(queryParams){
    let endpoint = apiURL + "getMetrics"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint,{params: queryParams}).then((res) => 
        {
          return res.data["metrics"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return a single metric
  function getMetricById(id, setStateFunction){
    let endpoint = apiURL + "getMetrics/" + id
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          setStateFunction(res.data["metric"])
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //create a metric
  function createMetric(body){
    let endpoint = apiURL + "createMetric"
    //perform post request and return response data, even if response code != 200
    return axios.post(endpoint,body).then((res) => 
        {
          return res["data"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          console.log('Error contents:', error.response);
          return error.response["data"]
        }
      )
  }

  //return list of descriptions
  function getDescriptions(queryParams){
    let endpoint = apiURL + "getDescriptions"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint,{params: queryParams}).then((res) => 
        {
          return res.data["descriptions"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return list of quality models
  function getQualityModels(queryParams, setStateFunction){
    let endpoint = apiURL + "getQualityModels"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint,{params: queryParams}).then((res) => 
        {
          setStateFunction(res.data["qualityModels"])
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return a single quality model
  function getQualityModelById(id, setStateFunction){
    let endpoint = apiURL + "getQualityModels/" + id
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          setStateFunction(res.data["qualityModel"])
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }
  
  //create a quality model
  function createQualityModel(body){
    let endpoint = apiURL + "createQualityModel"
    //perform post request and return response data, even if response code != 200
    return axios.post(endpoint,body).then((res) => 
        {
          return res["data"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          console.log('Error contents:', error.response);
          return error.response["data"]
        }
      )
  }

  //create a configuration profile for a quality model
  function createConfigurationProfile(body){
    let endpoint = apiURL + "createConfigurationProfile"
    //perform post request and return response data, even if response code != 200
    return axios.post(endpoint,body).then((res) => 
        {
          return res["data"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          console.log('Error contents:', error.response);
          return error.response["data"]
        }
      )
  }

  //return a single quality model
  function getConfigurationProfileById(id, setStateFunction){
    let endpoint = apiURL + "getConfigurationProfile/" + id
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          setStateFunction(res.data["configurationProfile"])
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return list of currently monitored resources
  function getActiveResources(){
    let endpoint = apiURL + "getResources"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          return res.data["resources"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return list of weights and metric tree associated to the resource
  function getResourceWeightsAndMetricsTree(id){
    let endpoint = apiURL + "getResources/" + id + "/weightedTree"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          return res.data
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  //return a list of metrics that can be either leaf attribute or "normal" metrics exclusively
  function getConfigurationProfileListOfMetrics(configurationProfileId, queryParams){
    let endpoint = apiURL + "getConfigurationProfile/" + configurationProfileId + "/listOfMetrics"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint,{params: queryParams}).then((res) => 
        {
          return res.data["listOfMetrics"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  function getResourceData(resourceId, queryParams){
    let endpoint = apiURL + "getResources/" + resourceId + "/data"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint,{params: queryParams}).then((res) => 
        {
          return res.data["plotData"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  function getSimulationData(body){
    let endpoint = apiURL + "simulateData"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.patch(endpoint,body).then((res) => 
        {
          return res.data["simulationData"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  function getPlotsConfigs(){
    let endpoint = apiURL + "getPlotsConfigs"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.get(endpoint).then((res) => 
        {
          return res.data["plotsConfigs"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  function savePlotConfig(body){
    let endpoint = apiURL + "addPlotConfig"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.post(endpoint,body).then((res) => 
        {
          return res.data["plotConfigId"]
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  function replacePlotConfig(body){
    let endpoint = apiURL + "replacePlotConfig"
    //axios.get() returns a promise, thereby when the response is received it is treated
    return axios.put(endpoint,body).then((res) => 
        {
          console.log(res)
          return res.status
        }
      ).catch(function (error) 
        {
          console.log('Error:', error.message);
          return null
        }
      )
  }

  return {
    getMetrics,
    getMetricById,
    createMetric,
    getDescriptions,
    getQualityModels,
    getQualityModelById,
    createQualityModel,
    createConfigurationProfile,
    getConfigurationProfileById,
    getActiveResources,
    getResourceWeightsAndMetricsTree,
    getConfigurationProfileListOfMetrics,
    getResourceData,
    getSimulationData,
    getPlotsConfigs,
    savePlotConfig,
    replacePlotConfig
  };

}

export default ApiModule