# 2. Authentication Flow

This document details the user authentication and authorization mechanisms in the JSONPost application. The entire authentication system is built on top of **Supabase Auth**.

## Overview

The authentication flow is designed to be secure and straightforward, supporting both traditional email/password credentials and OAuth providers like Google.

-   **Provider**: Supabase Auth handles all aspects of user management, including sign-up, sign-in, session management, and password recovery.
-   **Client-Side Integration**: The application uses the `@supabase/ssr` library, which is specifically designed for server-side rendering (SSR) environments like Next.js. It enables seamless authentication across both client and server components.
-   **Session Management**: Supabase manages user sessions using secure, HTTP-only cookies, which are automatically handled by the `@supabase/ssr` library.

## Route Protection and Middleware

The primary mechanism for protecting routes is the Next.js middleware, defined in `src/middleware.ts`.

### How it Works:

1.  **Request Interception**: The middleware intercepts all incoming requests to the application (except for specific static assets and public API endpoints defined in the `matcher` config).
2.  **Session Check**: For each request, it uses `supabase.auth.getUser()` to check if there is an active, valid user session associated with the request's cookies.
3.  **Public vs. Private Routes**:
    *   A `publicPaths` array explicitly lists all routes that **do not** require authentication (e.g., `/`, `/pricing`, `/blog`).
    *   Any route not in this public list is considered a **protected route** (e.g., `/dashboard`, `/dashboard/projects`).
4.  **Redirection Logic**:
    *   If a **non-authenticated user** tries to access a protected route, the middleware redirects them to `/auth/login`. The original path is appended as a `redirectTo` query parameter so the user can be sent to their intended page after logging in.
    *   If a **logged-in user** tries to access public authentication pages like `/auth/login` or `/auth/signup`, they are redirected to their dashboard (`/dashboard`).

## Authentication Methods

The application supports two primary methods for user authentication, both of which are handled on the frontend by the `LoginForm` (`src/app/auth/login/login-form.tsx`) and `SignupForm` components.

### 1. Email and Password

This is the standard credential-based login flow.

**Flow:**
1.  The user enters their email and password into the login form.
2.  On submission, the `handleLogin` function is triggered.
3.  It calls `supabase.auth.signInWithPassword({ email, password })`.
4.  Supabase authenticates the credentials against the `auth.users` table.
5.  If successful, Supabase sets the necessary authentication cookies in the browser.
6.  The Next.js router then redirects the user to their intended destination (either the `/dashboard` or the `redirectTo` path).
7.  If the credentials are a invalid, an error is returned and displayed to the user.

### 2. Google OAuth 2.0

This flow allows users to sign in using their Google account.

**Flow:**
1.  The user clicks the "Continue with Google" button.
2.  The `handleGoogleLogin` function is triggered.
3.  It calls `supabase.auth.signInWithOAuth({ provider: 'google', ... })`.
4.  The user is redirected to Google's authentication screen.
5.  After the user approves the request, Google redirects them back to the application's specified callback URL: `/auth/callback`.
6.  The `/auth/callback` route handler exchanges the authorization code from Google for a user session with Supabase.
7.  Once the session is created, Supabase sets the auth cookies, and the user is redirected to their dashboard.

## Supabase Client Initialization

-   **Client-Side**: The `createClient()` function in `src/lib/supabase.ts` uses `createBrowserClient` from `@supabase/ssr` to create a Supabase client instance. This singleton instance is then used throughout the client-side parts of the application to interact with Supabase services.
-   **Server-Side (Middleware & Server Components)**: In server-side contexts like the middleware, `createServerClient` is used. This function is designed to handle cookies correctly on the server, ensuring that the user's authentication state is properly read and maintained during server-side rendering.

This robust setup ensures that authentication is handled consistently and securely across the entire application, providing a seamless experience for the user while protecting sensitive routes and data.