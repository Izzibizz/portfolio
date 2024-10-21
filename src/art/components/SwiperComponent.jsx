import { NavLink } from "react-router-dom"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/navigation';
import '../../custom-swiper.css'
import 'swiper/css/effect-fade';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';


export const SwiperComponent = ({projects}) => {
  return (
    <Swiper
    spaceBetween={30}
    slidesPerView={1}
    navigation
    loop
    speed={1200}
    scrollbar={{ draggable: true }}
    updateOnWindowResize
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    effect="fade"
    modules={[Navigation, Pagination, A11y, Autoplay]}
  >
    {projects.map((project, index) => {
      const projectEndpoint = project.title
        .replaceAll('/', '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      return (
        <SwiperSlide key={index} className="hover:scale-105 py-6 ">
          <NavLink
            to={`/art/project/${projectEndpoint}`}
            aria-label={`Link to ${project.title}`}
          >
            <img
              src={project.images[0].url}
              alt={project.title}
              className="aspect-square object-cover rounded-xl"
            />
            <div className="font-heading text-xs pt-2">
              <p>{project.title}</p>
              <p>{project.year}</p>
            </div>
          </NavLink>
        </SwiperSlide>
      );
    })}
  </Swiper>
  )
}

