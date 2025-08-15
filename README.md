# ShopEase - E-commerce Store

A modern e-commerce platform built with React, TypeScript, and Supabase, featuring Stripe integration for payments.

## Features

- 🛍️ Product catalog with dynamic loading
- 🛒 Shopping cart functionality
- 💳 Secure payments via Stripe
- 🎨 Responsive design with Tailwind CSS
- 🔐 Backend powered by Supabase
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Payments**: Stripe
- **Routing**: React Router v7
- **Icons**: Lucide React

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Supabase account
- Stripe account

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

For Supabase Edge Functions, set up:
- `STRIPE_SECRET_KEY` in your Supabase project settings

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopease
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Database Setup

Run the following SQL in your Supabase SQL editor:

```sql
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price decimal(10,2) not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Supabase Edge Functions

Deploy the checkout function:

```bash
supabase functions deploy create-checkout
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/      # Reusable components
│   ├── context/        # React context providers
│   ├── data/          # Data fetching utilities
│   ├── lib/           # Shared utilities
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   └── main.tsx       # Application entry point
├── supabase/
│   ├── functions/     # Edge Functions
│   └── migrations/    # Database migrations
└── public/           # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
