# 3. Project and Endpoint Management

This document describes the user workflow for creating and managing projects and form endpoints within the JSONPost dashboard.

## Overview

The core organizational structure in JSONPost revolves around **Projects**. Each project acts as a container for multiple **Endpoints**. This allows users to group related forms, such as all forms for a single website or application, under one umbrella.

-   **Projects**: Top-level containers for organizing form endpoints.
-   **Endpoints**: Unique URLs that are configured to receive form submissions.

## 1. Creating a New Project

Creating a project is the first step for any new user after signing up.

**User Flow:**
1.  The user navigates to the `/dashboard/projects/new` page.
2.  A form is presented asking for a **Project Name** (required) and a **Description** (optional).
3.  Before the project is created, the application checks if the user's current plan allows for the creation of another project. This is handled by the `canCreateProject` function in `src/lib/billing.ts`. If the user has reached their limit, an "Upgrade" modal is displayed.
4.  Upon submission, the form calls a Supabase Remote Procedure Call (RPC) named `create_project_with_api_key`. This function handles the creation of the project in the `projects` table and also generates an associated API key.
5.  After successful creation, the user is automatically redirected to the **Project Details Page** (`/dashboard/projects/[projectId]`).

## 2. The Project Details Page

The Project Details Page (`/dashboard/projects/[id]`) is the central hub for managing a single project.

**Page Components:**
-   **Header**: Displays the project's name and description, along with key actions:
    -   **Back to Dashboard**: Navigates back to the main dashboard view.
    -   **Project Settings**: Links to the project settings page (`.../[projectId]/settings`).
    -   **New Endpoint**: A primary call-to-action that takes the user to the endpoint creation page.
-   **Stats Cards**: A quick overview of the project, showing the total number of endpoints, total submissions, and recent activity.
-   **Endpoints List**: A list of all form endpoints associated with the project. Each item in the list is clickable and navigates to the specific **Endpoint Details Page**.
-   **Recent Submissions**: A paginated view of the most recent form submissions received by any endpoint within the project.

## 3. Creating a New Endpoint

From the Project Details Page, users can create new endpoints to start collecting form submissions.

**User Flow:**
1.  The user clicks the "New Endpoint" button, which navigates them to `/dashboard/projects/[id]/endpoints/new`.
2.  Similar to project creation, the application first checks the user's plan limits using the `canCreateEndpoint` function.
3.  The user is presented with a comprehensive form to configure the new endpoint. The settings are divided into several sections:

    -   **Basic Information**:
        -   `Endpoint Name`: A user-friendly name (e.g., "Contact Form").
        -   `Description`: An optional description.
        -   `HTTP Method`: The allowed HTTP method (`POST`, `PUT`, `PATCH`).
        -   `Custom Path`: A custom URL path for the endpoint (e.g., `contact-us`). If left blank, a path is auto-generated from the endpoint name.

    -   **Response Configuration**:
        -   `Success Message`: The message returned in the JSON response on successful submission.
        -   `Error Message`: The message returned on failure.
        -   `Redirect URL`: An optional URL to redirect the user to after a successful submission.

    -   **Notifications & Integrations**:
        -   `Email Notifications`: A toggle to enable or disable email alerts for new submissions.
        -   `Email Addresses`: A multi-input field to specify one or more email addresses to receive notifications.

    -   **Security Settings**:
        -   `Require API Key`: A toggle to enforce that requests to the submission API must include an `X-API-Key` header.
        -   `Enable CORS`: A toggle to enable Cross-Origin Resource Sharing.
        -   `Allowed Domains`: If CORS is enabled, this multi-input field allows the user to specify which domains are allowed to make requests. Wildcards are supported (e.g., `*.example.com`).

    -   **File Upload Settings**:
        -   `Enable File Uploads`: A toggle to allow `multipart/form-data` submissions with files.
        -   `Allowed File Types`: A multi-input for specifying allowed MIME types (e.g., `image/png`, `application/pdf`).
        -   `Max File Size (MB)`: The maximum size for a single file.
        -   `Max Files per Submission`: The maximum number of files allowed in one submission.

    -   **JSON Validation**:
        -   `Enable JSON Validation`: A toggle to enforce validation against a JSON schema.
        -   `JSON Schema`: A textarea where the user can paste an [AJV](https://ajv.js.org/)-compatible JSON schema to validate incoming `application/json` submissions.

4.  Upon submission, the form data is inserted as a new row into the `endpoints` table in the Supabase database. If multiple email addresses were provided, they are inserted into the `endpoint_emails` table.
5.  After successful creation, the user is redirected back to the **Project Details Page**, where the new endpoint will now appear in the list.