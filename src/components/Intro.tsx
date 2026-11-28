import { profile } from '@/data/profile';
import MagneticTitle from '@/components/MagneticTitle';

export default function Intro() {
  return (
    <section className="wrap pb-12 pt-14 md:pb-16 md:pt-20">
      <MagneticTitle text={profile.handle} />
      <p className="label mt-4">{profile.role}</p>
      <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink-soft text-pretty">
        {profile.summary}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
    </section>
  );
}
