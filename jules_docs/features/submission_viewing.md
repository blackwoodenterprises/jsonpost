# Submission Viewing

JSONPost provides a comprehensive set of tools for viewing, filtering, and inspecting your form submission data directly from the dashboard.

## 1. Dashboard Overviews

You can get a quick glance at your most recent submissions in two main places:

-   **Project Details Page** (`/dashboard/projects/[id]`): This page shows a list of the most recent submissions received by **any** endpoint within that project.
-   **Endpoint Details Page** (`/dashboard/projects/[id]/endpoints/[endpointId]`): This page shows a list of the most recent submissions received by that **specific** endpoint.

These overviews are useful for monitoring recent activity, but for more detailed analysis, you will use the dedicated submissions pages.

## 2. All Submissions Page

For a comprehensive view of all submissions for a project, you can navigate to the **All Submissions** page (`/dashboard/projects/[id]/submissions`).

This page is designed to handle large volumes of data and includes several key features:

-   **Paginated List**: Submissions are displayed in a paginated list, showing a summary of each one in a "card" format.
-   **Filtering**: You can narrow down the submissions list using a powerful set of filters:
    -   **Search**: A free-text search that looks for matches within the JSON data of the submissions.
    -   **Endpoint Filter**: A dropdown to show submissions from only a specific endpoint within the project.
    -   **Date Range Filter**: A dropdown to filter submissions by time (e.g., "Today," "Last 7 days," "This month").
-   **Navigation**: Clicking on any submission card in the list takes you to the **Single Submission Detail Page**.

## 3. Single Submission Detail Page

The **Single Submission Detail Page** (`/dashboard/projects/[id]/submissions/[submissionId]`) provides a deep dive into a single record. This is the most detailed view of a submission and is invaluable for debugging and analysis.

The page is broken down into several sections:

-   **Submission Data**: A formatted and syntax-highlighted view of the raw JSON data that was received in the submission. You can also copy the full JSON to your clipboard with a single click.
-   **File Uploads**: If the submission included any file uploads, this section lists all of them. For each file, it displays the original filename, file size, and MIME type, along with a "Download" button to securely access the file.
-   **Delivery Logs**: This section provides the status of any post-submission actions:
    -   **Email Notifications**: Shows whether the notification email was successfully sent to the configured recipients.
    -   **Autoresponder**: Shows the status of the automated email sent to the form submitter.
    -   **Zapier/n8n Status**: Displays whether the webhook to the corresponding service was successfully delivered.
-   **Submission Details (Metadata)**: A sidebar provides key metadata about the submission, including:
    -   The unique Submission ID.
    -   The endpoint that received it.
    -   The exact timestamp it was received.
    -   The IP address and User Agent of the client that sent the submission.
-   **Actions**:
    -   **View Processing Logs**: A link to a detailed, step-by-step log of how the submission was processed by the backend, which is extremely useful for debugging.
    -   **Delete Submission**: A button to permanently delete the submission and its associated files. This action cannot be undone.

These views provide a complete toolset for managing and understanding your form data from the moment it's received.