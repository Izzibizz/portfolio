
import { useEffect } from "react"
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/useProjectsStore";
import { Helmet } from "react-helmet";

const App = () => {

  const { bgWhite, frontendPortfolioDisplay, setIsScrolled } = useProjectsStore() 

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 70) {
        console.log("Scrolling", scrollPosition);
        setIsScrolled(true); 
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
}, [setIsScrolled]); 
  

  return (
    <div className={`min-h-screen w-screen max-w-screen flex flex-col  ${bgWhite? "bg-light" : "bg-black"} overflow-hidden no-scrollbar scroll-smooth`}>
       <Helmet>
        <title>Izabel Lind - Konstnär & Frontendutvecklare</title>
        <meta property="og:title" content="Izabel Lind" />
        <meta property="og:description" content="Izabel Lind är en verksam konstnär och frontend-utvecklare utbildad på Kungliga Konsthögskolan, som arbetar med skulptur, digital konst och måleri samt utvecklar hemsidor" />
        <meta property="og:image" content="https://www.izabellind.com/og.jpg" />
        <meta property="og:url" content="https://www.izabellind.com" />
        <meta property="og:type" content="website" />
        </Helmet>
      <ScrollToTop />
      <Header />
      <main className={` ${frontendPortfolioDisplay ? "mt-28 mb-20": "mt-24 "}  h-full w-full`}>
      <MainRoutes />
      </main>
   </div>
  )
}

export default App
