# 11. Developer's Guide

This guide is intended for developers who will be working on the JSONPost codebase. It covers local setup, coding conventions, and best practices to ensure consistency and maintainability.

## 1. Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or a compatible package manager
-   A Supabase account for your own database and authentication instance
-   Git

### Setup Steps

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd jsonpost
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:
    Create a new file named `.env.local` in the root of the project and add the following variables. You can get these values from your Supabase project dashboard.
    ```env
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

    # Email Configuration (Resend) - for sending notifications
    RESEND_API_KEY=your_resend_api_key

    # Dodo Payments (for billing)
    DODO_PAYMENTS_API_KEY=your_dodo_payments_api_key
    DODO_PAYMENTS_ENVIRONMENT=test_mode

    # Other services
    SVIX_AUTH_TOKEN=your_svix_auth_token
    KEY_VALUE_STORE_KV_REST_API_URL=your_upstash_redis_url
    KEY_VALUE_STORE_KV_REST_API_TOKEN=your_upstash_redis_token
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Set Up the Database**:
    -   In your Supabase project dashboard, navigate to the **SQL Editor**.
    -   Copy the entire contents of the `schema.sql` file from this repository and run it in the editor. This will create all the necessary tables and relationships.
    -   Ensure Row Level Security (RLS) is enabled for all tables as defined in the schema.

5.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 2. Coding Conventions and Best Practices

### Technology Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Database & Auth**: Supabase
-   **Styling**: Tailwind CSS with Radix UI primitives

### Authentication

-   **Session Management**: All authentication is handled by the `@supabase/ssr` library. Use `createServerClient` in server-side contexts (Server Components, API Routes) and `createClient` in client-side contexts (Client Components).
-   **Route Protection**: The `src/middleware.ts` file is the single source of truth for protecting routes. Add any new public routes to the `publicPaths` array in this file.
-   **Authorization**: When accessing data, **always** scope your Supabase queries by the authenticated user's ID to enforce Row Level Security (e.g., `.eq('user_id', user.id)`). Do not rely solely on the client-side routing to protect data.

### Data Fetching

-   **Server Components**: For fetching data in pages or layouts, prefer using React Server Components. This allows you to fetch data directly on the server, improving performance and security. Create a server-side Supabase client and fetch data directly within the component.
-   **Client Components**: For fetching data in response to user interaction (e.g., clicking a button), use the client-side Supabase instance. It's best to use a data fetching library like React Query or SWR for managing client-side state, caching, and revalidation, although the current implementation uses `useState` and `useEffect`.

### State Management

-   **Client-Side State**: For simple component state, `useState` is sufficient. For complex form state, the application uses `react-hook-form` with `zod` for validation.
-   **Server-Side State**: Server Components should not have state. Pass any necessary data down as props.
-   **Global State**: The application currently avoids complex global state management libraries by leveraging Server Components and the `useAuth` context for user information. If more complex global state is needed, consider a lightweight library like Zustand.

### API Routes

-   **Structure**: Keep API routes organized by their primary resource (e.g., all n8n-related routes are under `/api/n8n/`).
-   **Validation**: Validate all incoming request bodies and parameters thoroughly.
-   **Error Handling**: Return consistent, standardized error responses. Avoid leaking detailed internal error messages to the client.

### Code Style

-   **Linting**: The project is configured with ESLint. Run `npm run lint` to check for issues.
-   **Formatting**: Use a code formatter like Prettier to maintain a consistent code style.
-   **TypeScript**: Use TypeScript's features to your advantage. Define clear types for all data structures (see `src/lib/database.types.ts` for database types) and function signatures. Avoid using `any` wherever possible.

## 3. Future Upgrades and Considerations

-   **Next.js**: Keep the Next.js version up-to-date to benefit from the latest features, performance improvements, and security patches.
-   **Supabase**: Regularly check for updates to the `supabase-js` and `@supabase/ssr` libraries.
-   **Data Fetching**: Consider migrating client-side data fetching from `useEffect` to a dedicated data-fetching library like TanStack Query (React Query) to simplify state management, caching, and re-fetching logic.
-   **Component Library**: While Radix UI is excellent, consider standardizing all UI components into a more comprehensive internal component library to ensure consistency across the application.

By following these guidelines, you can contribute to the project in a way that is consistent, maintainable, and secure.