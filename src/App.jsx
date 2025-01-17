
import { useEffect } from "react"
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/useProjectsStore";

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
      <ScrollToTop />
      <Header />
      <main className={` ${frontendPortfolioDisplay ? "mt-28": "mt-24"} w-full`}>
      <MainRoutes />
      </main>
      <Footer/>
   </div>
  )
}

export default App
