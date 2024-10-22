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
  const image3 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728656164/Current.2023.side.zoom_uz3fnv.jpg";

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
  }, []);

  return (
    <section className="font-body font-medium animate-fadeIn flex flex-col gap-10">
      <img src="/artist.svg" className="w-[60px] tablet:w-[100px] self-end " />
      <div className=" flex flex-col gap-y-8 tablet:gap-x-8 ">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-y-8 tablet:gap-x-8  ">
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
          <h3>oblivion 2020</h3>
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-y-8 tablet:gap-x-8 ">
          <Magnifier
            url={image3}
            animation={"animate-slideUp"}
            col="col-span-1"
          />
        </div>
      </div>

      {/*    <div className=" animate-fadeIn grid grid-cols-3">
       <SwiperComponent projects={artProjects} />
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg" alt="oblivion artwork"className="col-span-2 h-full object-cover"/>
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" alt="oblivion"/>
      </div> */}
    </section>
  );
};
