This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Apify API Token for Telegram Username Validation
# Get your token from: https://console.apify.com/account/integrations
NEXT_PUBLIC_APIFY_API_TOKEN=your_apify_api_token_here

# Database Configuration (PostgreSQL)
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL=postgresql://postgres:password@localhost:5432/cyberventures?schema=public
```

### Database Setup (PostgreSQL)

The application uses PostgreSQL for production data persistence with Prisma ORM.

**Quick Setup:**

1. **Install PostgreSQL** (if not already installed)
   - Windows: [Download installer](https://www.postgresql.org/download/windows/)
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create Database**
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE cyberventures;
   \q
   ```

3. **Setup Environment Variables**
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/cyberventures?schema=public
   ```

4. **Initialize Prisma**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # (Optional) Seed with sample data
   npm run db:seed
   ```

**Prisma Commands:**
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes (for prototyping)
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with sample data

**Default Login (after seeding):**
- Email: `admin@cyber-ventures.id`
- Password: `admin123`

### Telegram Username Validation (Apify)

The recruitment form uses Apify's Telegram Username Checker API to validate if a Telegram username is available.

- **Service**: [Apify Telegram Username Checker](https://apify.com/xtools/telegram-username)
- **Pricing**: From $10.00 / 1,000 results
- **Setup**: 
  1. Create an account at [apify.com](https://apify.com)
  2. Get your API token from [Integrations settings](https://console.apify.com/account/integrations)
  3. Add token to `.env.local`

Without the API token, the form will fall back to basic format validation only.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
