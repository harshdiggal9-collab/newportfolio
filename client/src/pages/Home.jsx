import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Home() {
  const titleRef = useRef(null);
  const orbRef = useRef(null);
  const marqueeSkills = [
    { name: "After Effects", icon: "https://img.icons8.com/color/96/adobe-after-effects.png" },
    { name: "Premiere Pro", icon: "https://img.icons8.com/color/96/adobe-premiere-pro.png" },
    { name: "Photoshop", icon: "https://img.icons8.com/color/96/adobe-photoshop.png" },
    { name: "Canva", icon: "https://img.icons8.com/fluency/96/canva-app.png" },
    { name: "CorelDRAW", icon: "https://img.icons8.com/color/96/coreldraw-2021.png" },
    { name: "CapCut", icon: "https://img.icons8.com/fluency/96/video-editing.png" },
    { name: "AI Prompting", icon: "https://img.icons8.com/fluency/96/artificial-intelligence.png" },
    { name: "AI Video Creation", icon: "https://img.icons8.com/fluency/96/clapperboard.png" }
  ];
  const featuredWorks = [
    { title: "Luxury Brand Launch Film", category: "Brand Ad", thumb: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1200&auto=format&fit=crop" },
    { title: "High-Retention YouTube Edit", category: "YouTube Edits", thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop" },
    { title: "Cinematic Reels Campaign", category: "Reels", thumb: "https://images.unsplash.com/photo-1601506521937-0121e0c36b19?q=80&w=1200&auto=format&fit=crop" },
    { title: "Product Motion Teaser", category: "Motion Graphics", thumb: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop" }
  ];
  const services = [
    {
      title: "Motion Graphics",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Video Editing",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "VFX & Compositing",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "YouTube Story Edit",
      image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ad Creatives",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "AI Video Workflows",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!orbRef.current) return;
    const orb = orbRef.current;

    const onMove = (event) => {
      const rect = orb.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;

      gsap.to(orb, {
        rotateY: px * 26,
        rotateX: -py * 22,
        x: px * 14,
        y: py * 14,
        duration: 0.45,
        ease: "power2.out",
        transformPerspective: 1200,
        transformOrigin: "center"
      });
    };

    const onLeave = () => {
      gsap.to(orb, {
        rotateY: -12,
        rotateX: 5,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    };

    orb.addEventListener("mousemove", onMove);
    orb.addEventListener("mouseleave", onLeave);

    return () => {
      orb.removeEventListener("mousemove", onMove);
      orb.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="hero split-hero">
        <div className="hero-overlay" />
        <div className="split-left">
          <p className="eyebrow">INTRODUCE</p>
          <h1 ref={titleRef}>Hi, I&apos;m Harsh — Motion Graphics Artist & Video Editor</h1>
          <p>
            I create cinematic visuals, premium edits and high-retention content designed to make your brand
            stand out and perform.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-glow" to="/work">
              View Work
            </Link>
            <Link className="btn btn-outline" to="/contact">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="split-right">
          <div ref={orbRef} className="hero-3d-orb">
            <img
              src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1200&auto=format&fit=crop"
              alt="3D showcase"
            />
          </div>
        </div>
      </section>

      <section className="marquee-wrap glass premium-card">
        <div className="marquee-track">
          {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <span className="skill-pill-3d" key={`${skill}-${index}`}>
              <img src={skill.icon} alt={skill.name} loading="lazy" />
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">FEATURED WORK</p>
          <h2>Selected Projects</h2>
        </div>
        <div className="featured-two-grid">
          {featuredWorks.map((work) => (
            <article className="glass project-card premium-card work-showcase" key={work.title}>
              <img src={work.thumb} alt={work.title} loading="lazy" />
              <div className="project-card-content">
                <h3>{work.title}</h3>
                <p>{work.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">SERVICES</p>
          <h2>What I Can Do For You</h2>
        </div>
        <div className="section-grid">
          {services.map((service) => (
            <article className="glass card premium-card service-3d" key={service.title}>
              <img className="service-image" src={service.image} alt={service.title} loading="lazy" />
              <h3>{service.title}</h3>
              <p>Premium, conversion-focused creative output with cinematic polish.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stacked-section">
        <div className="section-head">
          <p className="eyebrow">ABOUT ME</p>
          <h2>Transforming Ideas Into Visual Masterpieces</h2>
        </div>
        <article className="glass card premium-card about-card-grid">
          <img
            className="about-image"
            src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=1200&auto=format&fit=crop"
            alt="Harsh creative workspace"
            loading="lazy"
          />
          <div>
            <p>
              I am Harsh, a Motion Graphics Artist from Meerut with over 3 years of extensive experience in
              video editing and creative design. I specialize in crafting engaging, high-retention visual
              content that helps brands stand out in the crowded digital landscape.
            </p>
            <div className="skill-list-grid">
              {marqueeSkills.map((skill) => (
                <span key={skill.name} className="skill-list-item">
                  <img src={skill.icon} alt={skill.name} loading="lazy" />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="cta-band glass premium-card">
        <h2>Let&apos;s Build Your Next Visual Campaign</h2>
        <p>Contact section below for quick project briefing and collaboration.</p>
        <div className="hero-actions">
          <Link className="btn btn-glow" to="/contact">
            Go To Contact Page
          </Link>
        </div>
      </section>
    </motion.main>
  );
}

export default Home;
