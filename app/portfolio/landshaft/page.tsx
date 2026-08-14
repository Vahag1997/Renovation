import { RoutePlaceholder } from "@/app/_components/RoutePlaceholder";

// Cached shell, refreshed on demand by the admin panel (revalidatePath) and at
// most every 5 minutes as a safety net.
export const revalidate = 300;

export default function Page() {
  return <RoutePlaceholder href="/portfolio/landshaft" />;
}
