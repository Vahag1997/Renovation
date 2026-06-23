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
  [
    "/portfolio/:category/:project",
    "app/portfolio/[category]/[project]/page.tsx",
  ],
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
const projectData = readFileSync(join(root, "app", "_data", "projects.ts"), "utf8");
const portfolioData = readFileSync(join(root, "app", "_data", "portfolio.ts"), "utf8");
const supabaseLib = readFileSync(join(root, "app", "_lib", "supabase.ts"), "utf8");
const supabaseAdminLib = readFileSync(join(root, "app", "_lib", "supabaseAdmin.ts"), "utf8");
const authLib = readFileSync(join(root, "app", "_lib", "auth.ts"), "utf8");
const adminActions = readFileSync(join(root, "app", "admin", "_actions.ts"), "utf8");
const adminLogin = readFileSync(join(root, "app", "admin", "login", "page.tsx"), "utf8");

for (const [href, pagePath] of expectedRoutes) {
  assert.ok(existsSync(join(root, pagePath)), `${href} should have ${pagePath}`);
  if (!href.includes(":")) {
    assert.match(routeData, new RegExp(`href:\\s*"${href.replaceAll("/", "\\/")}"`), `${href} should be in route data`);
  }
}

assert.match(routeData, /heroImage:/, "routes should include visual hero images");
assert.match(shell, /site-footer/, "site shell should include a website footer");
assert.match(placeholder, /home-hero/, "home page should render a real website hero");
assert.match(placeholder, /page-showcase/, "inner routes should render website-like page sections");
assert.match(shell, /utility-bar/, "site shell should include a polished utility bar");
assert.match(placeholder, /home-hero-shell/, "home hero should have a composed content shell");
assert.match(placeholder, /route-preview-strip/, "home page should include a route preview strip");
assert.match(styles, /\.feature-card:nth-child/, "feature cards should have an art-directed layout");
assert.match(projectData, /getProjectHref/, "project data should expose detail route hrefs");
assert.match(supabaseLib, /hasSupabaseConfig/, "public Supabase client should expose config availability");
assert.match(supabaseLib, /: null/, "public Supabase client should not instantiate without env vars");
assert.match(portfolioData, /portfolioProjects/, "database portfolio reads should have a static fallback");
assert.match(portfolioData, /!hasSupabaseConfig/, "portfolio reads should fall back when Supabase env vars are missing");
assert.match(supabaseAdminLib, /new Proxy/, "admin Supabase client should be lazy at module load");
assert.match(authLib, /hasAdminPasswordConfig/, "admin auth should expose password config availability");
assert.match(authLib, /FALLBACK_ADMIN_PASSWORD = "StudioAura2026"/, "admin auth should include the temporary project password");
assert.match(adminActions, /\/admin\/login\?config=1/, "admin login should distinguish missing password config");
assert.match(adminActions, /\.trim\(\)/, "admin login should trim copied password input");
assert.match(adminLogin, /ADMIN_PASSWORD/, "admin login should explain missing password configuration");
assert.match(projectData, /heroVideo:/, "portfolio projects should support hero video media");
assert.match(projectData, /\/media\/project-hero\.mp4/, "project hero video should use a local public asset");
assert.match(projectData, /gallery:/, "portfolio projects should include gallery images");
assert.match(projectData, /tasks:/, "portfolio projects should include project task lists");
assert.match(projectData, /storySections:/, "portfolio projects should include editorial story sections");
assert.ok(
  existsSync(join(root, "app", "_components", "ProjectDetailPage.tsx")),
  "portfolio project details should have a reusable detail component",
);
const detailPage = readFileSync(join(root, "app", "_components", "ProjectDetailPage.tsx"), "utf8");
assert.ok(
  existsSync(join(root, "app", "_components", "ProjectGallery.tsx")),
  "project gallery should have an interactive gallery component",
);
assert.ok(
  existsSync(join(root, "app", "_components", "BeforeAfterSlider.tsx")),
  "project detail should use the existing before/after slider pattern",
);
const projectGallery = readFileSync(join(root, "app", "_components", "ProjectGallery.tsx"), "utf8");
const beforeAfter = readFileSync(join(root, "app", "_components", "BeforeAfterSlider.tsx"), "utf8");
assert.match(detailPage, /project-detail-hero/, "project detail should include a media hero");
assert.match(detailPage, /project-hero-video/, "project detail video should have a dedicated animated hero class");
assert.match(detailPage, /<video/, "project detail hero should render an actual video element");
assert.ok(
  existsSync(join(root, "public", "media", "project-hero.mp4")),
  "local project hero video should exist in public/media",
);
assert.match(detailPage, /ProjectGallery/, "project detail should render the interactive gallery component");
assert.match(detailPage, /BeforeAfterSlider/, "project detail should render the before/after comparison component");
assert.match(placeholder, /BeforeAfterSlider/, "portfolio category pages should reuse the before/after slider");
assert.doesNotMatch(detailPage, /ProjectBeforeAfter/, "project detail should not use the discarded ProjectBeforeAfter component");
assert.ok(
  !existsSync(join(root, "app", "_components", "ProjectBeforeAfter.tsx")),
  "discarded ProjectBeforeAfter component should not exist",
);
assert.match(beforeAfter, /before-after-slider/, "before/after component should expose the slider surface");
assert.match(beforeAfter, /setSliderPosition/, "before/after component should support drag updates");
assert.match(
  beforeAfter,
  /containerRef\.current\?\.getBoundingClientRect\(\)\.width/,
  "before/after slider should preserve the original after-image width behavior",
);
assert.match(projectGallery, /project-gallery-grid/, "project gallery should include a photo grid");
assert.match(projectGallery, /project-gallery-tile/, "project gallery should include animated gallery tiles");
assert.match(projectGallery, /gallery-slider/, "project gallery should open a slider modal");
assert.match(projectGallery, /role="dialog"/, "gallery slider should be exposed as a dialog");
assert.match(projectGallery, /gallery-slider-close/, "gallery slider should expose a stable close control");
assert.match(projectGallery, /ArrowRight/, "gallery slider should support keyboard next navigation");
assert.match(styles, /projectGalleryTileIn/, "gallery tiles should have stronger entry animation");
assert.match(detailPage, /more-projects/, "project detail should include related projects");
