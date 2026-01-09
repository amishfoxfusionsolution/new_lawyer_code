# AI Editor Rules and Project Guidelines

This document outlines the core technologies and architectural conventions used in the "Unseen Lawyers" application. All code modifications and new feature implementations must adhere to these rules to maintain consistency, performance, and readability.

## 1. Technology Stack Overview

The application is built using a modern, component-based architecture:

*   **Framework:** React (with Vite tooling).
*   **Language:** TypeScript (mandatory for all source files).
*   **Styling:** Tailwind CSS, utilizing custom color tokens (e.g., `gold`, `noir`) and utility classes defined in `src/index.css` and `tailwind.config.ts`.
*   **UI Components:** shadcn/ui (used for all standard components like `Button`, `Input`, `Dialog`, etc.).
*   **Routing:** React Router DOM (all main routes are defined in `src/App.tsx`).
*   **Backend/Auth:** Supabase (`@supabase/supabase-js`) for authentication and database interactions.
*   **State Management:** React Query (`@tanstack/react-query`) for server state management and caching.
*   **Icons:** Lucide React (`lucide-react`).
*   **Utility:** `clsx` and `tailwind-merge` via the `cn` utility function (`src/lib/utils.ts`).

## 2. Library Usage and Conventions

| Feature | Library / Component | Rule |
| :--- | :--- | :--- |
| **UI Components** | shadcn/ui | **Mandatory.** Use pre-built shadcn components (e.g., `Button`, `Input`, `Dialog`, `DropdownMenu`) for all standard UI elements. Do not create custom versions unless absolutely necessary. |
| **Notifications** | `sonner` and `useToast` (from `src/hooks/use-toast.ts`) | Use `sonner` for general, non-intrusive notifications and the custom `useToast` hook for system-level alerts. |
| **Styling** | Tailwind CSS | **Exclusive.** All styling must be done using Tailwind utility classes. Use the custom `font-display` (Playfair Display) for headings and `font-body` (Inter) for text. |
| **Routing** | React Router DOM | Use `BrowserRouter`, `Routes`, and `Route`. Keep the main routing structure in `src/App.tsx`. Use the custom `NavLink` component for internal navigation. |
| **Authentication** | `useAuth` hook (`src/hooks/useAuth.tsx`) | **Mandatory.** All user session, sign-in, sign-up, and sign-out logic must utilize the existing `useAuth` hook, which wraps Supabase. |
| **Data Fetching** | React Query | Use React Query for fetching, caching, and synchronizing server state (Supabase data). |
| **File Structure** | `src/pages/`, `src/components/`, `src/hooks/` | Maintain the existing directory structure. New components must be placed in `src/components/`. |