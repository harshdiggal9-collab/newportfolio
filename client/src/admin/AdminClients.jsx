import { useEffect, useState } from "react";
import { createClient, deleteClient, getClients } from "../api/clientApi";
import { uploadFile } from "../api/uploadApi";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientType, setClientType] = useState("");
  const [workDoneCount, setWorkDoneCount] = useState(0);
  const [workDoneLabel, setWorkDoneLabel] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => getClients().then((d) => setClients(d.clients || [])).catch(() => setClients([]));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let logo = undefined;
      if (file) {
        const up = await uploadFile(file);
        logo = { url: up.url, publicId: up.publicId };
      }
      await createClient({
        name,
        description,
        clientType,
        workDoneCount: Number(workDoneCount) || 0,
        workDoneLabel,
        websiteUrl,
        logo
      });
      setName("");
      setDescription("");
      setClientType("");
      setWorkDoneCount(0);
      setWorkDoneLabel("");
      setWebsiteUrl("");
      setFile(null);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h1>Clients</h1>
      <p className="page-intro">
        Brands / people you work with. Shown on the public Clients page with logo and work done count.
      </p>

      <form className="glass contact-form premium-card" onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name *" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" rows={3} />
        <input
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
          placeholder="Client type (Startup, Agency, Creator…)"
        />
        <input
          type="number"
          min="0"
          value={workDoneCount}
          onChange={(e) => setWorkDoneCount(e.target.value)}
          placeholder="Work done count (number)"
        />
        <input
          value={workDoneLabel}
          onChange={(e) => setWorkDoneLabel(e.target.value)}
          placeholder="Label e.g. 12 videos delivered"
        />
        <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Website URL (optional)" />
        <label className="file-label">
          Logo upload
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
        <button className="btn btn-glow" type="submit" disabled={busy}>
          {busy ? "Saving…" : "Add client"}
        </button>
      </form>

      <section className="stacked-section">
        <h2>Your clients</h2>
        <div className="project-grid">
          {clients.map((c) => (
            <article key={c._id} className="glass card premium-card">
              {c.logo?.url && <img className="client-logo-admin" src={c.logo.url} alt="" />}
              <h3>{c.name}</h3>
              <p>{c.clientType}</p>
              <p>
                Work: {c.workDoneLabel || `${c.workDoneCount || 0} projects`}
              </p>
              <button type="button" className="btn btn-outline" onClick={() => deleteClient(c._id).then(load)}>
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default AdminClients;
