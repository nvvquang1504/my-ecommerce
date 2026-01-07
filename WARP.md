# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React-based e-commerce application named "Cube Shop" built with TypeScript, Vite, and Firebase. It features authentication, shopping cart functionality, and order management.

## Commands

### Development
```bash
npm run dev
```
Starts the Vite development server with host access enabled (accessible on network).

### Build
```bash
npm run build
```
Compiles TypeScript and builds the production bundle. The build output goes to the `dist` directory.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Firebase Deployment
```bash
firebase deploy
```
Deploys the application to Firebase Hosting (ensure you've run `npm run build` first and the build output matches the hosting public directory configuration).

## Architecture

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin for fast compilation
- **Routing**: React Router v6
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Backend/Services**: Firebase (Authentication, Firestore, Storage, Analytics)
- **Styling**: SASS modules (.module.scss convention)
- **UI Notifications**: react-toastify

### Project Structure

```
src/
├── assets/           # Static assets (images, etc.)
├── components/       # Reusable UI components
│   ├── Card/
│   ├── Footer/
│   ├── Header/       # Main navigation with auth state
│   ├── Loader/
│   ├── ShowOnLogin/  # Conditional rendering wrapper (logged-in users)
│   ├── ShowOnLogout/ # Conditional rendering wrapper (logged-out users)
│   └── Slider/
├── pages/            # Route-level components
│   ├── Admin/
│   ├── Auth/         # Login, Register, Reset password pages
│   ├── Cart/
│   ├── Contact/
│   ├── Home/
│   └── OrderHistory/
├── redux/            # Redux state management
│   ├── slice/        # Redux slices (currently authSlice)
│   ├── hooks.ts      # Typed Redux hooks (useAppDispatch, useAppSelector)
│   └── store.ts      # Redux store configuration
├── services/
│   └── firebase.ts   # Firebase initialization and exports (auth, db, storage)
├── App.tsx           # Main app component with routing
├── main.tsx          # React app entry point
└── index.css         # Global styles
```

### Key Architectural Patterns

#### Authentication Flow
- Firebase Authentication is used for user management (email/password and Google OAuth)
- Auth state is synchronized to Redux via `authSlice` (actions: `SET_ACTIVE_USER`, `REMOVE_ACTIVE_USER`)
- The `Header` component listens to Firebase `onAuthStateChanged` and dispatches Redux actions to keep state in sync
- User information includes: `userId`, `email`, `userName`, `isLoggedIn`

#### Conditional Rendering
- Use `ShowOnLogin` and `ShowOnLogout` wrapper components for auth-conditional UI
- Both components check `state.auth.isLoggedIn` from Redux store
- Example: Navigation links, user greeting, sign-out button

#### Component Organization
- Each component/page lives in its own directory with an `index.tsx` file
- Styles use SCSS modules (e.g., `style.module.scss`) imported as `styles` object
- Components follow React functional component pattern with hooks

#### Redux Usage
- Always use typed hooks: `useAppDispatch()` and `useAppSelector()` from `src/redux/hooks.ts`
- Do NOT use plain `useDispatch` or `useSelector` from react-redux
- Redux slices follow RTK patterns with `createSlice`

#### Routing
- React Router v6 with `BrowserRouter`
- Routes defined in `App.tsx`
- Firebase hosting is configured for SPA routing (all routes rewrite to `/index.html`)

#### Firebase Integration
- Firebase config is in `src/services/firebase.ts`
- Exports: `auth`, `db` (Firestore), `storage`, and `app`
- **SECURITY NOTE**: Firebase API keys are currently committed in `firebase.ts`. These should be moved to environment variables.

#### Styling
- Global styles in `src/index.css`
- Component-specific styles use SCSS modules
- Utility classes follow BEM-like convention (e.g., `--btn`, `--btn-primary`, `--btn-block`)

## Development Notes

### TypeScript Configuration
- Strict mode enabled
- Target: ESNext with modern ES modules
- JSX: react-jsx (new JSX transform)
- Source files in `src/` directory only

### State Management Expansion
When adding new Redux slices:
1. Create slice in `src/redux/slice/`
2. Import and add reducer to `src/redux/store.ts`
3. Export actions from the slice
4. Use typed hooks (`useAppSelector`, `useAppDispatch`) in components

### Firebase Security
- The current Firebase configuration contains API keys directly in source code
- For production or shared repositories, migrate to environment variables using Vite's `import.meta.env`
- Create `.env.local` for local development and use build-time variable substitution

### Adding New Pages
1. Create directory in `src/pages/[PageName]/`
2. Add `index.tsx` and `style.module.scss`
3. Register route in `src/App.tsx`
4. Update Header navigation if needed

### Notifications
- Use `react-toastify` for user feedback
- Toast container configured in `App.tsx` with position: top-left, 2s auto-close
- Import `toast` and call `toast.success()`, `toast.error()`, etc.

### Lodash Usage
- Lodash is imported as `_` where needed
- Example usage in Header: `_.camelCase()` for generating usernames from emails
