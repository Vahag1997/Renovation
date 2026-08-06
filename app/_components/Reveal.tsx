"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  /** Element to render as the reveal wrapper. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /**
   * Delay before this element animates in, in ms. Use ascending values on
   * sibling Reveals to make a group cascade instead of appearing at once.
   */
  delayMs?: number;
  /**
   * Stagger direct children of this element instead of animating the wrapper as
   * one block. Each child is revealed `staggerMs` after the previous one.
   */
  staggerMs?: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Thin client boundary that applies the site-wide scroll-reveal animation.
 *
 * The wrapped markup is server-rendered and passed in as `children`, so pages
 * using this stay Server Components. The `scroll-reveal` class is added on the
 * client (progressive enhancement) so content is never hidden without JS — and
 * is skipped entirely when the visitor has asked for reduced motion.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  delayMs = 0,
  staggerMs,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never hide content from someone who opted out of animation.
    if (prefersReducedMotion()) return;

    const targets: HTMLElement[] =
      staggerMs != null
        ? (Array.from(el.children).filter(
            (c): c is HTMLElement => c instanceof HTMLElement,
          ) as HTMLElement[])
        : [el];

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      const delay = delayMs + (staggerMs != null ? index * staggerMs : 0);
      if (delay) target.style.transitionDelay = `${delay}ms`;
    });

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

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [delayMs, staggerMs]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
