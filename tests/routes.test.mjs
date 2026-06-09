import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const expectedRoutes = [
  ["/", "app/page.tsx"],
  ["/uslugi", "app/uslugi/page.tsx"],
  ["/uslugi/remont-kvartir", "app/uslugi/remont-kvartir/page.tsx"],
  ["/uslugi/remont-domov", "app/uslugi/remont-domov/page.tsx"],
  ["/uslugi/dizayn-proekty", "app/uslugi/dizayn-proekty/page.tsx"],
  [
    "/uslugi/remont-kommercheskih-pomescheniy",
    "app/uslugi/remont-kommercheskih-pomescheniy/page.tsx",
  ],
  ["/uslugi/landshaftnyy-dizayn", "app/uslugi/landshaftnyy-dizayn/page.tsx"],
  ["/portfolio", "app/portfolio/page.tsx"],
  ["/portfolio/kvartiry", "app/portfolio/kvartiry/page.tsx"],
  ["/portfolio/doma", "app/portfolio/doma/page.tsx"],
  ["/portfolio/proekty", "app/portfolio/proekty/page.tsx"],
  [
    "/portfolio/kommercheskie-pomescheniya",
    "app/portfolio/kommercheskie-pomescheniya/page.tsx",
  ],
  ["/portfolio/landshaft", "app/portfolio/landshaft/page.tsx"],
  ["/kontakty", "app/kontakty/page.tsx"],
  ["/o-kompanii", "app/o-kompanii/page.tsx"],
  ["/partnery", "app/partnery/page.tsx"],
];

const root = process.cwd();
const routeDataPath = join(root, "app", "_data", "routes.ts");

assert.ok(existsSync(routeDataPath), "app/_data/routes.ts should define navigation routes");

const routeData = readFileSync(routeDataPath, "utf8");
const shell = readFileSync(join(root, "app", "_components", "SiteShell.tsx"), "utf8");
const placeholder = readFileSync(join(root, "app", "_components", "RoutePlaceholder.tsx"), "utf8");
const styles = readFileSync(join(root, "app", "globals.css"), "utf8");

for (const [href, pagePath] of expectedRoutes) {
  assert.ok(existsSync(join(root, pagePath)), `${href} should have ${pagePath}`);
  assert.match(routeData, new RegExp(`href:\\s*"${href.replaceAll("/", "\\/")}"`), `${href} should be in route data`);
}

assert.match(routeData, /heroImage:/, "routes should include visual hero images");
assert.match(shell, /site-footer/, "site shell should include a website footer");
assert.match(placeholder, /home-hero/, "home page should render a real website hero");
assert.match(placeholder, /page-showcase/, "inner routes should render website-like page sections");
assert.match(shell, /utility-bar/, "site shell should include a polished utility bar");
assert.match(placeholder, /home-hero-shell/, "home hero should have a composed content shell");
assert.match(placeholder, /route-preview-strip/, "home page should include a route preview strip");
assert.match(styles, /\.feature-card:nth-child/, "feature cards should have an art-directed layout");
