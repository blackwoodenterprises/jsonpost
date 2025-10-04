# Billing and Subscriptions

JSONPost uses a tiered subscription model to offer different levels of service. The billing and subscription management is handled through a third-party payment provider, **Dodo Payments**.

## 1. The Billing & Usage Page

The central hub for all billing-related activities is the **Billing & Usage** page, located at `/dashboard/billing`.

This page provides two main sections:

### Current Usage

This section gives the user a real-time overview of their resource consumption compared to their current plan's limits. It displays:

-   **Projects**: The number of projects created out of the total allowed.
-   **Endpoints**: The number of endpoints created out of the total allowed.
-   **Monthly Submissions**: The number of submissions received in the current calendar month out of the total allowed.

Each metric is accompanied by a progress bar to visually represent the user's consumption.

### Available Plans

This section displays a list of all available subscription plans (e.g., Free, Pro, Growth). For each plan, it shows the price, key features, and resource limits.

-   The user's **current plan** is clearly marked.
-   For other plans, a button allows the user to **"Upgrade"** or **"Change Plan."**

## 2. Subscribing and Changing Plans

The process for subscribing or changing a plan is handled by Dodo Payments.

### New Subscription (from Free plan)

1.  A user on the Free plan clicks the "Upgrade" button for a paid plan.
2.  The frontend makes a `POST` request to a `/checkout` API route, which is handled by the `@dodopayments/nextjs` library. This request includes the Dodo Payments Product ID for the selected plan.
3.  The Dodo Payments SDK creates a secure checkout session.
4.  The user is redirected to the Dodo Payments checkout page to enter their payment information.
5.  After a successful payment, Dodo Payments sends a webhook to the JSONPost backend to confirm the subscription. The user is redirected back to the `/dashboard/billing` page, where their new plan is now active.

### Upgrading or Downgrading an Existing Subscription

1.  A user with an existing paid subscription clicks the "Change Plan" button.
2.  An `UpgradeConfirmationModal` appears, explaining how the plan change will be handled (e.g., proration).
3.  Upon confirmation, the application initiates a plan change process through the Dodo Payments API, which handles the billing adjustments automatically.

## 3. Managing an Existing Subscription

Users who have an active, paid subscription can manage their payment details and view their billing history through the Dodo Payments customer portal.

1.  On the `/dashboard/billing` page, a "Billing Portal" button is available for subscribed users.
2.  Clicking this button navigates the user to `/dashboard/billing/billing-portal`.
3.  This is not a UI page, but an **API route** that performs two key actions:
    -   It verifies that the user is authenticated and that they are the legitimate owner of the Dodo Payments customer account they are trying to access.
    -   It then calls the `@dodopayments/nextjs` `CustomerPortal` handler, which generates a secure, single-use URL for the Dodo Payments customer portal and redirects the user's browser to it.
4.  Inside the Dodo Payments portal, the user can:
    -   Update their credit card information.
    -   View and download past invoices.
    -   Cancel their subscription.

This integration with Dodo Payments allows JSONPost to securely handle all billing operations without directly processing or storing any sensitive payment information.