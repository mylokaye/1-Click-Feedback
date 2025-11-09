#!/bin/bash

# 1-Click Feedback System Setup Script
# This script helps set up the project for deployment

set -e

echo "🚀 1-Click Feedback System Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    if [ ! -f .env.local.example ]; then
        echo "❌ Error: .env.local.example not found!"
        exit 1
    fi
    cp .env.local.example .env.local
    echo "✅ .env.local created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "   Get these from your Supabase project at https://supabase.com"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Build the project
echo "🔨 Building the project..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Configure your Supabase credentials in .env.local"
echo "2. Run the SQL schema in Supabase (see supabase/migrations/20240101000000_initial_schema.sql)"
echo "3. Start the development server: npm run dev"
echo "4. Or deploy to Vercel: vercel"
echo ""
echo "For more information, see README.md and DEPLOYMENT.md"
