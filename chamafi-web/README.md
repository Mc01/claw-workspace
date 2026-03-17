# ChamaFi Web

Landing page and foundation for the ChamaFi project.

## Overview

ChamaFi is a decentralized finance platform designed to empower African savings groups (chamas) with transparent, accessible, and growth-oriented financial tools.

This repository contains the web frontend built with:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Responsive design (mobile-first)

## Features

- Landing page with hero section, problem statement, solution overview, and how it works
- Surface detection utility for MiniPay, Farcaster, and Web environments
- Waitlist/coming soon section
- Responsive design with warm earth tones and green accents
- Vercel deployment configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── app/           # App Router pages and layout
├── components/    # React components
└── lib/           # Utility functions
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Future Enhancements

- Integration with wagmi and viem for wallet connectivity
- Farcaster MiniApp SDK integration
- Additional DeFi features and investment options
- Community governance tools