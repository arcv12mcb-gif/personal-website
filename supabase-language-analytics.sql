create table if not exists public.language_preferences (
  visitor_id uuid primary key,
  language text not null check (language in ('en', 'tr')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.language_preferences enable row level security;

drop policy if exists "language preferences are countable" on public.language_preferences;
drop policy if exists "language preferences can be inserted" on public.language_preferences;
drop policy if exists "language preferences can be updated" on public.language_preferences;

create policy "language preferences are countable"
  on public.language_preferences
  for select
  using (true);

create policy "language preferences can be inserted"
  on public.language_preferences
  for insert
  with check (language in ('en', 'tr'));

create policy "language preferences can be updated"
  on public.language_preferences
  for update
  using (true)
  with check (language in ('en', 'tr'));
