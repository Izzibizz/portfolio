
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/useProjectsStore";

function App() {

  const { bgWhite } = useProjectsStore() 
  

  return (
    <div className={`h-screen min-h-screen w-screen max-w-screen flex flex-col  ${bgWhite? "bg-light" : "bg-black"} overflow-x-hidden no-scrollbar scroll-smooth`}>
      <ScrollToTop />
      <Header />
      <main className="pt-32 laptop:pt-36 w-full mx-auto flex-grow  min-h-screen ">
      <MainRoutes />
      </main>
      <Footer/>
   </div>
  )
}

export default App
