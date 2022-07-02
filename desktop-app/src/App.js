import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './Container/WelcomeScreen';
import Layout from './utils/Layout';
import Home from './Container/Home';
import StateStore from './store';

const App = () => {
  return (
    <StateStore>
      <Layout>
        <HashRouter>
          <Routes>
            <Route exact path='/welcome' element={<WelcomeScreen />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </HashRouter>
      </Layout>
    </StateStore>
  );
}
export default App;