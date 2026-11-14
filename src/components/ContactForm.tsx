'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendEnquiry, type ContactState } from '@/app/contact/actions';
import { DemoButton } from '@/components/DemoButton';
import { Turnstile } from '@/components/Turnstile';
import { DEALER_NEEDS, INTERESTS, NEED_HINTS, NEEDS, REPLIES, STOCK_SIZES, STOCK_SOURCES } from '@/content/contact';

const field = 'w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted aria-[invalid=true]:border-red-400';
// A choice drawn as a chip or card: the input is visually hidden, the label shows its state and its keyboard focus
const chip = 'cursor-pointer rounded-xl border border-line px-4 py-2.5 transition-colors hover:border-fg/40 has-[:checked]:border-accent-alt has-[:checked]:bg-accent/15 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-alt';
const legend = 'mb-3 font-medium';
const hidden = 'sr-only';

function Field({ id, label, hint, error, children }: { id: string; label: React.ReactNode; hint?: React.ReactNode; error?: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-2">
            <label htmlFor={id} className="font-medium">{label}{hint && <>{' '}<span className="font-normal text-fg-muted">{hint}</span></>}</label>
            {children}
            {error && <p id={`${id}-error`} className="text-sm text-red-300">{error}</p>}
        </div>
    );
}

function Choices({ name, label, options, checked, type = 'radio', error }: { name: string; label: React.ReactNode; options: readonly string[]; checked: (o: string) => boolean; type?: 'radio' | 'checkbox'; error?: string }) {
    return (
        <fieldset aria-describedby={error ? `${name}-error` : undefined}>
            <legend className={legend}>{label}</legend>
            <div className="flex flex-wrap gap-2">
                {options.map(o => (
                    <label key={o} className={chip}>
                        <input type={type} name={name} value={o} defaultChecked={checked(o)} className={hidden} />
                        {o}
                    </label>
                ))}
            </div>
            {error && <p id={`${name}-error`} className="mt-2 text-sm text-red-300">{error}</p>}
        </fieldset>
    );
}

function Sent({ dealer }: { dealer?: boolean }) {
    return (
        <div role="status" className="rise grid gap-4 rounded-2xl border border-line bg-surface p-8">
            <h2 className="font-display text-2xl font-semibold">Message sent</h2>
            <p className="text-fg-muted">Thanks. We read every message ourselves and reply the way you asked.</p>
            {dealer && (
                <>
                    <p className="text-fg-muted">While you wait, try the demo: search the stock, open a car and send it an enquiry.</p>
                    <div><DemoButton variant="secondary" /></div>
                </>
            )}
        </div>
    );
}

export function ContactForm({ need }: { need?: (typeof NEEDS)[number] }) {
    const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: 'idle' });
    const form = useRef<HTMLFormElement>(null);

    // After a failed send, put the cursor on the first field to fix (or the message) so keyboard and screen-reader users are not left at the button
    useEffect(() => {
        if (state.status !== 'error') return;
        form.current?.querySelector<HTMLElement>('[aria-invalid=true], fieldset[aria-describedby] input')?.focus();
    }, [state]);

    if (state.status === 'sent') return <Sent dealer={state.dealer} />;

    const v = state.values ?? {};
    const e = state.errors ?? {};
    const props = (name: keyof typeof e) => ({ name, id: name, defaultValue: v[name] ?? '', className: field, 'aria-invalid': e[name] ? true : undefined, 'aria-describedby': e[name] ? `${name}-error` : undefined });
    const chosen = v.need ?? need;
    const ticked = new Set((v.interests ?? '').split('|'));

    return (
        // `group`: the dealer questions and the "optional" on the message follow whichever choice is ticked, with no script
        <form ref={form} action={action} noValidate className="group grid gap-10">
            <p aria-hidden="true" className="absolute -left-[9999px]">
                <label>Leave this empty <input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
            </p>

            <fieldset aria-describedby={e.need ? 'need-error' : undefined}>
                <legend className="mb-4 font-display text-2xl font-semibold">What do you need?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                    {NEEDS.map(n => (
                        <label key={n} className={`${chip} grid gap-1 p-4`}>
                            <input type="radio" name="need" value={n} defaultChecked={n === chosen} className={hidden} data-dealer={(DEALER_NEEDS as readonly string[]).includes(n) || undefined} />
                            <span className="font-semibold">{n}</span>
                            <span className="text-sm text-fg-muted">{NEED_HINTS[n]}</span>
                        </label>
                    ))}
                </div>
                {e.need && <p id="need-error" className="mt-2 text-sm text-red-300">{e.need}</p>}
            </fieldset>

            <div className="hidden gap-8 rounded-2xl border border-line bg-surface p-5 group-has-[[data-dealer]:checked]:grid sm:p-7">
                <div className="grid gap-1">
                    <h2 className="font-display text-2xl font-semibold">About your dealership</h2>
                    <p className="text-sm text-fg-muted">Tap what fits. It all helps, none of it is required.</p>
                </div>
                <Choices name="stock" label="How many cars do you usually have in stock?" options={STOCK_SIZES} checked={o => v.stock === o} />
                <Choices name="source" label="Where is your stock kept now?" options={STOCK_SOURCES} checked={o => v.source === o} />
                <Field id="website" label="Your website now" hint="(if you have one)" error={e.website}>
                    <input {...props('website')} type="text" inputMode="url" autoComplete="url" placeholder="www.yourdealership.ie" />
                </Field>
                <Choices name="interests" type="checkbox" label={<>What would you like to see? <span className="font-normal text-fg-muted">(pick any)</span></>} options={INTERESTS} checked={o => ticked.has(o)} />
                <label className={`${chip} flex items-center gap-3 justify-self-start`}>
                    <input type="checkbox" name="walkthrough" value="yes" defaultChecked={v.walkthrough === 'yes'} className="size-4 accent-[var(--accent-alt)]" />
                    Walk me through the demo on a call
                </label>
            </div>

            <div className="grid gap-6">
                <h2 className="font-display text-2xl font-semibold">About you</h2>
                <Field id="name" label="Your name" error={e.name}><input {...props('name')} type="text" autoComplete="name" required /></Field>
                <Field id="business" label="Business name" hint="(optional)" error={e.business}><input {...props('business')} type="text" autoComplete="organization" /></Field>
                <Field id="email" label="Email" error={e.email}><input {...props('email')} type="email" autoComplete="email" required /></Field>
                <Field id="phone" label="Phone" hint="(optional, unless you want a call)" error={e.phone}><input {...props('phone')} type="tel" autoComplete="tel" /></Field>
                <Choices name="reply" label="How should we reply?" options={REPLIES} checked={o => (v.reply ?? REPLIES[0]) === o} />
                <Field id="message" label="Tell us about it" hint={<span className="hidden group-has-[[data-dealer]:checked]:inline">(optional)</span>} error={e.message}>
                    <textarea {...props('message')} rows={5} placeholder="What is not working today, and what should the site do?" />
                </Field>
            </div>

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
