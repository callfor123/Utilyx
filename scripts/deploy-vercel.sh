#!/bin/bash
# Deploy script for Vercel

# Build the project
echo "Building project..."
bun run build

# Deploy to Vercel (requires vercel login or environment setup)
echo "Deploying to Vercel..."
vercel --prod --yes