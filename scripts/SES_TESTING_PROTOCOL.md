# SES Sandbox Testing Protocol

This protocol guides you through "toughly testing" your SES integration in Sandbox mode before requesting production access. The goal is to verify that bounces and complaints effectively trigger your Webhook/Lambda updates and reflect in the 'Pro Dashboard'.

## Prerequisite Checks
1.  **SES Identity**: Your domain (`auditspro.com.au`) is verified in AWS SES.
2.  **Infrastructure**: You have set up SNS topics (`ses-bounces-production`, `ses-complaints-production`) and subscribed your endpoint/Lambda to them.
3.  **Database**: Your Lambda/Webhook is connected to the same database used by this dashboard.

---

## phase 1: The "Happy Path" (Delivery)
**Goal**: Verify normal emails are tracked.

1.  **Send Email**: Send a test email from your application to a **verified email address** (e.g., your own personal email).
2.  **Verify Receipt**: Confirm the email arrived in the inbox.
3.  **Dashboard Check**:
    *   Go to `/dashboard/activity`.
    *   **Expectation**: You should see a new entry: `subscribed` or `delivered` (depending on your logging logic).

## Phase 2: The "Bounce" Test (Critical)
**Goal**: Verify that hard bounces are immediately detected and flagged.

1.  **Send Email**: Send a test email from your application to:
    ```
    bounce@simulator.amazonses.com
    ```
2.  **Wait**: SES typically fires the bounce notification within seconds.
3.  **Dashboard Check**:
    *   Go to `/dashboard`.
    *   **Expectation**: The "Bounced" Stats Card count should increase by 1.
    *   Go to `/dashboard/activity`.
    *   **Expectation**: A new row should appear for `bounce@simulator.amazonses.com` with action `bounced`.
    *   Go to `/dashboard/subscribers`.
    *   **Expectation**: usage of `StatusPill` should show `bounced`.

## Phase 3: The "Complaint" Test
**Goal**: Verify that spam reports are handled exactly like unsubscribes/bounces.

1.  **Send Email**: Send a test email from your application to:
    ```
    complaint@simulator.amazonses.com
    ```
2.  **Wait**: SES fires the complaint notification.
3.  **Dashboard Check**:
    *   Go to `/dashboard/activity`.
    *   **Expectation**: A new row should appear for `complaint@simulator.amazonses.com` with action `unsubscribed` (or `complaint`).
    *   **Database Verification**: Ensure this user is marked as `unsubscribed` or blocked to prevent future sending.

## Phase 4: The "OOTO" (Soft Bounce) Test
**Goal**: Verify that soft bounces (Out of Office) do NOT immediately block the user.

1.  **Send Email**: Send a test email to:
    ```
    ooto@simulator.amazonses.com
    ```
2.  **Wait**: SES fires the delivery/bounce notification.
3.  **Dashboard Check**:
    *   This should typically be logged as a `soft-bounce` or ignored depending on your logic.
    *   **Expectation**: The user should **NOT** be marked as `bounced` permanently.

---

## Troubleshooting
If the data does not appear in the dashboard:
1.  **Check SNS**: specific SNS topic in AWS Console -> "Publish message" to manually trigger your Lambda/Webhook.
2.  **Check Lambda Logs**: CloudWatch Logs for your processor function.
3.  **Check Database**: Directly query:
    ```sql
    SELECT * FROM subscription_audit_log ORDER BY created_at DESC LIMIT 5;
    ```
