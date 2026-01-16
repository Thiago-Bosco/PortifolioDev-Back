#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment setup..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Push database schema
echo "🗄️ Setting up database schema..."
npm run db:push

# 3. Build the application
echo "🏗️ Building the application..."
npm run build

echo "✅ Setup complete! You can now click the 'Deploy' button in the Replit interface to publish your portfolio."
