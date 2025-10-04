# Google Sheets Integration

The Google Sheets integration allows you to automatically send form submission data directly to a Google Sheet in real-time. This is a powerful and simple way to collect, view, and analyze your form data without needing to manually export it.

## How It Works

The integration follows a two-part process:
1.  **One-Time Setup**: The user connects their Google account to a project and then creates a new, dedicated spreadsheet for a specific form endpoint.
2.  **Automatic Data Writing**: Once set up, every new submission to that endpoint is automatically appended as a new row in the designated Google Sheet.

## 1. Setup and Configuration

The setup process is initiated from the project settings page (`/dashboard/projects/[projectId]/settings`).

### Step 1: Connect Google Account (Project Level)

1.  **Authorization**: The user clicks a "Connect to Google" button. This initiates an OAuth 2.0 flow, redirecting the user to Google's consent screen. They must grant the application permission to create and manage spreadsheets on their behalf.
2.  **Token Storage**: Once authorization is granted, Google provides an `access_token` and a `refresh_token`. These tokens are securely stored in the `projects` table, associated with the current project. The `refresh_token` is crucial as it allows the application to obtain new access tokens even after the initial one expires, ensuring the integration continues to work long-term.

### Step 2: Create Spreadsheet (Endpoint Level)

Once a project is connected to a Google account, users can configure individual endpoints to send data to a new sheet. This is typically done from the endpoint's settings page.

1.  **Select Data to Send**: The user is presented with a list of all available data fields from their form's most recent submission. They can select which fields (e.g., `name`, `email`, `message`) they want to appear as columns in the spreadsheet.
2.  **Initiate Creation**: The user clicks a "Create and Link Spreadsheet" button.
3.  **API Call**: This triggers a `POST` request to the `/api/google-sheets/create-spreadsheet` API route.
4.  **Backend Process**:
    *   The backend verifies the user's identity and checks that their Google account is connected (i.e., tokens are present).
    *   It uses the stored `access_token` to make a call to the Google Sheets API, instructing it to create a new spreadsheet. The spreadsheet is automatically named based on the endpoint's name (e.g., `JSONPost - Contact Form - Submissions - 123`).
    *   The selected data fields are used to create the header row (the first row) of the new spreadsheet.
    *   The ID and name of the newly created spreadsheet are saved in the `endpoints` table, linking this specific endpoint to the new sheet.

## 2. Writing Data to the Sheet

After the one-time setup, the data flow is fully automated.

1.  **Form Submission**: A new form submission is sent to the main submission API endpoint (`/api/submit/...`).
2.  **Trigger Integration**: After the submission is successfully stored in the database, the submission handler checks if the endpoint is configured for Google Sheets integration.
3.  **API Call**: If it is, the handler makes a `POST` request to the internal `/api/google-sheets/write` API route, passing along the `endpointId` and the `submissionData`.
4.  **Backend Process**:
    *   The `/write` route retrieves the endpoint's configuration, including the `spreadsheetId`, `sheetName`, and the `selectedVariables` (the column headers).
    *   It fetches the project's stored `access_token` to authenticate with the Google Sheets API.
    *   It reads the **header row** from the target spreadsheet to determine the correct order of the columns.
    *   It constructs a new row of data by matching the `selectedVariables` to the values in the `submissionData`. The values are placed in the correct order to align with the sheet's columns.
    *   Finally, it makes a call to the Google Sheets API's `spreadsheets.values.append` method, which adds the newly constructed data as the next available row in the sheet.

This process ensures that data appears in the Google Sheet almost instantly after a form is submitted, with each field correctly aligned under its corresponding column header.