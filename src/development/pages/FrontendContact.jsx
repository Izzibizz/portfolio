
import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/UseProjectsStore"

export const FrontendContact = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

    
  return (
    <section className="text-white animate-fadeIn">
      Frontend contact
    </section>
  )
}


