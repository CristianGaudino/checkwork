'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendEnquiry, type ContactState } from '@/app/contact/actions';
import { Turnstile } from '@/components/Turnstile';
import { NEEDS } from '@/content/contact';

const field = 'w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted aria-[invalid=true]:border-red-400';

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-2">
            <label htmlFor={id} className="font-medium">{label}{hint && <span className="ml-1 font-normal text-fg-muted">({hint})</span>}</label>
            {children}
            {error && <p id={`${id}-error`} className="text-sm text-red-300">{error}</p>}
        </div>
    );
}

export function ContactForm() {
    const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: 'idle' });
    const form = useRef<HTMLFormElement>(null);

    // After a failed send, put the cursor on the first field to fix (or the message) so keyboard and screen-reader users are not left at the button
    useEffect(() => {
        if (state.status !== 'error') return;
        form.current?.querySelector<HTMLElement>('[aria-invalid=true]')?.focus();
    }, [state]);

    if (state.status === 'sent') {
        return (
            <div role="status" className="rounded-2xl border border-line bg-surface p-8">
                <h2 className="font-display text-2xl font-semibold">Message sent</h2>
                <p className="mt-2 text-fg-muted">We will reply by email.</p>
            </div>
        );
    }

    const v = state.values ?? {};
    const e = state.errors ?? {};
    const props = (name: keyof typeof e) => ({ name, id: name, defaultValue: v[name] ?? '', className: field, 'aria-invalid': e[name] ? true : undefined, 'aria-describedby': e[name] ? `${name}-error` : undefined });

    return (
        <form ref={form} action={action} noValidate className="grid gap-6">
            <p aria-hidden="true" className="absolute -left-[9999px]">
                <label>Leave this empty <input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
            </p>
            <Field id="name" label="Your name" error={e.name}><input {...props('name')} type="text" autoComplete="name" required /></Field>
            <Field id="business" label="Business name" hint="optional" error={e.business}><input {...props('business')} type="text" autoComplete="organization" /></Field>
            <Field id="email" label="Email" error={e.email}><input {...props('email')} type="email" autoComplete="email" required /></Field>
            <Field id="phone" label="Phone" hint="optional" error={e.phone}><input {...props('phone')} type="tel" autoComplete="tel" /></Field>
            <Field id="need" label="What do you need?" error={e.need}>
                <select {...props('need')} defaultValue={v.need ?? NEEDS[0]}>{NEEDS.map(n => <option key={n}>{n}</option>)}</select>
            </Field>
            <Field id="message" label="Tell us about it" error={e.message}><textarea {...props('message')} rows={6} required /></Field>
            <Turnstile resetKey={state} />
            {state.message && <p role="alert" className="text-red-300">{state.message}</p>}
            <div>
                <button type="submit" disabled={pending} className="inline-flex items-center justify-center rounded-xl bg-action px-5 py-3.5 text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-action-hover active:scale-[0.97] disabled:opacity-60">
                    {pending ? 'Sending' : 'Send message'}
                </button>
            </div>
        </form>
    );
}
