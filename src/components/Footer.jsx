function top(event) {
  event.preventDefault();
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0 });
}

export default function Footer() {
  return (
    <footer className="footer">
      <div><strong>SAI RAMYA</strong> Full Stack Developer</div>
      <a className="to-top" href="#top" onClick={top} data-cursor="link">BACK TO TOP ↑</a>
    </footer>
  );
}
