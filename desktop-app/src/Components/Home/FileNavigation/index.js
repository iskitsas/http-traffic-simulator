//stylesheets
import './style.css'
import './scenarioCard.css'
import './requestcard.css'

//components
import ScenarioCard from './SecnarioCard';
import EditModal from '../EditModal';
import TempScenario from './TempScenario';
import DeleteConfirmationModal from './DeleteConfirmationModal';

//images
import folderIcon from '../../../assets/images/addfolder.svg'
import editMenu from '../../../assets/images/editMenu.svg'

//hooks and functions
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../store';
import { addScenario, deleteScenario, getScenarios } from '../../../renderer-process/Scenario/scenario.renderer';
import { deleteProject } from '../../../renderer-process/Project/project.renderer';
import { ACTION } from '../../../constants';
import { deleteRequest, getRequests } from '../../../renderer-process/Request/request.renderer';
import { useNavigate } from 'react-router-dom';

const FilesNavigation = () => {
  const navigate = useNavigate();
  const { currentDocument, dispatch, currentProject, scenarios, openedDocuments } = useContext(StateContext);
  const [tempScenarios, setTempScenarios] = useState([]);//temporary created scenarios
  const [showEditModal, setEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalPosition, setEditModalPosition] = useState({ top: 0, left: 0 });
  const [documentToDelete, setDocumentToDelete] = useState("");

  const addNewScenario = (e) => {
    e.stopPropagation();
    setTempScenarios([{}]);
  }

  const setTempScenarioName = (value) => {
    setTempScenarios([{ name: value }]);
  }

  const setcurrentdocument = (document) => {
    dispatch(ACTION.PUSH_DOCUMENT, document);
  }

  const getAllScenarios = async () => {
    const scenariosResponse = await getScenarios(currentProject._id);
    dispatch(ACTION.SET_SCENARIOS, scenariosResponse);
  }

  const openeditmodal = async (e, documentName) => {
    setEditModal(!showEditModal);
    setDocumentToDelete(documentName);
    setEditModalPosition({ top: e.clientY, left: e.clientX });
    return
  }

  const deletedocument = async () => {
    try {
      if (documentToDelete === currentProject.projectName) {
        await deleteProject(currentProject._id);
        navigate("/");
      } else if (currentDocument?.scenarioname === documentToDelete) {
        await deleteScenario("_id", currentDocument._id);
        const respo = await getScenarios(currentDocument.projectId);
        const newdocs = openedDocuments?.filter((doc) => {
          if (doc.scenarioId !== currentDocument._id && doc._id !== currentDocument._id)
            return doc
        })
        dispatch(ACTION.SET_OPENDDOC, newdocs)
        dispatch(ACTION.SET_SCENARIOS, respo);
      } else if (currentDocument?.requestName === documentToDelete) {
        await deleteRequest("_id", currentDocument._id);
        const respo = await getRequests(currentDocument.scenarioId);
        dispatch(ACTION.POP_DOCUMENT, currentDocument._id);
        dispatch(ACTION.SET_REQUESTS, { requests: respo, scenarioId: currentDocument.scenarioId });
      }
    } catch (error) {
    }
  }

  //for closing modal if clicked outside modal box
  const handleEditModal = (e) => {
    e.stopPropagation()
    if (e.target.className !== "filenavigation-edit-project" && e.target.className !== "filenavigation-edit-project-icon") {
      setEditModal(false)
    }
  }

  const handleResize = () => {//close the edit modal when window size changes
    setEditModal(false)
  }

  //for removing the temporary created scenario card if clicked outside the box
  const handleTempScenario = async (e) => {

    if ((e.target.className !== "filenavigation-add-scenario" && e.target.className !== "temp-scenario-input") || e.keyCode === 13) {
      if (tempScenarios[0]?.name) {
        tempScenarios[0].scenarioname = tempScenarios[0].name; //setting default data
        tempScenarios[0].duration = 5; //setting default data
        tempScenarios[0].workers = 4; //setting default data
        tempScenarios[0].totalclients = 10; //setting default data
        tempScenarios[0].throttling = 50000; //setting default data
        tempScenarios[0].delay = "0.5-1.5"; //setting default data
        const response = await addScenario({ ...tempScenarios[0] }, currentProject._id);
        dispatch("PUSH_DOCUMENT", response)
        getAllScenarios()
      }
      setTempScenarios([]);
    }
  }

  useEffect(() => {
    if (currentProject._id)
      getAllScenarios();
  }, [currentProject]);

  useEffect(() => {
    window.addEventListener("click", handleTempScenario);
    window.addEventListener("keypress", handleTempScenario);
    return () => {
      window.removeEventListener('click', handleTempScenario);
      window.removeEventListener("keypress", handleTempScenario);
    };
  }, [tempScenarios]);

  useEffect(() => {
    window.addEventListener("click", handleEditModal)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener('click', handleEditModal);
    };
  }, []);

  return (
    <div id='sidebar-container' style={{ display: "flex", borderRight: "1px solid rgb(66, 66, 66)", flexDirection: "column", justifyContent: "space-between", height: "95vh", width: "25vw" }}>
      <div style={{ borderBottom: "1px solid #424242", display: "flex", justifyContent: "space-between", padding: "0vw 1vw" }}>
        <p style={{ margin: "1vh 0vw", textOverflow: "ellipsis", fontSize: "1.2vw", overflow: "hidden", userSelect: "none", whiteSpace: "nowrap", }}>{currentProject.projectName}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={addNewScenario} className='filenavigation-add-scenario' title='add scenario'>
            <img style={{ height: "2.5vh" }} src={folderIcon} />
          </button>
          <button onClick={(e) => openeditmodal(e, currentProject.projectName)} style={{ position: "relative" }} className='filenavigation-edit-project' title='edit project'>
            <img className='filenavigation-edit-project-icon' style={{ height: "2vh" }} src={editMenu} />
          </button>
        </div>
      </div>
      <div id='sidebar-scenarios-cards-container' style={{ padding: "0px 3px", paddingBottom: "5vh", height: "auto", overflowX: "hidden", overflowY: "auto", flex: 1 }}>
        {
          tempScenarios.map(tempScenario => <TempScenario key="tempscenariocard1" scenario={tempScenario} currentDocument={currentDocument} onChange={setTempScenarioName} />)
        }
        {
          scenarios.map(scenario => <ScenarioCard key={scenario._id} openMenu={openeditmodal} scenario={scenario} onSelect={setcurrentdocument} />)
        }
      </div>
      {
        showEditModal &&
        <EditModal isOpen={showEditModal} position={editModalPosition} onDelete={() => setConfirmDelete(true)} />
      }
      {
        confirmDelete &&
        <DeleteConfirmationModal documentName={documentToDelete} onConfirm={deletedocument} onClose={() => setConfirmDelete(false)} />
      }
    </div>
  );
}
export default FilesNavigation;