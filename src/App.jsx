
import { Header } from "./components/Header"
import { MainRoutes } from "./routes/MainRoutes";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { useProjectsStore } from "./stores/UseProjectsStore";

function App() {

  const { bgWhite } = useProjectsStore() 

  return (
    <div className={`h-screen min-h-screen w-screen max-w-screen ${bgWhite? "bg-white" : "bg-black"} `}>
      <ScrollToTop />
      <Header />
      <main className="pt-32 laptop:pt-36 w-full mx-auto">
      <MainRoutes />
      </main>
      <Footer/>
   </div>
  )
}

export default App
