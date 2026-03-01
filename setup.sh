#!/bin/bash

# FROM BIRTH App Setup Script
# This script initializes the development environment

echo "🌸 Initializing FROM BIRTH App..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env.local from template
if [ ! -f apps/web/.env.local ]; then
  echo "📝 Creating .env.local from template..."
  cp .env.example apps/web/.env.local
  echo "⚠️  Please update apps/web/.env.local with your API keys"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env.local with your API keys"
echo "  2. Run 'pnpm dev' to start development servers"
echo "  3. Open http://localhost:3000"
echo ""
echo "For more info, see README.md"
