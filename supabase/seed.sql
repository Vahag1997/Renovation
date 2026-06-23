-- =============================================================
--  Studio Aura — example portfolio data (run after schema.sql)
--  Safe to run multiple times: it refreshes the two example
--  projects each time and never creates duplicates.
--  The images are placeholders — replace them with your own later.
-- =============================================================

-- Categories ---------------------------------------------------
insert into categories (slug, name, title, description, hero_image, sort_order) values
  ('kvartiry', 'Квартиры', 'Квартиры',
   'Проекты городских апартаментов: студии, семейные и премиальные квартиры.',
   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', 1),
  ('doma', 'Дома', 'Дома',
   'Частные дома, коттеджи и загородные виллы под ключ.',
   'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80', 2),
  ('proekty', 'Проекты', 'Проекты',
   'Дизайн-проекты, концепции и визуализации до реализации.',
   'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80', 3),
  ('kommercheskie-pomescheniya', 'Коммерческие помещения', 'Коммерческие помещения',
   'Офисы, шоурумы, салоны и торговые пространства.',
   'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80', 4),
  ('landshaft', 'Ландшафт', 'Ландшафт',
   'Сады, дворы, террасы и благоустройство участка.',
   'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80', 5)
on conflict (slug) do nothing;

-- Remove old copies of the example projects so this file is re-runnable.
-- (Deleting a project cascades to its images and sections.)
delete from projects where slug in ('monolith', 'lake-como');

-- Example project 1: apartment ---------------------------------
insert into projects
  (slug, title, category_id, location, area, year, description,
   cover_image, before_image, after_image, tasks, sort_order)
values
  ('monolith', 'The Monolith Residence',
   (select id from categories where slug = 'kvartiry'),
   'Ереван, Малый Центр', '220 м²', '2024',
   'Архитектурное проектирование и премиум-ремонт просторной квартиры для ценителей минимализма.',
   'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80',
   'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
   'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
   array[
     'Разработать цельную концепцию для квартиры',
     'Собрать планировочные решения и рабочую документацию',
     'Подобрать материалы, свет, мебель и декоративные акценты',
     'Сопроводить реализацию до финальной приемки объекта'
   ], 1);

insert into project_images (project_id, url, kind, alt, sort_order)
select projects.id, v.url, v.kind, v.alt, v.ord
from projects, (values
  ('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Гостиная', 1),
  ('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Кухня-столовая', 2),
  ('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Спальня', 3),
  ('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Холл', 4),
  ('https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80', 'planning', 'Планировка, кадр 1', 5),
  ('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', 'planning', 'Планировка, кадр 2', 6)
) as v(url, kind, alt, ord)
where projects.slug = 'monolith';

insert into project_sections (project_id, title, body, sort_order)
select projects.id, v.title, v.body, v.ord
from projects, (values
  ('Идея проекта', 'Проект построен вокруг спокойной архитектурной базы: чистые линии, крупные плоскости и натуральные фактуры. Пространство остается визуально свободным, но достаточно детализированным, чтобы интерьер не выглядел холодным.', 1),
  ('Планировка и сценарии', 'На площади 220 м² зона входа, приватные комнаты и общие пространства разделены так, чтобы движение по квартире было интуитивным. Видовые точки раскрываются постепенно: от лаконичного холла к центральной гостиной.', 2),
  ('Материалы и атмосфера', 'В отделке использованы камень, шпон, крупноформатная плитка и мягкая скрытая подсветка. Палитра построена на нейтральной базе с глубокими графитовыми и теплыми акцентами.', 3)
) as v(title, body, ord)
where projects.slug = 'monolith';

-- Example project 2: house -------------------------------------
insert into projects
  (slug, title, category_id, location, area, year, description,
   cover_image, before_image, after_image, tasks, sort_order)
values
  ('lake-como', 'Villa Lake Como',
   (select id from categories where slug = 'doma'),
   'Италия, Комо', '450 м²', '2024',
   'Эксклюзивный ремонт и декорирование загородной виллы на побережье озера Комо.',
   'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
   'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
   array[
     'Разработать цельную концепцию для загородного дома',
     'Собрать планировочные решения и рабочую документацию',
     'Подобрать материалы, свет, мебель и декоративные акценты',
     'Сопроводить реализацию до финальной приемки объекта'
   ], 2);

insert into project_images (project_id, url, kind, alt, sort_order)
select projects.id, v.url, v.kind, v.alt, v.ord
from projects, (values
  ('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Гостиная с видом', 1),
  ('https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Столовая', 2),
  ('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Терраса', 3),
  ('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', 'gallery', 'Спальня', 4),
  ('https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80', 'planning', 'Планировка, кадр 1', 5),
  ('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80', 'planning', 'Планировка, кадр 2', 6)
) as v(url, kind, alt, ord)
where projects.slug = 'lake-como';

insert into project_sections (project_id, title, body, sort_order)
select projects.id, v.title, v.body, v.ord
from projects, (values
  ('Идея проекта', 'Вилла раскрывает диалог между архитектурой здания и природой озера. Мы сохранили ощущение воздуха и света, добавив теплые натуральные материалы.', 1),
  ('Планировка и сценарии', 'На площади 450 м² общественные зоны ориентированы на воду, а приватные комнаты спрятаны вглубь дома. Террасы продолжают жилые пространства наружу.', 2),
  ('Материалы и атмосфера', 'Натуральный камень, дерево теплых тонов, лен и мягкий рассеянный свет создают спокойную, но богатую тактильно среду.', 3)
) as v(title, body, ord)
where projects.slug = 'lake-como';
