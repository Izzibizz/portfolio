import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"
import { MovingBg } from "../../components/MovingBg";
import aboutData from "../data/aboutData.json"

export const FrontendAbout = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

    console.log(aboutData[0].description)

  return (
    <section className="text-white animate-fadeIn flex flex-col">
      <MovingBg />
      <div className="flex flex-col gap-4 laptop:gap-10 w-10/12 laptop:w-10/12 mx-auto mt-32 z-20 font-body font-light">
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1736934642/about-me-white_vitglw.svg" alt="about text" className="h-[100px] w-auto self-start"/>

      <div className="flex flex-col flex-col-reverse tablet:flex-row tablet:justify-evenly laptop:justify-end gap-8 ">
      <p className=" text-justify max-w-[500px] tablet:p-6 tablet:bg-black tablet:bg-opacity-[20%] h-fit rounded-xl"><span className="text-xl font-medium">Hey, </span><br/>{aboutData[0].description}</p>
    <div className="relative min-w-[250px] flex">
    <img 
      src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1736943466/IZABEL.LIND-frontend-developer-artist-5_ly4vov.jpg" 
      alt="portrait Izabel Lind" 
      className="w-full tablet:w-auto tablet:h-[300px] tablet:self-end rounded-xl" 
    />
        <div className="absolute bottom-[-4%] laptop:bottom-[-11%] right-[-5%] laptop:right-[-12%] w-[100px] h-[100px] border-none rounded-full laptop:hover:scale-[110%]">
      <div className="w-1/2 h-1/2 top-1/4 left-1/4 rounded-full bg-light relative flex justify-center items-center text-black font-bold font-heading text-xl"> CV </div>
      <div className="absolute w-full h-full top-0 flex justify-center items-center animate-rotateCircle">
        <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1736947548/click-here-circle-lexend_o6fo9c.svg" alt="click here"/>
      </div>
      </div>
  </div>
</div>
   <div className="p-4 rounded-xl tablet:p-6 bg-black bg-opacity-[20%] laptop:w-1/2 self-end">
 <ul className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
  {aboutData[0].skills.map((skill, index) => (
    <li key={index} className="col-span-1 flex gap-2">
      {skill.name}
      {skill.image.length > 0 && (
        <img src={skill.image} className="w-[20px]" alt="logo"/>
      )}
    </li>
  ))}
 </ul>
   </div>
   </div>
    </section>
  )
}
