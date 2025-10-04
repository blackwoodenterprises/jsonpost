# Form Builder

The Form Builder is a powerful, interactive tool within JSONPost that allows you to visually create, customize, and deploy complex, multi-step forms without writing any code. The forms you build are live, hosted, and ready to be shared or embedded on your website.

## Overview

The Form Builder is accessed on a per-endpoint basis from the endpoint details page (`/dashboard/projects/[id]/endpoints/[endpointId]/form-builder`). It transforms a standard form endpoint into a fully-featured, user-facing form.

The core philosophy of the builder is to construct a form from a series of **steps**. Each step represents a single piece of the form, such as a question, a text input, or a display message.

## Key Features

-   **Template Gallery**: Start with a blank form or choose from a wide variety of pre-built templates for common use cases like event registrations, job applications, or customer feedback.
-   **Step-Based Construction**: Add, remove, and reorder different types of form fields and content blocks.
-   **Rich Field Types**: A wide range of field types are available, from simple text inputs to more complex fields like star ratings, file uploads, and address blocks.
-   **In-Depth Customization**: Each step can be finely tuned with custom titles, IDs, placeholder text, and specific validation rules (e.g., min/max length, required fields).
-   **Branding and Theming**: Customize the form's appearance with a welcome page, logo, cover image, and a selection of color themes.
-   **Live Form URLs**: The builder automatically generates URLs for both single-page and multi-step versions of your form.
-   **Short Links & Embedding**: Easily create shareable short links or generate an HTML snippet to embed the form on your own website.
-   **Auto-Save**: Your progress is automatically saved to your browser's local storage to prevent data loss.

## How It Works

### 1. Creating a Form

When you first open the Form Builder for an endpoint, you are presented with the **Template Gallery**. You can select a pre-built template to get a head start, or choose "Create a Blank Form" to begin from scratch.

### 2. Building with Steps

The form is built by adding and configuring steps.

-   **Adding a Step**: You can select a field type from a dropdown menu (e.g., "Short Text," "Email," "Dropdown") and click "Add" to append it to your form.
-   **Editing a Step**: Clicking the "Edit" button on a step opens the **Step Editor Dialog**. Here you can configure all the properties for that step:
    -   **Title**: The question or label for the field (e.g., "What is your name?").
    -   **ID**: The unique identifier for the field. This is used as the `name` attribute in the HTML and as the key in the submission JSON (e.g., `user_name`).
    -   **Placeholder**: The placeholder text shown inside the input field.
    -   **Required**: A toggle to make the field mandatory.
    -   **Validation**: Add rules like minimum/maximum length for text or minimum/maximum value for numbers.
    -   **Type-Specific Options**: Configure options for dropdowns, accepted file types for uploads, or labels for star ratings.
-   **Reordering Steps**: Use the up and down arrow buttons on a step to change its position in the form.

### 3. Theming and Branding

You can customize the visual appearance of your live form:

-   **Welcome Step**: The first section of the builder allows you to set a `Form Title`, `Description`, and upload a `Branding Logo` and `Branding Cover Image`.
-   **Themes**: You can choose from a list of pre-designed color themes to change the form's look and feel.
-   **JSONPost Branding**: You have the option to show or hide the "Powered by JSONPost" message at the bottom of your form.

### 4. Saving the Form

When you click the "Save Form" button, the entire form structure you've built is saved as a single JSON object to the `form_json` column for that endpoint in the database. This JSON object contains the title, description, branding information, and the array of steps with all their configurations.

### 5. Sharing and Deploying

Once your form is saved, you can share it using the options in the right-hand sidebar:

-   **Live URLs**: Two URLs are provided for the live, hosted version of your form: one for a **single-page layout** and one for a **multi-step layout** (where each step is shown one at a time).
-   **Short Links**: You can generate one or more unique, short URLs (e.g., `https://forms.jsonpost.com/s/AbC123`) that redirect to your form. This is useful for sharing on social media or in emails.
-   **Embedding**: You can generate an HTML `<iframe>` snippet to embed the form directly into a page on your own website.

This comprehensive set of features makes the Form Builder a versatile tool for creating everything from simple contact forms to complex, multi-page surveys and applications.