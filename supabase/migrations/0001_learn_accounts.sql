-- Accounts and progress for the JapTalk / JapTutor web practice at muthamiltech.com/learn.
-- Run once in the Supabase SQL editor (or `supabase db push`). Every table is row-level
-- secured: a signed-in person can only read and write their own rows.

-- One profile per account. `plan` is set by us (never by the user) once paid plans exist.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  plan_source text,                -- e.g. 'app_store', 'google_play', 'web' once billing is on
  plan_expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

-- People may rename themselves, but not change their plan.
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from authenticated;
grant update (display_name) on public.profiles to authenticated;

-- Create the profile automatically when someone signs up.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Per-item progress, e.g. ('japtalk', 'lesson:3') → {"done": [1,2,5], "completed": true}.
create table public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  app text not null check (app in ('japtalk', 'japtutor')),
  item_key text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, app, item_key)
);

alter table public.progress enable row level security;

create policy "own progress" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Daily test results (JapTutor), for history and weak-area tracking.
create table public.test_results (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  app text not null default 'japtutor',
  level text not null,
  score int not null,
  total int not null,
  by_type jsonb not null default '{}'::jsonb,
  taken_at timestamptz not null default now()
);

alter table public.test_results enable row level security;

create policy "own results" on public.test_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index test_results_user_taken on public.test_results (user_id, taken_at desc);
