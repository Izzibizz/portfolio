import { useState, useEffect } from "react";
import { useProjectsStore } from "../stores/useProjectsStore";
import { NavLink } from "react-router-dom";

export const LandingPage = () => {
  const {
    setBgWhite,
    setArtPortfolioDisplay,
    setFrontendPortfolioDisplay,
    bgWhite,
    setTitleAndVideoVisible
  } = useProjectsStore();
  const [zoom, setZoom] = useState(false);
  const [direction, setDirection] = useState("");

  const handleHover = (dir) => {
    setZoom(true); // Enable zoom on hover
    setDirection(dir);
    if (dir === "-translate-x-[90%]") {
      setTimeout(() => setBgWhite(true), 100);
    }
  };

  const handleHoverOut = () => {
    setZoom(false); // Disable zoom when hover ends
    setDirection("");
    setBgWhite(false);
  };

  const choosePortfolio = (choice) => {
    if (choice === "frontend") {
      setFrontendPortfolioDisplay(true);
      setArtPortfolioDisplay(false);
    } else if (choice === "art") {
      setArtPortfolioDisplay(true);
      setFrontendPortfolioDisplay(false);
      setTitleAndVideoVisible(true)
    }
  };

  useEffect(() => {
    setBgWhite(false);
    setArtPortfolioDisplay(false);
    setFrontendPortfolioDisplay(false);
    setTitleAndVideoVisible(true)
  }, []);

  return (
    <section className="animate-fadeIn ">
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`fixed top-1/2 left-1/2 w-screen h-screen object-cover transform -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-500 ${
          zoom ? `scale-[200%] ${direction} ` : "scale-100 -translate-x-1/2"
        } ${
          bgWhite && direction === "-translate-x-[90%]"
            ? "invert transition-all duration-1000 fadeIn"
            : ""
        }`}
      >
        <source
          src="https://res.cloudinary.com/dbf8xygxz/video/upload/v1728898269/Sequence_01_8_qeiugg.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className={`w-full h-full absolute top-0 left-0 pt-10 tablet:pt-0 flex flex-col laptop:flex-row justify-center items-center gap-20 tablet:gap-72 laptop:gap-[700px] ${
          direction === "-translate-x-[90%]" ? "text-black" : "text-white"
        } `}
      >
        <NavLink
          to="/frontend"
          aria-label={`Link to frontend portfolio page`}
          onClick={() => choosePortfolio("frontend")}
        >
          <img
            src={
              bgWhite ? "/frontend-developer.svg" : "/frontend-developer-w.svg"
            }
            className={`relative cursor-hollow hover:scale-[220%] transform text-center transition-transform duration-500 font-heading text-lg p-4  w-[250px] tablet:w-[300px]`}
            onMouseEnter={() => handleHover("-translate-x-[10%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
        <NavLink
          to="/art"
          aria-label={`Link to art portfolio page`}
          onClick={() => choosePortfolio("art")}
        >
          <img
            src={bgWhite ? "/artist.svg" : "/artist-w.svg"}
            className={`relative cursor-hollowDark hover:scale-[270%] transform transition-transform duration-500 font-heading text-lg p-4 w-[200px] tablet:w-[250px]`}
            onMouseEnter={() => handleHover("-translate-x-[90%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
      </div>
    </section>
  );
};
