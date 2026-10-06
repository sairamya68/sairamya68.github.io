import { useCallback, useEffect, useState } from "react";
import ResumeDialog from "./components/ResumeDialog.jsx";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import CinematicHero from "./components/CinematicHero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function MouseLight() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 800px)").matches;
    const node = document.querySelector(".mouse-light");
    if (!node || reduce || narrow) return undefined;
    const onMove = (event) => {
      node.style.setProperty("--x", `${event.clientX}px`);
      node.style.setProperty("--y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="mouse-light" aria-hidden="true" />;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const finish = useCallback(() => setBooting(false), []);
  const openResume = useCallback(() => setResumeOpen(true), []);

  useEffect(() => {
    document.body.classList.toggle("is-booting", booting);
  }, [booting]);

  return (
    <>
      {booting ? <Preloader onDone={finish} /> : null}
      <div className="scene" aria-hidden="true"><div className="scene-grid" /></div>
      <div className="grain" aria-hidden="true" />
      <MouseLight />
      <SmoothScroll />
      <CustomCursor />
      <div className="app">
        <Navbar />
        <main>
          <CinematicHero ready={!booting} onResume={openResume} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact onResume={openResume} />
        </main>
        <Footer />
        <ResumeDialog open={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
}
