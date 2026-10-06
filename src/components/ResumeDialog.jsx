import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "../data/siteConfig.js";

function mailUrl(subject, body) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openMail(subject, body) {
  window.open(mailUrl(subject, body), "_blank", "noopener,noreferrer");
}

export default function ResumeDialog({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const ready = () => {
    if (!name.trim() || !email.trim()) {
      setError("Fill in your name and email, then share.");
      return false;
    }
    setError("");
    return true;
  };

  const message = () => [
    `Hi ${siteConfig.shortName},`,
    `I am ${name.trim()} (${email.trim()}).`,
    "Please share your resume.",
    note.trim(),
  ].filter(Boolean).join("\n");

  const shareWhatsApp = () => {
    if (!ready()) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message())}`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    onClose();
  };

  const sendEmail = () => {
    if (!ready()) return;
    openMail(`Resume request from ${name.trim()}`, message());
    onClose();
  };

  return createPortal(
    <div className="alert-back" onClick={onClose} role="presentation">
      <div className="alert" role="dialog" aria-modal="true" aria-labelledby="resume-title" onClick={(event) => event.stopPropagation()}>
        <div className="alert-icon" aria-hidden="true">!</div>
        <h3 id="resume-title">Request the resume</h3>
        <p className="muted">Fill this in, then send it by email or share it on WhatsApp.</p>
        <form className="alert-form" onSubmit={(event) => { event.preventDefault(); sendEmail(); }}>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Note
            <textarea value={note} onChange={(event) => setNote(event.target.value)} name="note" rows="3" />
          </label>
          {error ? <p className="alert-error">{error}</p> : null}
          <div className="actions">
            <button className="btn btn-gold" type="submit">EMAIL ME</button>
            <button className="btn btn-line" type="button" onClick={shareWhatsApp}>SHARE ON WHATSAPP</button>
            <button className="btn btn-line" type="button" onClick={onClose}>CLOSE</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
