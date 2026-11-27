import { profile } from '@/data/profile';

export default function Contact() {
  return (
    <section id="contact" className="section border-t border-rule">
      <div className="wrap">
        <h2 className="label">03 — Contact</h2>
        <p className="mt-4 text-lg font-medium tracking-[-0.01em]">
          Open to work and collaboration.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label link"
          >
            github <span aria-hidden="true">↗</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label link"
          >
            linkedin <span aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${profile.email}`} className="label link">
            email <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
