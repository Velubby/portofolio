import LocalClock from '@/components/LocalClock';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5">
        <p className="label">© {new Date().getFullYear()} velubby</p>
        <LocalClock />
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
