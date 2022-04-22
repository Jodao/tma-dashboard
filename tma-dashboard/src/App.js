import NavBar from "./components/layout/NavBar";
import {Route, Routes} from 'react-router-dom';
import ListMetricsPage from './pages/Metrics/ListMetricsPage';
import ListQualityModelsPage from './pages/QualityModels/ListQualityModelsPage';
import HomePage from './pages/HomePage'
import ViewMetricPage from "./pages/Metrics/ViewMetricPage";
import CreateMetricPage from "./pages/Metrics/CreateMetricPage";
import ViewQualityModelPage from "./pages/QualityModels/ViewQualityModelPage";
import CreateConfigurationProfilePage from "./pages/ConfigurationProfiles/CreateConfigurationProfilePage";
import CreateQualityModelPage from "./pages/QualityModels/CreateQualityModelPage";
import ViewConfigurationProfilePage from "./pages/ConfigurationProfiles/ViewConfigurationProfilePage";
import PlotResourceMetricsPage from "./pages/Resources/PlotResourceMetricsPage";
import SimulateResourceMetricsPage from "./pages/Resources/SimulateResourceMetricsPage";

function App() {
  return (
    <div>
      <NavBar/>     
      <Routes>
        <Route path="/" exact element={<HomePage/>}></Route>


        
        <Route path="/createMetric" element={<CreateMetricPage/>}></Route>
        
        <Route path="/getMetrics/:id" element={<ViewMetricPage/>}></Route>

        <Route path="/getMetrics" element={<ListMetricsPage currpath="/getMetrics"/>}></Route>



        <Route path="/createQualityModel" element={<CreateQualityModelPage/>}></Route>
        
        <Route path="/getQualityModels/:id" element={<ViewQualityModelPage/>}></Route>
        
        <Route path="/getQualityModels" element={<ListQualityModelsPage currpath="/getQualityModels"/>}></Route>

        
        
        <Route path="/createConfigurationProfile" element={<CreateConfigurationProfilePage/>}></Route>
        
        <Route path="/getConfigurationProfile/:id" element={<ViewConfigurationProfilePage/>}></Route>


        <Route path="/getResources" element={<PlotResourceMetricsPage />}></Route>
        <Route path="/simulateMetrics" element={<SimulateResourceMetricsPage />}></Route>

      </Routes>
    </div>
  );
}

export default App;
