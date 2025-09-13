# MycoSense Soil Biosensor Dashboard

## Overview

MycoSense is a full-stack soil biosensor monitoring application designed for environmental contamination detection and analysis. The application allows users to upload CSV files containing soil sensor data (coordinates, voltage readings, and pollutant types) and provides real-time visualization through interactive charts and AI-powered analysis. Built as a modern web application, it features a React frontend with data visualization capabilities and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme and CSS variables
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Data Visualization**: Plotly.js for interactive charts (heatmaps, bar charts, line charts)
- **File Processing**: PapaParse for CSV parsing and validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **File Upload**: Multer middleware for handling CSV file uploads
- **Data Validation**: Zod schemas for runtime type validation
- **Development Setup**: Vite middleware integration for development server
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation

### Database Design
- **Users Table**: Basic user authentication with username/password
- **Uploads Table**: Tracks CSV file uploads with metadata
- **Soil Data Table**: Stores individual sensor readings with x/y coordinates, voltage values, and pollutant types
- **Schema Management**: Drizzle migrations with PostgreSQL dialect

### API Structure
- **REST Endpoints**: 
  - POST `/api/uploads` - CSV file upload and processing
  - GET `/api/uploads` - Retrieve upload history
  - GET `/api/uploads/:id/data` - Get soil data for specific upload
  - GET `/api/uploads/:id/analysis` - AI analysis results
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging

### Data Processing Pipeline
- **CSV Validation**: Enforces required columns (x, y, voltage, pollutant)
- **Type Conversion**: Dynamic typing during CSV parsing
- **Batch Processing**: Bulk database insertions for large datasets
- **Analysis Engine**: In-memory statistical analysis with risk assessment

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL with Neon serverless driver
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Chart Library**: Plotly.js CDN for data visualization
- **Font System**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icon Library**: Font Awesome for UI icons

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESBuild for production bundling
- **Replit Integration**: Custom Vite plugins for development environment
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer

### UI Libraries
- **Component System**: Extensive Radix UI primitives collection
- **Utility Libraries**: 
  - clsx and tailwind-merge for conditional styling
  - class-variance-authority for component variants
  - cmdk for command palette functionality
  - date-fns for date manipulation

### File Processing
- **CSV Parser**: PapaParse for robust CSV handling
- **Form Handling**: React Hook Form with Hookform resolvers
- **Validation**: Zod for schema validation across frontend and backend