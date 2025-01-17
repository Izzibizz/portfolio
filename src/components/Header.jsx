import { useProjectsStore } from "../stores/useProjectsStore";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const {
    bgWhite,
    setBgWhite,
    artPortfolioDisplay,
    setArtPortfolioDisplay,
    frontendPortfolioDisplay,
    setFrontendPortfolioDisplay,
    isScrolled
  } = useProjectsStore();
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const aboutPath = artPortfolioDisplay ? "/art/about" : "/frontend/about";
  const contactPath = artPortfolioDisplay
    ? "/art/contact"
    : "/frontend/contact";
  const projectsPath = artPortfolioDisplay ? "/art" : "/frontend";
  const menuColor = bgWhite ? "bg-black" : "bg-white";
  const bgColor = bgWhite ? "bg-white" : "bg-black";
  const textColor = bgWhite ? "text-black" : "text-white";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close the menu when navigating to a new page
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header
      className={`w-full max-w-screen h-20 flex justify-between fixed top-0 left-0 z-50 animate-fadeIn px-8 ${
      artPortfolioDisplay ? "bg-light" : frontendPortfolioDisplay ? "bg-black" : ""
      } ${isScrolled ? "bg-opacity-90" : "bg-opacity-0"}` }
    >
      <NavLink
        to="/"
        aria-label={`Link to Home page`}
        className="h-fit"
        onClick={() => {
          setBgWhite(false);
          setArtPortfolioDisplay(false);
          setFrontendPortfolioDisplay(false);
        }}
      >
        {bgWhite ? (
          <img
            src="/Izabel-svart.svg"
            className={`w-[90px] cursor-hollowDark pr-4 py-8 transform transition-transform duration-300 ease-in-out ${
              artPortfolioDisplay && "hover:scale-125"
            } `}
          />
        ) : (
          <img
            src="/izabel-white.svg"
            className={`w-[90px] opacity-[70%] cursor-hollow pr-4 py-8 transform transition-transform duration-300 ease-in-out ${
              frontendPortfolioDisplay && "hover:scale-125"
            } `}
          />
        )}
      </NavLink>
      {(artPortfolioDisplay || frontendPortfolioDisplay) && (
        <>
          {/* Mobile and tablet */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="flex flex-col justify-center items-center laptop:hidden z-40 opacity-60 "
          >
            <span
              className={`${menuColor} block transition-all duration-300 ease-out 
               h-[1px] w-6 rounded-sm ${
                 isOpen ? "rotate-45 translate-y-[3px]" : "-translate-y-[4px]"
               }`}
            ></span>
            <span
              className={`${menuColor} block transition-all duration-300 ease-out 
              h-[1px] w-6 rounded-sm my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`${menuColor} block transition-all duration-300 ease-out 
               h-[1px] w-6 rounded-sm ${
                 isOpen ? "-rotate-45 -translate-y-[3px]" : "translate-y-[4px]"
               }`}
            ></span>
          </button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className={`absolute top-0 right-0 text-xl  ${bgColor} bg-opacity-90 transition-all duration-700 ease-in-out fadeIn overflow-hidden ${
                isOpen ? "h-screen w-screen" : "h-0 w-0"
              }`}
            >
              <ul
                className={`flex flex-col items-center mt-[30%] gap-6 p-10 ${textColor} font-body font-light`}
              >
                <NavLink
                  to={projectsPath}
                  aria-label={`Link to Projects page`}
                  onClick={toggleMenu}
                >
                  Seleted Projects
                </NavLink>
                <NavLink
                  to={aboutPath}
                  aria-label={`Link to about page`}
                  onClick={toggleMenu}
                >
                  About
                </NavLink>
                <NavLink
                  to={contactPath}
                  aria-label={`Link to contact page`}
                  onClick={toggleMenu}
                >
                  Contact
                </NavLink>
              </ul>
            </div>
          )}
          <div
            className={`flex items-center ${
              artPortfolioDisplay ? "text-black" : "text-white"
            }  w-fit gap-2 font-body font-light animate-fadeIn hidden laptop:flex`}
          >
            <NavLink
              to={projectsPath}
              aria-label={`Link to Projects page`}
              className={`py-8 px-4 h-full max-h-full flex items-center transform transition-transform duration-300 ease-in-out  hover:scale-125 ${
                artPortfolioDisplay ? "cursor-hollowDark" : "cursor-hollow"
              }`}
            >
              Selected Projects
            </NavLink>
            <NavLink
              to={aboutPath}
              aria-label={`Link to about page`}
              className={`  py-8 px-4  h-full max-h-full flex items-center transform transition-transform duration-300 ease-in-out  hover:scale-125 ${
                artPortfolioDisplay ? "cursor-hollowDark" : "cursor-hollow"
              }`}
            >
              About
            </NavLink>
            <NavLink
              to={contactPath}
              aria-label={`Link to contact page`}
              className={` py-8 px-4 h-full max-h-full flex items-center  transform transition-transform duration-300 ease-in-out  hover:scale-125 ${
                artPortfolioDisplay ? "cursor-hollowDark" : "cursor-hollow"
              }`}
            >
              Contact
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
};
