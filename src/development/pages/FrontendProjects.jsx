import { useEffect } from "react";
import { useProjectsStore } from "../../stores/useProjectsStore";

export const FrontendProjects = () => {
  const { setFrontendPortfolioDisplay, setArtPortfolioDisplay } =
    useProjectsStore();

  useEffect(() => {
    setFrontendPortfolioDisplay(true);
    setArtPortfolioDisplay(false);
  }, []);

  return (
    <section className="font-body font-medium text-white animate-fadeIn flex flex-col gap-10">
      <img
        src="/frontend-developer-w.svg"
        className="w-[90px] tablet:w-[150px] self-end "
      />
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" />
    </section>
  );
};
