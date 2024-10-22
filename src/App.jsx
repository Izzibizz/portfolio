
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/useProjectsStore";

function App() {

  const { bgWhite } = useProjectsStore() 

  return (
    <div className={`h-screen min-h-screen w-screen max-w-screen ${bgWhite? "bg-white" : "bg-black"} `}>
      <ScrollToTop />
      <Header />
      <main className="pt-32 laptop:pt-36 w-11/12 laptop:w-10/12 mx-auto">
      <MainRoutes />
      </main>
      <Footer/>
   </div>
  )
}

export default App
