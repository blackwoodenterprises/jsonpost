# 7. API Routes

This document provides an overview of the major API routes in the JSONPost application. These routes handle everything from form submissions to user authentication and third-party integrations.

All API routes are located under `src/app/api/`.

## Public-Facing API Routes

These routes are designed to be called by external services or unauthenticated clients.

### `/api/submit/[projectId]/[endpointPath]`
-   **Purpose**: The main, high-traffic endpoint for receiving all form submissions.
-   **Authentication**: Public, but can be configured to require an `X-API-Key` header.
-   **Functionality**: Handles data parsing, validation, file uploads, storage, and triggers all post-submission integrations (webhooks, emails, etc.).
-   **Details**: See the [Form Submission API](./04_form_submission_api.md) documentation for a full breakdown.

### `/api/n8n/...`
-   **Purpose**: A set of endpoints for the n8n integration.
-   **Authentication**: `x-n8n-api-key` header.
-   **Functionality**: Allows n8n to validate API keys, fetch a list of form endpoints, and manage webhook subscriptions.
-   **Details**: See the [n8n Integration](./integrations/n8n.md) documentation.

### `/api/zapier/...`
-   **Purpose**: A set of endpoints for the Zapier integration.
-   **Authentication**: Zapier-specific API key.
-   **Functionality**: Allows Zapier to authenticate, fetch endpoints, and manage webhook subscriptions automatically.
-   **Details**: See the [Zapier Integration](./integrations/zapier.md) documentation.

### `/api/webhook/...`
-   **Purpose**: Catches incoming webhooks from third-party services.
-   **Example**: `/api/webhook/dodo-payments` receives notifications from Dodo Payments about subscription updates (e.g., successful payment, cancellation).
-   **Authentication**: Varies by service, typically uses webhook signing secrets for verification.

### `/api/forms/...`
-   **Purpose**: Provides public access to form schemas for rendering live, hosted forms.
-   **Routes**:
    -   `/api/forms/form-schema`: Fetches the full form JSON for a given endpoint.
    -   `/api/forms/shortlink-schema`: Resolves a short link to its corresponding form schema.
-   **Authentication**: Public.

### `/api/health`
-   **Purpose**: A simple health check endpoint. Returns a `200 OK` if the application is running.
-   **Authentication**: Public.

## Internal & User-Authenticated API Routes

These routes are typically called by the JSONPost frontend dashboard and require an active user session.

### `/api/auth/...`
-   **Purpose**: Handles authentication-related callbacks.
-   **Routes**:
    -   `/api/auth/google-sheets/callback`: Handles the OAuth 2.0 callback from Google after a user connects their account for the Google Sheets integration.
-   **Authentication**: State/code-based from OAuth provider.

### `/api/projects/...`
-   **Purpose**: Manages project-level settings.
-   **Routes**:
    -   `/api/projects/[projectId]/n8n/api-key`: Gets or regenerates the n8n API key for a project.
-   **Authentication**: User session.

### `/api/endpoints/...`
-   **Purpose**: Manages endpoint-specific settings.
-   **Routes**:
    -   `/api/endpoints/[endpointId]/autoresponder`: Saves the autoresponder configuration for an endpoint.
-   **Authentication**: User session.

### `/api/submissions/...`
-   **Purpose**: Provides access to submission data for the dashboard.
-   **Routes**:
    -   `/api/submissions/[submissionId]/autoresponder-logs`: Fetches the autoresponder delivery logs for a single submission.
-   **Authentication**: User session.

### `/api/svix/...`
-   **Purpose**: Manages the Svix integration.
-   **Routes**:
    -   `/api/svix/create-app`: Creates a new Svix application for an endpoint when webhooks are first enabled.
    -   `/api/svix/app-portal`: Generates a temporary, secure URL for the embedded Svix App Portal UI.
-   **Authentication**: User session.

### `/api/upload/image`
-   **Purpose**: Handles image uploads for the Form Builder (e.g., logos, cover images).
-   **Authentication**: User session.

### `/api/files/[fileId]/download`
-   **Purpose**: Provides secure, authenticated downloads for files that were uploaded with form submissions.
-   **Authentication**: User session.

### `/api/google-sheets/...`
-   **Purpose**: Manages the Google Sheets integration on behalf of the user.
-   **Routes**:
    -   `/api/google-sheets/create-spreadsheet`: Creates a new spreadsheet and links it to an endpoint.
    -   `/api/google-sheets/write`: Appends a new submission as a row to a configured spreadsheet.
-   **Authentication**: User session (for `create-spreadsheet`) or internal call (for `write`).

### `/api/support/...`
-   **Purpose**: Likely handles the submission of support tickets or help requests from within the application.
-   **Authentication**: User session.

### `/api/subscription/...`
-   **Purpose**: Handles subscription management tasks, likely interacting with Dodo Payments.
-   **Authentication**: User session.