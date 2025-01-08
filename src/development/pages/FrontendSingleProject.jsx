import { useEffect, useState } from "react" 
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore"
import devData from "../data/devData.json"
import { MovingBg } from "../../components/MovingBg"

export const FrontendSingleProject = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()
    const { id } = useParams();
    const [ project, setProject ] = useState([])

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

    useEffect(() => {

      if (!id) return
    
      const currentProjectIndex = devData.findIndex((project) => {
        const projectEndpoint = project.title
          .replace(/\s+/g, "-")
          .toLowerCase();
        return projectEndpoint === id;
      });
    
if (currentProjectIndex !== -1) {
      setProject(devData[currentProjectIndex]);
    } else {
      console.error("Project not found");
      setProject(null); // Or handle the case where project is not found
    }
  }, [id]);

    console.log(project)
    console.log(id)

    if (!project) {
      return <div>Loading...</div>;
    }
  
    return (
      <section className="font-body font-medium text-white animate-fadeIn flex flex-col">
        <MovingBg />
        <div className="flex flex-col gap-0 w-9/12 tablet:w-7/12 laptop:w-8/12 mx-auto mt-40 z-20">
          {project.images && project.images.length > 0 && (
            <>
              <h2>{project.title}</h2>
              <img src={project.images[0].url} alt={project.title} />
            </>
          )}
        </div>
      </section>
    );
  };