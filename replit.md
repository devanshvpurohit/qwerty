# OwlVibes - Campus Social Network

## Overview

OwlVibes is a campus-focused social networking application designed to help students discover study partners, join clubs, and share academic resources. The application provides a Tinder-like interface for finding study partners, anonymous vibes sharing, club discovery, real-time messaging, and shared note resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color palette (cream, sage, brown themes)
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the stack
- **Real-time Communication**: WebSocket integration for live messaging
- **API Design**: RESTful endpoints with JSON responses
- **Middleware**: Custom logging, error handling, and request processing

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Comprehensive relational design covering users, profiles, clubs, study groups, messages, and social features
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### User Management
- User registration and authentication system
- Profile creation and management with detailed preferences
- University-based user segmentation
- Profile completion tracking

### Social Features
- **Profile Discovery**: Swipe-based interface for finding study partners
- **Matching System**: Like-based matching between users
- **Anonymous Vibes**: Category-based anonymous posting system
- **Real-time Messaging**: WebSocket-powered chat system
- **Shared Notes**: Community resource sharing platform

### Academic Integration
- **Study Groups**: Creation and management of subject-based groups
- **Club System**: University club discovery and membership
- **Class Integration**: Course-based profile matching
- **Study Preferences**: Detailed study habit and location preferences

### UI/UX Components
- Mobile-first responsive design
- Bottom navigation for mobile experience
- Card-based interface with smooth animations
- Toast notifications for user feedback
- Modal dialogs for complex interactions

## Data Flow

### Client-Server Communication
1. **API Requests**: HTTP requests through custom fetch wrapper with error handling
2. **Real-time Updates**: WebSocket connections for instant messaging
3. **State Synchronization**: React Query manages server state caching and updates
4. **Form Validation**: Client-side validation with Zod schemas before API calls

### Database Operations
1. **User Actions**: Frontend triggers API calls to Express routes
2. **Data Processing**: Express handlers process requests and interact with Drizzle ORM
3. **Database Queries**: Type-safe SQL queries through Drizzle to PostgreSQL
4. **Response Handling**: Structured JSON responses with error handling

### Real-time Features
1. **WebSocket Connection**: Established on user authentication
2. **Message Broadcasting**: Real-time message delivery between users
3. **Connection Management**: Client tracking and cleanup on disconnect

## External Dependencies

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL hosting
- **WebSocket Library**: WS for real-time communication

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Tailwind

### Validation & Forms
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Performant form handling
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for fast development
- **Concurrent Development**: Frontend and backend run simultaneously
- **Environment Variables**: Database URL and configuration management
- **Replit Integration**: Optimized for Replit development environment

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets in production
- **Database**: Production PostgreSQL connection through environment variables

### Key Architectural Decisions

**Monorepo Structure**: Single repository with shared types and schemas between frontend and backend for consistency and type safety.

**WebSocket Integration**: Real-time messaging capability essential for social networking features, implemented with connection tracking and message broadcasting.

**University-Centric Design**: All features scoped to university domains to ensure relevant connections and maintain campus-focused community.

**Mobile-First Approach**: Bottom navigation and card-based interface optimized for mobile usage patterns typical of student demographics.

**Type Safety**: Full TypeScript implementation with shared schemas ensures data consistency across the entire application stack.