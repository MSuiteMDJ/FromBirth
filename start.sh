#!/bin/bash

# Quick start script for FROM BIRTH development

echo "🌸 FROM BIRTH - Development Setup"
echo "===================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm is not installed"
  echo "Install it with: npm install -g pnpm"
  exit 1
fi

echo "✅ pnpm found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
  echo "❌ Installation failed"
  exit 1
fi

echo "✅ Dependencies installed"

# Create .env files
echo ""
echo "📝 Setting up environment variables..."

if [ ! -f apps/web/.env.local ]; then
  cp .env.example apps/web/.env.local
  echo "✅ Created apps/web/.env.local"
else
  echo "⚠️  apps/web/.env.local already exists"
fi

if [ ! -f apps/api/.env ]; then
  cp .env.example apps/api/.env
  echo "✅ Created apps/api/.env"
else
  echo "⚠️  apps/api/.env already exists"
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   ✅ Setup Complete!                   ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "To start development:"
echo ""
echo "  Option 1 (Recommended - Run everything):"
echo "    pnpm dev"
echo ""
echo "  Option 2 (Start separately):"
echo "    Terminal 1: pnpm dev:api"
echo "    Terminal 2: pnpm dev:web"
echo ""
echo "  Option 3 (Just web, without API):"
echo "    pnpm dev:web"
echo ""
echo "URLs:"
echo "  🌐 Web:  http://localhost:3010"
echo "  📡 API:  http://localhost:3011"
echo ""
echo "Documentation:"
echo "  📖 Frontend: See DEVELOPMENT.md"
echo "  📖 Backend:  See apps/api/README.md"
echo ""
