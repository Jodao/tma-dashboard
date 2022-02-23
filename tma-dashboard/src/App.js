import { Button } from 'semantic-ui-react'
import axios from 'axios';
//import { useEffect } from 'react';

function App() {
  const baseURL = "http://54.194.189.180:32026/getpartners";

  async function request(){
    var obj = await axios.get(baseURL)
    console.log(obj.data)
  }

 /* useEffect(()=> {
    request();
    console.log("segundo");
  },[]);
*/

  function handler (ev){
    ev.preventDefault()
    request()
  }

  return (
    <div>
      <h1>Hello!</h1>

      <Button onClick={handler}>Primary </Button>
    </div>
  );
}

export default App;
