# Zapier Integration

The Zapier integration provides a powerful, no-code way to connect your JSONPost form submissions to thousands of other applications and services. You can use it to automate tasks like adding a contact to your CRM, creating a task in your project management tool, or sending a message to a Slack channel.

## How It Works

The integration is designed to be as simple as possible. It works by using a unique API key to authenticate your JSONPost account with Zapier and then uses webhooks behind the scenes to send data in real-time.

### 1. Enabling the Integration and Getting Your API Key

The entire process is initiated from the user's **Profile Page** in the JSONPost dashboard (`/dashboard/profile`).

1.  **Enable Integration**: The user finds the Zapier Integration section and uses a toggle switch to enable it.
2.  **API Key Generation**: The first time the integration is enabled, a unique and cryptographically secure API key is generated specifically for Zapier. This key is prefixed with `zap_` and is stored in the `zapier_api_key` column of the user's record in the `profiles` table.
3.  **Using the Key**: The user copies this API key. When they set up a new JSONPost integration within the Zapier platform, Zapier will ask them to paste this key to authenticate and connect their account.

### 2. The Zapier API Routes

To facilitate the integration, JSONPost exposes a set of public API routes specifically for Zapier to interact with. These routes are authenticated using the user's Zapier API key, which is sent as a header.

-   **/api/zapier/auth**: When a user pastes their API key into Zapier, Zapier calls this route to validate the key and confirm that the connection is successful.
-   **/api/zapier/endpoints**: When a user is setting up a trigger in Zapier (e.g., "New Form Submission"), Zapier calls this route to fetch a list of the user's form endpoints. This allows the user to select the specific form they want to trigger the Zap from a dropdown menu within the Zapier UI.
-   **/api/zapier/subscribe**: Once the user has configured a trigger, Zapier calls this route to automatically create a webhook subscription. This tells the JSONPost backend to notify Zapier whenever a new submission is received for the selected endpoint. A record of this subscription is created in the `zapier_subscriptions` table.
-   **/api/zapier/unsubscribe**: If a Zap is turned off or deleted, Zapier calls this route to remove the corresponding webhook subscription.
-   **/api/zapier/perform**: This route is used for Zapier "Actions," allowing other applications to trigger actions within JSONPost (though this is less common for a form backend).

### 3. Data Flow for a "New Submission" Trigger

Here is the end-to-end flow when a Zap is triggered by a new form submission:

1.  A user has already created a Zap (e.g., "When a new submission is received in my 'Contact Form', add a new row to my Google Sheet"). This action has already called the `/api/zapier/subscribe` route and created a webhook subscription.
2.  A new submission is sent to the "Contact Form" endpoint via the main `/api/submit/...` route.
3.  After storing the submission, the submission handler checks for any active Zapier subscriptions associated with that endpoint.
4.  It finds the subscription created by Zapier and sends the submission data to the unique webhook URL provided by Zapier.
5.  To make the data easy to use in Zapier, the payload is specially formatted and **flattened**. Nested JSON objects are converted into simple key-value pairs (e.g., `{"user": {"name": "John"}}` becomes `{"user_name": "John"}`).
6.  Zapier receives the data and executes the action part of the Zap (e.g., adding the data to the Google Sheet).

This process provides a seamless and user-friendly way to connect form data to the wider ecosystem of apps available on Zapier, without requiring the user to manually configure webhooks.