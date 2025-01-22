import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Magnifier } from "../../components/Magnifier";
import artProjects from "../data/artProjects.json"
import { MdOutlineArrowOutward } from "react-icons/md";

export const ArtProjects = () => {
  const {
    setArtPortfolioDisplay,
    setBgWhite,
    setFrontendPortfolioDisplay,
    setTitleAndVideoVisible,
    titleAndVideoVisible,
  } = useProjectsStore();
  const [ fadeOut, setFadeout ] = useState(false)
  const [ clickedImage, setClickedImage ] = useState(artProjects[0].images[0].url)
  const [ imageTitle, setImageTitle ] = useState(artProjects[0].title)
  
  const chooseProject = (url, title) => {
    window.scrollTo(0, 0);
    setClickedImage(url)
    setImageTitle(title)
  }

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
    setTimeout(() => {
      setFadeout(true)
    }, 1000)
    setTimeout(() => {
      setTitleAndVideoVisible(false);
    }, 2000);
  }, []);
  

  return (
    <section className="font-body font-medium animate-fadeIn h-full w-11/12 laptop:w-[99%] mx-auto justify-between flex flex-col gap-10 mb-10 laptop:mb-0">
      {titleAndVideoVisible ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-screen h-screen min-h-screen object-cover invert z-10 ${fadeOut && "animate-fadeOut"}`}
          >
            <source
              src="https://res.cloudinary.com/dbf8xygxz/video/upload/v1728898269/Sequence_01_8_qeiugg.mp4"
              type="video/mp4"
            />
          </video>
          <img
            src="/art-portfolio.svg"
            className={`hidden laptop:block w-full tablet:w-10/12 laptop:w-1/2 mx-auto laptop:mt-[10%] z-20 ${fadeOut && "animate-fadeOut"}`}
          />
          <img
            src="/art-portfolio-vertical.svg"
            className={`w-6/12 laptop:hidden mx-auto mt-10 z-20 ${fadeOut && "animate-fadeOut"}`}
          />
        </>
      ) : (
        <>
        <div className="flex flex-col tablet:flex-row justify-between">
        <div className="flex flex-col self-end px-4">
        <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1737399671/projects-black_ane550.svg" alt="art projects Izabel Lind" className=" h-[80px] laptop:h-[150px]"/>

              </div>
              <div className=" tablet:w-2/3 laptop:w-[45%] animate-smallSlideInRight">
              <NavLink
            to={`/art/${imageTitle
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            key={imageTitle}
          ><Magnifier
                url={clickedImage}
              /></NavLink>

          <div className=" flex justify-between">
                       
                       <div className="group">
                       <NavLink
            to={`/art/${imageTitle
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            key={imageTitle}
            className="flex gap-1 items-center relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
          > <MdOutlineArrowOutward className="group-hover:text-orange-500" />
          See more</NavLink></div>
          <p className="text-medium">"{imageTitle}"</p>
                       </div>
          </div>
            </div>

          
      <ul className="w-full grid grid-cols-4 gap-2 tablet:grid-cols-8 laptop:grid-cols-16 animate-longFadeIn">
      {artProjects.map((project, index) => (
        <li key={index} className="list-none" onClick={() => chooseProject(project.images[0].url, project.title)}>
          <img src={project.images[0].thumbnail} alt={project.images[0].alt} className="aspect-[3/4] w-auto object-cover"/>
        </li>
      ))}
  
     </ul>
     </>
      )}

    </section>
  );
};
