import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovingBg } from "../../components/MovingBg";
import { ImageModal } from "../../components/ImageModal";
import { SlArrowLeft } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaNodeJs } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import devData from "../data/devData.json";
import bgImage from "/bg-image-portfolio-izabel-lind.jpg";
import projectHeading from "/project.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/controller";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";

// Import required modules for Swiper
import { Autoplay } from "swiper/modules";

export const FrontendSingleProject = () => {
  const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } =
    useProjectsStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  const [imageAlt, setImageAlt] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techHovered, setTechHovered] = useState(null);
  const [isLaptop, setIsLaptop] = useState(false);

  const technologyIcons = {
    "Node.js": <FaNodeJs />,
    "Express.js": <FaJs />,
    MongoDB: <SiMongodb />,
    React: <FaReact />,
    Javascript: <IoLogoJavascript />,
  };

  const handlePreviewClick = (src, alt) => {
    setImageSrc(src);
    setImageAlt(alt);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFrontendPortfolioDisplay(true);
    setArtPortfolioDisplay(false);
  }, []);

  useEffect(() => {
    if (!id) return;

    const currentProjectIndex = devData.findIndex((project) => {
      const projectEndpoint = project.title.replace(/\s+/g, "-").toLowerCase();
      return projectEndpoint === id;
    });

    if (currentProjectIndex !== -1) {
      setProject(devData[currentProjectIndex]);
      setImageSrc(devData[currentProjectIndex].images[0].url);
      setImageAlt(devData[currentProjectIndex].images[0].alt);
    } else {
      console.error("Project not found");
      setProject(null);
      navigate("/404", { replace: true });
    }
  }, [id]);

  useEffect(() => {
    if (project?.images?.length) {
      project.images.forEach((image) => {
        const preloadImage = new Image();
        preloadImage.src = image.url;
      });
    }
  }, [project]);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }



  return (
    <section className="font-body font-medium text-white  flex flex-col">
      <Helmet>
        <title>
          {project?.title
            ? `${project.title} - Frontend Project`
            : "Frontend Project"}
        </title>
        <meta
          name="description"
          content={
            project?.title
              ? ` ${
                  project.title
                }, a frontend project by Izabel Lind built using ${project.tags.join(
                  ", "
                )}.`
              : "Discover frontend project by Izabel Lind."
          }
        />
      </Helmet>
      {isLaptop ? (
        <MovingBg />
      ) : (
        <img
          src={bgImage}
          alt="background image"
          className="absolute w-full max-w-full top-0 z-0 h-full max-h-full object-cover"
        />
      )}
      <div className="flex flex-col w-10/12 laptop:w-9/12 mx-auto pt-6 z-20">
        <NavLink to={`/frontend`} aria-label="Go to Frontend section">
          <SlArrowLeft className="cursor-hollow pl-2 w-6 h-6 laptop:w-8 laptop:h-6 absolute z-20 top-40 laptop:top-52 laptop:left-20 hover:scale-125" />{" "}
        </NavLink>
        {project.images && project.images.length > 0 && (
          <>
            <img
              src={projectHeading}
              className="h-[50px] w-auto self-end animate-longFadeIn"
              alt="Project"
            />
            <a
              href={project.netlify}
              target="_blank"
              className="self-end w-fit text-2xl laptop:text-3xl tracking-wider cursor-hollow animate-longFadeIn"
            >
              {project.title}
            </a>
            <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-10">
              <div className="laptop:w-8/12 desktop:w-7/12 flex flex-col mt-6 laptop:mt-0 animate-smallSlideUp laptop:animate-smallSlideIn">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="rounded-xl cursor-hollow aspect-[18/9]"
                  onClick={() => handleOpenModal()}
                />

                <Swiper
                  key={project.title}
                  slidesPerView={4}
                  spaceBetween={20}
                  speed={1200}
                  loop
                  zoom
                  updateOnWindowResize
                  scrollbar={{ draggable: true }}
                  autoplay={{
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      spaceBetween: 10,
                    },
                    768: {
                      spaceBetween: 15,
                    },
                    1024: {
                      spaceBetween: 20,
                    },
                    1280: {
                      spaceBetween: 25,
                    },
                  }}
                  effect="fade"
                  modules={[Autoplay]}
                  className="w-full my-4 h-auto"
                >
                  {project.images.map((file, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative group">
                        <img
                          src={file.thumbnail}
                          alt={file.alt}
                          className="w-full h-full  object-cover cursor-hollow rounded laptop:rounded-xl "
                        />
                        <div
                          className="absolute rounded laptop:rounded-xl max-w-full max-h-full inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
                          onClick={() => handlePreviewClick(file.url, file.alt)}
                          onTouchStart={() =>
                            handlePreviewClick(file.url, file.alt)
                          }
                        ></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex flex-col laptop:flex-col gap-6 laptop:mt-10 laptop:items-end animate-longFadeIn">
                <div className="grid grid-cols-2 w-full desktop:w-2/3 h-fit p-4 gap-y-4 bg-black bg-opacity-[30%] rounded-xl">
                  Category{" "}
                  <ul>
                    {project.category.map((object, index) => (
                      <li key={index}>{object}</li>
                    ))}
                  </ul>
                  <p>Genre</p> {project.genre}
                  <p>Year</p> {project.year}
                  <p>View project</p>
                  <div className=" flex flex-col gap-2 ">
                    <a
                      href={project.netlify}
                      target="_blank"
                      alt="website link"
                      className="h-[20px] cursor-hollow rounded-xl bg-grey flex gap-1 items-center transform translate-transform hover:scale-110 origin-left group"
                    >
                      <MdOutlineArrowOutward className="group-hover:text-orange-500" />
                      Website
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      alt="button for viewing site"
                      className=" h-[20px] cursor-hollow flex gap-1 items-center transform translate-transform hover:scale-110 origin-left group"
                    >
                      <MdOutlineArrowOutward className="group-hover:text-orange-500" />{" "}
                      Github
                    </a>
                  </div>
                </div>
                <div
                  className={`grid ${
                    project.tags.length > 6 ? "grid-cols-3" : "grid-cols-2"
                  } w-full desktop:w-2/3 h-fit p-4 gap-10 bg-black bg-opacity-[30%] rounded-xl`}
                >
                  Tech
                  <ul className="col-span-2 grid grid-cols-2 w-full gap-x-10">
                    {project.tags.map((tech, index) => (
                      <li
                        key={index}
                        className="flex gap-1 items-center"
                        onMouseEnter={() => setTechHovered(tech)}
                        onMouseLeave={() => setTechHovered(null)}
                      >
                        {tech}
                        {techHovered === tech && (
                          <span className="">{technologyIcons[tech]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-justify laptop:w-11/12 tablet:block mb-28">
                  {project.description}
                  {project.link?.length > 0 && (
                    <a
                      href={project.link}
                      target="_blank"
                      alt="website link"
                      className="ml-2 hover:underline flex cursor-hollow py-4 flex gap-1 items-center"
                    >
                      <MdOutlineArrowOutward /> Elin Bradway (UX-designer)
                    </a>
                  )}
                </p>
              </div>
            </div>
            {isModalOpen && (
              <ImageModal
                src={imageSrc}
                alt={imageAlt}
                onClose={handleCloseModal}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
