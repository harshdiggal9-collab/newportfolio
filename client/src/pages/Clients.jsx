import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getClients } from "../api/clientApi";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients()
      .then((d) => setClients(d.clients || []))
      .catch(() => setClients([]));
  }, []);

  return (
    <motion.main className="page clients-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-head">
        <p className="eyebrow">CLIENTS</p>
        <h1>Teams & brands we ship work with</h1>
        <p className="page-intro">
          Every client adds a new story — motion, edits, and campaigns tailored to their audience and goals.
        </p>
      </div>

      <section className="clients-grid">
        {clients.map((c) => (
          <article key={c._id} className="glass premium-card client-public-card">
            <div className="client-public-logo-wrap">
              {c.logo?.url ? (
                <img src={c.logo.url} alt={c.name} loading="lazy" />
              ) : (
                <span className="client-public-placeholder">{c.name?.slice(0, 2)?.toUpperCase()}</span>
              )}
            </div>
            <h2>{c.name}</h2>
            <p className="client-type">{c.clientType || "Collaboration"}</p>
            <p className="client-work-done">
              {c.workDoneLabel || `${c.workDoneCount || 0}+ deliverables`}
            </p>
            {c.description && <p className="client-desc">{c.description}</p>}
            {c.websiteUrl && (
              <a className="btn btn-outline btn-sm" href={c.websiteUrl} target="_blank" rel="noreferrer">
                Website
              </a>
            )}
          </article>
        ))}
      </section>

      {!clients.length && (
        <article className="glass premium-card empty-state">
          <p>No clients published yet. Add them from Admin → Clients.</p>
        </article>
      )}
    </motion.main>
  );
}

export default Clients;
