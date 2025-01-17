import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Magnifier } from "../../components/Magnifier";
import artProjects from "../data/artProjects.json"

export const ArtProjects = () => {
  const {
    setArtPortfolioDisplay,
    setBgWhite,
    setFrontendPortfolioDisplay,
    setTitleAndVideoVisible,
    titleAndVideoVisible,
  } = useProjectsStore();
  const [ fadeOut, setFadeout ] = useState(false)
  const image1 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg";


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
    <section className="font-body font-medium animate-fadeIn h-full justify-between flex flex-col gap-10">
      {titleAndVideoVisible ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-screen h-screen object-cover invert z-10 ${fadeOut && "animate-fadeOut"}`}
          >
            <source
              src="https://res.cloudinary.com/dbf8xygxz/video/upload/v1728898269/Sequence_01_8_qeiugg.mp4"
              type="video/mp4"
            />
          </video>
          <img
            src="/art-portfolio.svg"
            className={`hidden laptop:block w-full tablet:w-10/12 laptop:w-1/2 mx-auto z-20 ${fadeOut && "animate-fadeOut"}`}
          />
          <img
            src="/art-portfolio-vertical.svg"
            className={`w-6/12 laptop:hidden mx-auto mt-10 z-20 ${fadeOut && "animate-fadeOut"}`}
          />
        </>
      ) : (
        <>
            <div className="flex flex-col items-end">
              <img src={image1} className="w-full tablet:w-2/3 laptop:w-1/4 aspect-[4/3] tablet:aspect-[3/4] object-cover" />
           {/*    <Magnifier
                url={image1}
                animation={"animate-smallSlideInRight"}
              /> */}
       {/*          <NavLink
            to={`/art/project/${projectEndpoint}`}
            aria-label={`Link to ${project.title}`}
          ></NavLink> */}
            </div>
          
      <ul className="w-full grid grid-cols-4 gap-2 tablet:grid-cols-8 laptop:grid-cols-16">
      {artProjects.map((project, index) => (
        <li key={index} className="list-none">
          <img src={project.images[0].url} alt={project.images[0].alt} className="aspect-[3/4] object-cover"/>
        </li>
      ))}
  
     </ul>
     </>
      )}

    </section>
  );
};
