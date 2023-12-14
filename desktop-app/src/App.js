import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './Container/WelcomeScreen';
import Layout from './utils/Layout';
import Home from './Container/Home';
import StateStore from './store';
import RouteSetter from './RouteSetter';

const App = () => {
  return (
    <StateStore>
        <HashRouter>
          <Routes>
            <Route exact path='/' element={<RouteSetter />} />
            <Route exact path='/welcome' element={<WelcomeScreen />} />
            <Route exact path='/home' element={<Home />} />
          </Routes>
        </HashRouter>
    </StateStore>
  );
}
export default App;