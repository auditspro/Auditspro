# AWS SES Production Access Checklist

## 1. Domain Verification & Authentication (MANDATORY)
- [ ] Verify auditspro.com.au domain in SES console (ap-southeast-2)
- [ ] Add SPF record to DNS: `v=spf1 include:amazonses.com ~all`
- [ ] Enable DKIM signing in SES console
- [ ] Add DKIM CNAME records to DNS (3 records provided by AWS)
- [ ] Verify DKIM status shows "Verified" in SES console
- [ ] Configure DMARC record: `v=DMARC1; p=none; rua=mailto:dmarc@auditspro.com.au`
- [ ] Set up custom MAIL FROM domain: `mail.auditspro.com.au`
- [ ] Add MX record for MAIL FROM: `10 feedback-smtp.ap-southeast-2.amazonses.com`
- [ ] Verify all FROM email addresses (noreply@, support@, etc.)

## 2. Bounce & Complaint Handling (MANDATORY)
- [ ] Create SNS topic: `ses-bounces-production`
- [ ] Create SNS topic: `ses-complaints-production`
- [ ] Configure SES to publish bounces to SNS topic
- [ ] Configure SES to publish complaints to SNS topic
- [ ] Create Lambda function to process bounce notifications
  - Hard bounces: Remove email from database immediately
  - Soft bounces: Retry logic, remove after 5 failed attempts
- [ ] Create Lambda function to process complaint notifications
  - Remove complainant email from database immediately
  - Log complaint reason and timestamp
- [ ] Subscribe Lambda functions to SNS topics
- [ ] Test bounce handling with AWS test email: `bounce@simulator.amazonses.com`
- [ ] Test complaint handling with AWS test email: `complaint@simulator.amazonses.com`
- [ ] Set up database table/flag to track bounced/complained emails

## 3. SES Configuration Set
- [ ] Create configuration set: `auditspro-production`
- [ ] Enable event publishing for: Send, Delivery, Bounce, Complaint, Reject
- [ ] Publish events to CloudWatch Logs: `/aws/ses/auditspro-production`
- [ ] Create Kinesis Firehose delivery stream (optional for S3 storage)
- [ ] Configure default configuration set in SES settings

## 4. IAM Security (REQUIRED)
- [ ] Create IAM role: `auditspro-ses-sender`
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "arn:aws:ses:ap-southeast-2:*:identity/auditspro.com.au"
    }]
  }
  ```
- [ ] Create IAM role: `auditspro-ses-admin` (for configuration only)
  ```json
  {
    "Effect": "Allow",
    "Action": ["ses:Get*", "ses:List*", "ses:Describe*", "ses:UpdateConfigurationSet"],
    "Resource": "*"
  }
  ```
- [ ] Create IAM role: `auditspro-ses-bounce-handler` (for Lambda)
  ```json
  {
    "Effect": "Allow",
    "Action": ["logs:CreateLogGroup", "logs:PutLogEvents", "sns:Subscribe"],
    "Resource": "*"
  }
  ```
- [ ] Remove any IAM users/roles with `ses:*` wildcard permissions
- [ ] Verify application uses IAM role, not SMTP credentials (preferred)

## 5. Audit Logging (REQUIRED)
- [ ] Enable CloudTrail in ap-southeast-2 region
- [ ] Create S3 bucket: `auditspro-cloudtrail-logs`
- [ ] Configure CloudTrail to log all SES API calls
- [ ] Enable log file validation in CloudTrail
- [ ] Create S3 bucket: `auditspro-ses-events` (for email event logs)
- [ ] Enable versioning on S3 bucket
- [ ] Block public access on S3 bucket
- [ ] Set lifecycle policy: Archive to Glacier after 90 days

## 6. Secrets Management (REQUIRED)
- [ ] Create secret in AWS Secrets Manager: `auditspro/ses/smtp-credentials` (if using SMTP)
- [ ] Store SMTP username and password in secret
- [ ] Enable automatic rotation (90 days)
- [ ] Update application to fetch credentials from Secrets Manager
- [ ] Remove any hardcoded credentials from codebase/env files

## 7. Monitoring & Alarms (REQUIRED)
- [ ] Create CloudWatch alarm: Bounce rate > 5%
  - Metric: `ses:Reputation.BounceRate`
  - Threshold: 0.05
  - Action: SNS notification to admin
- [ ] Create CloudWatch alarm: Complaint rate > 0.1%
  - Metric: `ses:Reputation.ComplaintRate`
  - Threshold: 0.001
  - Action: SNS notification to admin
- [ ] Create CloudWatch alarm: Reputation dashboard status change
- [ ] Set up SNS topic: `ses-alerts` for all alarms
- [ ] Subscribe admin email to SNS alerts topic
- [ ] Monitor SES sending quota daily

## 8. Testing in Sandbox (REQUIRED BEFORE PRODUCTION)
- [ ] Send test email to verified email addresses
- [ ] Test with bounce simulator: `bounce@simulator.amazonses.com`
- [ ] Verify bounce SNS → Lambda → Database removal works
- [ ] Test with complaint simulator: `complaint@simulator.amazonses.com`
- [ ] Verify complaint SNS → Lambda → Database removal works
- [ ] Test DKIM signature validation (check email headers)
- [ ] Test SPF validation (check email headers)
- [ ] Send 50-100 test emails to verify no issues
- [ ] Monitor bounce/complaint rates (should be 0% for test emails)

## 9. Production Access Request Form
- [ ] Log in to AWS SES console → Account Dashboard
- [ ] Click "Request Production Access"
- [ ] Fill out use case: "Transactional emails for trust account audit platform (invoices, audit notifications, password resets)"
- [ ] Estimated daily volume: Start with realistic number (e.g., 500-1000/day)
- [ ] Describe bounce/complaint handling: "Automated SNS → Lambda removes bounced/complained emails immediately from database"
- [ ] Confirm compliance with AWS Acceptable Use Policy
- [ ] Confirm no purchased/rented email lists
- [ ] Confirm no unsolicited bulk email
- [ ] Submit request
- [ ] Wait 24-48 hours for AWS review

## 10. Post-Approval Configuration
- [ ] Verify sending limits increased (check SES console)
- [ ] Request limit increase if needed (default is usually 50,000/day)
- [ ] Set up rate limiting in application (100 emails/min per tenant)
- [ ] Configure sending quota monitoring
- [ ] Test production sending with real users (small batch first)
- [ ] Monitor reputation dashboard for 7 days

## 11. Security Hardening
- [ ] Enable MFA on AWS root account
- [ ] Enable MFA on all IAM admin users
- [ ] Review IAM policies every 90 days
- [ ] Document credential rotation schedule
- [ ] Set up GuardDuty for threat detection (optional)
- [ ] Configure AWS Config for compliance monitoring (optional)

## 12. Application Integration
- [ ] Update Next.js app to use SES SDK with IAM role
- [ ] Implement email validation before sending
- [ ] Add configuration set to all send requests
- [ ] Implement retry logic with exponential backoff
- [ ] Add email sending rate limiter (per tenant)
- [ ] Create email templates for: invoices, notifications, password resets
- [ ] Test unsubscribe functionality (if applicable)
- [ ] Add email preview in admin dashboard

## 13. Compliance Documentation
- [ ] Document data retention policy (email logs: 7 years recommended)
- [ ] Document bounce/complaint handling procedure
- [ ] Document incident response for email security issues
- [ ] Create runbook for common SES issues
- [ ] Schedule quarterly IAM access review
- [ ] Privacy Act compliance check for email data storage

---

## Quick Start Order (Day 1 Priority)
1. Domain verification & DNS records (Section 1)
2. Bounce/complaint handling (Section 2)
3. IAM roles (Section 4)
4. Testing in sandbox (Section 8)
5. Production access request (Section 9)

## Day 2 Priority
6. Audit logging (Section 5)
7. Monitoring & alarms (Section 7)
8. Secrets management (Section 6)
9. Security hardening (Section 11)

---

## Critical Success Metrics
- **Bounce rate:** Must stay < 5%
- **Complaint rate:** Must stay < 0.1%
- **Reputation:** Monitor SES reputation dashboard daily
- **Approval time:** AWS typically responds within 24-48 hours

## Important Notes
- Complete sections 1-9 before submitting production access request
- AWS will reject requests without proper bounce/complaint handling
- Test thoroughly in sandbox before requesting production access
- Keep all DNS records and IAM policies documented
- Monitor reputation metrics daily once in production
