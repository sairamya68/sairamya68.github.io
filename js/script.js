/**
 * Sai Ramya — Portfolio Interactions
 * Vanilla JS: loader, cursor, particles, parallax, tilt,
 * scroll reveal, nav, architecture tooltips, WhatsApp form
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = matchMedia("(hover: none), (pointer: coarse)").matches || "ontouchstart" in window;

  if (prefersReducedMotion) document.body.classList.add("reduced-motion");
  if (isTouchDevice) document.body.classList.add("touch-device");

  /* ---------- Loader ---------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const hide = () => {
      loader.classList.add("hidden");
      setTimeout(() => loader.remove(), 600);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, prefersReducedMotion ? 100 : 900);
    } else {
      window.addEventListener("load", () => {
        setTimeout(hide, prefersReducedMotion ? 100 : 900);
      });
    }
  }

  /* ---------- Custom Cursor ---------- */
  function initCursor() {
    if (isTouchDevice || prefersReducedMotion) return;

    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let visible = false;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    document.addEventListener("mouseleave", () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactive = "a, button, .skill-card, .project-card, .btn, .nav-link, .contact-card, .arch-node, input, textarea, .tilt-card";
    document.querySelectorAll(interactive).forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("expanded"));
      el.addEventListener("mouseleave", () => ring.classList.remove("expanded"));
    });
  }

  /* ---------- Particles ---------- */
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;
    let width;
    let height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(50, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.4 + 0.1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 212, ${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    });
  }

  /* ---------- Navbar ---------- */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const collapse = document.getElementById("navMenu");
    const bsCollapse = collapse ? bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false }) : null;

    function onScroll() {
      if (!navbar) return;
      navbar.classList.toggle("scrolled", window.scrollY > 40);

      const scrollTop = document.getElementById("scroll-top");
      if (scrollTop) {
        scrollTop.classList.toggle("visible", window.scrollY > 500);
      }

      let current = "";
      const offset = 120;
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - offset) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === "#" + current);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && bsCollapse) {
          bsCollapse.hide();
        }
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  /* ---------- Scroll to top ---------- */
  function initScrollTop() {
    const btn = document.getElementById("scroll-top");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  /* ---------- Workflow viewport animation ---------- */
  function initWorkflow() {
    const track = document.getElementById("workflow-track");
    if (!track) return;

    if (prefersReducedMotion) {
      track.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track.classList.add("in-view");
            observer.unobserve(track);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(track);
  }

  /* ---------- Hero parallax ---------- */
  function initHeroParallax() {
    if (isTouchDevice || prefersReducedMotion) return;

    const wrap = document.getElementById("hero-parallax");
    const terminal = document.getElementById("dev-terminal");
    if (!wrap || !terminal) return;

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      terminal.style.transform = `translateY(-6px) rotateX(${4 - y * 8}deg) rotateY(${-4 + x * 10}deg)`;

      wrap.querySelectorAll(".tech-chip").forEach((chip, i) => {
        const depth = ((i % 4) + 1) * 6;
        chip.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });

    wrap.addEventListener("mouseleave", () => {
      terminal.style.transform = "";
      wrap.querySelectorAll(".tech-chip").forEach((chip) => {
        chip.style.transform = "";
      });
    });
  }

  /* ---------- Card tilt ---------- */
  function initTilt() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 8;
        const rotateY = (x - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Architecture tooltips ---------- */
  function initArchitecture() {
    const diagram = document.getElementById("arch-diagram");
    const tooltip = document.getElementById("arch-tooltip");
    if (!diagram || !tooltip) return;

    const nodes = diagram.querySelectorAll(".arch-node[data-tip]");

    function showTip(node) {
      const tip = node.getAttribute("data-tip");
      if (!tip) return;
      tooltip.textContent = tip;
      tooltip.hidden = false;

      const diagramRect = diagram.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const top = nodeRect.bottom - diagramRect.top + 10;
      const left = nodeRect.left - diagramRect.left + nodeRect.width / 2;
      tooltip.style.top = top + "px";
      tooltip.style.left = left + "px";
      tooltip.style.bottom = "auto";
      tooltip.style.transform = "translateX(-50%)";
    }

    function hideTip() {
      tooltip.hidden = true;
    }

    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => showTip(node));
      node.addEventListener("mouseleave", hideTip);
      node.addEventListener("focus", () => showTip(node));
      node.addEventListener("blur", hideTip);
    });
  }

  /* ---------- Resume download check ---------- */
  function initResume() {
    const btn = document.getElementById("resume-btn");
    if (!btn) return;

    const href = btn.getAttribute("href");
    fetch(href, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Resume PDF will be available soon. Please contact Sai Ramya via email or WhatsApp.");
          });
        }
      })
      .catch(() => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Resume PDF will be available soon. Please contact Sai Ramya via email or WhatsApp.");
        });
      });
  }

  /* ---------- Contact form → WhatsApp ---------- */
  function sanitize(str) {
    return String(str || "")
      .replace(/[<>]/g, "")
      .trim();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  function setInvalid(input, message) {
    input.classList.add("is-invalid");
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback && message) feedback.textContent = message;
  }

  function clearInvalid(input) {
    input.classList.remove("is-invalid");
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = form.querySelector("#name");
      const emailInput = form.querySelector("#email");
      const phoneInput = form.querySelector("#phone");
      const subjectInput = form.querySelector("#subject");
      const messageInput = form.querySelector("#message");

      [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(clearInvalid);

      const name = sanitize(nameInput.value);
      const email = sanitize(emailInput.value);
      const phone = sanitize(phoneInput.value);
      const subject = sanitize(subjectInput.value);
      const message = sanitize(messageInput.value);

      let valid = true;

      if (!name) {
        setInvalid(nameInput, "Please enter your name.");
        valid = false;
      }

      if (!email || !isValidEmail(email)) {
        setInvalid(emailInput, "Please enter a valid email.");
        valid = false;
      }

      if (!phone || !isValidPhone(phone)) {
        setInvalid(phoneInput, "Please enter a valid phone number (10–15 digits).");
        valid = false;
      }

      if (!subject) {
        setInvalid(subjectInput, "Please enter a subject.");
        valid = false;
      }

      if (!message) {
        setInvalid(messageInput, "Please enter your message.");
        valid = false;
      }

      if (!valid) {
        if (status) status.textContent = "";
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const text = [
        "Hello Sai Ramya,",
        "",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Subject: " + subject,
        "",
        "Message:",
        message,
      ].join("\n");

      if (status) status.textContent = "Opening WhatsApp...";

      const url = "https://wa.me/919391939868?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(() => {
        if (status) status.textContent = "";
      }, 3000);
    });

    form.querySelectorAll(".form-control").forEach((input) => {
      input.addEventListener("input", () => clearInvalid(input));
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initLoader();
    initCursor();
    initParticles();
    initNavbar();
    initScrollTop();
    initReveal();
    initWorkflow();
    initHeroParallax();
    initTilt();
    initArchitecture();
    initResume();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
