import { useContext, useState } from "react";
import { ACTION } from "../../../constants";
import { addProject } from "../../../renderer-process/Project/project.renderer";
import { StateContext } from "../../../store";

const CreateProject = ({ onClose }) => {
  const { projects, dispatch } = useContext(StateContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const changestate = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value)
        break;
      default:
        setDescription(e.target.value)
        break;
    }
  }

  const saveproject = async (e) => {
    e.preventDefault()
    const res = await addProject({ name: name, description: description });
    dispatch(ACTION.SET_PROJECTS, [...projects, res]);
    dispatch(ACTION.SET_CURRENT_PROJECT,res);
    onClose();
  }

  return (
    <form className="create-project-form" onSubmit={saveproject}>
      <label>Enter project name</label>
      <input required autoFocus name="name" onChange={changestate} value={name} placeholder="Project name" />
      <label>Project description</label>
      <textarea required name="description" onChange={changestate} value={description} placeholder="Project description" />
      <button type="submit">Save</button>
    </form>
  );
}
export default CreateProject;