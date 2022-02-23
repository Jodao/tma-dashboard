import axios from 'axios';
import Configurations from '../configurations/Configurations';

function ApiModule() {
  const apiURL = Configurations().API_BASE_URL + "getpartners";

  //API test function
  async function request(){
    return await axios.get(apiURL)
  }

    return {
      request
    };

}

export default ApiModule