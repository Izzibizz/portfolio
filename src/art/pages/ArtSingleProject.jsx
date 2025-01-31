import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useProjectsStore } from "../../stores/useProjectsStore";
import { ImageModal } from "../../components/ImageModal";
import artProjects from "../data/artProjects.json";
import { SlArrowLeft } from "react-icons/sl";

export const ArtSingleProject = () => {
  const { setArtPortfolioDisplay, setBgWhite, setFrontendPortfolioDisplay } =
    useProjectsStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [imageAlt, setImageAlt] = useState();

  const handleOpenModal = (img, alt) => {
    setImageSrc(img)
    setImageAlt(alt)
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
    setArtPortfolioDisplay(true);
    setFrontendPortfolioDisplay(false);
    setBgWhite(true);
  }, []);

  if (!project) {
    return null; // Optionally render a loader while navigating
  }

  return (
    <section className="animate-fadeIn font-body flex flex-col gap-10 mb-48 laptop:mb-20">
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
      <div className="fixed bottom-0 left-0 laptop:left-20 laptop:bottom-10 bg-light bg-opacity-80 p-4 laptop:rounded-xl w-full laptop:w-[300px] flex gap-2">
        <NavLink to={`/art`}>
          <SlArrowLeft className="cursor-hollow pl-4 w-8 h-8 z-20 hover:scale-125" />{" "}
        </NavLink>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg">
            {project.title}, {project.year}
          </h3>
          <p className="font-light">{project.description}</p>
          {project.exhibitedAt && project.exhibitedAt?.length > 0 && (
            <div className="flex gap-2 laptop:hidden">
              <h4>Exhibited at:</h4>
              {project.exhibitedAt?.length > 1 ? (
                <ul className="font-light">
                  {project.exhibitedAt?.map((place, index) => (
                    <li key={index}>
                      {place.place} ({place.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-light">
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
            onClick={() => handleOpenModal(project.images?.[0]?.url, project.images?.[0]?.alt )}
                         
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
                onClick={() => handleOpenModal(image.url, image.alt )}
                          
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
                  onClick={() => handleOpenModal(project.images?.[0]?.url, project.images?.[0]?.alt )}
                         
                />
                <img
                  src={project.images?.[1]?.url}
                  alt={project.images?.[1]?.alt}
                  className={`${
                    project.images?.length < 3 ? "h-[700px]" : "h-[200px]"
                    
                  }`}
                  onClick={() => handleOpenModal(project.images?.[1]?.url, project.images?.[1]?.alt )}
                         
                />
              </div>
            )}
            {project.images?.length > 2 && (
              <div className="w full tablet:w-3/4 flex justify-between self-end">
                <img
                  src={project.images?.[2]?.url}
                  alt={project.images?.[2]?.alt}
                  className="h-[400px]"
                  onClick={() => handleOpenModal(project.images?.[2]?.url, project.images?.[2]?.alt )}
                         
                />
                <img
                  src={project.images?.[3]?.url}
                  alt={project.images?.[3]?.alt}
                  className="h-[200px]"
                  onClick={() => handleOpenModal(project.images?.[3]?.url, project.images?.[3]?.alt )}
                        
                />
              </div>
            )}
            <img
              src={project.images?.[4]?.url}
              alt={project.images?.[4]?.alt}
              className="h-[200px] absolute top-10 right-1/2"
              onClick={() => handleOpenModal(project.images?.[4]?.url, project.images?.[4]?.alt )}
                        
            />
            <img
              src={project.images?.[5]?.url}
              alt={project.images?.[5]?.alt}
              className="h-[200px] absolute bottom-[-10%] right-1/4"
              onClick={() => handleOpenModal(project.images?.[5]?.url, project.images?.[5]?.alt )}
                          
            />
            {project.images?.length > 5 && (
              <div className="w full tablet:w-full flex justify-between">
                <img
                  src={project.images?.[6]?.url}
                  alt={project.images?.[6]?.alt}
                  className="h-[400px]"
                  onClick={() => handleOpenModal(project.images?.[6]?.url, project.images?.[6]?.alt )}
                          
                />
                <img
                  src={project.images?.[8]?.url}
                  alt={project.images?.[8]?.alt}
                  className="h-[400px]"
                  onClick={() => handleOpenModal(project.images?.[8]?.url, project.images?.[8]?.alt )}
                          
                />
                <img
                  src={project.images?.[7]?.url}
                  alt={project.images?.[7]?.alt}
                  className="h-[400px]"
                  onClick={() => handleOpenModal(project.images?.[7]?.url, project.images?.[7]?.alt )}
                         
                />
              </div>
            )}
            {project.images?.length > 9 && (
              <div className="w full tablet:w-1/2 mx-auto flex justify-between">
                <img
                  src={project.images?.[9]?.url}
                  alt={project.images?.[9]?.alt}
                  className="h-[400px]"
                  onClick={() => handleOpenModal(project.images?.[9]?.url, project.images?.[9]?.alt )}
                        
                />
              </div>
            )}
          </div>
        </>
      )}
      {project.exhibitedAt && project.exhibitedAt?.length > 0 && (
        <div className="fixed top-40 right-10 bg-light bg-opacity-80 p-4 hidden laptop:block rounded-xl w-[250px] laptop:w-[300px] font-light">
          <div className="flex gap-2">
            {project.exhibitedAt?.length > 1 ? (
              <ul className="text-sm">
                <span className="font-medium">Exhibited at: </span>
                {project.exhibitedAt?.map((place, index) => (
                  <li key={index}>
                    {place.place} ({place.year})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">
                <span className="font-medium">Exhibited at: </span>
                {project.exhibitedAt?.[0].place} ({project.year})
              </p>
            )}
          </div>
        </div>
      )}
         {isModalOpen && (
              <ImageModal
                src={imageSrc}
                alt={imageAlt}
                onClose={handleCloseModal}
              />
            )}
    </section>
  );
};
