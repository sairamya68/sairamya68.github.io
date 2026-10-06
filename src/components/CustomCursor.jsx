import { useEffect, useRef, useState } from "react";

const labels = {
  project: "VIEW PROJECT",
  explore: "EXPLORE",
};

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [mode, setMode] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 980px)").matches;
    if (!fine || reduce || narrow) return undefined;
    setOn(true);
    document.body.classList.add("has-cursor");
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...mouse };
    let frame;
    let magnetic = null;
    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.18;
      pos.y += (mouse.y - pos.y) * 0.18;
      if (dot.current) {
        dot.current.style.left = `${mouse.x}px`;
        dot.current.style.top = `${mouse.y}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${pos.x}px`;
        ring.current.style.top = `${pos.y}px`;
      }
      frame = requestAnimationFrame(loop);
    };
    const onMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      setMode(event.target.closest("[data-cursor]")?.dataset.cursor || "");
      const next = event.target.closest("[data-magnetic]");
      if (magnetic && magnetic !== next) magnetic.style.transform = "";
      magnetic = next;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        magnetic.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.18}px, ${(event.clientY - rect.top - rect.height / 2) * 0.25}px)`;
      }
    };
    const onClick = (event) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 450);
    };
    frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (!on) return null;
  const label = labels[mode] || "";
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className={`cursor-ring${mode ? " is-lg" : ""}${label ? " is-label" : ""}`} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}
