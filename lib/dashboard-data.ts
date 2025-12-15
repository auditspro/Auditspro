import { pool } from "@/lib/db";
import type { QueryResultRow } from "pg";

export type LatestSubscription = QueryResultRow & {
  email: string;
  status: string;
  last_event_at: Date;
};

export type RecentEvent = QueryResultRow & {
  email: string;
  action: string;
  reason: string | null;
  created_at: Date;
};

export type SubscriptionSummary = QueryResultRow & {
  total: number;
  active: number;
  unsubscribed: number;
};

export type BouncedSummary = QueryResultRow & {
  bounced: number;
};

async function safeQuery<T extends QueryResultRow>(
  sql: string,
  values: unknown[] = []
) {
  try {
    return await pool.query<T>(sql, values);
  } catch (error) {
    console.error("Database query failed:", error);
    return null;
  }
}

export async function getDashboardData() {
  const summaryResult = await safeQuery<SubscriptionSummary>(
    `
    WITH latest AS (
      SELECT DISTINCT ON (email)
        email,
        action,
        created_at
      FROM public.subscription_audit_log
      ORDER BY email, created_at DESC
    )
    SELECT
      COUNT(*)::int AS total,
      SUM(CASE WHEN action = 'subscribed' THEN 1 ELSE 0 END)::int AS active,
      SUM(CASE WHEN action = 'unsubscribed' THEN 1 ELSE 0 END)::int AS unsubscribed
    FROM latest;
    `
  );

  const subscribersPreviewResult = await safeQuery<QueryResultRow>(
    `
    SELECT *
    FROM public.subscribers
    LIMIT 10;
    `
  );

  const emailStatusPreviewResult = await safeQuery<QueryResultRow>(
    `
    SELECT *
    FROM public.email_status
    LIMIT 10;
    `
  );

  const latestSubscriptionsResult = await safeQuery<LatestSubscription>(
    `
    WITH latest AS (
      SELECT DISTINCT ON (email)
        email,
        action,
        created_at
      FROM public.subscription_audit_log
      ORDER BY email, created_at DESC
    )
    SELECT
      email,
      CASE
        WHEN action = 'subscribed' THEN 'active'
        WHEN action = 'unsubscribed' THEN 'unsubscribed'
        ELSE action
      END AS status,
      created_at AS last_event_at
    FROM latest
    ORDER BY last_event_at DESC
    LIMIT 50;
    `
  );

  const recentActivityResult = await safeQuery<RecentEvent>(
    `
    SELECT
      email,
      action,
      reason,
      created_at
    FROM public.subscription_audit_log
    ORDER BY created_at DESC
    LIMIT 20;
    `
  );

  const bouncedResult = await safeQuery<BouncedSummary>(
    `
    SELECT COUNT(*)::int AS bounced
    FROM public.email_status
    WHERE status IN ('bounced', 'bounce');
    `
  );

  const summary = summaryResult?.rows?.[0] ?? {
    total: 0,
    active: 0,
    unsubscribed: 0,
  };

  const bounced = bouncedResult?.rows?.[0]?.bounced ?? 0;

  const queryHealth = {
    auditLog:
      summaryResult !== null &&
      latestSubscriptionsResult !== null &&
      recentActivityResult !== null,
    subscribers: subscribersPreviewResult !== null,
    emailStatus: emailStatusPreviewResult !== null,
    bounced: bouncedResult !== null,
  };

  return {
    summary,
    bounced,
    latestSubscriptions: latestSubscriptionsResult?.rows ?? [],
    recentActivity: recentActivityResult?.rows ?? [],
    subscribersPreview: subscribersPreviewResult?.rows ?? [],
    emailStatusPreview: emailStatusPreviewResult?.rows ?? [],
    queryHealth,
    hasAuditLog:
      summaryResult !== null ||
      latestSubscriptionsResult !== null ||
      recentActivityResult !== null ||
      subscribersPreviewResult !== null ||
      emailStatusPreviewResult !== null,
  };
}
