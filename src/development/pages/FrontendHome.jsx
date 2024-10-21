import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/UseProjectsStore"

export const FrontendHome = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

  return (
    <section className="text-white animate-fadeIn">
      Frontend home page
    </section>
  )
}


