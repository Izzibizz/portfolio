import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore";
import devData from "../data/devData.json"
import { MovingBg } from "../../components/MovingBg"

export const FrontendProjects = () => {
  const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } =
    useProjectsStore();
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [showImage, setShowImage] = useState(false);


  useEffect(() => {
    setFrontendPortfolioDisplay(true);
    setArtPortfolioDisplay(false);
  }, []);

  useEffect(() => {
    if (hoveredProjectIndex !== null) {
      setShowImage(false); // Hide image to reset animation
      setTimeout(() => setShowImage(true), 0); // Re-show image to trigger animation
    }
  }, [hoveredProjectIndex]);

  console.log(devData[0].images[0].url)

  return (
    <section className="font-body font-medium text-white animate-fadeIn flex flex-col ">
      <MovingBg />
      <div className="flex flex-col gap-0 w-9/12 tablet:w-7/12 laptop:w-8/12 mx-auto mt-40 z-20">
        <img
          src="/frontend-developer-w.svg"
          className="w-[120px] tablet:w-[150px]"
        />
         <h2 className="text-2xl laptop:text-[50px] text-end mb-8 laptop:mb-10">Projects</h2>
        
        <div className="relative">
          {hoveredProjectIndex !== null && showImage && (
            <img
              src={devData[hoveredProjectIndex].images[0].url}
              alt={`Image of ${devData[hoveredProjectIndex].title}`}
              className="absolute w-1/2 rounded-xl hidden laptop:block animate-shortFadeIn animate-smallSlideUp"
            />
          )}
          </div>
          
          <ul className="flex flex-col laptop:w-5/12 laptop:self-end">
            {devData.map((project, index) => (
              <NavLink to={`/frontend/${project.title.replace(/\s+/g, '-').toLowerCase()}`} key={index}>
              <li
                className={`flex border-b justify-between pb-2 cursor-hollow ${index === 0 ? "pt-0" : "pt-10"} group`}
                onMouseEnter={() => setHoveredProjectIndex(index)}
                onMouseLeave={() => setHoveredProjectIndex(null)}
              >
                <h3 className="text-2xl cursor-hollow transition-transform transform origin-left group-hover:scale-125">{project.title}</h3>
                <p className="text-xs laptop:text-sm align-middle self-end cursor-hollow ">
                  {project.introduction}
                </p>
              </li>
              </NavLink>
            ))}
          </ul>
      </div>
    </section>
  );
};
