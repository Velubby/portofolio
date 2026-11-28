export function navigateToHash(hash: string) {
  if (typeof window === 'undefined') return;

  const id = hash.replace(/^#/, '');
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsViewTransition =
    typeof document.startViewTransition === 'function';

  const scroll = (behavior: ScrollBehavior) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior });
    } else {
      target.scrollIntoView({ behavior, block: 'start' });
    }

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (reduced || !supportsViewTransition) {
    scroll(reduced ? 'instant' : 'smooth');
    return;
  }

  const transition = document.startViewTransition(() => {
    scroll('instant');
  });

  // A transition can be skipped when the tab is hidden or interrupted.
  transition.finished.catch(() => {});
}
