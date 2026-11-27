import { profile } from '@/data/profile';

export default function Intro() {
  return (
    <section className="wrap pb-12 pt-14 md:pb-16 md:pt-20">
      <h1 className="text-[clamp(2.5rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">
        {profile.handle}
      </h1>
      <p className="mt-4 text-[15px] font-medium">{profile.role}</p>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted text-pretty">
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
