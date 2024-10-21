import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"
/* import { SwiperComponent } from "../components/SwiperComponent"
import artProjects from "../data/artProjects.json" */


export const ArtHome = () => {

  const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } = useProjectsStore()

  useEffect(()=> {
    setArtPortfolioDisplay(true)
    setFrontendPortfolioDisplay(false)
    setBgWhite(true)
  }, [])

  return (
    <section className="font-heading animate-fadeIn grid grid-cols-3">
     {/*  <SwiperComponent projects={artProjects} /> */}
    <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg" alt="oblivion artwork"className="col-span-2 h-full object-cover"/>
    <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" alt="oblivion"/>
    </section>
  )
}


