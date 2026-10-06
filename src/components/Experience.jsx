import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { title: "E-COMMERCE", tags: ["Web", "Mobile", "Customers"], image: "/career/ecommerce.png", alt: "Online shopping and delivery", accent: "#ff7a18" },
  { title: "REST APIS", tags: ["Design", "Develop", "Integrate"], image: "/career/rest-apis.png", alt: "REST API connecting applications", accent: "#5ec8c5" },
  { title: "INTEGRATIONS", tags: ["Razorpay", "Shiprocket", "Twilio"], image: "/career/integration.png", alt: "Connected development tools", accent: "#f4c76a" },
  { title: "INTERFACES", tags: ["Responsive", "User-friendly"], image: "/career/interfaces.png", alt: "Interface design", accent: "#f472b6" },
  { title: "FEATURES", tags: ["New work", "Issue fixes"], image: "/career/features.png", alt: "Working parts of an application", accent: "#c084fc" },
  { title: "DATABASE", tags: ["Queries", "Workflows"], image: "/career/database.png", alt: "Database on a delivery line", accent: "#60a5fa" },
  { title: "DEPLOYMENTS", tags: ["Releases", "Live apps"], image: "/career/deployment.png", alt: "Launching an application", accent: "#fb923c" },
  { title: "COLLABORATION", tags: ["Design", "Product", "Engineering"], image: "/career/collaboration.png", alt: "Team working on ideas", accent: "#a3e635" },
  { title: "CODE REVIEWS", tags: ["Best practices"], image: "/career/code-reviews.png", alt: "Reviewing code together", accent: "#f43f5e" },
  { title: "DEBUGGING", tags: ["Reliability", "Fixes"], image: "/career/debugging.png", alt: "Finding a path through a problem", accent: "#38bdf8" },
  { title: "DELIVERY", tags: ["Teams", "Deadlines"], image: "/career/delivery.png", alt: "Delivering a package", accent: "#e879f9" },
];

export default function Experience() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".role-card").forEach((card) => {
        const fromRight = card.classList.contains("is-reverse");
        gsap.from(card, {
          x: fromRight ? 140 : -140,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="experience" ref={root}>
      <div className="wrap">
        <span className="kicker">CAREER</span>
        <h2 className="display">WHERE THE<br />WORK HAPPENS.</h2>
        <div className="role-bar">
          <span className="year">CURRENT ROLE</span>
          <strong>{experience.role}</strong>
          <span className="gold">{experience.company}</span>
        </div>
        <div className="role-stack">
          {experience.points.map((point, index) => {
            const card = cards[index];
            const reverse = index % 2 === 1;
            return (
              <article
                key={point}
                className={`role-card${reverse ? " is-reverse" : ""}`}
                style={{ "--accent": card.accent }}
              >
                <div className="role-copy">
                  <span className="role-no">{String(index + 1).padStart(2, "0")} →</span>
                  <h3>{card.title}</h3>
                  <p>{point}</p>
                  <ul className="role-tags">
                    {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <div className="role-visual">
                  <img src={card.image} alt={card.alt} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
