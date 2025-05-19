# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is a responsive web dashboard for a WhatsApp-based learning platform featuring:

1. Main metrics dashboard (user counts, engagement rates, peer interactions, dropout visualization)
2. User journey monitoring (onboarding tracking, module completion, exercise submissions)
3. Support and feedback tracking (help requests, feedback polls, technical issues)
4. Content management (module organization, multimedia content status, message templates)
5. Analytics (engagement metrics, dropout analysis, group patterns, benchmarks)

Design requirements include mobile-responsiveness, intuitive navigation, clear data visualizations, real-time updates, low-bandwidth optimization, and theme options.

## Technology Stack

This project utilizes:
- Frontend framework: React with TypeScript
- Build tool: Vite
- UI Framework: Material UI (@mui/material)
- Routing: React Router (react-router-dom)
- Data visualization: Recharts
- Theming: Dark/light mode via MUI ThemeProvider
- Icons: Material Icons (@mui/icons-material)
- API integration with WhatsApp Business API (planned)
- Authentication system (planned)
- Real-time data processing (planned)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

- `/src`: Main source code
  - `/components`: Reusable UI components
  - `/pages`: Page components for different dashboard sections
  - `/hooks`: Custom React hooks
  - `/services`: API and data services
  - `/utils`: Utility functions
  - `/assets`: Static assets
  - `/types`: TypeScript type definitions
  - `/context`: React context providers

## Key Features and Components

1. Dashboard Layout
   - Responsive sidebar navigation
   - Dark/light theme toggle
   - Mobile-friendly design

2. Main Dashboard
   - Key metric cards (total users, active users, etc.)
   - Engagement charts
   - Dropout visualization

3. User Journey Section (planned)
   - Onboarding progress tracking
   - Module completion visualization
   - Exercise submission metrics

4. Support & Feedback (planned)
   - Help request monitoring
   - User feedback visualization
   - Technical issue tracking

5. Content Management (planned)
   - Module organization tools
   - Multimedia content status tracking
   - Message template library

## Coding Standards

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow component composition patterns
- Use async/await for asynchronous operations
- Implement error boundaries for fallback UIs
- Follow accessibility best practices
- Use Material UI theming system
- Optimize components for low-bandwidth environments