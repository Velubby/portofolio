'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { navigateToHash } from '@/lib/navigate';

type CommandAction =
  | { type: 'scroll'; target: string }
  | { type: 'external'; url: string }
  | { type: 'copy-email' }
  | { type: 'mailto' };

type CommandItem = {
  id: string;
  group: 'Navigate' | 'Work' | 'Links';
  label: string;
  meta?: string;
  keywords: string;
  action: CommandAction;
};

export const COMMAND_PALETTE_OPEN_EVENT = 'command-palette:open';

const BASE_COMMANDS: CommandItem[] = [
  {
    id: 'nav-work',
    group: 'Navigate',
    label: 'Work',
    keywords: 'projects repositories work',
    action: { type: 'scroll', target: 'work' },
  },
  {
    id: 'nav-stack',
    group: 'Navigate',
    label: 'Stack',
    keywords: 'tech stack tools languages',
    action: { type: 'scroll', target: 'stack' },
  },
  {
    id: 'nav-contact',
    group: 'Navigate',
    label: 'Contact',
    keywords: 'contact hire open email',
    action: { type: 'scroll', target: 'contact' },
  },
  {
    id: 'nav-top',
    group: 'Navigate',
    label: 'Back to top',
    meta: '↑',
    keywords: 'top hero intro home',
    action: { type: 'scroll', target: 'top' },
  },
  ...projects.flatMap((project): CommandItem[] => {
    const items: CommandItem[] = [
      {
        id: `work-${project.id}`,
        group: 'Work',
        label: project.title,
        meta: 'source ↗',
        keywords: `${project.title} ${project.description} ${project.tech.join(' ')} github`,
        action: { type: 'external', url: project.githubUrl },
      },
    ];
    if (project.demoUrl && project.demoUrl !== project.githubUrl) {
      items.push({
        id: `work-demo-${project.id}`,
        group: 'Work',
        label: `${project.title} — Demo`,
        meta: 'demo ↗',
        keywords: `${project.title} live demo preview ${project.tech.join(' ')}`,
        action: { type: 'external', url: project.demoUrl },
      });
    }
    return items;
  }),
  {
    id: 'link-copy-email',
    group: 'Links',
    label: 'Copy email address',
    meta: 'copy',
    keywords: `copy email mail clipboard ${profile.email}`,
    action: { type: 'copy-email' },
  },
  {
    id: 'link-github',
    group: 'Links',
    label: 'GitHub profile',
    meta: 'github ↗',
    keywords: 'github profile repositories velubby',
    action: { type: 'external', url: profile.githubUrl },
  },
  {
    id: 'link-linkedin',
    group: 'Links',
    label: 'LinkedIn profile',
    meta: 'linkedin ↗',
    keywords: 'linkedin profile connect',
    action: { type: 'external', url: profile.linkedinUrl },
  },
  {
    id: 'link-mailto',
    group: 'Links',
    label: 'Compose email',
    meta: 'email ↗',
    keywords: 'send compose mailto email',
    action: { type: 'mailto' },
  },
];

export default function CommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeTimerRef = useRef(0);
  const copiedTimerRef = useRef(0);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const close = useCallback((onClosed?: () => void) => {
    setVisible(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closeTimerRef.current = window.setTimeout(
      () => {
        setMounted(false);
        lastFocusedRef.current?.focus();
        onClosed?.();
      },
      calm ? 0 : 140,
    );
  }, []);

  const open = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = 0;
    }
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery('');
    setActiveIndex(0);
    setMounted(true);
    window.requestAnimationFrame(() => {
      setVisible(true);
      inputRef.current?.focus();
    });
  }, []);

  const execute = useCallback(
    (item: CommandItem) => {
      const { action } = item;

      if (action.type === 'scroll') {
        close(() => navigateToHash(`#${action.target}`));
        return;
      }

      if (action.type === 'external') {
        close();
        window.open(action.url, '_blank', 'noopener,noreferrer');
        return;
      }

      if (action.type === 'mailto') {
        close();
        window.location.href = `mailto:${profile.email}`;
        return;
      }

      const markCopied = () => {
        setCopied(true);
        if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
        copiedTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(profile.email)
          .then(markCopied)
          .catch(() => {
            window.location.href = `mailto:${profile.email}`;
          });
      } else {
        window.location.href = `mailto:${profile.email}`;
      }
    },
    [close],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BASE_COMMANDS;
    return BASE_COMMANDS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q),
    );
  }, [query]);

  const safeIndex =
    filtered.length === 0 ? -1 : Math.min(Math.max(activeIndex, 0), filtered.length - 1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (visible) {
          close();
        } else {
          open();
        }
        return;
      }

      if (event.key === '/' && !isEditable && !visible) {
        event.preventDefault();
        open();
        return;
      }

      if (event.key === 'Escape' && visible) {
        event.preventDefault();
        close();
      }
    };

    const onOpenEvent = () => open();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    };
  }, [close, open, visible]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!mounted || !indicator) return;

    if (safeIndex < 0) {
      indicator.style.opacity = '0';
      return;
    }

    const activeEl = itemRefs.current[safeIndex];
    if (!activeEl) {
      indicator.style.opacity = '0';
      return;
    }

    indicator.style.opacity = '1';
    indicator.style.height = `${activeEl.offsetHeight}px`;
    indicator.style.transform = `translate3d(0, ${activeEl.offsetTop}px, 0)`;
    activeEl.scrollIntoView({ block: 'nearest' });
  }, [mounted, safeIndex, filtered.length]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % filtered.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + filtered.length) % filtered.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(filtered.length - 1);
      return;
    }

    if (event.key === 'Enter' && safeIndex >= 0) {
      event.preventDefault();
      const chosen = filtered[safeIndex];
      if (chosen) execute(chosen);
    }
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
    >
      <div
        aria-hidden="true"
        onClick={() => close()}
        className={`palette-backdrop fixed inset-0 bg-ink/15 backdrop-blur-[2px] ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        data-command-palette
        className={`palette-panel relative z-10 w-full max-w-[460px] border border-ink bg-canvas shadow-[0_18px_48px_rgba(17,17,17,0.12)] ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-1.5 scale-[0.97] opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <span aria-hidden="true" className="label text-ink">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Jump, open repo, or copy email..."
            aria-label="Filter commands"
            aria-controls="command-palette-list"
            aria-activedescendant={
              safeIndex >= 0 ? `cmd-${filtered[safeIndex]?.id}` : undefined
            }
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <span className="label shrink-0 tabular-nums">
            {String(filtered.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => close()}
            className="label shrink-0 border border-rule px-1.5 py-0.5 text-[10px] leading-none transition-colors hover:border-ink hover:text-ink"
          >
            esc
          </button>
        </div>

        <div
          id="command-palette-list"
          role="listbox"
          className="relative max-h-[320px] overflow-y-auto py-1.5"
        >
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="palette-indicator pointer-events-none absolute inset-x-0 top-0 border-l-2 border-ink bg-ink/[0.055]"
            style={{ opacity: 0 }}
          />

          {filtered.length === 0 ? (
            <p className="label px-4 py-6 text-center">No matching commands.</p>
          ) : (
            filtered.map((item, index) => {
              const previous = filtered[index - 1];
              const showGroup = !previous || previous.group !== item.group;
              const isActive = index === safeIndex;
              const isCopied = item.action.type === 'copy-email' && copied;

              return (
                <div key={item.id}>
                  {showGroup && (
                    <div className="label px-4 pb-1 pt-2.5 text-[10px]">{item.group}</div>
                  )}
                  <button
                    id={`cmd-${item.id}`}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => execute(item)}
                    className="relative flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition-colors"
                  >
                    <span className={isActive ? 'font-medium text-ink' : 'text-ink-soft'}>
                      {item.label}
                    </span>
                    {item.meta && (
                      <span
                        className={`label shrink-0 transition-colors ${
                          isCopied || isActive ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {isCopied ? 'copied ✓' : item.meta}
                      </span>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-rule-soft px-4 py-2">
          <span className="label text-[10px]">↑↓ navigate · enter run</span>
          <span className="label text-[10px]">⌘k / /</span>
        </div>
      </div>
    </div>
  );
}
