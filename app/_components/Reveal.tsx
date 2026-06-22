"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  /** Element to render as the reveal wrapper. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Thin client boundary that applies the site-wide scroll-reveal animation.
 *
 * The wrapped markup is server-rendered and passed in as `children`, so pages
 * using this stay Server Components. The `scroll-reveal` class is added on the
 * client (progressive enhancement) so content is never hidden without JS.
 */
export function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("scroll-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
