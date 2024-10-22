import { useEffect } from "react";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Magnifier } from "../../components/Magnifier";

export const ArtProjects = () => {
  const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } =
    useProjectsStore();
  const image1 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg";
  const image2 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg";

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
  }, []);

  return (
    <section className="font-body font-medium animate-fadeIn flex flex-col gap-10">
      <img src="/art-1.svg" className="w-[60px] tablet:w-[100px] self-end " />
      <div className=" grid tablet:grid-cols-3 gap-y-8 tablet:gap-x-8 ">
        <Magnifier
          url={image1}
          animation={"animate-slideIn"}
          col={"col-span-2"}
        />
        <Magnifier
          url={image2}
          animation={"animate-slideUp"}
          col={"col-span-1"}
        />
      </div>

      {/*    <div className=" animate-fadeIn grid grid-cols-3">
       <SwiperComponent projects={artProjects} />
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg" alt="oblivion artwork"className="col-span-2 h-full object-cover"/>
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" alt="oblivion"/>
      </div> */}
    </section>
  );
};
