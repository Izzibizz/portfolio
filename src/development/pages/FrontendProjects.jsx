import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useProjectsStore } from "../../stores/useProjectsStore";
import devData from "../data/devData.json";
import bgImage from "/bg-image-portfolio-izabel-lind.jpg"
import { MovingBg } from "../../components/MovingBg";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export const FrontendProjects = () => {
  const { setFrontendPortfolioDisplay, setArtPortfolioDisplay, setBgWhite } =
    useProjectsStore();
  const [hoveredProjectTitle, setHoveredProjectTitle] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showOlder, setShowOlder] = useState(false);
  const latestProjects = devData.slice(0, 5);
  const olderProjects = devData.slice(5);
  const [projectsToShow, setProjectsToShow] = useState(latestProjects);
  const [isLaptop, setIsLaptop] = useState(false);

  const handleShowOther = () => {
    window.scrollTo(0, 0);
    setShowOlder(!showOlder);
    if (showOlder) {
      setProjectsToShow(latestProjects);
    } else {
      setProjectsToShow(olderProjects);
    }
  };

  useEffect(() => {
    setFrontendPortfolioDisplay(true);
    setBgWhite(false)
    setArtPortfolioDisplay(false);
  }, []);

  useEffect(() => {
    if (hoveredProjectTitle !== null) {
      setShowImage(false);
      setTimeout(() => setShowImage(true), 0);
    }
  }, [hoveredProjectTitle]);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <section className="font-body font-medium text-white flex flex-col ">
       {isLaptop ? (
        <MovingBg />
      ) : (    <img
        src={bgImage}
        alt="background image"
        className="absolute w-full max-w-full top-0 z-0 h-full max-h-full object-cover"
      /> )}
      <div className="flex flex-col gap-0 w-9/12 tablet:w-7/12 laptop:w-8/12 mx-auto mt-20 z-20">
        <img
          src="/frontend-developer-w.svg"
          className="w-[auto] h-[100px] laptop:h-[150px] self-start animate-fadeIn"
          alt="Frontend Developer"
          style={{ objectFit: "contain" }}
        />
        <h2 className="text-lg laptop:text-[40px] text-end mb-8 laptop:mb-10 animate-fadeIn">
          Projects
        </h2>

        <div className="relative">
          {hoveredProjectTitle !== null && showImage && (
            <img
              src={
                devData.find((project) => project.title === hoveredProjectTitle)
                  .images[0].url
              }
              alt={`Image of ${hoveredProjectTitle}`}
              className="absolute w-1/2 rounded-xl hidden laptop:block animate-shortFadeIn animate-smallSlideUp"
            />
          )}
        </div>

        <ul className="flex flex-col laptop:w-5/12 laptop:self-end animate-longFadeIn">
          {projectsToShow.map((project, index) => (
            <NavLink
              to={`/frontend/${project.title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              key={project.title}
            >
              <li
                className={`flex border-b justify-between pb-2 laptop:cursor-hollow group ${
                  index === 0 ? "pt-0" : "pt-10"
                } animate-mediumSlideIn transform transition-transform`}
                style={{
                  opacity: 0,
                  animationDelay: `${(index + 1) * 200}ms`
                }}
                onMouseEnter={() => setHoveredProjectTitle(project.title)} // Set hovered title
                onMouseLeave={() => setHoveredProjectTitle(null)}
              >
                <h3 className="text-xl laptop:text-2xl laptop:cursor-hollow transition-transform transform origin-left laptop:group-hover:scale-125">
                  {project.title}
                </h3>
                <p
                  className={`text-[10px] laptop:text-sm align-middle self-end justify-between laptop:cursor-hollow italic gap-1 flex`}
                >
                  {project.introduction.split(" ").map((word, index) => {
                    if (word.toLowerCase() === "fullstack") {
                      return (
                        <span key={index} className="text-orange-400">
                          {" "}
                          {/* Add any style here */}
                          {word}
                        </span>
                      );
                    }
                    return `${word} `;
                  })}
                </p>
              </li>
            </NavLink>
          ))}
          <button
            onClick={handleShowOther}
            className="mt-4 text-gray-400 laptop:hover:scale-105 laptop:cursor-hollow flex items-center gap-2 self-end group animate-longFadeIn"
          >
            {showOlder ? (
              <>
                New Projects <SlArrowUp className="laptop:group-hover:animate-bounceUpDown"/> 
              </>
            ) : (
              <>Older Projects <SlArrowDown className="laptop:group-hover:animate-bounceUpDown" />
              </>
            )}
          </button>
        </ul>
      </div>
    </section>
  );
};
