import { Button } from '@/components/ui/Button';
import { DEMO_URL } from '@/lib/config';

/** Opens the demo dealer website in a new tab, so the visitor can come back to this one. */
export function DemoButton({ variant = 'primary', label = 'Try the demo website' }: { variant?: 'primary' | 'secondary'; label?: string }) {
    return (
        <Button href={DEMO_URL} target="_blank" rel="noopener" variant={variant}>
            {label}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </Button>
    );
}
