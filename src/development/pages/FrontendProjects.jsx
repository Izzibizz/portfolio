import { useEffect } from "react" 
import { useProjectsStore } from "../../stores/useProjectsStore"

export const FrontendProjects = () => {

    const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } = useProjectsStore()

    useEffect(() => {
        setFrontendPortfolioDisplay(true)
        setArtPortfolioDisplay(false)
    }, [])

  return (
    <section className="text-white animate-fadeIn">
      Frontend projects overview page
    </section>
  )
}

