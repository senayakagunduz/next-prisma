# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Generate Prisma client and build production app
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma generate  # Generate Prisma client only
npx prisma db push   # Push schema changes to database
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **Storage**: Supabase (for product images)
- **UI**: Tailwind CSS + Radix UI primitives

### Database Models (prisma/schema.prisma)
- `User` - Clerk users
- `Product` - E-commerce products with favorites, reviews, cartItems relations
- `Favorite` - User product favorites (clerkId + productId)
- `Review` - Product reviews
- `Cart` - Shopping cart per user (clerkId)
- `CartItem` - Items in cart
- `Order` - Completed orders

### Project Structure
- `app/` - Next.js App Router pages and API routes
- `app/admin/` - Admin dashboard pages
- `app/api/` - API route handlers
- `components/ui/` - Shadcn/Radix UI components
- `components/products/` - Product-specific components
- `components/navbar/` - Navigation components
- `components/form/` - Reusable form components
- `components/home/` - Homepage components (Hero, FeaturedProduct)
- `components/single-product/` - Product detail page components
- `lib/` - Utilities (siteMetadata.ts, utils.ts)
- `utils/` - Database client (db.ts)
- `prisma/` - Database schema and seed script

### Data Access
Database queries use Prisma directly in Server Actions and API routes. Prisma client is a singleton in `utils/db.ts` to prevent connection exhaustion in development.

### API Routes
- `app/api/product/route.ts` - Product API
- `app/api/user/[userId]/route.ts` - User API
- `app/api/favorites/toggle/route.ts` - Favorites toggle API

### Key Components
- `FavoriteToggleForm` / `FavoriteToggleButton` - Product favorite toggle (client components)
- `ProductsContainer` / `ProductsGrid` / `ProductsList` - Product listing
- `AddToCart` - Add to cart functionality
- `Navbar` - Includes Clerk authentication UI, cart button, dark mode toggle

### Pattern: Server Actions with Zod Validation
Forms use Server Actions with Zod schemas for validation. Example pattern:
```typescript
const schema = z.object({ field: z.string() });
export const action = async (prevState, formData) => {
  const data = Object.fromEntries(formData.entries());
  const validated = schema.safeParse(data);
  // process and return
}
```

### Image Handling
Product images stored in Supabase Storage. Delete images using Supabase client when removing products.

### Theming
The app uses `next-themes` with a ThemeProvider component for dark/light mode support. Theme is configured in `app/theme-provider.tsx` and applied via `app/providers.tsx`.

### Search Implementation
The product search uses `use-debounce` library (300ms delay) to prevent excessive API calls while typing. Found in ProductsContainer component.
