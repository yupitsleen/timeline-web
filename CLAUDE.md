# CLAUDE.md

This file provides guidance to Claude Code when working with this React web application.

## Project Structure

This is a React web application built with Vite, TypeScript, and modern React patterns. It's designed as a reusable scaffold for any future React projects.

### Key Files and Directories
- `src/App.tsx` - Main application component with routing
- `src/main.tsx` - Application entry point
- `src/components/` - Reusable UI components
- `src/layouts/` - Page layout components
- `src/pages/` - Route components (Home, About, NotFound)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and helpers
- `src/context/` - React Context providers for state management
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants

## Common Commands

**Development:**
```bash
npm run dev     # Start development server (http://localhost:5173)
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## Architecture

**Core Technologies:**
- **React 19.1.1** - Latest React with modern patterns
- **TypeScript 5.8.3** - Strict typing with verbatimModuleSyntax
- **Vite 7.1.0** - Fast build tool and dev server
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling

**Application Structure:**
- **Routing** - React Router with BrowserRouter
- **State Management** - Context API for global app state (user, theme, loading)
- **Layout System** - Reusable Layout component with navigation
- **Error Handling** - Error boundaries for graceful error recovery
- **TypeScript** - Strict configuration with proper type-only imports

**Available Utilities:**
- `useDebounce` - Debounce values for search/input
- `useToggle` - Simple boolean state toggle
- Helper functions: `formatDate`, `debounce`, `classNames`, `generateId`, `isValidEmail`

## Development Notes

- All TypeScript interfaces use `type` imports due to `verbatimModuleSyntax`
- CSS Modules provide automatic scoping (`.module.css` files)
- Error boundaries catch and display user-friendly error messages
- The app is fully responsive and supports light/dark theming via Context
- Code is structured to be easily forkable for new projects

## Future Extensions

This scaffold provides a solid foundation for:
- Adding new pages (create in `src/pages/`)
- New UI components (create in `src/components/`)
- Custom hooks (add to `src/hooks/`)
- State management extensions (modify `src/context/AppContext.tsx`)
- API integration (add to `src/utils/` or new `src/services/`)
- Database integration (SQLite or other databases)

The scaffold follows React best practices and can be extended for any application type.