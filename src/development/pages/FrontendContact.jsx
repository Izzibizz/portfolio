
import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"
import { MovingBg } from "../../components/MovingBg";

export const FrontendContact = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

    
  return (
    <section className="text-white animate-fadeIn flex flex-col">
  <MovingBg />
  <div className="flex flex-col w-10/12 laptop:w-8/12 mx-auto mt-32 z-20 font-body font-light">
    <img 
      src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1737015593/contact-white_bpgz5u.svg" 
      alt="about text" 
      className="h-[100px] w-auto self-start mb-8"
    />
    <div className="flex flex-col flex-col-reverse laptop:flex-row justify-between tablet:gap-10">
      </div>
      </div>
    </section>
  )
}


