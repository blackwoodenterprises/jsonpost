# Webhooks Integration

Webhooks are a powerful way to get real-time notifications about new form submissions. Instead of you having to ask our API for new data, our system will instantly send the data to your specified URL as soon as it's received.

JSONPost offers a robust, modern webhook system powered by **Svix**, as well as a legacy direct webhook system.

## 1. Modern Webhooks (Svix)

For all new configurations, we use **Svix** to provide reliable, manageable, and resilient webhook delivery.

### How It Works

1.  **Enabling Webhooks**:
    -   The user navigates to the "Webhooks" tab for a specific endpoint (`/dashboard/projects/[id]/endpoints/[endpointId]/webhooks`).
    -   They use a toggle to enable webhooks.
    -   The first time this is done for an endpoint, our backend makes a call to `/api/svix/create-app`. This API route creates a new, dedicated "application" within our Svix account to manage all webhooks for that specific endpoint. The unique ID for this Svix application (`svix_app_id`) is then saved in our `endpoints` table.

2.  **Managing Webhook Endpoints**:
    -   Once enabled, the JSONPost UI embeds the **Svix App Portal** directly into the page.
    -   This embedded portal is a complete, pre-built user interface provided by Svix. It allows the user to:
        -   Add one or more of their own server URLs as webhook endpoints.
        -   View a log of all webhook delivery attempts.
        -   Inspect the payload of each webhook.
        -   Manually retry any failed deliveries.
    -   By using the Svix portal, JSONPost offloads the complexity of webhook management, providing users with a feature-rich and reliable experience out of the box.

3.  **Data Flow**:
    -   When a form submission is received by the main submission API (`/api/submit/...`), the handler checks if webhooks are enabled and if a `svix_app_id` exists for the endpoint.
    -   If so, it constructs a JSON payload with the submission data and sends it to the Svix API.
    -   Svix then takes responsibility for delivering that payload to all of the user-configured webhook endpoints, handling retries with exponential backoff if an endpoint is down.

## 2. JSON Payload Transformation

For advanced use cases, users can reshape the JSON payload of the webhook before it is sent. This is useful for matching the specific format expected by a destination server.

-   **Configuration**: This feature is configured on the same page as the webhook settings.
-   **UI**: The `JsonTransformer` React component provides a UI where the user can:
    -   Enable or disable the transformation.
    -   Define a JSON template.
-   **Logic**:
    -   The template uses a simple variable substitution syntax (e.g., `{{name}}`, `{{user.email}}`).
    -   When a submission occurs, the `applyTransformation` helper function in the submission handler uses this template to build a new JSON object, replacing the variables with the actual values from the form submission.
    -   This transformed payload is then sent to the webhook, instead of the original one.

## 3. Legacy Direct Webhooks (Deprecated)

The application also contains logic for a simpler, direct webhook system.

-   **How it Worked**: This system allowed a user to save one or more webhook URLs directly in the `endpoint_webhooks` table. The submission handler would then loop through these URLs and send a direct `POST` request to each one.
-   **Current Status**: This system is **deprecated**. There is no longer a user interface for adding or managing these direct webhooks. The backend logic remains to support any older endpoints that were configured before the migration to Svix. All new webhook configurations should use the Svix-based system.