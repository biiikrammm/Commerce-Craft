# CommerceCraft Backend API

Backend API for the CommerceCraft e-commerce platform, built with Express.js, TypeScript, and Supabase.

## Features

- 🔐 **Authentication** - User registration and login with JWT
- 🛍️ **Products** - Browse, search, and filter products
- 🛒 **Shopping Cart** - Session-based and authenticated cart management
- 📦 **Orders** - Create and manage orders
- 🗄️ **Database** - PostgreSQL via Supabase
- 🔒 **Type-Safe** - Full TypeScript implementation
- ✅ **Validation** - Request validation with Zod

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT
- **Validation**: Zod
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v18 or higher)
- Supabase account and project
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_secure_random_string
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL schema from `database/schema.sql`

This will create all necessary tables:
- `users` - User accounts
- `products` - Product catalog
- `carts` & `cart_items` - Shopping cart
- `orders` & `order_items` - Order management
- `newsletter_subscriptions` - Newsletter subscribers

### 4. Seed Database

Populate the database with initial product data:

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/profile       - Get user profile (requires auth)
```

### Products

```
GET    /api/products           - Get all products (optional: ?category=CategoryName)
GET    /api/products/:id       - Get product by ID
GET    /api/products/categories - Get all categories
GET    /api/products/search    - Search products (?q=search_term)
```

### Cart

```
GET    /api/cart               - Get cart
POST   /api/cart/add           - Add item to cart
PUT    /api/cart/update        - Update cart item quantity
DELETE /api/cart/:productId    - Remove item from cart
DELETE /api/cart               - Clear cart
```

### Orders

```
POST   /api/orders             - Create new order
GET    /api/orders             - Get user orders (requires auth)
GET    /api/orders/:id         - Get order details
```

## Project Structure

```
server/
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── lib/               # Utility libraries (Supabase client)
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── scripts/           # Utility scripts (seed, etc.)
│   ├── services/          # Business logic layer
│   ├── types/             # TypeScript type definitions
│   └── server.ts          # Express app entry point
├── database/
│   └── schema.sql         # Database schema
├── .env.example           # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## Development Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run seed     # Seed database with initial data
```

## Authentication Flow

1. **Register**: `POST /api/auth/register`
   - Body: `{ email, password, first_name?, last_name? }`
   - Returns: `{ user, token }`

2. **Login**: `POST /api/auth/login`
   - Body: `{ email, password }`
   - Returns: `{ user, token }`

3. **Protected Routes**: Include token in header
   - Header: `Authorization: Bearer <token>`

## Cart Management

The API supports both authenticated and guest users:

- **Authenticated users**: Cart is associated with `userId`
- **Guest users**: Cart is associated with `sessionId`
- Include `X-Session-ID` header for guest carts

## Error Handling

All endpoints return errors in the format:

```json
{
  "error": "Error message here",
  "details": {} // Optional validation details
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Security Considerations

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens expire based on `JWT_EXPIRES_IN` config
- CORS configured for frontend origin
- Input validation with Zod schemas
- SQL injection protection via Supabase client

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure appropriate CORS origins
4. Use Supabase production credentials
5. Build the project: `npm run build`
6. Start: `npm start`

## Support

For issues or questions, please create an issue in the repository.
