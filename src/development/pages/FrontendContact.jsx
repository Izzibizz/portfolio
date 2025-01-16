
import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"
import { MovingBg } from "../../components/MovingBg";
import { MdOutlineArrowOutward } from "react-icons/md";

export const FrontendContact = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

    
  return (
    <section className="text-white animate-fadeIn flex flex-col">
  <MovingBg />
  <div className="flex flex-col w-10/12 laptop:w-8/12 mx-auto pt-8 z-20 font-body font-light">
    <img 
      src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1737018034/contact-white_iq24qr.svg" 
      alt="about text" 
      className="h-[100px] w-auto self-start"
    />
    <hr className="w-full border-t border-light my-4 z-10 bg-black" />
    <div className="flex laptop:w-1/3 self-end gap-8 group">
    <h3 className="font-medium tracking-wider">Email</h3>
    <div className="flex gap-1 items-center">
    <MdOutlineArrowOutward className="group-hover:text-orange-500" />
    <a href="mailto:contact@izabellind.com" className="relative after:content-[''] after:block after:w-0 after:h-[1px] after:bg-orange-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 group-hover:after:w-full">contact@izabellind.com</a>
    </div>
      </div>
      </div>
    </section>
  )
}


