import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const ImageModalSlider = ({ images, startIndex, onClose }) => {
  const modalRef = useRef(null);

  // Stäng om man klickar utanför (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  console.log(images, startIndex);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Swiper
        modules={[A11y]}
        ref={modalRef}
        initialSlide={startIndex}
        spaceBetween={20}
        loop={true}
        className="max-w-[90vw] max-h-[90vh]"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index} className="flex flex-col">
            <div className="flex flex-col items-start mx-auto">
              <img
                src={img.url}
                alt={img.alt}
                className="object-contain max-h-[80vh] w-auto cursor-pointer select-none"
                onClick={() => {
                  if (window.innerWidth > 768) {
                    onClose();
                  }
                }}
              />
              <p className="text-white font-medium mt-3 text-left break-words max-w-full">
                {img.alt}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
