import { useEffect } from "react";
import { useProjectsStore } from "../../stores/useProjectsStore";
import devData from "../data/devData.json"
import { MovingBg } from "../../components/MovingBg"

export const FrontendProjects = () => {
  const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } =
    useProjectsStore();

  useEffect(() => {
    setFrontendPortfolioDisplay(true);
    setArtPortfolioDisplay(false);
  }, []);

  console.log(devData[0].images[0].url)

  return (
    <section className="font-body font-medium text-white animate-fadeIn flex flex-col ">
      <MovingBg />
      <div className="flex flex-col gap-10 w-8/12 mx-auto mt-40 z-20">
      <img
        src="/frontend-developer-w.svg"
        className="w-[90px] tablet:w-[150px] "
      /><ul className=" mx-auto text-white flex flex-col gap-24">
      {devData.map((project, index) => (
        <li key={index} className="flex flex-col tablet:flex-row gap-4 laptop:gap-10">
        <img src={project.images[0].url} alt={project.images.alt} className="laptop:w-1/3 rounded" />
        <div className="flex flex-col gap-4">
          <h3 className="text-xl">{project.title}</h3>
        <p className="text-sm laptop:w-11/12 text-justify">{project.description}</p>
        </div>
        
        </li>
      ))}
      </ul>
      </div>
    </section>
  );
};
