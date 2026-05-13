import { useEffect, useState } from "react";

function CustomCursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPoint({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="custom-cursor" style={{ left: point.x, top: point.y }} />;
}

export default CustomCursor;
