import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const ratio = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(ratio * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />;
}

export default ScrollProgress;
