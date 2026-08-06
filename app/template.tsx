/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), which is
 * exactly what an enter animation needs — the class replays per route. Kept as
 * a Server Component so it costs no client JS.
 *
 * The animation is disabled under `prefers-reduced-motion` in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
