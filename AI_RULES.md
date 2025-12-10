# AI Rules for Nepal Treks Application

This document outlines the core technologies used in the Nepal Treks application and provides clear guidelines for using specific libraries and frameworks. Adhering to these rules ensures consistency, maintainability, and optimal performance across the codebase.

## Tech Stack Overview

The Nepal Treks application is built using a modern web development stack, focusing on performance, developer experience, and scalability:

*   **Frontend Framework**: React.js for building dynamic and interactive user interfaces.
*   **Language**: TypeScript for type safety, improved code quality, and better tooling.
*   **Build Tool**: Vite for a fast development server and optimized production builds.
*   **Styling**: Tailwind CSS for a utility-first approach to rapidly build custom designs.
*   **UI Components**: shadcn/ui (built on Radix UI primitives) for accessible, customizable, and aesthetically pleasing UI components.
*   **Routing**: React Router for declarative client-side navigation.
*   **Data Management**: Supabase as a backend-as-a-service, providing a PostgreSQL database, authentication, and storage.
*   **Server State Management**: TanStack Query (React Query) for efficient data fetching, caching, and synchronization.
*   **Icons**: Lucide React for a comprehensive set of customizable SVG icons.
*   **Form Handling**: React Hook Form with Zod for robust, performant, and schema-based form validation.
*   **Notifications**: Sonner for elegant and accessible toast notifications.

## Library Usage Rules

To maintain a consistent and high-quality codebase, please follow these guidelines when developing new features or modifying existing ones:

1.  **React**:
    *   Always use functional components and React Hooks for state and lifecycle management.
    *   Prioritize custom hooks (e.g., `useTreks`, `useAuth`) to encapsulate and reuse logic.

2.  **TypeScript**:
    *   Strictly type all components, props, state, and function arguments/return values.
    *   Leverage Supabase's generated types (`src/integrations/supabase/types.ts`) for database interactions.

3.  **Styling (Tailwind CSS)**:
    *   **Utility-First**: Apply styles primarily using Tailwind's utility classes directly in your JSX.
    *   **No Custom CSS Files**: Avoid creating new `.css` files. If complex, unique styles are absolutely necessary and cannot be achieved with Tailwind, consider extending `tailwind.config.ts` or using CSS-in-JS solutions if approved.
    *   **Conditional Classes**: Use `clsx` and `tailwind-merge` for combining and conditionally applying Tailwind classes.

4.  **UI Components (shadcn/ui & Radix UI)**:
    *   **Prioritize shadcn/ui**: Always use existing shadcn/ui components (e.g., `Button`, `Input`, `Dialog`, `Form`, `Table`) whenever a suitable component is available.
    *   **Radix UI as Fallback**: If a specific component is not available in shadcn/ui, check Radix UI primitives, which shadcn/ui is built upon.
    *   **New Components**: If neither provides the required component, create a new component in `src/components/` following shadcn/ui's structure, accessibility standards, and Tailwind styling principles.

5.  **Routing (React Router)**:
    *   **Centralized Routes**: Define all main application routes within `src/App.tsx`.
    *   **Navigation**: Use the `Link` component for client-side navigation. For programmatic navigation (e.g., after form submission), use the `useNavigate` hook.

6.  **Data Management (Supabase)**:
    *   **Supabase Client**: All interactions with the backend (database, authentication, storage) must use the `supabase` client instance from `src/integrations/supabase/client.ts`.
    *   **Custom Hooks**: Abstract Supabase data fetching and mutation logic into dedicated custom hooks (e.g., `useTreks`, `useBlogPosts`, `useSettings`) to keep components clean and reusable.

7.  **Server State Management (TanStack Query)**:
    *   **Data Fetching**: Integrate TanStack Query (`@tanstack/react-query`) within your custom data hooks to manage server state, including fetching, caching, invalidation, and error handling.
    *   **Global Provider**: The `QueryClientProvider` is already set up in `src/App.tsx`.

8.  **Icons (Lucide React)**:
    *   **Exclusive Use**: Always use icons from the `lucide-react` library.
    *   **Styling**: Apply appropriate sizing and coloring using Tailwind CSS classes.

9.  **Form Handling (React Hook Form & Zod)**:
    *   **Form Management**: Use `react-hook-form` for all form state management, including input registration, validation, and submission.
    *   **Validation**: Define form schemas using `zod` for robust and clear validation rules.
    *   **Integration**: Integrate `react-hook-form` with shadcn/ui's `Form` components for a consistent UI and UX.

10. **Notifications (Sonner)**:
    *   **Toast Notifications**: For all user feedback and notifications (e.g., success messages, errors), use `sonner`. The `Toaster` component from `sonner` is already configured in `src/App.tsx`.
    *   **Usage**: Import `toast` from `sonner` directly for displaying messages.

11. **API Interaction**:
    *   **AI SEO Service**: For AI SEO optimization, use the `optimizeForSEO` function from `src/services/aiSeoEngine.ts`. This service handles calling the backend API or providing a local fallback.
    *   **Other Backend APIs**: For other custom backend API interactions, create dedicated service functions (e.g., `src/services/trekService.ts` if it existed) or integrate directly into custom hooks using Supabase.