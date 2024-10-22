import { useState, useEffect } from "react";

export const Magnifier = ({ url, col, animation }) => {
  const [isLaptopWidth, setIsLaptopWidth] = useState(window.innerWidth > 1024);

  const [magnifierStyle, setMagnifierStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
    backgroundPosition: "0% 0%",
  });

  const handleMouseMove = (e) => {
    if (!isLaptopWidth) return;
    const img = e.target;
    const imgPosition = img.getBoundingClientRect();
    const posX = e.pageX - imgPosition.left;
    const posY = e.pageY - imgPosition.top;
    const percX = (posX / imgPosition.width) * 105;
    const percY = (posY / imgPosition.height) * 105;

    if (isLaptopWidth) {
      setMagnifierStyle({
        display: "block",
        top: posY - 75,
        left: posX - 75,
        backgroundPosition: `${percX}% ${percY}%`,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isLaptopWidth) {
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

  return (
    <div className={`relative w-full ${col}`}>
      <div
        className="absolute h-[500px] w-[500px] rounded-full pointer-events-none z-20"
        style={{
          display: magnifierStyle.display,
          top: magnifierStyle.top,
          left: magnifierStyle.left,
          backgroundImage: `url(${url})`,
          backgroundSize: "2000%",
          backgroundPosition: magnifierStyle.backgroundPosition,
        }}
      ></div>
      <div
        className="w-full h-auto "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`${url}`}
          alt="magnified"
          className={`w-full h-full object-cover cursor-hollow ${animation} `}
        />
      </div>
    </div>
  );
};
