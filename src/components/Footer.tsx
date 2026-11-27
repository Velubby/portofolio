export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap flex flex-wrap items-center justify-between gap-2 py-5">
        <p className="label">© {new Date().getFullYear()} velubby</p>
        <a
          href="https://github.com/Velubby/portofolio"
          target="_blank"
          rel="noopener noreferrer"
          className="label link"
        >
          source <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
