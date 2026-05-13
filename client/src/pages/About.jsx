import { motion } from "framer-motion";

function About() {
  const timeline = [
    
  ];

  return (
    <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>About</h1>
      <div className="glass card premium-card">
        <p>
          I build cinematic edits and motion systems that blend storytelling with brand strategy. My work
          spans commercials, social campaigns, reels, and launch films.
        </p>
      </div>
      <div className="stats-grid">
        <article className="glass card premium-card">
          <h3>120+</h3>
          <p>Projects Delivered</p>
        </article>
        <article className="glass card premium-card">
          <h3>50M+</h3>
          <p>Views Generated</p>
        </article>
        <article className="glass card premium-card">
          <h3>7+</h3>
          <p>Years Experience</p>
        </article>
      </div>
  

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">Creative Philosophy</p>
          <h2>Minimal. Cinematic. Performance-Focused.</h2>
        </div>
        <article className="glass card premium-card">
          <p>
            I believe premium visuals should not only look beautiful but also solve business goals. Every
            transition, motion curve and pace choice is made to increase emotional impact and audience
            retention.
          </p>
        </article>
      </section>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">Software Stack</p>
          <h2>Tools Used in Production</h2>
        </div>
        <div className="section-grid">
          <article className="glass card premium-card">
            <h3>After Effects</h3>
            <p>Motion systems, typography animation and branded visual language.</p>
          </article>
          <article className="glass card premium-card">
            <h3>Premiere Pro</h3>
            <p>Narrative pacing, ad structure and fast turnaround edit pipelines.</p>
          </article>
          <article className="glass card premium-card">
            <h3>DaVinci Resolve</h3>
            <p>Cinematic color grading and finishing for premium visual consistency.</p>
          </article>
        </div>
      </section>
      {/* <a className="btn btn-glow" href="/cv.pdf" download>
        Download CV
      </a> */}
    </motion.main>
  );
}

export default About;
