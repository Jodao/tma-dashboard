import { Button } from 'semantic-ui-react'
import ApiModule from "./api/ApiModule";
import NavBar from "./components/layout/NavBar";
import {Route, Routes,Switch} from 'react-router-dom';
import ListMetricsPage from './pages/ListMetricsPage';
import ListQualityModelsPage from './pages/ListQualityModelsPage';
import HomePage from './pages/HomePage'

function App() {
  
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
      <NavBar/>     
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        
        <Route path="/getMetrics">
          <ListMetricsPage/>
        </Route>

        <Route path="/getQualityModels">
          <ListQualityModelsPage/>
        </Route>
      </Switch>

      <Button onClick={handler}>Primary </Button>
      <Button onClick={handler2}>Secondary </Button>
    </div>
  );
}

export default App;
