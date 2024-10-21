import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/UseProjectsStore"

export const ArtSingleProject = () => {

    const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } = useProjectsStore()

  useEffect(()=> {
    setArtPortfolioDisplay(true)
    setFrontendPortfolioDisplay(false)
    setBgWhite(true)
  }, [])
    
  return (
    <section className="animate-fadeIn">
      Single project page
    </section>
  )
}

