import CountUp from '@/components/CountUp';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHeader>
          <h2 className="label">Work</h2>
          <p className="label hidden min-[480px]:block">
            <CountUp target={projects.length} suffix="repositories" />
          </p>
        </SectionHeader>
        <ul className="section-body mt-2">
          {projects.map((project, index) => (
            <ScrollReveal as="li" key={project.id} className="work-row" stagger={index}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-draw"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="flex shrink-0 items-center gap-4">
                  {project.demoUrl && project.demoUrl !== project.githubUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label link"
                    >
                      demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label link"
                  >
                    source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted text-pretty">
                {project.description}
              </p>
              <p className="label mt-2">{project.tech.join(' · ')}</p>
            </ScrollReveal>
          ))}
        </ul>
        <ScrollReveal
          className="work-row flex justify-end"
          stagger={projects.length}
        >
          <a
            href={`${profile.githubUrl}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="label link"
          >
            all repositories <span aria-hidden="true">↗</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
