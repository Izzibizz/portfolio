import { useState, useEffect } from "react";
import { useProjectsStore } from "../stores/useProjectsStore";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate  } from "react-router-dom";

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
  const [clickedChoice, setClickedChoice] = useState("");
  const navigate = useNavigate()

  const handleHover = (dir) => {
    setZoom(true); // Enable zoom on hover
    setDirection(dir);
    if (dir === "-translate-x-[90%]") {
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
    setDirection("")
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
          ${zoom ? 
            (window.innerWidth < 768 ? `scale-[300%] ${direction}` : `scale-[180%] ${direction}`) 
            : "scale-100 -translate-x-1/2"} 
          transition-[filter, transform] 
          ${bgWhite  ? "invert brightness-110" : "brightness-100"}`}
      >
        <source
          src="https://res.cloudinary.com/dlp85vjwx/video/upload/v1745309420/bakgrund-video_luy2lt_bloxsy.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className={`w-full h-full absolute top-0 left-0 pt-10 tablet:pt-0 flex flex-col laptop:flex-row justify-center items-center gap-20 tablet:gap-72 laptop:gap-1/3 desktop:gap-[600px] ${
          direction === "-translate-x-[90%]"
            ? "text-black"
            : "text-white"
        } `}
      >
        <NavLink
          to="/frontend"
          aria-label={`Link to Izabel Lind frontend portfolio page`}
          onClick={(e) => {
            const isMobile = window.innerWidth < 1024;
          
            if (isMobile) {
              e.preventDefault();
              setZoom(true);
              setDirection("-translate-x-[10%] -translate-y-[150%]");
              setClickedChoice("frontend");
          
              setTimeout(() => {
                choosePortfolio("frontend");
                navigate("/frontend");
              }, 500);
            } else {
              choosePortfolio("frontend");
            }
          }}
        >
          <img
            src="/frontend-developer-w.svg"
            className={`relative cursor-hollow laptop:hover:scale-[160%] transform text-center transition-transform duration-500 font-heading text-lg p-4  h-[190px] tablet:h-[240px] ${bgWhite ? "invert" : ""} ${clickedChoice === "frontend" ? "scale-[5000%] duration-[1600ms]" : clickedChoice === "art" ? "opacity-0" : ""}`}
            onMouseEnter={() => handleHover("laptop:-translate-x-[10%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
        <NavLink
          to="/art"
          aria-label={`Link to Izabel Lind art portfolio page`}
          onClick={(e) => {
            const isMobile = window.innerWidth < 1024;
          
            if (isMobile) {
              e.preventDefault();
              setZoom(true);
              setDirection("-translate-x-[10%] -translate-y-[150%]");
              setClickedChoice("art");
          
              setTimeout(() => {
                choosePortfolio("art");
                navigate("/art");
              }, 500);
            } else {
              choosePortfolio("art");
            }
          }}
        >
          <img
            src="artist-w.svg"
            className={`relative cursor-hollowDark laptop:hover:scale-[180%] transform transition-transform duration-500 font-heading text-lg p-4 h-[190px] tablet:h-[240px] ${bgWhite ? "invert" : ""} ${clickedChoice === "art" ? "scale-[5000%] duration-[1600ms]" : clickedChoice === "frontend" ? "opacity-0" : "" }`}
            onMouseEnter={() => handleHover("-translate-x-[90%]")}
            onMouseLeave={handleHoverOut}
          />
        </NavLink>
      </div>
    </section>
  );
};
