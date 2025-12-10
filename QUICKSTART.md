# CommerceCraft - Quick Start Guide

## Overview

CommerceCraft is a modern e-commerce platform with a React frontend and Express.js backend powered by Supabase.

## Project Structure

```
commercecraft-framework-main/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/        # React components
│   ├── context/          # React context (CartContext)
│   ├── pages/            # Page components
│   └── data/             # Static data
│
└── server/                # Backend (Express + TypeScript)
    ├── src/
    │   ├── config/       # Configuration
    │   ├── controllers/  # Request handlers
    │   ├── middleware/   # Express middleware
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── types/        # TypeScript types
    └── database/         # Database schema

```

## Prerequisites

- Node.js v18+
- Supabase account (free tier works)
- npm or yarn

## Backend Setup

### 1. Navigate to server directory

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project credentials:
   - Project URL
   - Anon/Public key
   - Service Role key (for admin operations)

### 4. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials and generate a secure JWT secret:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-long-random-secret-string
```

### 5. Set up database

1. Open Supabase Dashboard → SQL Editor
2. Copy and run the contents of `server/database/schema.sql`

### 6. Seed the database

```bash
npm run seed
```

### 7. Start backend server

```bash
npm run dev
```

Backend will run on `http://localhost:3001`

## Frontend Setup

### 1. Navigate to root directory

```bash
cd ..
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start frontend development server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

The backend exposes these endpoints at `http://localhost:3001/api`:

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products/categories` - Get categories
- `GET /products/search?q=term` - Search products

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get profile (auth required)

### Cart
- `GET /cart` - Get cart
- `POST /cart/add` - Add to cart
- `PUT /cart/update` - Update quantity
- `DELETE /cart/:productId` - Remove item
- `DELETE /cart` - Clear cart

### Orders
- `POST /orders` - Create order
- `GET /orders` - Get user orders (auth required)
- `GET /orders/:id` - Get order details

## Testing the API

You can test the API using:

### 1. Health Check

```bash
curl http://localhost:3001/health
```

### 2. Get Products

```bash
curl http://localhost:3001/api/products
```

### 3. Register User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Common Issues

### Module Resolution Errors

If you see TypeScript errors about missing modules, make sure:
1. Dependencies are installed: `npm install`
2. You're in the correct directory
3. Restart your IDE/editor

### Database Connection Issues

If the backend can't connect to Supabase:
1. Verify your `.env` file has correct credentials
2. Check that your Supabase project is active
3. Ensure database schema is properly created

### Port Already in Use

If port 3001 or 5173 is already in use:
1. Change `PORT` in `server/.env`
2. Update `CORS_ORIGIN` accordingly
3. Update frontend API calls to match new port

## Next Steps

1. **Integrate Frontend with Backend**: Update frontend to call backend API instead of using static data
2. **Add Authentication UI**: Create login/register pages in frontend
3. **Implement Checkout**: Add checkout flow that creates orders via API
4. **Add Payment Integration**: Integrate Stripe or similar payment processor
5. **Deploy**: Deploy backend to Render/Railway and frontend to Vercel/Netlify

## Development Workflow

1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm run dev` (in root)
3. Make changes - both have hot reload
4. Test API endpoints
5. Integrate with frontend

## Production Deployment

### Backend (Render/Railway/Heroku)
1. Build: `npm run build`
2. Set environment variables
3. Start: `npm start`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Configure API endpoint environment variable

## Support

For questions or issues:
1. Check the README in `server/` directory
2. Review Supabase documentation
3. Check Express.js documentation
