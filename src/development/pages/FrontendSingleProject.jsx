import { useEffect, useState } from "react" 
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { useProjectsStore } from "../../stores/useProjectsStore"
import { Swiper, SwiperSlide } from "swiper/react";
import devData from "../data/devData.json"
import { MovingBg } from "../../components/MovingBg"
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
    const [ imageIsClicked, setImageIsClicked ] = useState(false)

    const handleImageClick = (src, alt) => {
      setImageSrc(src);
      setImageAlt(alt);
      setImageIsClicked(true)
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
        <div className="flex flex-col gap-0 w-9/12 tablet:w-7/12 laptop:w-9/12 mx-auto mt-40 z-20">
          {project.images && project.images.length > 0 && (
            <>
              <h2>{project.title}</h2>
              <div className="laptop:w-8/12 flex flex-col"> 
              <img src={ imageIsClicked? imageSrc : project.images[0].url} alt={ imageIsClicked? imageAlt : project.alt} className="rounded-xl" /> 
             
              <Swiper
                key={project.title} 
                slidesPerView={4}
                spaceBetween={20}
                speed={1200}
                loop
                zoom
                updateOnWindowResize
                FreeMode={true}
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
                modules={[Navigation, Pagination, A11y, Autoplay]}
                className="w-full my-4 h-auto"
              >
                {project.images.map((file, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={file.url}
                      alt={file.alt}
                      className="w-full h-full object-cover cursor-pointer rounded laptop:rounded-xl"
                      onClick={() =>
                        handleImageClick(file.url, file.alt)
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
            </>
          )}
        </div>
      </section>
    );
  };