import { useState, useEffect } from "react";
import { useProjectsStore } from "../stores/useProjectsStore";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

export const LandingPage = () => {
  const {
    setBgWhite,
    setArtPortfolioDisplay,
    setFrontendPortfolioDisplay,
    bgWhite,
    setTitleAndVideoVisible,
  } = useProjectsStore();
  const [zoom, setZoom] = useState(false);
  const [direction, setDirection] = useState("");

  const handleHover = (dir) => {
    setZoom(true); // Enable zoom on hover
    setDirection(dir);
    if (dir === "laptop:-translate-x-[90%]") {
     setBgWhite(true);
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
      setTitleAndVideoVisible(true);
    }
  };

  useEffect(() => {
    setBgWhite(false);
    setArtPortfolioDisplay(false);
    setFrontendPortfolioDisplay(false);
    setTitleAndVideoVisible(true);
  }, []);

  return (
    <section className="animate-fadeIn ">
      <Helmet>
        <title>Izabel Lind | Creative Frontend Developer & Digital Artist - portfolio website</title>
        <meta
          name="description"
          content={"portfolio for frontend development and artprojects by Izabel Lind"}
        />
      </Helmet>
      <video
        autoPlay
        loop
        muted
        playsInline
        alt="Izabel Lind Artist and Frontend Developer"
        className={`fixed top-1/2 left-1/2 w-screen h-screen object-cover transform 
          -translate-x-1/2 -translate-y-1/2 scale-110 transition-all duration-[1000ms] ease-in-out
          ${zoom ? `laptop:scale-[180%] ${direction}` : "scale-100 laptop:-translate-x-1/2"}
          transition-[filter, transform] 
          ${bgWhite && direction === "laptop:-translate-x-[90%]" ? "invert brightness-110" : "brightness-100"}`}
      >
        <source
          src="https://res.cloudinary.com/dbf8xygxz/video/upload/v1728898269/Sequence_01_8_qeiugg.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className={`w-full h-full absolute top-0 left-0 pt-10 tablet:pt-0 flex flex-col laptop:flex-row justify-center items-center gap-20 tablet:gap-72 laptop:gap-1/3 desktop:gap-[600px] ${
          direction === "laptop:-translate-x-[90%]"
            ? "text-black"
            : "text-white"
        } `}
      >
        <NavLink
          to="/frontend"
          aria-label={`Link to Izabel Lind frontend portfolio page`}
          onClick={() => choosePortfolio("frontend")}
        >
          <img
            src="/frontend-developer-w.svg"
            className={`relative cursor-hollow laptop:hover:scale-[160%] transform text-center transition-transform duration-500 font-heading text-lg p-4  h-[190px] tablet:h-[240px] ${bgWhite ? "invert" : ""}`}
            onMouseEnter={() => handleHover("laptop:-translate-x-[10%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
        <NavLink
          to="/art"
          aria-label={`Link to Izabel Lind art portfolio page`}
          onClick={() => choosePortfolio("art")}
        >
          <img
            src="artist-w.svg"
            className={`relative cursor-hollowDark laptop:hover:scale-[180%] transform transition-transform duration-500 font-heading text-lg p-4 h-[190px] tablet:h-[240px] ${bgWhite ? "invert" : ""}`}
            onMouseEnter={() => handleHover("laptop:-translate-x-[90%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
      </div>
    </section>
  );
};
