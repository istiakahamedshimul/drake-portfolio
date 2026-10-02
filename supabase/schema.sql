-- ==============================================================================
-- Drake Portfolio Database Schema & Storage Configuration for Supabase
-- Run this in your Supabase project: Dashboard -> SQL Editor -> New query -> Run
-- ==============================================================================

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Profile / Personal Info Table
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  name text not null default 'Drake',
  designation text not null default 'Framer Designer & Developer',
  hero_greeting text not null default 'Say Hi from Drake, Framer Designer and Developer',
  hero_role text not null default 'Framer Designer and Developer',
  hero_bio text not null default 'I design and code beautifully simple things and i love what i do. Just simple like that!',
  about_story text not null,
  email text not null default 'hello@drake.design',
  phone text default '+1 (555) 000-0000',
  address text not null default 'Base in Los Angeles, CA',
  copyright text not null default '© 2022 Drake. All Rights Reserved',
  avatar_url text default '/assets/images/me.jpg',
  logo_url text default '/assets/images/logo.png',
  resume_url text,
  socials jsonb not null default '[
    {"platform": "Twitter", "url": "https://twitter.com", "icon": "lab la-twitter"},
    {"platform": "Dribbble", "url": "https://dribbble.com", "icon": "lab la-dribbble"},
    {"platform": "Instagram", "url": "https://instagram.com", "icon": "lab la-instagram"},
    {"platform": "GitHub", "url": "https://github.com", "icon": "lab la-github"}
  ]'::jsonb,
  stats jsonb not null default '[
    {"number": "10+", "label": "Years of Experience"},
    {"number": "182+", "label": "Projects Completed on 15 Countries"}
  ]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Projects Table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique,
  categories text[] not null default '{}',
  image_url text not null,
  project_url text default '#',
  is_wide boolean default false,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Skills Table
create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  percent integer not null check (percent >= 0 and percent <= 100),
  icon_url text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Experiences Table (Resume)
create table if not exists public.experiences (
  id uuid primary key default uuid_generate_v4(),
  period text not null,
  title text not null,
  company text not null,
  description text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Services Table
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  icon text not null default 'las la-bezier-curve',
  project_count integer default 0,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Testimonials Table
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  company text not null,
  quote text not null,
  avatar_url text not null,
  project_name text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Client Brands Table
create table if not exists public.client_brands (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Pricing Plans Table
create table if not exists public.pricing_plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  tagline text not null,
  price numeric(10, 2) not null,
  billing_period text default 'hour',
  features text[] not null default '{}',
  is_popular boolean default false,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Contact Form Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  budget text,
  message text not null,
  attachment_url text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Public can READ all portfolio content and INSERT contact messages
-- Authenticated users (Admin) have FULL ACCESS
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.client_brands enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.contact_messages enable row level security;

-- Public READ policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Public projects are viewable by everyone" on public.projects for select using (true);
create policy "Public skills are viewable by everyone" on public.skills for select using (true);
create policy "Public experiences are viewable by everyone" on public.experiences for select using (true);
create policy "Public services are viewable by everyone" on public.services for select using (true);
create policy "Public testimonials are viewable by everyone" on public.testimonials for select using (true);
create policy "Public client_brands are viewable by everyone" on public.client_brands for select using (true);
create policy "Public pricing_plans are viewable by everyone" on public.pricing_plans for select using (true);

-- Anyone can submit a contact message
create policy "Anyone can insert contact messages" on public.contact_messages for insert with check (true);

-- Authenticated Admin full access
create policy "Admin full access profiles" on public.profiles for all to authenticated using (true) with check (true);
create policy "Admin full access projects" on public.projects for all to authenticated using (true) with check (true);
create policy "Admin full access skills" on public.skills for all to authenticated using (true) with check (true);
create policy "Admin full access experiences" on public.experiences for all to authenticated using (true) with check (true);
create policy "Admin full access services" on public.services for all to authenticated using (true) with check (true);
create policy "Admin full access testimonials" on public.testimonials for all to authenticated using (true) with check (true);
create policy "Admin full access client_brands" on public.client_brands for all to authenticated using (true) with check (true);
create policy "Admin full access pricing_plans" on public.pricing_plans for all to authenticated using (true) with check (true);
create policy "Admin full access contact_messages" on public.contact_messages for all to authenticated using (true) with check (true);

-- ==============================================================================
-- Storage Bucket: portfolio-assets
-- Run in Storage or via SQL:
-- ==============================================================================
insert into storage.buckets (id, name, public) 
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public Access to portfolio-assets" on storage.objects for select using (bucket_id = 'portfolio-assets');
create policy "Authenticated upload to portfolio-assets" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-assets');
create policy "Authenticated update to portfolio-assets" on storage.objects for update to authenticated using (bucket_id = 'portfolio-assets');
create policy "Authenticated delete from portfolio-assets" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-assets');

-- ==============================================================================
-- Initial Seed Data (Drake Portfolio Default Content)
-- ==============================================================================
insert into public.profiles (
  name, designation, hero_greeting, hero_role, hero_bio, about_story, email, address, copyright, avatar_url, logo_url
) values (
  'Drake',
  'Framer Designer & Developer',
  'Say Hi from Drake, Framer Designer and Developer',
  'Framer Designer and Developer',
  'I design and code beautifully simple things and i love what i do. Just simple like that!',
  'Since beginning my journey as a freelance designer nearly 8 years ago, I''ve done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use. I''m quietly confident, naturally curious, and perpetually working on improving my chops one design problem at a time.',
  'hello@drake.design',
  'Base in Los Angeles, CA',
  '© 2022 Drake. All Rights Reserved',
  '/assets/images/me.jpg',
  '/assets/images/logo.png'
) on conflict do nothing;

insert into public.projects (title, slug, categories, image_url, project_url, is_wide, order_index) values
  ('Bureau - Architecture Studio Website', 'bureau', array['Figma', 'Framer', 'WordPress'], '/assets/images/portfolio1.jpg', '#', true, 1),
  ('Moonex WordPress Theme', 'moonex', array['WordPress', 'Laravel/PHP'], '/assets/images/portfolio2.jpg', '#', false, 2),
  ('Taskly Dashboard', 'taskly', array['Figma', 'Webflow'], '/assets/images/portfolio3.jpg', '#', false, 3),
  ('Hinterland - Real Estate Site Redesign', 'hinterland', array['Figma', 'React'], '/assets/images/portfolio4.jpg', '#', true, 4),
  ('Lewis Studio Website', 'lewis-studio', array['Framer'], '/assets/images/portfolio5.jpg', '#', true, 5)
on conflict do nothing;

insert into public.skills (name, percent, icon_url, order_index) values
  ('Figma', 92, '/assets/images/figma.png', 1),
  ('Framer', 85, '/assets/images/framer.png', 2),
  ('Webflow', 80, '/assets/images/webflow.png', 3),
  ('React', 90, '/assets/images/react.png', 4),
  ('WordPress', 86, '/assets/images/wordpress.png', 5),
  ('Laravel/PHP', 70, '/assets/images/laravel.png', 6)
on conflict do nothing;

insert into public.services (title, description, icon, project_count, order_index) values
  ('Website Design', 'I created digital products with unique ideas use Figma & Framer', 'las la-bezier-curve', 24, 1),
  ('Development', 'I build website go live with Framer, Webflow or WordPress', 'las la-code', 126, 2),
  ('SEO/Marketing', 'Increase the traffic for your website with SEO optimized', 'las la-rocket', 8, 3)
on conflict do nothing;

insert into public.experiences (period, title, company, description, order_index) values
  ('2020 - Present', 'Framer Designer & Developer', 'Brunodee Agency', '', 1),
  ('2018 - 2020', 'Front-End WordPress Developer', 'Envato Market', '', 2),
  ('2013 - 2018', 'Web Designer & Developer', 'Freelance', '', 3),
  ('2010 - 2013', 'Bachelor Degree of Information Technology', 'University of California', '', 4)
on conflict do nothing;

insert into public.testimonials (name, role, company, quote, avatar_url, project_name, order_index) values
  ('Paublo Dybala', 'CEO of', 'IBM Global', 'Drake - A Developer with the creativity, professional and master of code. Much more than what i''m expect. High quality product & flexible price. Recommended!', '/assets/images/testimonial-1.jpg', 'Project Management Tool', 1),
  ('Christina Morillo', 'Product Designer of', 'Invision App Inc', 'Drake was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of designer that you can trust with any project from A-Z.', '/assets/images/testimonial-2.jpg', '', 2),
  ('Phil Foden', 'Director of', 'Envato LLC', 'Extremely profressional and fast service!. Drake is a master of code and he also very creative. We done 3 projects with him and very satisfied!', '/assets/images/testimonial-3.jpg', '', 3)
on conflict do nothing;
