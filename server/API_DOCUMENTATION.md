# CommerceCraft API Documentation

Base URL: `http://localhost:3001/api`

## Authentication

Most endpoints support both authenticated and guest users. Include the JWT token in the Authorization header for authenticated requests.

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

For guest cart operations, include a session ID:
```
X-Session-ID: <your_session_id>
```

---

## Endpoints

### Health Check

#### GET /health
Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-10T12:00:00.000Z"
}
```

---

## Authentication Endpoints

### Register User

#### POST /api/auth/register

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "created_at": "2024-01-10T12:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

**Errors:**
- 400: Invalid input or email already exists

---

### Login User

#### POST /api/auth/login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Errors:**
- 401: Invalid credentials

---

### Get User Profile

#### GET /api/auth/profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-10T12:00:00.000Z"
  }
}
```

**Errors:**
- 401: Not authenticated or invalid token

---

## Product Endpoints

### Get All Products

#### GET /api/products

**Query Parameters:**
- `category` (optional): Filter by category name

**Examples:**
- `/api/products` - Get all products
- `/api/products?category=Bags` - Get products in Bags category

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Artisan Leather Tote",
      "description": "Handcrafted Italian leather tote...",
      "price": 485.00,
      "original_price": 580.00,
      "image": "https://...",
      "category": "Bags",
      "badge": "Sale",
      "rating": 4.9,
      "reviews": 127,
      "stock": 15,
      "created_at": "2024-01-10T12:00:00.000Z"
    }
  ]
}
```

---

### Get Product by ID

#### GET /api/products/:id

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Artisan Leather Tote",
    "description": "Handcrafted Italian leather tote...",
    "price": 485.00,
    "original_price": 580.00,
    "image": "https://...",
    "category": "Bags",
    "badge": "Sale",
    "rating": 4.9,
    "reviews": 127,
    "stock": 15
  }
}
```

**Errors:**
- 404: Product not found

---

### Get Categories

#### GET /api/products/categories

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    "All",
    "Bags",
    "Watches",
    "Outerwear",
    "Jewelry",
    "Accessories",
    "Home"
  ]
}
```

---

### Search Products

#### GET /api/products/search

**Query Parameters:**
- `q` (required): Search query

**Example:**
- `/api/products/search?q=leather`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Artisan Leather Tote",
      "description": "Handcrafted Italian leather...",
      "price": 485.00,
      "category": "Bags"
    }
  ]
}
```

**Errors:**
- 400: Missing search query

---

## Cart Endpoints

All cart endpoints support both authenticated and guest users.

### Get Cart

#### GET /api/cart

**Headers:**
- `Authorization: Bearer <token>` (optional, for authenticated users)
- `X-Session-ID: <session_id>` (optional, for guest users)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_item_uuid",
        "cart_id": "cart_uuid",
        "product_id": "product_uuid",
        "quantity": 2,
        "product": {
          "id": "product_uuid",
          "name": "Artisan Leather Tote",
          "price": 485.00,
          "image": "https://...",
          "category": "Bags"
        }
      }
    ],
    "total": 970.00
  }
}
```

---

### Add to Cart

#### POST /api/cart/add

**Request Body:**
```json
{
  "product_id": "product_uuid",
  "quantity": 1
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 970.00
  }
}
```

**Errors:**
- 400: Invalid product ID or quantity
- 404: Product not found

---

### Update Cart Item

#### PUT /api/cart/update

**Request Body:**
```json
{
  "product_id": "product_uuid",
  "quantity": 3
}
```

**Note:** Setting quantity to 0 removes the item from cart.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 1455.00
  }
}
```

---

### Remove from Cart

#### DELETE /api/cart/:productId

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 0.00
  }
}
```

---

### Clear Cart

#### DELETE /api/cart

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

---

## Order Endpoints

### Create Order

#### POST /api/orders

**Request Body:**
```json
{
  "items": [
    {
      "product_id": "product_uuid",
      "quantity": 2
    }
  ],
  "shipping": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "payment_method": "credit_card"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "order_uuid",
    "order_number": "ORD-ABC123",
    "status": "pending",
    "total_amount": 970.00,
    "shipping_first_name": "John",
    "shipping_last_name": "Doe",
    "shipping_email": "john@example.com",
    "payment_status": "pending",
    "items": [
      {
        "id": "order_item_uuid",
        "product_name": "Artisan Leather Tote",
        "price": 485.00,
        "quantity": 2,
        "subtotal": 970.00
      }
    ],
    "created_at": "2024-01-10T12:00:00.000Z"
  }
}
```

**Errors:**
- 400: Invalid input or empty cart

---

### Get User Orders

#### GET /api/orders

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_uuid",
      "order_number": "ORD-ABC123",
      "status": "pending",
      "total_amount": 970.00,
      "created_at": "2024-01-10T12:00:00.000Z",
      "items": [...]
    }
  ]
}
```

**Errors:**
- 401: Authentication required

---

### Get Order Details

#### GET /api/orders/:id

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "order_uuid",
    "order_number": "ORD-ABC123",
    "status": "pending",
    "total_amount": 970.00,
    "shipping_address": "123 Main St",
    "shipping_city": "New York",
    "items": [
      {
        "id": "order_item_uuid",
        "product_name": "Artisan Leather Tote",
        "price": 485.00,
        "quantity": 2,
        "subtotal": 970.00
      }
    ],
    "created_at": "2024-01-10T12:00:00.000Z"
  }
}
```

**Errors:**
- 404: Order not found

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

For validation errors:

```json
{
  "error": "Invalid input",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (authentication required or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently, there are no rate limits. In production, consider implementing rate limiting to prevent abuse.

## CORS

The API accepts requests from the configured frontend origin (default: `http://localhost:5173`).

## Data Types

### Product
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  stock: number;
}
```

### Order Status
- `pending` - Order placed, awaiting payment
- `processing` - Payment received, preparing order
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Payment Status
- `pending` - Awaiting payment
- `completed` - Payment received
- `failed` - Payment failed
- `refunded` - Payment refunded
