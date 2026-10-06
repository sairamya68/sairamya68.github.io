import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      prevent: (node) => Boolean(node.closest?.(".modal, .alert")),
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const hash = window.location.hash;
    if (hash) {
      window.setTimeout(() => lenis.scrollTo(hash, { immediate: true }), 1300);
    }
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
  return null;
}
