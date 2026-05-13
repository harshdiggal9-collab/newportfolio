import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Let&apos;s Build Something Cinematic</h1>
      <p className="page-intro">
        Share your project goals, launch timeline and references. I will propose a premium creative
        direction tailored to your brand.
      </p>
      <form className="glass contact-form premium-card">
        <input placeholder="Name" required />
        <input placeholder="Email" type="email" required />
        <select>
          <option>Project Budget</option>
          <option>$500 - $1500</option>
          <option>$1500 - $5000</option>
          <option>$5000+</option>
        </select>
        <textarea placeholder="Message" rows="5" />
        <button className="btn btn-glow" type="submit">
          Send Message
        </button>
      </form>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">Contact Channels</p>
          <h2>Reach Out Anywhere</h2>
        </div>
        <div className="section-grid">
          <article className="glass card premium-card">
            <h3>WhatsApp</h3>
            <p>Best for quick project discussion and urgent revisions.</p>
          </article>
          <article className="glass card premium-card">
            <h3>Instagram</h3>
            <p>Behind-the-scenes edits, reels breakdown and recent project drops.</p>
          </article>
          <article className="glass card premium-card">
            <h3>LinkedIn & Email</h3>
            <p>For brand partnerships, agency contracts and long-term collaboration.</p>
          </article>
        </div>
      </section>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">Workflow</p>
          <h2>What Happens After You Submit?</h2>
        </div>
        <div className="timeline-grid">
          <article className="glass card premium-card">
            <h3>01. Brief Review</h3>
            <p>Within 12 hours, I review your goals and define the best creative route.</p>
          </article>
          <article className="glass card premium-card">
            <h3>02. Strategy Call</h3>
            <p>Short call to align vision, references, timeline and expected outputs.</p>
          </article>
          <article className="glass card premium-card">
            <h3>03. Production Sprint</h3>
            <p>Structured production with revision rounds and milestone-based delivery.</p>
          </article>
          <article className="glass card premium-card">
            <h3>04. Final Delivery</h3>
            <p>Platform-optimized exports with all required aspect ratios and versions.</p>
          </article>
        </div>
      </section>
    </motion.main>
  );
}

export default Contact;
