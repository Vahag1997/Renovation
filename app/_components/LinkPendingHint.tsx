"use client";

import { useLinkStatus } from "next/link";

/**
 * Inline pending dot for a nav link. Must be rendered inside a `<Link>`.
 *
 * The element is always present at a fixed size and only its opacity changes,
 * so an in-flight navigation can never shift the header layout. When the target
 * route is already prefetched the pending state is skipped entirely, which is
 * the common case here.
 */
export function LinkPendingHint() {
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden className={`link-hint ${pending ? "is-pending" : ""}`} />
  );
}
