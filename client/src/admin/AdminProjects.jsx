import { useEffect, useState } from "react";
import { createProject, deleteProject, getProjects } from "../api/projectApi";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Motion Graphics");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () => {
    setError("");
    setSuccess("");
    return getProjects()
      .then((data) => setProjects(data.projects || data))
      .catch(() => setProjects([]));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createProject({
        title,
        category,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        description: "New project"
      });
      setTitle("");
      setSuccess("Project added successfully.");
      load();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Save failed.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    try {
      await deleteProject(id);
      setSuccess("Project deleted successfully.");
      load();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Delete failed.");
    }
  };

  return (
    <>
      <h1>Projects</h1>
      <p className="page-intro">Quick add portfolio projects (full CMS fields can extend later).</p>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}
      <form className="glass contact-form premium-card" onSubmit={handleCreate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Motion Graphics</option>
          <option>Video Editing</option>
          <option>Reels</option>
          <option>Brand Ads</option>
          <option>YouTube Edits</option>
          <option>VFX Projects</option>
        </select>
        <button className="btn btn-glow" type="submit">
          Add Project
        </button>
      </form>
      <section className="project-grid">
        {projects.map((project) => (
          <article key={project._id} className="glass project-card premium-card">
            <h3>{project.title}</h3>
            <p>{project.category?.name || project.category}</p>
            <button className="btn btn-outline" type="button" onClick={() => handleDelete(project._id)}>
              Delete
            </button>
          </article>
        ))}
      </section>
    </>
  );
}

export default AdminProjects;
