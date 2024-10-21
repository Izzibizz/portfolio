import { useProjectsStore } from "../stores/UseProjectsStore"
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom"

export const Header = () => {

    const { bgWhite, setBgWhite, artPortfolioDisplay, setArtPortfolioDisplay, frontendPortfolioDisplay, setFrontendPortfolioDisplay } = useProjectsStore()
    const dropdownRef = useRef()
    const buttonRef = useRef()
    const [isOpen, setIsOpen] = useState(false);

    const aboutPath = artPortfolioDisplay ? "/art/about" : "/frontend/about";
    const contactPath = artPortfolioDisplay ? "/art/contact" : "/frontend/contact";
    const projectsPath = artPortfolioDisplay ? "/art/projects" : "/frontend/projects";
    const menuColor = bgWhite ?  "bg-black" : "bg-white";
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
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
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
    
    console.log("frontend", frontendPortfolioDisplay, "art", artPortfolioDisplay, "bg", bgWhite)

  return (
    <header className="w-full max-w-full h-fit flex justify-between px-8 py-4 absolute top-0 left-0 z-50 animate-fadeIn">
        <NavLink to="/" aria-label={`Link to Home page`} className="h-fit" onClick={() => { setBgWhite(false); 
            setArtPortfolioDisplay(false)
            setFrontendPortfolioDisplay(false)}}>
    {bgWhite? (
        <img src="/Izabel-svart.svg" className="w-[160px] cursor-hollowDark p-8"/>
    ) : (
      <img src="/izabel-white.svg" className="w-[160px] opacity-[70%] cursor-hollow p-8"/>
    )}
    </NavLink>
    { (artPortfolioDisplay || frontendPortfolioDisplay) && (
    <>
          {/* Mobile and tablet */}
          <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="flex flex-col justify-center items-center laptop:hidden z-40 "
      >
        <span
          className={`${menuColor} block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                      }`}
        >
          {" "}
        </span>
        <span
          className={`${menuColor} block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm my-0.5 ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
        ></span>
        <span
          className={`${menuColor} block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                      }`}
        ></span>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-24 right-0 w-fit text-xl bg-background rounded-bl-xl bg-opacity-60 backdrop-blur-sm ${bgColor} `}
        >
          <ul className={`flex flex-col items-end gap-6 p-8 pr-8 tablet:pb-20 ${textColor}`}>
            <NavLink
              to="/dancer"
              aria-label="Link to Dancer"
              onClick={toggleMenu}
              className={({ isActive }) => ` ${isActive ? "underline" : "hover:scale-110"}`}
            >
              <li>Dancer</li>
            </NavLink>
            <NavLink
              to="/choreographer"
              aria-label="Link to Choreographer"
              onClick={toggleMenu}
              className={({ isActive }) => ` ${isActive ? "underline" : "hover:scale-110"}`}
            >
              <li>Choreographer</li>
            </NavLink>
            <NavLink
              to="/pedagog"
              aria-label="Link to Pedagog"
              onClick={toggleMenu}
              className={({ isActive }) => ` ${isActive ? "underline" : "hover:scale-110"}`}
            >
              <li>Pedagog</li>
            </NavLink>
            <NavLink
              to="/about"
              aria-label="Link to About"
              onClick={toggleMenu}
              className={({ isActive }) => ` ${isActive ? "underline" : "hover:scale-110"}`}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/contact"
              aria-label="Link to Contact"
              onClick={toggleMenu}
              className={({ isActive }) => ` ${isActive ? "underline" : "hover:scale-110"}`}
            >
              <li>Contact</li>
            </NavLink>
          </ul>
        </div>
      )}
    <div className={`flex ${artPortfolioDisplay? "text-black": "text-white"} font-heading h-fit animate-fadeIn hidden laptop:flex`}>
         <NavLink to={projectsPath} aria-label={`Link to Projects page`} className={`  p-8 pr-4 h-fit ${artPortfolioDisplay? "cursor-hollowDark" : "cursor-hollow"}`}>
        Projects
        </NavLink>
        <NavLink to={aboutPath} aria-label={`Link to about page`} className={`  p-8 pr-4 h-fit ${artPortfolioDisplay? "cursor-hollowDark" : "cursor-hollow"}`}>
        About
        </NavLink>
        <NavLink to={contactPath} aria-label={`Link to contact page`} className={` p-8 pl-4 h-fit ${artPortfolioDisplay? "cursor-hollowDark" : "cursor-hollow"}`}>
        Contact
        </NavLink>
    </div>
    </>
    )}
    </header>
  )
}

