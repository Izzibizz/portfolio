import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"

export const ArtAbout = () => {

    const { setArtPortfolioDisplay, setFrontendPortfolioDisplay, setBgWhite } = useProjectsStore()

    useEffect(()=> {
      setArtPortfolioDisplay(true)
      setFrontendPortfolioDisplay(false)
      setBgWhite(true)
    }, [])

  return (
    <section className="animate-fadeIn">
      About art
    </section>
  )
}
