# 🚀 CommerceCraft Backend - Setup Instructions

## Current Status: ✅ Backend Implementation Complete

All backend files have been created and dependencies installed successfully!

---

## 📋 What You Need to Do Next

### Step 1: Set Up Supabase Database (Required)

The backend uses Supabase (PostgreSQL) as the database. You need to:

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up for a free account (no credit card required)

2. **Create a New Project**
   - Click "New Project"
   - Choose a name (e.g., "commercecraft")
   - Choose a database password (save this!)
   - Select a region close to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy these values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **Project API keys → anon/public** key
     - **Project API keys → service_role** key (click "Reveal")

4. **Set Up Database Schema**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click "New Query"
   - Open the file `server/database/schema.sql`
   - Copy ALL the contents
   - Paste into the SQL Editor
   - Click "Run" (bottom right)
   - You should see "Success. No rows returned"

### Step 2: Configure Environment Variables

1. Open `server/.env` in your editor
2. Replace the placeholder values with your actual Supabase credentials:

```env
SUPABASE_URL=https://xxxxx.supabase.co  # Your actual Supabase URL
SUPABASE_ANON_KEY=eyJhbGc...             # Your actual anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...    # Your actual service role key
JWT_SECRET=change-this-to-a-long-random-string-min-32-chars
```

**Important:** Generate a strong JWT_SECRET. You can use:
- Online generator: [https://www.random.org/strings/](https://www.random.org/strings/)
- Or run in terminal: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 3: Seed the Database

Navigate to the server directory and run the seed script:

```bash
cd server
npm run seed
```

You should see:
```
🌱 Starting database seeding...
✅ Successfully seeded 8 products
🎉 Database seeding completed!
```

If you see an error about Supabase connection, verify your `.env` credentials.

### Step 4: Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3001
🌍 Environment: development
📡 API available at http://localhost:3001/api
```

### Step 5: Test the API

Open a new terminal and test:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test products endpoint
curl http://localhost:3001/api/products
```

You should see JSON responses with data!

---

## 🎯 Quick Test Checklist

- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database schema executed successfully
- [ ] `.env` file updated with real credentials
- [ ] Dependencies installed (`npm install` in server folder)
- [ ] Database seeded (`npm run seed`)
- [ ] Server starts without errors (`npm run dev`)
- [ ] Health endpoint returns OK (`curl http://localhost:3001/health`)
- [ ] Products endpoint returns data (`curl http://localhost:3001/api/products`)

---

## 📁 File Structure Overview

```
server/
├── src/
│   ├── config/          - Environment configuration
│   ├── controllers/     - Request handlers
│   ├── lib/            - Supabase client
│   ├── middleware/     - Auth & validation
│   ├── routes/         - API routes
│   ├── services/       - Business logic
│   ├── types/          - TypeScript types
│   ├── scripts/        - Seed script
│   └── server.ts       - Main entry point
├── database/
│   └── schema.sql      - Database schema
├── .env                - Your credentials (DO NOT COMMIT)
├── .env.example        - Template
├── package.json        - Dependencies
└── tsconfig.json       - TypeScript config
```

---

## 🔧 Available Commands

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run seed     # Seed database with products
```

---

## ❓ Troubleshooting

### Error: "Missing required environment variables"
**Solution:** Make sure `.env` file exists and has all required variables set.

### Error: "Cannot connect to Supabase"
**Solution:** 
1. Verify your Supabase URL and keys in `.env`
2. Check that your Supabase project is active (not paused)
3. Ensure you have internet connection

### Error: "relation 'products' does not exist"
**Solution:** Run the database schema SQL in Supabase SQL Editor.

### Error: "Port 3001 already in use"
**Solution:** Change PORT in `.env` to 3002 or another available port.

### Products table is empty
**Solution:** Run `npm run seed` to populate initial products.

### TypeScript errors in IDE
**Solution:** 
1. Make sure you ran `npm install` in the server folder
2. Restart your IDE/editor
3. These are just IDE warnings - the server will still run

---

## 🎨 Next Steps (Optional)

Once your backend is running:

1. **Test with Postman/Insomnia**
   - Import the API endpoints from `API_DOCUMENTATION.md`
   - Test registration, login, cart operations

2. **Connect Frontend**
   - Follow `INTEGRATION_GUIDE.md`
   - Update frontend to use backend API

3. **Customize Products**
   - Modify `src/scripts/seed.ts` to add your own products
   - Re-run `npm run seed` (may need to clear products table first)

4. **Add More Features**
   - Newsletter subscription endpoint
   - Product reviews system
   - Wishlist functionality
   - Admin panel

---

## 📚 Documentation

- [server/README.md](server/README.md) - Detailed backend guide
- [server/API_DOCUMENTATION.md](server/API_DOCUMENTATION.md) - API reference
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Connect frontend
- [QUICKSTART.md](QUICKSTART.md) - Full project guide
- [BACKEND_SUMMARY.md](BACKEND_SUMMARY.md) - Implementation summary

---

## 🆘 Need Help?

1. Check the documentation files listed above
2. Review error messages carefully
3. Verify all environment variables are set correctly
4. Make sure Supabase project is active and database schema is created

---

## ✅ Success Indicators

When everything is working correctly:

- ✅ No errors when running `npm run dev`
- ✅ Server shows "🚀 Server running on port 3001"
- ✅ `curl http://localhost:3001/health` returns `{"status":"OK",...}`
- ✅ `curl http://localhost:3001/api/products` returns array of products
- ✅ You can see your products in Supabase dashboard → Table Editor → products

---

**That's it! Your backend is ready to use! 🎉**

The backend provides a complete REST API for:
- User authentication (register, login)
- Product catalog (browse, search, filter)
- Shopping cart (add, update, remove)
- Order management (create, view orders)

Happy coding! 🚀
