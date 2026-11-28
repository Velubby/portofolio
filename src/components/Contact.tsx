import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/profile';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHeader>
          <h2 className="label">Contact</h2>
          <p className="label hidden items-center gap-2 min-[480px]:flex">
            <span aria-hidden="true" className="status-dot" />
            open
          </p>
        </SectionHeader>
        <ScrollReveal as="p" className="mt-4 text-lg font-medium tracking-[-0.01em]">
          Open to work and collaboration.
        </ScrollReveal>
        <ScrollReveal className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3" stagger={1}>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
