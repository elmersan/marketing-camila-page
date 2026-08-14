create table public.landing_page_form (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  whatsapp text not null unique check (whatsapp ~ '^9[0-9]{8}$'),
  email text not null check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  agent_id text not null check (agent_id ~ '^[0-9]{5}-(PN|PJ)(-MVCS)?$'),
  company text check (company is null or char_length(company) <= 120),
  city text check (city is null or char_length(city) <= 100),
  experience_range text not null check (
    experience_range in ('less_than_1', 'between_1_and_3', 'between_3_and_5', 'more_than_5')
  ),
  consent_commercial boolean not null check (consent_commercial),
  locale text not null default 'es' check (locale in ('es', 'en')),
  confirmation_email_sent_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.landing_page_form is
  'Camila pilot program applications submitted from the marketing landing page.';
comment on column public.landing_page_form.whatsapp is
  'Nine-digit Peruvian mobile number stored without the +51 country prefix.';

alter table public.landing_page_form enable row level security;

revoke all on table public.landing_page_form from anon, authenticated;
