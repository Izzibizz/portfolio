import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"

export const ArtProjects = () => {

    const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } = useProjectsStore()

    useEffect(()=> {
      setArtPortfolioDisplay(true)
      setFrontendPortfolioDisplay(false)
      setBgWhite(true)
    }, [])

    return (
      <section className="font-body font-medium animate-fadeIn">
      <h2>Art portfolio</h2>
      <div className=" animate-fadeIn grid grid-cols-3">
       {/*  <SwiperComponent projects={artProjects} /> */}
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg" alt="oblivion artwork"className="col-span-2 h-full object-cover"/>
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" alt="oblivion"/>
      </div>
      </section>
    )
  }
