#!/bin/bash

# Build script for ChamaFi web

echo "Building ChamaFi web application..."

# Run the Next.js build
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  echo "To start the production server, run: npm start"
else
  echo "Build failed!"
  exit 1
fi