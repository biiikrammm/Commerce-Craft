# Commerce-Craft 🛍️

A modern, full-stack e-commerce platform built with React, TypeScript, and PostgreSQL. Commerce-Craft provides a robust foundation for building scalable online stores with a clean architecture and modern development practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-95.2%25-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)

## ✨ Features

- 🎨 Modern, responsive UI built with React and Tailwind CSS
- 🔐 Secure authentication and authorization
- 🛒 Full shopping cart functionality
- 💳 Payment processing integration
- 📦 Product catalog management
- 👤 User profile and order history
- 🎯 Admin dashboard for store management
- 📱 Mobile-first responsive design
- ⚡ Fast performance with Vite
- 🎭 Type-safe development with TypeScript

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context/Hooks
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios/Fetch API

### Backend
- **Runtime**: Node.js / Bun
- **Database**: PostgreSQL
- **ORM**: (To be configured)
- **Authentication**: JWT / Session-based

### DevOps
- **Deployment**: Netlify
- **Package Manager**: npm / Bun
- **Version Control**: Git

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) or **Bun** (v1.x or higher)
- **PostgreSQL** (v14.x or higher)
- **Git**
- **npm** or **bun** (package manager)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/biiikrammm/Commerce-Craft.git
cd Commerce-Craft
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using Bun:
```bash
bun install
```

### 3. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/commerce_craft
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=commerce_craft
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password

# Server
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret

# API Keys (if applicable)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Frontend URL
VITE_API_URL=http://localhost:3000/api
```

### 4. Database Setup

Create a PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE commerce_craft;
\q
```

Run database migrations (if available):

```bash
npm run migrate
```

Or seed the database with sample data:

```bash
npm run seed
```

### 5. Start Development Servers

Start the backend server:
```bash
npm run server
```

In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application should now be running:
- **Frontend**: http://localhost:5173 (Vite default)
- **Backend**: http://localhost:3000 (or your configured port)

## 📚 Documentation

For more detailed information, check out these guides:

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running quickly
- **[Setup Instructions](SETUP_INSTRUCTIONS.md)** - Detailed setup process
- **[Architecture Overview](ARCHITECTURE.md)** - System architecture and design
- **[Backend Summary](BACKEND_SUMMARY.md)** - Backend implementation details
- **[Integration Guide](INTEGRATION_GUIDE.md)** - Third-party integrations

## 🏗️ Project Structure

```
Commerce-Craft/
├── backend/              # Backend application code
│   ├── controllers/      # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── server/               # Server configuration
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── context/          # React context
│   └── styles/           # Global styles
├── public/               # Static assets
├── .env.example          # Environment variables template
├── package.json          # Project dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run server           # Start backend server
npm run dev:full         # Start both frontend and backend

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Linting & Formatting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier

# Database
npm run migrate          # Run database migrations
npm run migrate:rollback # Rollback last migration
npm run seed             # Seed database with sample data
```

## 🔒 Security

- All user passwords are hashed using bcrypt
- JWT tokens for authentication
- SQL injection protection through parameterized queries
- CORS configuration for API security
- Environment variables for sensitive data
- Input validation and sanitization

## 🌐 Deployment

### Netlify Deployment

This project is configured for Netlify deployment with the included `netlify.toml` file.

1. Connect your GitHub repository to Netlify
2. Configure environment variables in Netlify dashboard
3. Deploy!

```bash
# Or deploy using Netlify CLI
netlify deploy --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains production-ready files
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits clean and descriptive

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**biiikrammm**
- GitHub: [@biiikrammm](https://github.com/biiikrammm)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [PostgreSQL](https://www.postgresql.org/) - Database
- All other open-source libraries used in this project

## 📧 Support

If you have any questions or run into issues, please:
1. Check the [documentation](#-documentation)
2. Search existing [issues](https://github.com/biiikrammm/Commerce-Craft/issues)
3. Open a new issue if needed

---
