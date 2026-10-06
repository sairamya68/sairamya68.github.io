import { useEffect, useState } from "react";

export default function Preloader({ onDone }) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 250 : 1100;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else {
        setDone(true);
        window.setTimeout(onDone, reduce ? 40 : 380);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className={`preloader${done ? " is-done" : ""}`} role="status" aria-live="polite">
      <div>
        <p className="load-name">
          <span className="load-sur">Vallamsetti</span>
          <span className="load-given">Sai Ramya</span>
        </p>
        <div className="preloader-count">{String(value).padStart(2, "0")}</div>
        <div className="preloader-track"><div className="preloader-bar" style={{ width: `${value}%` }} /></div>
      </div>
    </div>
  );
}
