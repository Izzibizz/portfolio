
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/useProjectsStore";

const App = () => {

  const { bgWhite, frontendPortfolioDisplay } = useProjectsStore() 
  

  return (
    <div className={`h-screen min-h-screen w-screen max-w-screen flex flex-col  ${bgWhite? "bg-light" : "bg-black"} overflow-x-hidden no-scrollbar scroll-smooth`}>
      <ScrollToTop />
      <Header />
      <main className={` ${frontendPortfolioDisplay ? "pt-none": "pt-32 laptop:pt-36"} w-full mx-auto flex-grow  min-h-screen pb-20 `}>
      <MainRoutes />
      </main>
      <Footer/>
   </div>
  )
}

export default App
