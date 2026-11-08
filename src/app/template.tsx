import { ViewTransition } from 'react';

// A template remounts on every navigation, so the page content fades out and the next one rises in. The header and footer stay put.
export default function Template({ children }: { children: React.ReactNode }) {
    return <ViewTransition enter="page-in" exit="page-out" default="none">{children}</ViewTransition>;
}
