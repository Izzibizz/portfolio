import { useState } from "react";

export const Magnifier = ({url}) => {
  const [magnifierStyle, setMagnifierStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
    backgroundPosition: "0% 0%",
  });

  const handleMouseMove = (e) => {
    const img = e.target;
    const imgPosition = img.getBoundingClientRect();
    const posX = e.pageX - imgPosition.left;
    const posY = e.pageY - imgPosition.top;
    const percX = (posX / imgPosition.width) * 100;
    const percY = (posY / imgPosition.height) * 100;

    setMagnifierStyle({
      display: "block",
      top: posY,
      left: posX,
      backgroundPosition: `${percX}% ${percY}%`,
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({
      display: "none",
      top: 0,
      left: 0,
      backgroundPosition: "0% 0%",
    });
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <div
        className="absolute h-[300px] w-[300px] rounded-full pointer-events-none"
        style={{
          display: magnifierStyle.display,
          top: magnifierStyle.top,
          left: magnifierStyle.left,
          backgroundImage:
            `url(${url})`,
          backgroundSize: "2000%",
          backgroundPosition: magnifierStyle.backgroundPosition,
        }}
      ></div>
      <div
        className="max-w-screen h-auto overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`${url}`}
          alt="magnified"
          className="w-full h-full object-cover cursor-hollow"
        />
      </div>
    </div>
  );
};

