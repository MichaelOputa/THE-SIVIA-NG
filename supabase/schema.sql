create table if not exists public.store_products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  slug text not null,
  category text not null,
  category_slug text not null,
  detail text not null default '',
  description text not null default '',
  image text not null,
  images jsonb not null default '[]'::jsonb,
  lengths jsonb not null default '[]'::jsonb,
  weights jsonb not null default '[]'::jsonb,
  price text not null,
  price_note text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

alter table public.store_products enable row level security;

create policy "Anyone can view active products"
  on public.store_products for select
  using (is_active = true or auth.uid() = owner_id);

create policy "Owners can insert products"
  on public.store_products for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update products"
  on public.store_products for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Owners can delete products"
  on public.store_products for delete
  using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Anyone can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated owners can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated owners can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "Authenticated owners can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
