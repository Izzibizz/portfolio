import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/UseProjectsStore"

export const ArtContact = () => {

    const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } = useProjectsStore()

    useEffect(()=> {
      setArtPortfolioDisplay(true)
      setFrontendPortfolioDisplay(false)
      setBgWhite(true)
    }, [])

  return (
    <section className="animate-fadeIn">
      Art contact page
    </section>
  )
}
