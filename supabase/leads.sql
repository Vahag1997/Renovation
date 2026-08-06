-- =============================================================
--  Studio Aura — Leads (заявки с форм сайта)
--  Запусти этот файл в Supabase → SQL Editor → Run.
--  Заявки пишутся и читаются только с сервера (служебным ключом),
--  поэтому публичных политик НЕТ — посторонние не могут их трогать.
-- =============================================================

create table if not exists leads (
  id               uuid primary key default gen_random_uuid(),
  source           text not null default 'contact'
                   check (source in ('calculator', 'contact')),
  name             text,
  phone            text,
  area             text,                 -- площадь, напр. "120 м²"
  premises_type    text,                 -- тип помещения (калькулятор)
  style            text,                 -- стиль (калькулятор)
  complex_name     text,                 -- название ЖК (калькулятор)
  service_type     text,                 -- тип услуги (контакты)
  timeline         text,                 -- сроки (контакты)
  estimated_budget text,                 -- расчётный бюджет (контакты)
  status           text not null default 'new'
                   check (status in ('new', 'in_progress', 'done')),
  created_at       timestamptz not null default now()
);

create index if not exists leads_created_idx on leads (created_at desc);

-- RLS on, no policies → only the service role (server) can read/write.
alter table leads enable row level security;
