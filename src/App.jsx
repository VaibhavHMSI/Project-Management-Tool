import { useState } from "react";
 
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectsSidebar from "./Components/ProejctsSidebar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState,setProjectState]=useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectState(prevState =>{
      const taskId = Math.random();
      const newTask={
        text:text,
        projectId: prevState.selectedProjectId,
        id:taskId,
      }
      return{
        ...prevState,
        tasks:[newTask,...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks:prevState.tasks.filter((task)=> task.id!==id),
      };
    })
  }

  function handleSelectproject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    })
  }

  function handeDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects:prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId)
      };
    })
  }

  function handleStartAddproject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState =>{
      const projectId = Math.random();
      const newProject={
        ...projectData,
        id:projectId
      }
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      };
    });
  }
  
  function handleCancelAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    })
  }

  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId);
  let content=<SelectedProject project={selectedProject} onDelete={handeDeleteProject} onAddTask={handleAddTask} tasks={projectState.tasks}
  onDeleteTask={handleDeleteTask}/>;

  if(projectState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }
  else if(projectState.selectedProjectId === undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddproject}/>;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddproject} projects={projectState.projects}
      onSelectProject={handleSelectproject} selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
