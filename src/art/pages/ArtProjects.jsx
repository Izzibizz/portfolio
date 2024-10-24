import { useEffect, useState } from "react";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { Magnifier } from "../../components/Magnifier";

export const ArtProjects = () => {
  const {
    setArtPortfolioDisplay,
    setBgWhite,
    setFrontendPortfolioDisplay,
    setTitleAndVideoVisible,
    titleAndVideoVisible,
  } = useProjectsStore();
  const [ fadeOut, setFadeout ] = useState(false)
  const image1 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg";
  const image2 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg";
  const matrix1 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728656164/Current.2023.side.zoom_uz3fnv.jpg";
  const matrix2 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728656186/Dripping_off_r1qtnm.jpg";
  const matrix3 =
    "https://res.cloudinary.com/dbf8xygxz/image/upload/v1728656205/current.2023.inside_wxpopq.jpg";

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
    setTimeout(() => {
      setFadeout(true)
    }, 2000)
    setTimeout(() => {
      setTitleAndVideoVisible(false);
    }, 4000);
  }, []);

  return (
    <section className="font-body font-medium animate-fadeIn flex flex-col gap-10">
      {titleAndVideoVisible ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-screen h-screen object-cover invert z-10 ${fadeOut && "animate-fadeOut"}`}
          >
            <source
              src="https://res.cloudinary.com/dbf8xygxz/video/upload/v1728898269/Sequence_01_8_qeiugg.mp4"
              type="video/mp4"
            />
          </video>
          <img
            src="/art-portfolio.svg"
            className={`hidden laptop:block w-full tablet:w-10/12 mx-auto z-20 ${fadeOut && "animate-fadeOut"}`}
          />
          <img
            src="/art-portfolio-vertical.svg"
            className={`w-11/12 tablet:w-10/12 laptop:hidden mx-auto mt-10 z-20 ${fadeOut && "animate-fadeOut"}`}
          />
        </>
      ) : (
      <div className=" w-full flex flex-col gap-y-8 tablet:gap-x-8 z-20">
        <div className="flex flex-col">
        <div className="flex px-8 tablet:px-20 gap-8 overflow-x-scroll tablet:grid tablet:grid-cols-3 tablet:overflow-visible">
          <Magnifier
            url={image1}
            animation={"animate-slideUp"}
            col={"tablet:col-span-2 tablet:mt-10"}
          />
          <Magnifier
            url={image2}
            animation={"animate-slideUp"}
            col={"tablet:col-span-1"}
          />
          </div>
          <div>
            <h3>oblivion 2020</h3>
          </div>
        </div>
        <img src="/line.svg" alt="separation line" className="w-screen z-10" />
        <div className="grid grid-cols-1 px-8 tablet:px-20  tablet:grid-cols-3 gap-y-8 tablet:gap-x-8 ">
          <Magnifier
            url={matrix1}
            animation={"animate-slideUp"}
            col="col-span-1"
          />
          <div className="flex flex-col gap-8">
            <Magnifier
              url={matrix2}
              animation={"animate-slideUp"}
              col="col-span-1 tablet:mt-8"
            />
            <Magnifier
              url={matrix3}
              animation={"animate-slideUp"}
              col="col-span-1"
            />
          </div>
        </div>
      </div>
      )}

      {/*    <div className=" animate-fadeIn grid grid-cols-3">
       <SwiperComponent projects={artProjects} />
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650485/Izabel_Lind_VR_Oblivion_2020_Konstakademin_nycope.jpg" alt="oblivion artwork"className="col-span-2 h-full object-cover"/>
      <img src="https://res.cloudinary.com/dbf8xygxz/image/upload/v1728650850/ung-konstakademien-oblivion-varutstallning-examensutstallning-2020-mejan-kkh-kungliga-konsthogskolan-konst-vr-3d-metallskulptur-virtual-reality-nikesalen-izabel-lind-farnstrand_qqzrd7.jpg" alt="oblivion"/>
      </div> */}
    </section>
  );
};
