import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectBySlug } from "../api/projectApi";
import { getShowcaseBySlug } from "../api/showcaseApi";

function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      try {
        const data = await getProjectBySlug(slug);
        if (!canceled) setProject(data.project || data);
      } catch {
        try {
          const data = await getShowcaseBySlug(slug);
          if (!canceled) setProject(data.showcase || data);
        } catch {
          if (!canceled) setProject(null);
        }
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, [slug]);

  if (!project) return <main className="page">Loading project...</main>;

  const imageUrl = project.thumbnail?.url || project.thumbnail || project.image?.url || project.image;
  const youtubeUrl = project.youtubeLink || project.youtubeUrl;

  return (
    <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="project-hero">
        {imageUrl && <img src={imageUrl} alt={project.title} />}
        <div className="project-hero-copy">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {project.timeline && <p>Timeline: {project.timeline}</p>}
          {project.kind && <p>Type: {project.kind}</p>}
        </div>
      </section>
      {youtubeUrl && (
        <div className="video-wrapper glass">
          <iframe src={youtubeUrl} title={project.title} loading="lazy" allowFullScreen />
        </div>
      )}
    </motion.main>
  );
}

export default ProjectDetails;
