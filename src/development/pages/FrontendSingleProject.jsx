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

// Import required modules for Swiper
import { FreeMode, Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

export const FrontendSingleProject = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()
    const { id } = useParams();
    const [ project, setProject ] = useState([])

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
        <div className="flex flex-col gap-0 w-9/12 tablet:w-7/12 laptop:w-8/12 mx-auto mt-40 z-20">
          {project.images && project.images.length > 0 && (
            <>
              <h2>{project.title}</h2>
              {/* <img src={project.images[0].url} alt={project.title} className="laptop:w-1/2" /> */}
             
              <Swiper
                key={project.title} 
                slidesPerView={1}
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
                effect="fade"
                modules={[Navigation, Pagination, A11y, Autoplay]}
                className="w-1/2 h-auto"
              >
                {project.images.map((file, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={file.url}
                      alt={file.alt}
                      className="w-full h-full object-cover cursor-pointer rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </section>
    );
  };