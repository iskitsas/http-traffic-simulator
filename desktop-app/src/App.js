import './App.css'
import { HashRouter,Route, Routes } from 'react-router-dom'
import WelcomeScreen from './Container/WelcomeScreen';
import Layout from './utils/Layout';
import WelcomeProjectScreen from './Container/CreateProjectScreen';
import WelcomeScenarioScreen from './Container/CreateScenarioScreen';
import Home from './Container/Home';

const App = () => {
  return (
    <Layout>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<WelcomeScreen/>} />
          <Route path='/welcome-project' element={<WelcomeProjectScreen/>} />
          <Route path='/welcome-project-scenario' element={<WelcomeScenarioScreen/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </HashRouter>
    </Layout>
  );
}
export default App;