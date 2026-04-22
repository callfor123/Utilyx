#!/bin/bash

# Build script for Utilyx (Next.js 16)
set -e

echo "Starting build process..."

# Run next build
if ! npx next build 2>&1; then
  echo "Build failed!"
  exit 1
fi

# Check if the build output exists
if [ -d ".next" ]; then
  echo "Build completed, copying files..."
  mkdir -p .next/standalone
  cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
  cp -r public .next/standalone/ 2>/dev/null || true
  echo "Build process completed successfully!"
  exit 0
else
  echo "Build failed - .next directory not found!"
  exit 1
fi