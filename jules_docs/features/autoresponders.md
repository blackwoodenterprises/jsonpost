# Autoresponder Emails

The Autoresponder feature allows you to automatically send a personalized email to a user immediately after they submit one of your forms. This is a great way to acknowledge their submission, provide a confirmation, or send a thank-you message.

## How It Works

Autoresponders are configured on a **per-endpoint** basis. When a form is submitted to an endpoint with an active autoresponder, the submission handler triggers an email to be sent to the address provided in the form data.

## Configuration

You can set up an autoresponder by navigating to the "Autoresponder" tab for a specific endpoint (`/dashboard/projects/[id]/endpoints/[endpointId]/autoresponder`).

The configuration page allows you to customize the following settings:

1.  **Enable Autoresponder**: A master toggle switch to turn the feature on or off for the endpoint.

2.  **Email Provider**: You can choose how the emails are sent:
    *   **JSONPost (Built-in)**: The easiest option. Emails are sent from `no-reply@jsonpost.com` on your behalf. No setup is required.
    *   **SendGrid, Resend, Postmark**: You can connect your own email provider account by supplying the relevant API key. This gives you more control over deliverability and allows you to send emails from your own domain.

3.  **Sender Information**:
    *   `From Email`: The email address the auto-response will be sent from. (This is fixed to `no-reply@jsonpost.com` if using the built-in provider).
    *   `From Name`: The name that will appear as the sender.

4.  **Recipient Field**:
    *   This is a critical setting. You must specify the **name of the form field** that will contain the recipient's email address. For example, if your form has an input like `<input type="email" name="email">`, you would enter `email` in this field.

5.  **Email Templates**:
    *   **Subject Line**: The subject of the email.
    *   **HTML Content**: The body of the email, which can include any HTML for rich formatting.
    *   **Text Content**: A plain text version of the email, which will be used as a fallback for email clients that do not support HTML.

### Using Variables for Personalization

To make your emails personal, you can insert data directly from the form submission into the subject or body of the email. This is done using a simple variable syntax: `{{variable_name}}`.

The configuration page provides a list of all available variables based on the most recent submission to your form. You can simply click on a variable to insert it into your template.

**Example:**

If a form submission contains the data `{"name": "Alice", "product": "T-Shirt"}`, you could create a subject line like:
`Thank you for your order, {{name}}!`

And an email body like:
`<h1>Order Confirmation</h1><p>We've received your order for the {{product}}. We'll notify you when it ships!</p>`

This would result in a personalized email sent to the user with the subject "Thank you for your order, Alice!" and the product name "T-Shirt" in the body. The autoresponder service in the backend handles this substitution before sending the email.