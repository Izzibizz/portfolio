import { useState, useEffect, useRef } from "react";

export const Magnifier = ({ url, animation }) => {
  const [isLaptopWidth, setIsLaptopWidth] = useState(window.innerWidth > 1024);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false)
  const imageRef = useRef();

  const [magnifierStyle, setMagnifierStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
    backgroundPosition: "0% 0%",
  });

  const handleMouseMove = (e) => {
    if (!isLaptopWidth || !isVisible) return;
    const img = e.target;
    const imgPosition = img.getBoundingClientRect();
    const posX = e.pageX - imgPosition.left;
    const posY = e.pageY - imgPosition.top;
    const percX = (posX / imgPosition.width) * 105;
    const percY = (posY / imgPosition.height) * 105;

    if (isLaptopWidth && isVisible) {
      setMagnifierStyle({
        display: "block",
        top: posY - 75,
        left: posX - 75,
        backgroundPosition: `${percX}% ${percY}%`,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isLaptopWidth && isVisible ) {
      setMagnifierStyle({
        display: "none",
        top: 0,
        left: 0,
        backgroundPosition: "0% 0%",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const laptopWidth = window.innerWidth > 1024; // Change this value as needed
      setIsLaptopWidth(laptopWidth);

      // Hide magnifier if the screen is resized to a width that isn't laptop size
      if (!laptopWidth) {
        setMagnifierStyle((prev) => ({ ...prev, display: "none" }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true); 
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1, 
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className={`relative w-full tablet:w-1/4`}>
      <div
        className="absolute h-[500px] w-[500px] rounded-full pointer-events-none z-20"
        style={{
          display: isVisible ? magnifierStyle.display : "none",
          top: magnifierStyle.top,
          left: magnifierStyle.left,
          backgroundImage: `url(${url})`,
          backgroundSize: "1000%",
          backgroundPosition: magnifierStyle.backgroundPosition,
        }}
      ></div>
      <div
        className="w-full tablet:aspect-[3/4] h-auto "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={imageRef}
      >
        <img
          src={`${url}`}
          alt="magnified"
          className={`w-full h-full object-cover cursor-hollow  ${
            isVisible ? `${animation}` : "opacity-0"}
          `}
        />
      </div>
    </div>
  );
};
