# CommerceCraft Architecture

## System Architecture Overview

```mermaid
graph TB
    A[React Frontend] --> B[Express Backend API]
    B --> C[Supabase PostgreSQL]
    B --> D[JWT Auth]
    A --> E[Browser Local Storage]
```

## Backend Architecture

```mermaid
graph TB
    Client[Client Request] --> Router[Express Router]
    Router --> Auth[Auth Middleware]
    Auth --> Controller[Controller]
    Controller --> Service[Service Layer]
    Service --> DB[Supabase Client]
    DB --> Postgres[(PostgreSQL)]
    Service --> Controller
    Controller --> Response[JSON Response]
    Response --> Client
```

## Request Flow

### Authentication Flow

```mermaid
graph LR
    A[User] --> B[POST /auth/register]
    B --> C[Validate Input]
    C --> D[Hash Password]
    D --> E[Save to DB]
    E --> F[Generate JWT]
    F --> G[Return Token]
    G --> A
```

### Product Browsing Flow

```mermaid
graph LR
    A[User] --> B[GET /products]
    B --> C[Optional Category Filter]
    C --> D[Query Database]
    D --> E[Return Products]
    E --> A
```

### Shopping Cart Flow

```mermaid
graph TB
    A[User Action] --> B{Authenticated?}
    B -->|Yes| C[Use User ID]
    B -->|No| D[Use Session ID]
    C --> E[Get/Create Cart]
    D --> E
    E --> F[Cart Operations]
    F --> G[Update Database]
    G --> H[Return Cart Data]
```

### Order Creation Flow

```mermaid
graph TB
    A[Create Order Request] --> B[Validate Cart Not Empty]
    B --> C[Validate Shipping Info]
    C --> D[Calculate Total]
    D --> E[Create Order Record]
    E --> F[Create Order Items]
    F --> G[Clear Cart]
    G --> H[Return Order Details]
```

## Database Schema

```mermaid
graph TB
    Users[Users Table] --> Carts[Carts Table]
    Users --> Orders[Orders Table]
    Carts --> CartItems[Cart Items Table]
    Products[Products Table] --> CartItems
    Products --> OrderItems[Order Items Table]
    Orders --> OrderItems
```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui Components
- React Router
- React Query (optional)

### Backend
- Node.js
- Express.js
- TypeScript
- Supabase Client
- JWT
- Bcrypt
- Zod

### Database
- PostgreSQL (via Supabase)
- Row Level Security
- Automatic Backups
- Real-time subscriptions (available)

## API Endpoints Structure

```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   └── GET /profile
├── /products
│   ├── GET /
│   ├── GET /:id
│   ├── GET /categories
│   └── GET /search
├── /cart
│   ├── GET /
│   ├── POST /add
│   ├── PUT /update
│   └── DELETE /:productId
└── /orders
    ├── POST /
    ├── GET /
    └── GET /:id
```

## Security Layers

```mermaid
graph TB
    A[Request] --> B[CORS Check]
    B --> C[Input Validation]
    C --> D[Authentication]
    D --> E[Authorization]
    E --> F[Business Logic]
    F --> G[Database Query]
    G --> H[Response]
```

## Deployment Architecture

```mermaid
graph TB
    A[Users] --> B[Frontend - Vercel/Netlify]
    B --> C[Backend API - Render/Railway]
    C --> D[Supabase PostgreSQL]
    C --> E[Supabase Auth]
    B --> F[CDN - Images]
```

## Data Flow Example: Adding to Cart

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Service
    participant D as Database
    
    U->>F: Click "Add to Cart"
    F->>A: POST /api/cart/add
    A->>A: Check Auth/Session
    A->>S: cartService.addToCart()
    S->>D: Get or Create Cart
    S->>D: Check Product Exists
    S->>D: Add/Update Cart Item
    D->>S: Return Updated Cart
    S->>A: Return Cart Data
    A->>F: JSON Response
    F->>U: Update UI
```

## Authentication Flow Detail

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    
    U->>F: Submit Login Form
    F->>A: POST /api/auth/login
    A->>D: Find User by Email
    D->>A: User Data
    A->>A: Verify Password Hash
    A->>A: Generate JWT Token
    A->>F: Return User + Token
    F->>F: Store Token in LocalStorage
    F->>U: Redirect to Dashboard
    
    Note over F,A: Future Requests
    F->>A: Request with Token in Header
    A->>A: Verify & Decode Token
    A->>A: Attach User ID to Request
```

## Error Handling Flow

```mermaid
graph TB
    A[Request] --> B[Try/Catch Block]
    B --> C{Error Occurred?}
    C -->|No| D[Success Response]
    C -->|Yes| E{Error Type}
    E -->|Validation| F[400 Bad Request]
    E -->|Auth| G[401 Unauthorized]
    E -->|Not Found| H[404 Not Found]
    E -->|Server| I[500 Internal Error]
    F --> J[JSON Error Response]
    G --> J
    H --> J
    I --> J
```

## Scalability Considerations

### Current Setup (MVP)
- Single server instance
- Supabase shared database
- Suitable for: 0-10,000 users

### Future Scaling Options
1. **Horizontal Scaling**
   - Load balancer
   - Multiple API instances
   - Redis for session storage

2. **Database Optimization**
   - Connection pooling
   - Read replicas
   - Caching layer (Redis)

3. **CDN & Assets**
   - Cloudflare/CloudFront
   - Image optimization
   - Static asset caching

4. **Microservices (if needed)**
   - Separate auth service
   - Separate payment service
   - Message queue for async tasks

## Development vs Production

### Development
- Local database (optional)
- Hot reload
- Detailed error messages
- CORS: `localhost:5173`

### Production
- Supabase production instance
- Compiled JavaScript
- Generic error messages
- CORS: Production domain only
- HTTPS enforced
- Environment variables secured

## Best Practices Implemented

✅ Separation of Concerns (MVC pattern)
✅ Service Layer for business logic
✅ Type safety with TypeScript
✅ Input validation with Zod
✅ Prepared statements (SQL injection prevention)
✅ Password hashing
✅ JWT authentication
✅ Error handling middleware
✅ Environment-based configuration
✅ Database indexes for performance
✅ CORS configuration
✅ RESTful API design

## Future Enhancements

### Phase 2
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Order status tracking
- [ ] Product reviews
- [ ] Wishlist functionality

### Phase 3
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Analytics & reporting
- [ ] Multi-currency support
- [ ] Internationalization

### Phase 4
- [ ] Mobile app
- [ ] Advanced search (Elasticsearch)
- [ ] Recommendation engine
- [ ] Real-time notifications
- [ ] Social features
