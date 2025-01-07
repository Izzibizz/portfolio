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

  console.log(devData[0].description)

  return (
    <section className="font-body font-medium text-white animate-fadeIn flex flex-col ">
      <MovingBg />
      <div className="flex flex-col gap-10 w-11/12 mx-auto mt-40 z-20">
      <img
        src="/frontend-developer-w.svg"
        className="w-[90px] tablet:w-[150px] self-end"
      /><ul className="w-10/12 mx-auto text-white flex flex-col gap-10">
      {devData.map((project, index) => (
        <li key={index}>
        <h3>{project.title}</h3>
        <h4>{project.description}</h4>
        </li>
      ))}
      </ul>
      </div>
    </section>
  );
};
