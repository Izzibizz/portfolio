import { useEffect, useState } from "react" 
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import { useProjectsStore } from "../stores/useProjectsStore.jsx"
import { MovingBg } from "../components/MovingBg.jsx"
import aboutDevData from "../development/data/aboutDevData.json"
import aboutArtData from "../art/data/aboutArtData.json"


export const About = () => {

    const { setFrontendPortfolioDisplay, frontendPortfolioDisplay, setArtPortfolioDisplay, artPortfolioDisplay, setBgWhite } = useProjectsStore()
    const location = useLocation();
    const [ currentPortfolioData, setCurrentPortfolioData ] = useState([])

    useEffect(() => {
      if (location.pathname.includes("frontend/about")) {
          setFrontendPortfolioDisplay(true);
          setArtPortfolioDisplay(false);
          setCurrentPortfolioData(aboutDevData)
      } else if (location.pathname.includes("art/about")) {
        setArtPortfolioDisplay(true)
        setFrontendPortfolioDisplay(false)
        setCurrentPortfolioData(aboutArtData)
        setBgWhite(true)
      }
  }, [location.pathname]);

  console.log(currentPortfolioData)

  return (
    <section className={`${frontendPortfolioDisplay ? "text-white" : "text-black"} animate-fadeIn flex flex-col mb-20`}>
            <Helmet>
        <title>
         About Izabel Lind
        </title>
        <meta
          name="description"
          content={
            "Information about Izabel Lind, artist and frontend developer"
          }
        />
      </Helmet>
      {frontendPortfolioDisplay &&
  <MovingBg /> }
  <div className="flex flex-col w-10/12 laptop:w-8/12 mx-auto pt-6 z-20 font-body font-light">
    <img 
      src={ frontendPortfolioDisplay ? "https://res.cloudinary.com/dbf8xygxz/image/upload/v1736934642/about-me-white_vitglw.svg" : "https://res.cloudinary.com/dbf8xygxz/image/upload/v1736934562/about-me_skgmd9.svg" } 
      alt="about text" 
      className="h-[100px] w-auto self-start laptop:mb-8"
    />
    <div className="flex flex-col flex-col-reverse laptop:flex-row justify-between gap-8 tablet:gap-10">
      <div className="flex flex-col laptop:max-w-[600px] gap-8">
        <p className={`text-justify w-full tablet:p-6 tablet:bg-black ${frontendPortfolioDisplay ? "tablet:bg-opacity-[20%]" : "tablet:bg-opacity-[10%]"} h-fit rounded-xl`}>
          {frontendPortfolioDisplay && (<><span className="text-xl font-medium">Hey, </span><br/></>)}
           {currentPortfolioData?.[0]?.description}
        </p>
        {artPortfolioDisplay && ( <p className="grid grid-cols-3 w-full tablet:p-6 tablet:bg-black tablet:bg-opacity-[10%] h-fit rounded-xl">
           <span className="font-medium laptop:text-lg">Education: </span><span className=" italic col-span-2">{currentPortfolioData?.[0]?.education[0].name}<br/> {currentPortfolioData?.[0]?.education[0].school}</span>
        </p>)}
        <div className={`p-4 rounded-xl w-full tablet:p-6 bg-black ${frontendPortfolioDisplay ? "tablet:bg-opacity-[20%]" : "bg-opacity-[10%]"} `}>
          <ul className={`grid grid-cols-2 ${frontendPortfolioDisplay ? "tablet:grid-cols-4" : "tablet:grid-cols-3"} gap-4`}>
          { artPortfolioDisplay && <span className="font-medium text-lg ">Skills: </span>}
            {currentPortfolioData?.[0]?.skills?.map((skill, index) => (
              <li key={index} className={`col-span-1 flex gap-2 ${frontendPortfolioDisplay && "tablet:justify-center"} `}>
                {skill.name}
                {skill.image?.length > 0 && (
                  <img src={skill.image} className="w-[20px]" alt="logo" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative w-full tablet:w-auto h-auto tablet:h-[500px] laptop:h-[600px] flex tablet:justify-end mt-8 tablet:mt-0">
        <img 
          src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1744022177/Izabel-Lind-farnstrand-frontend-utvecklare-itflows_t5kd4c.png" 
          alt="portrait Izabel Lind - fullstack developer and artist" 
          className="h-full w-auto object-cover rounded-xl"
        />
        {frontendPortfolioDisplay && (
        <a href="/CV-IZABEL-LIND-FRONTEND-DEVELOPER.pdf" target="_blank" rel="noopener noreferrer" alt="pdf cv Izabel Lind" className="absolute bottom-[-4%] laptop:bottom-[90%] right-[-5%] laptop:right-[-12%] w-[100px] h-[100px] border-none rounded-full group  ">
          <div className={`w-1/2 h-1/2 top-1/4 left-1/4 rounded-full relative flex justify-center items-center text-white bg-orange-500 text-white bg-orange-500 font-medium font-body text-xl laptop:group-hover:scale-[110%]`}>CV</div>
          <div className="absolute w-full h-full top-0 flex justify-center items-center animate-rotateCircle">
            <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1737379403/click-here-circle-lexend-orange_rbdrwu.svg" alt="click here"/>
          </div>
        </a>
        )}
      </div>
    </div>
  </div>
</section>
  )
}
