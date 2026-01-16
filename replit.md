# Portfolio Website

## Overview

A personal portfolio website for Thiago Giovanni Bosco de Carvalho, a Backend Developer and IT Infrastructure Analyst. The application is a full-stack TypeScript project with a React frontend and Express backend, designed to showcase professional experience, skills, projects, certifications, and provide a contact form.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: Shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for scroll reveals and interactions
- **Smooth Scrolling**: react-scroll for section navigation
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared/routes.ts
- **Data Storage**: In-memory storage (MemStorage class) - prepared for PostgreSQL migration
- **Schema Definition**: Drizzle ORM with drizzle-zod for type-safe schemas

### Build System
- **Development**: Vite dev server with HMR
- **Production**: esbuild for server bundling, Vite for client build
- **TypeScript Config**: Bundler module resolution with path aliases (@/, @shared/)

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   └── storage.ts    # Data storage layer
├── shared/           # Shared types and schemas
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API route contracts
└── script/           # Build scripts
```

### Data Model
The application manages portfolio data through these entities:
- Profile (personal info, contact details)
- Skills (categorized technical skills)
- Experiences (work history)
- Projects (portfolio items)
- Educations (academic background)
- Certifications (professional certifications)
- Contacts (form submissions)

## External Dependencies

### Database
- **Drizzle ORM**: Schema definition and type generation
- **PostgreSQL ready**: Schema uses pg-core, connect-pg-simple for sessions
- Currently uses in-memory storage but structured for easy PostgreSQL integration

### UI Libraries
- **Radix UI**: Complete set of accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Vaul**: Drawer component
- **CMDK**: Command menu

### Development Tools
- **Vite**: Frontend dev server and bundler
- **esbuild**: Server bundling for production
- **Drizzle Kit**: Database migrations (db:push command)

### Fonts (Google Fonts)
- Inter (body text)
- JetBrains Mono (code/terminal)
- Space Grotesk (headings)