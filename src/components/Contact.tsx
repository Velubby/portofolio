'use client';

import { useState } from 'react';
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

const DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1513038300695236728/Ql5S5GMKaxV-pCj9FFH7QwuCxXB7SVSusgVOjBrNxAqGQTGfGlL7ALzbgQ6cDh6Kv0eM';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '@everyone',
          embeds: [
            {
              title: '📬 New Message from Portfolio',
              color: 11032055,
              fields: [
                { name: '👤 Name', value: formData.name, inline: true },
                { name: '✉️ Email', value: formData.email, inline: true },
                { name: '💬 Message', value: formData.message },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputCls =
    'w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary transition-colors placeholder:text-text-muted/60 focus:border-accent focus:outline-none disabled:opacity-50';

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="section-head mb-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5">
            <span className="section-kicker">Chapter 05 — Contact</span>
            <h2 className="section-title">Say hello.</h2>
            <p className="text-text-muted leading-relaxed">
              Want to talk about mobile or web projects, code reviews, or building something
              together? My inbox is always open.
            </p>
            <div className="space-y-4 pt-2">
              <a href="mailto:ahmad.ichwani86@gmail.com" className="group flex items-center gap-3">
                <span className="rounded border border-border bg-bg-tertiary p-2.5 text-accent transition group-hover:border-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">Email Address</span>
                  <span className="text-sm font-semibold text-text-primary group-hover:text-accent">
                    ahmad.ichwani86@gmail.com
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-3">
                <span className="rounded border border-border bg-bg-tertiary p-2.5 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-text-muted">Location</span>
                  <span className="text-sm font-semibold text-text-primary">Surakarta, Indonesia</span>
                </span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              {[
                { icon: <Github className="h-5 w-5" />, url: 'https://github.com/Velubby', label: 'GitHub' },
                { icon: <Linkedin className="h-5 w-5" />, url: 'https://www.linkedin.com/in/achmad-ichwani-2033681a5/', label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded border border-border bg-bg-tertiary p-3 text-text-secondary transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="min-card p-6 md:p-8">
            {status === 'success' ? (
              <div className="space-y-4 py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent bg-accent/5 text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">Message Sent Successfully!</h3>
                <p className="mx-auto max-w-xs text-xs text-text-muted">
                  Thank you for reaching out. I&apos;ll get back to you as soon as I can.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="min-btn-outline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
                  <input id="name" name="name" type="text" required disabled={status === 'submitting'} value={formData.name} onChange={onChange} placeholder="John Doe" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-muted">Email Address</label>
                  <input id="email" name="email" type="email" required disabled={status === 'submitting'} value={formData.email} onChange={onChange} placeholder="john@example.com" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-muted">Message Content</label>
                  <textarea id="message" name="message" required disabled={status === 'submitting'} value={formData.message} onChange={onChange} rows={4} placeholder="Hi Achmad, I saw your project and..." className={`${inputCls} resize-none`} />
                </div>
                {status === 'error' && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    Please fill in all fields and try again.
                  </p>
                )}
                <button type="submit" disabled={status === 'submitting'} className="min-btn-primary">
                  {status === 'submitting' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
