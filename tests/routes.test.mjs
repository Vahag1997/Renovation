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
const homePage = readFileSync(join(root, "app", "page.tsx"), "utf8");
const servicesPage = readFileSync(join(root, "app", "uslugi", "page.tsx"), "utf8");
const servicesShowcase = readFileSync(
  join(root, "app", "_components", "ServicesShowcase.tsx"),
  "utf8",
);
const servicesCarousel = readFileSync(
  join(root, "app", "_components", "ServicesCarousel3D.tsx"),
  "utf8",
);
const calculator = readFileSync(join(root, "app", "_components", "Calculator.tsx"), "utf8");
const portfolioPage = readFileSync(join(root, "app", "portfolio", "page.tsx"), "utf8");
const portfolioDetailPage = readFileSync(join(root, "app", "portfolio", "[category]", "[project]", "page.tsx"), "utf8");
const authLib = readFileSync(join(root, "app", "_lib", "auth.ts"), "utf8");
const adminActions = readFileSync(join(root, "app", "admin", "_actions.ts"), "utf8");
const adminLogin = readFileSync(join(root, "app", "admin", "login", "page.tsx"), "utf8");
const adminDashboard = readFileSync(join(root, "app", "admin", "(dashboard)", "page.tsx"), "utf8");
const adminNewProject = readFileSync(join(root, "app", "admin", "(dashboard)", "projects", "new", "page.tsx"), "utf8");
const adminEditProject = readFileSync(join(root, "app", "admin", "(dashboard)", "projects", "[id]", "page.tsx"), "utf8");

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
assert.match(shell, /openDesktopMenu/, "desktop submenus should use explicit open state");
assert.match(shell, /closeOnPointerDown/, "desktop submenus should close when clicking outside");
assert.match(shell, /closeOnEscape/, "desktop submenus should close with Escape");
assert.match(shell, /closeOnScroll/, "desktop submenus should close while scrolling");
assert.match(placeholder, /home-hero-shell/, "home hero should have a composed content shell");
assert.match(placeholder, /route-preview-strip/, "home page should include a route preview strip");
assert.match(homePage, /Капитальный ремонт/, "home hero should use the approved repair wording");
assert.doesNotMatch(homePage, /Фундаментальный Ремонт/, "obsolete home hero wording should be removed");
assert.doesNotMatch(homePage, /Сметный расчет|моментально/, "removed calculator claims should stay removed");
assert.doesNotMatch(homePage, /<Workflow/, "workflow should be removed from the homepage");
assert.match(servicesPage, /<ServicesCarousel3D \/>/, "services page should include the interactive service carousel");
assert.match(servicesPage, /<Calculator isDark \/>/, "services page should include the shared object form");
assert.match(servicesCarousel, /new THREE\.WebGLRenderer/, "service carousel should render a real WebGL scene");
assert.match(servicesCarousel, /new THREE\.PerspectiveCamera/, "service carousel should use perspective projection");
assert.match(servicesCarousel, /new THREE\.Raycaster/, "service cards should support 3D pointer selection");
assert.match(servicesCarousel, /new THREE\.PlaneGeometry/, "service routes should render as 3D planes");
assert.match(servicesCarousel, /onPointerDown=\{handlePointerDown\}/, "service carousel should support swipe gestures");
assert.match(servicesCarousel, /ArrowLeft/, "service carousel should support keyboard navigation");
assert.match(servicesCarousel, /href=\{activeService\.href\}/, "active service content should link to its route");
assert.match(servicesShowcase, /ROMAN_NUMERALS/, "homepage advantages should use Roman numerals");
assert.match(calculator, /Коммерческое помещение/, "the common form should support commercial properties");
assert.match(calculator, /Земельный участок/, "the common form should support landscape projects");
assert.match(calculator, />Объект<\/label>/, "the common form should label the property field as Object");
assert.match(calculator, /isObjectLocked/, "single-service forms should lock their object field");
assert.match(calculator, /readOnly/, "locked object fields should render without an irrelevant dropdown");
assert.match(placeholder, /SERVICE_CONFIG/, "service forms should be configured for their current route");
assert.match(placeholder, /relatedProjects/, "service pages should include relevant portfolio projects");
assert.doesNotMatch(placeholder, /<Workflow/, "workflow should not be duplicated across service pages");
assert.match(styles, /\.feature-card:nth-child/, "feature cards should have an art-directed layout");
assert.match(styles, /\.service-webgl-stage canvas/, "3D service scene should expose stable canvas styling");
assert.match(styles, /serviceWebglCopyIn/, "3D service copy should animate independently");
assert.match(styles, /overflow-x:\s*clip/, "root styles should clip horizontal bleed without creating another scroll container");
assert.doesNotMatch(
  styles,
  /html,\s*\r?\nbody\s*\{[\s\S]*?overflow-x:\s*hidden/,
  "html and body should not become nested vertical scroll containers",
);
assert.doesNotMatch(shell, /overflow-x-hidden/, "the public site shell should not create an implicit vertical scroll container");
for (const [name, source] of [
  ["home page", homePage],
  ["services page", servicesPage],
  ["portfolio page", portfolioPage],
  ["route placeholder", placeholder],
]) {
  assert.doesNotMatch(
    source,
    /<main[^>]*overflow-x-hidden/,
    `${name} should not turn its main element into a vertical scroll container`,
  );
}
assert.match(projectData, /getProjectHref/, "project data should expose detail route hrefs");
assert.match(supabaseLib, /hasSupabaseConfig/, "public Supabase client should expose config availability");
assert.match(supabaseLib, /server-only/, "public Supabase reads should stay server-only");
assert.match(supabaseLib, /SUPABASE_SERVICE_ROLE_KEY/, "public server reads should work when anon key is missing");
assert.match(supabaseLib, /: null/, "public Supabase client should not instantiate without env vars");
assert.match(portfolioData, /portfolioProjects/, "database portfolio reads should have a static fallback");
assert.match(portfolioData, /!hasSupabaseConfig/, "portfolio reads should fall back when Supabase env vars are missing");
assert.match(
  portfolioData,
  /Supabase unavailable; using bundled fallback:[\s\S]*return portfolioProjects/,
  "portfolio reads should fall back when Supabase is unavailable or misconfigured",
);
// Project data is served from the ISR cache rather than re-rendered per request
// (`force-dynamic` cannot be used: in Next 16.2.7 it postpones Suspense
// boundaries and never resumes them, which strands the loading skeletons).
// Freshness is therefore guaranteed by two things instead, both asserted here:
// a bounded revalidate window, and on-demand revalidation after admin edits.
for (const [name, source] of [
  ["home", homePage],
  ["portfolio", portfolioPage],
  ["portfolio detail", portfolioDetailPage],
]) {
  assert.match(
    source,
    /export const revalidate = [1-9]\d*/,
    `${name} should declare a bounded revalidate window so data cannot go stale forever`,
  );
  assert.doesNotMatch(
    source,
    /dynamic = "force-dynamic"/,
    `${name} must not use force-dynamic — it breaks Suspense/loading fallbacks`,
  );
}
assert.match(
  adminActions,
  /revalidatePath\("\/", "layout"\)/,
  "admin mutations should revalidate the public site so edits appear immediately",
);
assert.match(supabaseAdminLib, /new Proxy/, "admin Supabase client should be lazy at module load");
assert.match(supabaseAdminLib, /hasSupabaseAdminConfig/, "admin Supabase config should be checkable before queries");
assert.match(adminDashboard, /AdminConfigNotice/, "admin dashboard should not crash when Supabase env is missing");
assert.match(adminNewProject, /AdminConfigNotice/, "new project page should not crash when Supabase env is missing");
assert.match(adminEditProject, /AdminConfigNotice/, "edit project page should not crash when Supabase env is missing");
assert.match(authLib, /timingSafeEqual/, "admin password and cookie comparisons should be timing-safe");
assert.match(authLib, /ADMIN_SESSION_SECRET/, "admin sessions should require a deployment secret");
assert.match(adminActions, /checkPassword/, "admin login action should validate the configured password");
assert.match(adminLogin, /type="password"/, "admin login page should render a protected password form");
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
assert.match(beforeAfter, /clipPath/, "before/after slider should reveal aligned images without resizing either image");
assert.match(beforeAfter, /role="slider"/, "before/after comparison should be keyboard accessible");
assert.match(projectGallery, /project-gallery-grid/, "project gallery should include a photo grid");
assert.match(projectGallery, /project-gallery-tile/, "project gallery should include animated gallery tiles");
assert.match(projectGallery, /gallery-slider/, "project gallery should open a slider modal");
assert.match(projectGallery, /role="dialog"/, "gallery slider should be exposed as a dialog");
assert.match(projectGallery, /gallery-slider-close/, "gallery slider should expose a stable close control");
assert.match(projectGallery, /ArrowRight/, "gallery slider should support keyboard next navigation");
assert.match(styles, /projectGalleryTileIn/, "gallery tiles should have stronger entry animation");
assert.match(detailPage, /more-projects/, "project detail should include related projects");
