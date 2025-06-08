import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useProjectsStore } from "../stores/useProjectsStore.jsx";
import { MovingBg } from "../components/MovingBg.jsx";
import aboutDevData from "../development/data/aboutDevData.json";
import aboutArtData from "../art/data/aboutArtData.json";

export const About = () => {
  const {
    setFrontendPortfolioDisplay,
    frontendPortfolioDisplay,
    setArtPortfolioDisplay,
    artPortfolioDisplay,
    setBgWhite,
  } = useProjectsStore();
  const location = useLocation();
  const [currentPortfolioData, setCurrentPortfolioData] = useState([]);

  useEffect(() => {
    if (location.pathname.includes("frontend/about")) {
      setFrontendPortfolioDisplay(true);
      setArtPortfolioDisplay(false);
      setCurrentPortfolioData(aboutDevData);
    } else if (location.pathname.includes("art/about")) {
      setArtPortfolioDisplay(true);
      setFrontendPortfolioDisplay(false);
      setCurrentPortfolioData(aboutArtData);
      setBgWhite(true);
    }
  }, [location.pathname]);

  return (
    <section
      className={`${
        frontendPortfolioDisplay ? "text-white" : "text-black"
      } animate-fadeIn flex flex-col mb-20`}
    >
      <Helmet>
        <title>About Izabel Lind</title>
        <meta
          name="description"
          content={
            "Information about Izabel Lind, artist and frontend developer"
          }
        />
      </Helmet>
      {frontendPortfolioDisplay && <MovingBg />}
      <div
        className={`flex flex-col w-10/12 laptop:w-8/12 mx-auto pt-6 z-20 font-body font-light ${
          artPortfolioDisplay && "text-lg"
        } `}
      >
        <img
          src={
            frontendPortfolioDisplay
              ? "https://res.cloudinary.com/dlp85vjwx/image/upload/v1745309310/about-me-white_ehoyzr.svg"
              : "https://res.cloudinary.com/dlp85vjwx/image/upload/v1745309310/about-me_mwu0ij.svg"
          }
          alt="about text"
          className="h-[100px] w-auto self-start laptop:mb-8"
        />
        <div className="flex flex-col flex-col-reverse laptop:flex-row justify-between gap-8 tablet:gap-10">
          <div className="flex flex-col laptop:max-w-[600px] gap-8">
            {frontendPortfolioDisplay && (
              <div className="text-justify w-full tablet:bg-black tablet:p-6 tablet:bg-opacity-[20%] h-fit rounded-xl">
                <span className="text-xl font-medium">Hey, </span>
                <br />
                <p>{currentPortfolioData?.[0]?.description}</p>
              </div>
            )}

            {artPortfolioDisplay && (
              <div className="text-justify flex flex-col gap-2 w-full tablet:bg-black tablet:bg-opacity-[0%] h-fit rounded-xl">
                {currentPortfolioData?.[0]?.description?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            )}
            {artPortfolioDisplay && (
              <div className="flex flex-col gap-4">
              <h4  className="underline underline-offset-2 decoration-dotted decoration-1 text-xl">Art education:</h4>
              {currentPortfolioData?.[0]?.education?.map((item, index) => (
 <p className="grid grid-cols-3 w-full h-fit rounded-xl" key={index}>
                <span className=" italic col-span-2">
                  {item.name}
                  <br /> {item.school}
                </span>
              </p>
              ))}
              </div>
            )}
            {frontendPortfolioDisplay && (
              <div
                className={`p-4 rounded-xl w-full tablet:p-6 bg-black tablet:bg-opacity-[20%] `}
              >
                <ul
                  className={`grid grid-cols-2 ${
                    frontendPortfolioDisplay
                      ? "tablet:grid-cols-4"
                      : "tablet:grid-cols-3"
                  } gap-4`}
                >
                  {currentPortfolioData?.[0]?.skills?.map((skill, index) => (
                    <li
                      key={index}
                      className={`col-span-1 flex gap-2 tablet:justify-center`}
                    >
                      {skill.name}
                      {skill.image?.length > 0 && (
                        <img
                          src={skill.image}
                          className="w-[20px]"
                          alt="logo"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative w-full tablet:w-auto h-auto tablet:h-[500px] laptop:h-[600px] flex tablet:justify-end mt-8 tablet:mt-0">
            <img
              src="https://res.cloudinary.com/dlp85vjwx/image/upload/v1746174843/izabel-lind-farnstrand-webbyra-itflows-2_jcc3ec.webp"
              alt="portrait Izabel Lind - fullstack developer and artist"
              className="h-full w-auto object-cover rounded-xl"
            />
            {frontendPortfolioDisplay && (
              <a
                href="/CV-IZABEL-LIND-FRONTEND-DEVELOPER.pdf"
                target="_blank"
                rel="noopener noreferrer"
                alt="pdf cv Izabel Lind"
                className="absolute bottom-[-4%] laptop:bottom-[90%] right-[-5%] laptop:right-[-12%] w-[100px] h-[100px] border-none rounded-full group  "
              >
                <div
                  className={`w-1/2 h-1/2 top-1/4 left-1/4 rounded-full relative flex justify-center items-center text-white bg-orange-500 text-white bg-orange-500 font-medium font-body text-xl laptop:group-hover:scale-[110%]`}
                >
                  CV
                </div>
                <div className="absolute w-full h-full top-0 flex justify-center items-center animate-rotateCircle">
                  <img
                    src="https://res.cloudinary.com/dlp85vjwx/image/upload/v1745309134/click-here-circle-lexend-orange_adbwhp.svg"
                    alt="click here"
                  />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
