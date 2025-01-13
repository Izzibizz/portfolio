import { useEffect, useState } from "react" 
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore"
import { Swiper, SwiperSlide } from "swiper/react";
import devData from "../data/devData.json"
import { MovingBg } from "../../components/MovingBg"
import { ImageModal } from "../../components/ImageModal"
import projectHeading from "/project.svg"
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
import { FreeMode, Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

export const FrontendSingleProject = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()
    const { id } = useParams();
    const [ project, setProject ] = useState([])
    const [ imageSrc, setImageSrc ] = useState()
    const [ imageAlt, setImageAlt ] = useState()
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ techHovered, setTechHovered] = useState(null);

    const technologyIcons = {
      "Node.js": <FaNodeJs />,
      "Express.js": <FaJs />,
      "MongoDB": <SiMongodb />,
      "React": <FaReact />,
      "Javascript": <IoLogoJavascript />,
    };

    const handlePreviewClick = (src, alt) => {
      setImageSrc(src);
      setImageAlt(alt);
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    }

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

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
      setImageSrc(devData[currentProjectIndex].images[0].url)
      setImageAlt(devData[currentProjectIndex].images[0].alt)
    } else {
      console.error("Project not found");
      setProject(null); // Or handle the case where project is not found
    }
  }, [id]);

  

    console.log(isModalOpen, imageSrc)
    console.log(id)

    if (!project) {
      return <div>Loading...</div>;
    }
  
    return (
      <section className="font-body font-medium text-white animate-fadeIn flex flex-col">
       <MovingBg />
        <div className="flex flex-col w-10/12 laptop:w-9/12 mx-auto mt-40 z-20">
        <NavLink
            to={`/frontend`}
          >
            <SlArrowLeft className="cursor-hollow pl-2 w-6 h-6 laptop:w-8 laptop:h-6 absolute z-20 top-52 laptop:left-20 hover:scale-125" />{" "}
          </NavLink>
          {project.images && project.images.length > 0 && (
            <>
              <img src={projectHeading} className="w-[55px] self-end"/>
              <a href={project.netlify} target="_blank" className="text-end text-2xl laptop:text-3xl tracking-wider cursor-hollow">{project.title}</a>
              <div className="flex flex-col laptop:flex-row gap-4 laptop:gap-10">
              <div className="laptop:w-8/12 desktop:w-7/12 flex flex-col mt-6 laptop:mt-0 animate-smallSlideIn"> 
              <img src={ imageSrc } alt={ imageAlt } className="rounded-xl cursor-hollow"  onClick={() =>
                        handleOpenModal()
                      } /> 
             
              <Swiper
                key={project.title} 
                slidesPerView={4}
                spaceBetween={20}
                speed={1200}
                loop
                zoom
                updateOnWindowResize
                freeMode={true}
                scrollbar={{ draggable: true }}
                autoplay={{
                  delay: 3000, // Delay in ms
                  disableOnInteraction: false, // Continue autoplay after user interactions
                }}
                breakpoints={{
                  // Small screens
                  320: {
                    spaceBetween: 10,
                  },
                  // Medium screens
                  768: {
                    spaceBetween: 15,
                  },
                  // Large screens
                  1024: {
                    spaceBetween: 20,
                  },
                  // Extra large screens
                  1280: {
                    spaceBetween: 25,
                  }}}
                effect="fade"
                modules={[Navigation, Pagination, A11y, Autoplay, FreeMode]}
                className="w-full my-4 h-auto"
              >
                {project.images.map((file, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={file.url}
                      alt={file.alt}
                      className="w-full h-full object-cover cursor-pointer rounded laptop:rounded-xl"
                      onClick={() =>
                        handlePreviewClick(file.url, file.alt)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
              <div className="flex flex-col laptop:flex-col gap-6 laptop:mt-10 laptop:items-end">
              <div className="grid grid-cols-2 w-full desktop:w-2/3 h-fit p-4 gap-y-4 bg-black bg-opacity-[30%] rounded-xl">Category <ul>{project.category.map((object, index)=> (
                <li key={index}>{object}</li>
              ))}</ul>
              <p>Genre</p> {project.genre}
              <p>Year</p> {project.year}
              <p>View project</p>
              <div className=" flex flex-col gap-2 ">
                <a href={project.netlify} target="_blank" alt="website link" className="h-[20px] cursor-hollow rounded-xl bg-grey flex gap-1 items-center transform translate-transform hover:scale-110 origin-left group"><MdOutlineArrowOutward  className="group-hover:text-orange-500" />Website</a>
                <a href={project.github} target="_blank" alt="button for viewing site" className=" h-[20px] cursor-hollow flex gap-1 items-center transform translate-transform hover:scale-110 origin-left group"><MdOutlineArrowOutward className="group-hover:text-orange-500"/> Github</a>
                </div>
                </div>
                <div className="grid grid-cols-2 w-full desktop:w-2/3 h-fit p-4 gap-y-4 bg-black bg-opacity-[30%] rounded-xl">Technologies<ul className="">{project.used.map((tech, index)=> (
                <li key={index} className="flex gap-1 items-center" onMouseEnter={() => setTechHovered(tech)}
                onMouseLeave={() => setTechHovered(null)}>{tech}
                 {techHovered === tech && (
            <span className="">{technologyIcons[tech]}</span>
          )}
          </li>
              ))}</ul></div>
                <p className="text-justify laptop:w-11/12 tablet:block mb-28">
                  {project.description}
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