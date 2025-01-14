import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Swiper, SwiperSlide } from "swiper/react";
import devData from "../data/devData.json";
import { MovingBg } from "../../components/MovingBg";
import { ImageModal } from "../../components/ImageModal";
import projectHeading from "/project.svg";
import { SlArrowLeft } from "react-icons/sl";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaNodeJs } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
/* import { NotFound } from "./NotFound"; */

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
  const [project, setProject] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const [imageAlt, setImageAlt] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techHovered, setTechHovered] = useState(null);

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
      setProject(null); // Or handle the case where project is not found
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  console.log(project.images);

  return (
    <section className="font-body font-medium text-white  flex flex-col">
      <MovingBg />
      <div className="flex flex-col w-10/12 laptop:w-9/12 mx-auto mt-32 z-20">
        <NavLink to={`/frontend`}>
          <SlArrowLeft className="cursor-hollow pl-2 w-6 h-6 laptop:w-8 laptop:h-6 absolute z-20 top-40 laptop:top-52 laptop:left-20 hover:scale-125" />{" "}
        </NavLink>
        {project.images && project.images.length > 0 && (
          <>
            <img src={projectHeading} className="h-[50px] w-auto self-end animate-longFadeIn" />
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
                  className="rounded-xl cursor-hollow"
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
                    delay: 4000,
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
                          src={file.url}
                          alt={file.alt}
                          className="w-full h-full object-cover cursor-hollow rounded laptop:rounded-xl "
                        />
                        <div
                          className="absolute rounded laptop:rounded-xl max-w-full max-h-full inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
                          onClick={() => handlePreviewClick(file.url, file.alt)}
                          onTouchStart={() => handlePreviewClick(file.url, file.alt)}
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
