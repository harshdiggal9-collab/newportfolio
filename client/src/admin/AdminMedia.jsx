import { useEffect, useState } from "react";
import {
  createShowcase,
  deleteShowcase,
  getShowcasesAdmin,
  updateShowcase
} from "../api/showcaseApi";
import { getClients } from "../api/clientApi";
import { uploadFile } from "../api/uploadApi";

function splitList(str) {
  return String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function AdminMedia() {
  const [items, setItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [kind, setKind] = useState("image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");
  const [tags, setTags] = useState("");
  const [clientCategory, setClientCategory] = useState("");
  const [clientId, setClientId] = useState("");
  const [toolsUsed, setToolsUsed] = useState("");
  const [outcome, setOutcome] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    getShowcasesAdmin().then((d) => setItems(d.showcases || [])).catch(() => setItems([]));
    getClients().then((d) => setClients(d.clients || [])).catch(() => setClients([]));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let imagePayload = undefined;
      if (kind === "image" && file) {
        const up = await uploadFile(file);
        imagePayload = { url: up.url, publicId: up.publicId };
      } else if (kind === "youtube" && file) {
        const up = await uploadFile(file);
        imagePayload = { url: up.url, publicId: up.publicId };
      }

      await createShowcase({
        kind,
        title,
        description,
        image: imagePayload,
        youtubeUrl: kind === "youtube" ? youtubeUrl : "",
        skillsUsed: splitList(skillsUsed),
        tags: splitList(tags),
        clientCategory,
        client: clientId || null,
        toolsUsed,
        outcome
      });
      setTitle("");
      setDescription("");
      setSkillsUsed("");
      setTags("");
      setClientCategory("");
      setClientId("");
      setToolsUsed("");
      setOutcome("");
      setYoutubeUrl("");
      setFile(null);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const togglePublish = async (row) => {
    await updateShowcase(row._id, { published: !row.published });
    load();
  };

  return (
    <>
      <h1>Media — Image & YouTube</h1>
      <p className="page-intro">
        Add image showcases or YouTube links. Fields: title, media, description, skills, client type, linked client,
        tools, outcome.
      </p>

      <form className="glass contact-form premium-card" onSubmit={handleSubmit}>
        <select value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="image">Image showcase</option>
          <option value="youtube">YouTube video</option>
          <option value="reels">Reels</option>
          <option value="edits">Edits</option>
          <option value="motion-graphics">Motion Graphics</option>
          <option value="logo">Logo</option>
          <option value="thumbnails">Thumbnails</option>
          <option value="ui-ux">UI/UX Designing</option>
          <option value="social-media">Social Media Post</option>
          <option value="ai-video">AI Generated Videos</option>
        </select>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" required />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
        />
        {kind === "youtube" && (
          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="YouTube URL *"
            required={kind === "youtube"}
          />
        )}
        <label className="file-label">
          {["image", "logo", "thumbnails", "ui-ux", "social-media"].includes(kind)
            ? "Upload image *"
            : "Upload media file (video/image) *"}
          <input
            type="file"
            accept={
              ["image", "logo", "thumbnails", "ui-ux", "social-media"].includes(kind)
                ? "image/*"
                : "image/*,video/*"
            }
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required={["image", "youtube", "reels", "edits", "motion-graphics", "logo", "thumbnails", "ui-ux", "social-media", "ai-video"].includes(
              kind
            )}
          />
        </label>
        <input value={skillsUsed} onChange={(e) => setSkillsUsed(e.target.value)} placeholder="Skills (comma separated)" />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
        <input
          value={clientCategory}
          onChange={(e) => setClientCategory(e.target.value)}
          placeholder="Client type / niche (e.g. Startup, Creator, Brand)"
        />
        <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
          <option value="">— Link to client (optional) —</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input value={toolsUsed} onChange={(e) => setToolsUsed(e.target.value)} placeholder="Tools / software line" />
        <textarea value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="Outcome / results" rows={3} />
        <button className="btn btn-glow" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Add showcase"}
        </button>
      </form>

      <section className="stacked-section">
        <h2>All showcase items</h2>
        <div className="admin-table-wrap glass premium-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Client niche</th>
                <th>Published</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row._id}>
                  <td>{row.kind}</td>
                  <td>{row.title}</td>
                  <td>{row.clientCategory || "—"}</td>
                  <td>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => togglePublish(row)}>
                      {row.published ? "On" : "Off"}
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => deleteShowcase(row._id).then(load)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AdminMedia;
