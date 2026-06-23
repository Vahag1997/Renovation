-- =============================================================
--  Studio Aura — Portfolio content schema (step 1)
--  Paste this whole file into the Supabase SQL Editor and run it.
--  Creates 4 tables: categories, projects, project_images,
--  project_sections — and makes their content publicly readable.
-- =============================================================

-- 1. Categories ------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,           -- "kvartiry", "doma", ...
  name        text not null,                  -- "Квартиры"
  title       text,                           -- heading on the category page
  description text,
  hero_image  text,                           -- cover image URL
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- 2. Projects --------------------------------------------------
create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,          -- "monolith"
  title        text not null,                 -- "The Monolith Residence"
  category_id  uuid not null references categories(id) on delete cascade,
  location     text,                          -- "Ереван, Малый Центр"
  area         text,                          -- "220 м²"
  year         text,                          -- "2024"
  description  text,                          -- short summary
  cover_image  text,                          -- main photo URL
  hero_video   text,                          -- optional .mp4 URL
  before_image text,                          -- "до" (slider)
  after_image  text,                          -- "после" (slider)
  tasks        text[] not null default '{}',  -- list of "задачи проекта"
  published    boolean not null default true, -- hide drafts from the site
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists projects_category_idx on projects(category_id);

-- 3. Project images (gallery + planning shots) -----------------
create table if not exists project_images (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url        text not null,
  kind       text not null default 'gallery'
             check (kind in ('gallery', 'planning')),
  alt        text,
  sort_order int  not null default 0
);

create index if not exists project_images_project_idx on project_images(project_id);

-- 4. Project text sections (идея, планировка, материалы) -------
create table if not exists project_sections (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title      text not null,
  body       text not null,
  sort_order int  not null default 0
);

create index if not exists project_sections_project_idx on project_sections(project_id);

-- =============================================================
--  Public read access
--  The website reads content with the public ("anon") key, so we
--  turn on Row Level Security and allow SELECT for everyone.
--  Writing/editing is done by you in the Supabase dashboard
--  (which bypasses these policies), so the public can only read.
-- =============================================================
alter table categories       enable row level security;
alter table projects         enable row level security;
alter table project_images   enable row level security;
alter table project_sections enable row level security;

create policy "public read categories"
  on categories for select using (true);

create policy "public read projects"
  on projects for select using (true);

create policy "public read project_images"
  on project_images for select using (true);

create policy "public read project_sections"
  on project_sections for select using (true);
