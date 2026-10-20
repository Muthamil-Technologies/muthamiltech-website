// Paid plans are built but switched off until the founder can take income (after PR).
// Mirrors JapTalk's BillingConfig.subscriptionsEnabled: Beginner and Elementary stay free,
// Intermediate and up need Pro once this is turned on.
export const SUBSCRIPTIONS_ENABLED = false;

const FREE_JAPTALK_LEVELS = new Set(["beginner", "elementary"]);

export function japTalkLessonNeedsPro(level: string, plan: "free" | "pro" | undefined) {
  if (!SUBSCRIPTIONS_ENABLED) return false;
  return !FREE_JAPTALK_LEVELS.has(level) && plan !== "pro";
}
