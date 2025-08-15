create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price decimal(10,2) not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert sample products
insert into products (name, price, description, image) values
  ('Minimalist Watch', 199.99, 'Elegant minimalist watch with leather strap', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'),
  ('Wireless Earbuds', 149.99, 'High-quality wireless earbuds with noise cancellation', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'),
  ('Laptop Backpack', 89.99, 'Water-resistant laptop backpack with multiple compartments', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62');