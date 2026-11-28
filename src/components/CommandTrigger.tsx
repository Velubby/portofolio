'use client';

import { COMMAND_PALETTE_OPEN_EVENT } from '@/components/CommandPalette';

export default function CommandTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_OPEN_EVENT))}
      aria-label="Open command menu"
      title="Command menu (Ctrl+K / ⌘K or /)"
      className="label border border-rule px-1.5 py-0.5 text-[10px] leading-none text-muted transition-colors hover:border-ink hover:text-ink"
    >
      ⌘k
    </button>
  );
}
