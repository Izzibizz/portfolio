

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/navigation';
import '../../custom-swiper.css'
import 'swiper/css/effect-fade';
import 'swiper/css/grid';
import { Autoplay, Navigation, Pagination, Grid } from 'swiper/modules';


export const SwiperComponent = ({projects}) => {
  return (
    <Swiper
    spaceBetween={10}
    navigation
    loop
    speed={1200}
    breakpoints={{
      320: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 12,
      },
      1024: {
        slidesPerView: 16,
      }
    }}
    scrollbar={{ draggable: true }}
    updateOnWindowResize
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    
    effect="fade"
    modules={[Navigation, Pagination, Autoplay, Grid]}
  >
    {projects.map((project, index) => {
      const projectEndpoint = project.title
        .replaceAll('/', '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      return (
        <SwiperSlide key={index} className="hover:scale-105 pt-6 ">
        
            <img
              src={project.images[0].url}
              alt={project.title}
              className="object-cover aspect-[3/4] "
            />
        </SwiperSlide>
      );
    })}
  </Swiper>
  )
}

