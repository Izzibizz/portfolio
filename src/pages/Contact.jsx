import { useEffect } from "react";
import { useProjectsStore } from "../stores/useProjectsStore";
import { MovingBg } from "../components/MovingBg";
import { useLocation } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

export const Contact = () => {
  const {
    setFrontendPortfolioDisplay,
    frontendPortfolioDisplay,
    setArtPortfolioDisplay,
    setBgWhite,
  } = useProjectsStore();

  const { portfolioType } = useLocation();
  useEffect(() => {
    if (location.pathname.includes("frontend/about")) {
      setFrontendPortfolioDisplay(true);
      setArtPortfolioDisplay(false);
    } else if (location.pathname.includes("art/about")) {
      setArtPortfolioDisplay(true);
      setFrontendPortfolioDisplay(false);
      setBgWhite(true);
    }
  }, [location.pathname]);

  return (
    <section className={`${frontendPortfolioDisplay ? "text-white" : "text-black"} animate-fadeIn flex flex-col`}>
        {frontendPortfolioDisplay &&
  <MovingBg /> }
      <div className="flex flex-col w-10/12 laptop:w-8/12 mx-auto pt-8 z-20 font-body font-light">
        <img
          src={
            frontendPortfolioDisplay
              ? "https://res.cloudinary.com/dbf8xygxz/image/upload/v1737018034/contact-white_iq24qr.svg"
              : "https://res.cloudinary.com/dbf8xygxz/image/upload/v1737018032/contact-black_hef8ar.svg"
          }
          alt="about text"
          className="h-[100px] w-auto self-start"
        />
        <hr className={`w-full border-t my-4 z-10 ${frontendPortfolioDisplay ? "border-light" : "border-black"}`} />
        <div className="flex laptop:w-1/3 self-end gap-8 group">
          <h3 className="font-medium tracking-wider">Email</h3>
          <div className="flex gap-1 items-center">
            <MdOutlineArrowOutward className="group-hover:text-orange-500" />
            <a
              href="mailto:contact@izabellind.com"
              className="relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              contact@izabellind.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
