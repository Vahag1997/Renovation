import { RoutePlaceholder } from "@/app/_components/RoutePlaceholder";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return <RoutePlaceholder href="/portfolio/landshaft" />;
}
