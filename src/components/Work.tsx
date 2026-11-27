import { projects } from '@/data/projects';

export default function Work() {
  return (
    <section id="work" className="section border-t border-rule">
      <div className="wrap">
        <h2 className="label">01 — Work</h2>
        <ul className="mt-2">
          {projects.map((project) => (
            <li key={project.id} className="work-row">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                  {project.title}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
