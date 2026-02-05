import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { ImageModalSlider } from "../../components/ImageModalSlider";
import artProjects from "../data/artProjects.json";
import { SlArrowLeft } from "react-icons/sl";

export const ArtSingleProject = () => {
  const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } =
    useProjectsStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const infoRef = useRef(null);
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [imageAlt, setImageAlt] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [sectionMarginBottom, setSectionMarginBottom] = useState("20px");

  const handleOpenModal = (img, alt, index) => {
    setImageSrc(img);
    setImageAlt(alt);
    setStartIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!id) return;

    const currentProject = artProjects.find((project) => {
      const projectEndpoint = project.title.replace(/\s+/g, "-").toLowerCase();
      return projectEndpoint === id;
    });

    if (currentProject) {
      setProject(currentProject);
    } else {
      console.error("Project not found");
      navigate("/404", { replace: true }); // Redirect to NotFound
    }
  }, [id, navigate]);

  useEffect(() => {
    if (project?.images?.length) {
      project.images.forEach((image) => {
        const preloadImage = new Image();
        preloadImage.src = image.url;
      });
    }
  }, [project]);

  useEffect(() => {
    if (infoRef.current) {
      const infoHeight = infoRef.current.offsetHeight;
      if (window.innerWidth < 1024) {
        setSectionMarginBottom(`${infoHeight + 20}px`);
      } else {
        setSectionMarginBottom("40px");
      }
    }
  }, [project]);

  useEffect(() => {
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
  }, []);

  if (!project) {
    return null; // Optionally render a loader while navigating
  }

  return (
    <section
      className="animate-fadeIn font-body flex flex-col gap-10"
      style={{ marginBottom: sectionMarginBottom }}
    >
      <Helmet>
        <title>
          {project?.title ? `${project.title} - Art Project` : "Art Project"}
        </title>
        <meta
          name="description"
          content={
            project?.title
              ? ` ${project.title}, an art project by Izabel Lind}.`
              : "Discover art project by Izabel Lind."
          }
        />
      </Helmet>
      <div
        ref={infoRef}
        className="fixed bottom-0 left-0 laptop:left-20 laptop:bottom-10 bg-light bg-opacity-85 backdrop-blur-sm p-4 laptop:rounded-xl w-full laptop:w-[350px] flex gap-2"
      >
        <NavLink to={`/art`}>
          <SlArrowLeft className="cursor-hollow pl-4 w-8 h-8 z-20 hover:scale-125" />{" "}
        </NavLink>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">
            {project.title}, {project.year}
          </h3>
          <p className="font-medium">{project.description}</p>
          {project.exhibitedAt && project.exhibitedAt?.length > 0 && (
            <div className="flex gap-2 laptop:hidden">
              <h4>Exhibited at:</h4>
              {project.exhibitedAt?.length > 1 ? (
                <ul className="font-medium">
                  {project.exhibitedAt?.map((place, index) => (
                    <li key={index}>
                      {place.place} ({place.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium">
                  {project.exhibitedAt?.[0].place} (
                  {project.exhibitedAt?.[0].year})
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {project.images?.length === 1 ? (
        <div className="laptop:w-1/2 self-center">
          <img
            src={project.images?.[0]?.url}
            alt={project.images?.[0]?.alt}
            className="w-full"
            onClick={() =>
              handleOpenModal(
                project.images?.[0]?.url,
                project.images?.[0]?.alt,
                0,
              )
            }
          />
        </div>
      ) : (
        <>
          {/* mobile and tablet */}
          <div className="grid laptop:hidden grid-cols-2 gap-2">
            {project.images?.map((image, index) => (
              <img
                src={image.url}
                key={index}
                className="aspect-[3/4] object-cover"
                alt={image.alt || project.title}
                onClick={() => handleOpenModal(image.url, image.alt, index)}
              />
            ))}
          </div>
          {/* laptop */}
          <div className="flex-col gap-4 hidden laptop:flex">
            {project.images?.length > 1 && (
              <div
                className={`${
                  project.images?.length < 3 ? "tablet:w-10/12" : "tablet:w-3/4"
                } w-full  flex justify-between`}
              >
                <img
                  src={project.images?.[0]?.url}
                  alt={project.images?.[0]?.alt}
                  className={`${
                    project.images?.length < 3 ? "h-[500px]" : "h-[400px]"
                  }`}
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[0]?.url,
                      project.images?.[0]?.alt,
                      0,
                    )
                  }
                />
                <img
                  src={project.images?.[1]?.url}
                  alt={project.images?.[1]?.alt}
                  className={`${
                    project.images?.length < 3 ? "h-[550px] " : "h-[200px]"
                  }`}
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[1]?.url,
                      project.images?.[1]?.alt,
                      1,
                    )
                  }
                />
              </div>
            )}
            {project.images?.length > 2 && (
              <div className="w full tablet:w-3/4 flex justify-between self-end">
                <img
                  src={project.images?.[2]?.url}
                  alt={project.images?.[2]?.alt}
                  className="h-[400px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[2]?.url,
                      project.images?.[2]?.alt,
                      2,
                    )
                  }
                />
                <img
                  src={project.images?.[3]?.url}
                  alt={project.images?.[3]?.alt}
                  className="h-[200px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[3]?.url,
                      project.images?.[3]?.alt,
                      3,
                    )
                  }
                />
              </div>
            )}
            <img
              src={project.images?.[4]?.url}
              alt={project.images?.[4]?.alt}
              className="h-[200px] absolute top-10 right-1/2"
              onClick={() =>
                handleOpenModal(
                  project.images?.[4]?.url,
                  project.images?.[4]?.alt,
                  4,
                )
              }
            />
            <img
              src={project.images?.[5]?.url}
              alt={project.images?.[5]?.alt}
              className="h-[200px] absolute bottom-[-10%] right-1/4"
              onClick={() =>
                handleOpenModal(
                  project.images?.[5]?.url,
                  project.images?.[5]?.alt,
                  5,
                )
              }
            />
            {project.images?.length > 5 && (
              <div className="w full tablet:w-full flex justify-between">
                <img
                  src={project.images?.[6]?.url}
                  alt={project.images?.[6]?.alt}
                  className="h-[400px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[6]?.url,
                      project.images?.[6]?.alt,
                      6,
                    )
                  }
                />
                <img
                  src={project.images?.[8]?.url}
                  alt={project.images?.[8]?.alt}
                  className="h-[400px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[8]?.url,
                      project.images?.[8]?.alt,
                      8,
                    )
                  }
                />
                <img
                  src={project.images?.[7]?.url}
                  alt={project.images?.[7]?.alt}
                  className="h-[400px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[7]?.url,
                      project.images?.[7]?.alt,
                      7,
                    )
                  }
                />
              </div>
            )}
            {project.images?.length > 9 && (
              <div className="w full tablet:w-1/2 mx-auto flex justify-between">
                <img
                  src={project.images?.[9]?.url}
                  alt={project.images?.[9]?.alt}
                  className="h-[400px]"
                  onClick={() =>
                    handleOpenModal(
                      project.images?.[9]?.url,
                      project.images?.[9]?.alt,
                      9,
                    )
                  }
                />
              </div>
            )}
          </div>
        </>
      )}
      {project.exhibitedAt && project.exhibitedAt?.length > 0 && (
        <div className="fixed top-40 right-10 bg-light bg-opacity-80 p-4 hidden laptop:block rounded-xl w-[250px] laptop:w-[300px] font-medium">
          <div className="flex gap-2">
            {project.exhibitedAt?.length > 1 ? (
              <ul className="text-sm">
                <span className="font-semibold">Exhibited at: </span>
                {project.exhibitedAt?.map((place, index) => (
                  <li key={index}>
                    {place.place} ({place.year})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">
                <span className="font-semibold">Exhibited at: </span>
                {project.exhibitedAt?.[0].place} ({project.year})
              </p>
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <ImageModalSlider
          images={project.images}
          startIndex={startIndex}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};
