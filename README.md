# CloudStack Dashboard

A modern, responsive dashboard for managing CloudStack infrastructure built with React, TypeScript, and shadcn/ui components.

## Features

- **Dashboard Overview**: Real-time monitoring of instances, CPU usage, memory, storage, networks, and active users
- **Instance Management**: View and manage virtual machines with status indicators
- **Resource Monitoring**: Track CPU, memory, and storage utilization across your infrastructure
- **Network Management**: Monitor and manage virtual networks
- **User Management**: View active users and manage access
- **Security Center**: Security monitoring and configuration
- **Audit Logs**: Track system activities and changes
- **Settings**: Configure system preferences and options

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Theming**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloudstack
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/            # Layout components (sidebar, header)
│   └── ui/                # Reusable UI components (shadcn/ui)
├── pages/                 # Page components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── main.tsx              # Application entry point
```

## Pages

- **Dashboard** - Main overview with KPIs and system status
- **Instances** - Virtual machine management
- **Networks** - Network configuration and monitoring
- **Storage** - Storage management and monitoring
- **Users** - User management and access control
- **Security** - Security settings and monitoring
- **Monitoring** - Advanced monitoring and metrics
- **Audit Logs** - System activity logs
- **Settings** - Application configuration

## UI Components

This project uses shadcn/ui components built on top of Radix UI primitives, providing:

- Consistent design system
- Accessibility by default
- Customizable with Tailwind CSS
- Type-safe component props

## Development

### Code Style

- ESLint configuration for consistent code style
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture

### Adding New Features

1. Create components in the appropriate directory under `src/components/`
2. Add new pages in `src/pages/`
3. Update routing if needed
4. Follow the existing code patterns and conventions

## Deployment

The project includes a `vercel.json` configuration for easy deployment to Vercel. For other platforms:

1. Build the project:
```bash
npm run build
```

2. Serve the `dist` folder using your preferred hosting solution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass and code follows the style guide
5. Submit a pull request

## License

This project is private and not licensed for public use.