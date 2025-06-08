import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Magnifier } from "../../components/Magnifier";
import artProjects from "../data/artProjects.json";
import { MdOutlineArrowOutward } from "react-icons/md";

export const ArtProjects = () => {
  const {
    setArtPortfolioDisplay,
    setBgWhite,
    setFrontendPortfolioDisplay,
    setTitleAndVideoVisible,
  } = useProjectsStore();

  const [clickedImage, setClickedImage] = useState(
    artProjects[0].images[0].url
  );
  const [imageTitle, setImageTitle] = useState(artProjects[0].title);

  const chooseProject = (url, title) => {
    window.scrollTo(0, 0);
    setClickedImage(url);
    setImageTitle(title);
  };

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
    setTimeout(() => {
      setTitleAndVideoVisible(false);
    }, 2000);
  }, []);

  useEffect(() => {
    artProjects.forEach((project) => {
      if (project.images.length > 0) {
        const preloadImage = new Image();
        preloadImage.src = project.images[0].url;
      }
    });
  }, []);

  return (
    <section className="font-body font-medium animate-fadeIn h-full w-11/12 laptop:w-[99%] mx-auto justify-between flex flex-col gap-10 mb-10 laptop:mb-0">
      <Helmet>
        <title>Art Projects by Izabel Lind</title>
        <meta
          name="description"
          content={"Overview of artprojects by Izabel Lind"}
        />
      </Helmet>

      <>
        <div className="flex flex-col tablet:flex-row justify-between">
          <div className="flex flex-col self-end px-4">
            <img
              src="https://res.cloudinary.com/dlp85vjwx/image/upload/v1745309108/projects-black_lqo9x7.svg"
              alt="art projects Izabel Lind"
              className="animate-fadeIn h-[80px] laptop:h-[150px]"
            />
          </div>
          <div className=" tablet:w-2/3 laptop:w-[45%] animate-smallSlideInRight">
            <NavLink
              to={`/art/${imageTitle.replace(/\s+/g, "-").toLowerCase()}`}
              key={imageTitle}
            >
              <Magnifier url={clickedImage} />
            </NavLink>

            <div className=" flex justify-between">
              <div className="group">
                <NavLink
                  to={`/art/${imageTitle.replace(/\s+/g, "-").toLowerCase()}`}
                  aria-label={`Go to ${imageTitle}`}
                  key={imageTitle}
                  className="flex gap-1 items-center relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
                >
                  {" "}
                  <MdOutlineArrowOutward className="group-hover:text-orange-500" />
                  See more
                </NavLink>
              </div>
              <p className="text-medium italic mr-1">{imageTitle}</p>
            </div>
          </div>
        </div>

        <ul className="w-full grid grid-cols-4 gap-2 tablet:grid-cols-8 laptop:grid-cols-16 animate-longFadeIn">
          {artProjects.map((project, index) => (
            <li
              key={index}
              className="list-none"
              onClick={() =>
                chooseProject(
                  project.images[0].horizontal
                    ? project.images[0].horizontal
                    : project.images[0].url,
                  project.title
                )
              }
            >
              <img
                src={project.images[0].thumbnail}
                alt={project.images[0].alt}
                className="aspect-[3/4] w-auto object-cover"
              />
            </li>
          ))}
        </ul>
      </>
    </section>
  );
};
