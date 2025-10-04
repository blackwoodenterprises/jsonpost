# 10. Frontend and Public Pages

This document provides an overview of the application's frontend structure, focusing on the public-facing pages that are accessible to all visitors.

## Frontend Architecture

The frontend is built with **Next.js 15** and **React 19**, using the App Router. This allows for a combination of Server Components (for fast, static rendering) and Client Components (for interactivity).

-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) is used for all styling, providing a utility-first approach. `clsx` and `tailwind-merge` are used for constructing dynamic and conflict-free class names.
-   **UI Primitives**: [Radix UI](https://www.radix-ui.com/) provides the foundation for accessible, unstyled components like dialogs, dropdowns, and switches. These are then styled with Tailwind CSS to create the application's custom UI, located in `src/components/ui/`.
-   **Icons**: The `lucide-react` library is used for all icons throughout the application.
-   **Structure**:
    -   `src/app/`: Contains all routes. Directories within this folder map directly to URL paths.
    -   `src/components/`: Contains reusable React components, organized into subdirectories like `dashboard/`, `ui/`, and `auth/`.
    -   `src/lib/`: Holds shared client-side logic, such as the Supabase client instance.
    -   `src/hooks/`: Contains custom React hooks, such as `use-toast`.
    -   `src/content/`: Likely contains content for pages like the blog or docs, to be processed by MDX.

## Public Pages

The following pages are accessible to non-authenticated users and serve as the public-facing "storefront" for the application.

### Core Pages

-   **`/` (Homepage)**: The main landing page of the application (`src/app/page.tsx`). It serves as the primary marketing page, showcasing the application's features, benefits, and calls-to-action to sign up.
-   **`/auth/...`**: The authentication pages, including login, signup, and password reset forms. While public, they are part of the core application flow.
-   **`/features-and-screenshots`**: A dedicated marketing page to visually showcase the application's features.
-   **`/quick-start`**: A guide to help new users get started with the application quickly.
-   **`/blog`**: The company blog, likely containing articles about web development, forms, and product updates. The content is likely written in MDX.
-   **`/docs`**: The official product documentation for users.

### Free Tools

JSONPost offers several free tools as a way to attract potential users and provide value to the community.

-   **`/free-html-form-generator`**: A utility that helps users create the basic HTML structure for a form.
-   **`/free-json-schema-builder`**: A tool to help users create JSON Schemas for validating their form submissions, which can then be used with the main application's JSON validation feature.

### Informational & Legal Pages

-   **`/help`**: The help center or support page.
-   **`/status`**: A page to display the current operational status of the application and its services.
-   **`/privacy-policy`**: The official privacy policy.
-   **`/terms-of-service`**: The terms and conditions for using the application.
-   **`/refund-policy`**: The policy regarding refunds for paid plans.

These pages collectively form the public-facing website, designed to attract, inform, and convert visitors into registered users. They are served statically wherever possible for maximum performance.