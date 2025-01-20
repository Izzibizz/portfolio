import { useEffect, useState } from "react" 
import { useParams, NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore"
import artProjects from "../data/artProjects.json"
import { SlArrowLeft } from "react-icons/sl";


export const ArtSingleProject = () => {

    const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } = useProjectsStore() 
    const { id } = useParams()
    const [ project, setProject ] = useState([])

    useEffect(() => {
      if (!id) return;
  
      const currentProjectIndex = artProjects.findIndex((project) => {
        const projectEndpoint = project.title.replace(/\s+/g, "-").toLowerCase();
        return projectEndpoint === id;
      });
  
      if (currentProjectIndex !== -1) {
        setProject(artProjects[currentProjectIndex]);
      } else {
        console.error("Project not found");
        setProject(null); // Or handle the case where project is not found
      }
    }, [id]);

  useEffect(()=> {
    setArtPortfolioDisplay(true)
    setFrontendPortfolioDisplay(false)
    setBgWhite(true)
  }, [])

  if (!project) {
    return <div>Loading...</div>;
  }

  console.log(project)
    
  return (
    <section className="animate-fadeIn font-body flex flex-col gap-10 mb-20">
           <NavLink to={`/art`}>
          <SlArrowLeft className="cursor-hollow pl-2 w-6 h-6 laptop:w-8 laptop:h-6 absolute z-20 bottom-32 left-2 laptop:bottom-[10%] laptop:left-6 hover:scale-125" />{" "}
        </NavLink>
      <div className="fixed bottom-0 left-0 laptop:left-20 laptop:bottom-10 bg-light bg-opacity-80 p-4 laptop:rounded-xl w-full laptop:w-[300px]">
      <h3>{project.title}, {project.year}</h3>
      <p className="font-light">{project.description}</p>
      </div>
      {(project.images?.length === 1) && (
        <div className="w-1/2 self-end">
          <img src={project.images?.[0]?.url} alt={project.title} className="w-full"/>
        </div>
      )}
      {/* mobile and tablet */}
      <div className="grid laptop:hidden grid-cols-2 gap-2">
        {project.images?.map((image, index) => (
          <img src={image.url} key={index} className="aspect-[3/4] object-cover" alt={image.alt || project.title}/>
        ))}
      </div>
      {/* laptop */}
      <div className="flex-col gap-4 hidden laptop:flex">
      {(project.images?.length > 1) && (
      <div className={`${project.images?.length < 3 ? "tablet:w-full":"tablet:w-3/4" } w-full  flex justify-between`}>
      <img src={project.images?.[0]?.url} alt={project.title} className={`${project.images?.length < 3 ? "h-[500px]" : "h-[400px]" }`}/>
      <img src={project.images?.[1]?.url} alt={project.title} className={`${project.images?.length < 3 ? "h-[700px]" : "h-[200px]" }`}/>
      </div>
      )}
      {(project.images?.length > 2) && (
      <div className="w full tablet:w-3/4 flex justify-between self-end">
      <img src={project.images?.[2]?.url} alt={project.title} className="h-[400px]"/>
      <img src={project.images?.[3]?.url} alt={project.title} className="h-[200px]"/>
      </div>
      )}
      <img src={project.images?.[5]?.url} alt={project.title} className="h-[200px] absolute bottom-[-10%] right-1/4"/>
      {(project.images?.length > 5) && (
      <div className="w full tablet:w-full flex justify-between">
        <img src={project.images?.[6]?.url} alt={project.title} className="h-[400px]"/>
        <img src={project.images?.[8]?.url} alt={project.title} className="h-[400px]"/>
      <img src={project.images?.[7]?.url} alt={project.title} className="h-[400px]"/>
      </div>
      )}
            {(project.images?.length > 9) && (
      <div className="w full tablet:w-1/2 mx-auto flex justify-between">
      <img src={project.images?.[9]?.url} alt={project.title} className="h-[400px]"/>
      </div>)}
      </div>
    </section>
  )
}

