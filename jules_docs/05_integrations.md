# 5. Integrations

JSONPost offers a powerful set of integrations to connect your form submission data with other services. This allows for the automation of workflows, data synchronization, and enhanced notifications.

This document serves as a central hub for detailed documentation on each major integration.

## Available Integrations

Below is a list of the primary integrations supported by the application. Each integration has its own detailed documentation page, which you can access by following the links.

### Core Integrations

-   **[Google Sheets](./integrations/google_sheets.md)**
    -   Automatically send form submission data to a Google Sheet in real-time. This is perfect for simple data logging, analysis, and sharing with non-technical team members.

-   **[Webhooks (Svix & Direct)](./integrations/webhooks.md)**
    -   Push form submission data to any external URL. We offer reliable, managed webhook delivery via Svix, as well as a legacy direct webhook system. This is ideal for custom integrations and connecting to in-house systems.

-   **[n8n](./integrations/n8n.md)**
    -   A deep integration with the n8n workflow automation platform. This allows you to build complex, multi-step workflows triggered by new form submissions.

-   **[Zapier](./integrations/zapier.md)**
    -   Connect your JSONPost forms to thousands of other apps through Zapier. This is a simple and powerful way to automate tasks without writing any code.

### Other Integrations

-   **Email Notifications**: While not a third-party service in the same way, email notifications are a core integration feature, allowing you to receive alerts for new submissions. This is configured directly within an endpoint's settings.
-   **Autoresponder Emails**: Automatically send a confirmation or thank-you email to the person who submitted the form.

Each of these integrations is designed to be configured on a per-endpoint basis, giving you granular control over where your data goes for each form.