import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"

export const FrontendAbout = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

  return (
    <section className="text-white animate-fadeIn flex flex-col w-10/12 laptop:w-9/12 mx-auto mt-32">
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1736934642/about-me-white_vitglw.svg" className="h-[100px] w-auto self-start"/>
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1736934392/IZABEL.LIND-frontend-developer-artist_dzqpyd.jpg" alt="portrait Izabel Lind" className="w-full tablet:w-[500px] rounded-xl self-end" />
    </section>
  )
}
