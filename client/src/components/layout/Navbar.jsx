import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/clients", label: "Clients" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin/login", label: "Admin Login" }
];

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    const buttons = navRef.current.querySelectorAll(".btn, nav a");

    const onEnter = (event) => {
      gsap.to(event.currentTarget, { y: -3, scale: 1.04, duration: 0.22, ease: "power2.out" });
    };
    const onLeave = (event) => {
      gsap.to(event.currentTarget, { y: 0, scale: 1, duration: 0.22, ease: "power2.out" });
    };

    buttons.forEach((item) => {
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
    });

    return () => {
      buttons.forEach((item) => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <motion.header
      ref={navRef}
      className="navbar glass premium-card"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <Link className="brand" to="/">
        Edits By<span> Harsh</span>
      </Link>
      <nav>
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="btn btn-glow" to="/contact">
        Hire Me
      </Link>
    </motion.header>
  );
}

export default Navbar;
