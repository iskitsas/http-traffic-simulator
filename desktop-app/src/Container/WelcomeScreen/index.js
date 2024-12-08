import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import WelcomeProjectScreen from '../../Components/WelcomeScreen/CreateProjectScreen';
import WelcomeScenarioScreen from '../../Components/WelcomeScreen/CreateScenarioScreen';
import WelcomeMessage from '../../Components/WelcomeScreen/WelcomeMessage';
import './style.css'
const WelcomeScreen = () => {
  const [currentProject,setCurrentProject]=useState({})
  const [step, setStep] = useState(0)
  const navigate = useNavigate
  const onNext = (savedProject={}) => {
    if (step < 2) {
      setStep(step + 1)
      setCurrentProject(savedProject)
    } else {
      navigate("/home")
    }
  }
  const goBack=()=>{
    setStep(step-1);
  }
  return (
    <div id='welcome-container'>
      {
        step === 0 ? <WelcomeMessage onNext={onNext} onBack={goBack} /> :
          step === 1 ? <WelcomeProjectScreen onNext={onNext} onBack={goBack} project={currentProject} /> :
            step === 2 ? <WelcomeScenarioScreen onNext={onNext} onBack={goBack} project={currentProject} /> : <></>
      }
    </div>
  );
}
export default WelcomeScreen;