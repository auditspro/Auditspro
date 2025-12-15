-- Clean up existing data (optional, remove DELETEs if you want to keep existing data)
-- DELETE FROM public.subscription_audit_log;
-- DELETE FROM public.subscribers;
-- DELETE FROM public.email_status;

-- Insert Subscribers
INSERT INTO public.subscribers (email, created_at) VALUES
('ceo@techcorp.com', NOW() - INTERVAL '30 days'),
('cto@startup.io', NOW() - INTERVAL '25 days'),
('dev@agency.net', NOW() - INTERVAL '20 days'),
('user123@gmail.com', NOW() - INTERVAL '15 days'),
('contact@business.org', NOW() - INTERVAL '10 days'),
('info@nonprofit.org', NOW() - INTERVAL '5 days'),
('investor@vc.fund', NOW() - INTERVAL '2 days'),
('marketer@growth.co', NOW() - INTERVAL '1 day'),
('sales@enterprise.com', NOW() - INTERVAL '12 hours'),
('support@platform.io', NOW() - INTERVAL '1 hour');

-- Insert Email Status (Bounces)
INSERT INTO public.email_status (email, status, updated_at) VALUES
('olduser@legacy.com', 'bounced', NOW() - INTERVAL '5 days'),
('fake@spam.net', 'bounced', NOW() - INTERVAL '2 days'),
('typo@gmil.com', 'bounced', NOW() - INTERVAL '1 day'),
('ceo@techcorp.com', 'delivered', NOW()),
('cto@startup.io', 'delivered', NOW()),
('dev@agency.net', 'delivered', NOW());

-- Insert Audit Log (Activity & Status History)
-- This drives the graphs and activity feed
INSERT INTO public.subscription_audit_log (email, action, reason, created_at) VALUES
-- Old events
('ceo@techcorp.com', 'subscribed', 'Website signup', NOW() - INTERVAL '30 days'),
('cto@startup.io', 'subscribed', 'Website signup', NOW() - INTERVAL '25 days'),
('olduser@legacy.com', 'subscribed', 'Import', NOW() - INTERVAL '60 days'),
('olduser@legacy.com', 'unsubscribed', 'User request', NOW() - INTERVAL '10 days'),

-- Recent activity (Last 7 days)
('dev@agency.net', 'subscribed', 'API', NOW() - INTERVAL '7 days'),
('user123@gmail.com', 'subscribed', 'Website signup', NOW() - INTERVAL '6 days'),
('contact@business.org', 'subscribed', 'Referral', NOW() - INTERVAL '5 days'),
('info@nonprofit.org', 'subscribed', 'Website signup', NOW() - INTERVAL '5 days'),

-- Mixed actions
('investor@vc.fund', 'subscribed', 'Direct', NOW() - INTERVAL '2 days'),
('marketer@growth.co', 'subscribed', 'Campaign', NOW() - INTERVAL '1 day'),
('marketer@growth.co', 'unsubscribed', 'Accidental', NOW() - INTERVAL '20 hours'),
('marketer@growth.co', 'subscribed', 'Resubscribe', NOW() - INTERVAL '18 hours'),

-- Recent churn
('sales@enterprise.com', 'subscribed', 'Demo', NOW() - INTERVAL '12 hours'),
('sales@enterprise.com', 'unsubscribed', 'Not interested', NOW() - INTERVAL '2 hours'),

-- Newest
('support@platform.io', 'subscribed', 'Admin add', NOW() - INTERVAL '1 hour');
