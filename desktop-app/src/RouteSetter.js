import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { getProjects } from "./renderer-process/Project/project.renderer";
import { StateContext } from "./store";

const RouteSetter = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(StateContext)

  const getAllProjects = async () => {
    const projectsResponse = await getProjects()
    dispatch("SET_PROJECTS", projectsResponse)
    if (projectsResponse.length)
      navigate("/home")
    else
      navigate("/welcome")
  }
  useEffect(() => {
    getAllProjects()
  }, [])
  return (
    <div></div>
  );
}
export default RouteSetter;