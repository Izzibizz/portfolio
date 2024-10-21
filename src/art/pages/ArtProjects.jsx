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
    <section className="animate-fadeIn">
      Art projects overview page
    </section>
  )
}
