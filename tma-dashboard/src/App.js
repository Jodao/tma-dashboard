import { Button } from 'semantic-ui-react'
import ApiModule from "./api/ApiModule";
import NavBar from "./components/layout/NavBar";

function App() {
  
 /* useEffect(()=> {
    console.log("useEffect function");
  },[]);
*/
  var output 

  function handler (ev){
    ev.preventDefault()
    var res = ApiModule().request()
    res.then((response) => output = response.data)
    console.log(output)
  }

  function handler2 (ev){
    ev.preventDefault()
    console.log(output)
  }

  return (
    <div>
      <NavBar></NavBar>
      <h1>Hello!</h1>

      <Button onClick={handler}>Primary </Button>
      <Button onClick={handler2}>Secondary </Button>
    </div>
  );
}

export default App;
