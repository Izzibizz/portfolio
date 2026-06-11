import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useProjectsStore } from "../../stores/useProjectsStore";
import artProjects from "../data/artProjects.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const ArtProjects = () => {
  const {
    setArtPortfolioDisplay,
    setBgWhite,
    setFrontendPortfolioDisplay,
    setTitleAndVideoVisible,
  } = useProjectsStore();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const createProjectSlug = (title) => title.replace(/\s+/g, "-").toLowerCase();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <section className="font-body font-medium animate-fadeIn min-h-screen w-11/12 mx-auto flex flex-col gap-10 mb-10 laptop:mb-0 pb-28 laptop:pb-28 relative">
      <Helmet>
        <title>Art Projects by Izabel Lind</title>
        <meta
          name="description"
          content={
            "Overview of artprojects by Izabel Lind - konstnär - skulptör och målare"
          }
        />
      </Helmet>

      <div className="flex-1">
        {/* Mobile: keep grid layout */}
        <ul className="w-full grid grid-cols-1 gap-6 laptop:hidden animate-longFadeIn">
          {artProjects.map((project, index) => (
            <li
              key={index}
              className="list-none flex flex-col gap-1 cursor-pointer"
              onClick={() =>
                navigate(`/art/${createProjectSlug(project.title)}`)
              }
            >
              <p>{project.title} </p>
              <img
                src={project.images[0].thumbnail}
                alt={project.images[0].alt}
                className="w-full object-cover object-bottom"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Laptop and up: Swiper fixed to bottom */}
      {!isMobile && (
        <div className="fixed laptop:bottom-0 laptop:left-0 laptop:right-0 laptop:z-40 ml-6">
          <Swiper
            slidesPerView={7}
            spaceBetween={20}
            grabCursor={true}
            speed={1200}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="h-[800px]"
          >
            {artProjects.map((project, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col justify-end h-full"
              >
                <p className="mb-2">{project.title}</p>

                <NavLink
                  to={`/art/${createProjectSlug(project.title)}`}
                  className="flex items-end"
                >
                  <img
                    src={project.images[0].thumbnail}
                    alt={project.images[0].alt}
                    className="w-full h-auto object-contain"
                  />
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};
