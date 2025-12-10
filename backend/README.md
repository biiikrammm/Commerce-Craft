# CommerceCraft Backend API

A comprehensive RESTful API backend for the CommerceCraft e-commerce platform, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🛍️ **Product Management** - Browse, search, and filter products
- 🛒 **Shopping Cart** - Add, update, and remove items
- 📦 **Order Processing** - Create and track orders
- 📧 **Newsletter** - Subscribe/unsubscribe functionality
- 🔒 **Security** - Helmet.js for security headers
- ✅ **Validation** - Express-validator for request validation
- 📝 **Logging** - Morgan for HTTP request logging
- 🗜️ **Compression** - Response compression for better performance

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator
- **Security**: Helmet, CORS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/commercecraft
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

5. Seed the database with initial data:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## API Endpoints

### Products

- `GET /api/products` - Get all products
  - Query params: `category`, `minPrice`, `maxPrice`, `search`
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/categories` - Get all categories
- `GET /api/products/featured` - Get featured products

### Cart

**Note**: Include `x-session-id` header for cart operations

- `GET /api/cart` - Get cart for session
- `POST /api/cart/add` - Add item to cart
  ```json
  {
    "productId": "1",
    "quantity": 1
  }
  ```
- `PUT /api/cart/update` - Update cart item quantity
  ```json
  {
    "productId": "1",
    "quantity": 2
  }
  ```
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders

**Note**: Include `x-session-id` header for order operations

- `POST /api/orders` - Create new order
  ```json
  {
    "items": [
      {
        "productId": "1",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "fullName": "John Doe",
      "address": "123 Main St",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA"
    }
  }
  ```
- `GET /api/orders` - Get all orders for session
- `GET /api/orders/:orderNumber` - Get order by order number
- `PUT /api/orders/:orderNumber/status` - Update order status
  ```json
  {
    "status": "processing"
  }
  ```

### Newsletter

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
  ```json
  {
    "email": "user@example.com"
  }
  ```
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
  ```json
  {
    "email": "user@example.com"
  }
  ```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": {...} // Optional validation errors
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── cartController.ts
│   │   ├── orderController.ts
│   │   └── newsletterController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   ├── notFound.ts
│   │   └── validators.ts
│   ├── models/
│   │   ├── Product.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   └── Newsletter.ts
│   ├── routes/
│   │   ├── productRoutes.ts
│   │   ├── cartRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── newsletterRoutes.ts
│   │   └── index.ts
│   ├── scripts/
│   │   └── seedData.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

## Session Management

The API uses a simple session-based approach for cart and order management:
- Include `x-session-id` header in requests
- If not provided, defaults to 'guest-session'
- In production, implement proper authentication

## Security Considerations

- Always use HTTPS in production
- Set strong JWT_SECRET in production
- Configure CORS_ORIGIN to match your frontend domain
- Implement rate limiting for production
- Add authentication middleware for protected routes

## Error Handling

The API uses centralized error handling with custom error classes:
- Validation errors return 400 status
- Not found errors return 404 status
- Server errors return 500 status

## Database Models

### Product
- id, name, description, price, originalPrice
- image, category, badge
- rating, reviews, stock

### Cart
- sessionId, items[]
- totalItems, totalPrice

### Order
- orderNumber, sessionId, items[]
- shippingAddress, totalAmount
- status, paymentStatus

### Newsletter
- email, subscribed

## Contributing

1. Ensure TypeScript compiles without errors
2. Follow existing code patterns
3. Add validation for new endpoints
4. Update this README for new features

## License

ISC
