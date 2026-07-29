import type { AgentMeta, Decision, DepartmentId } from "@/lib/types";

export const DEPARTMENT_ORDER: DepartmentId[] = [
  "ceo",
  "marketing",
  "sales",
  "support",
  "finance",
];

export const AGENTS: Record<DepartmentId, AgentMeta> = {
  ceo: {
    id: "ceo",
    name: "CEO Agent",
    departmentLabel: "CEO",
    tagline: "Claude makes the strategic decisions.",
    status: "active",
    mode: "strategic",
    kpis: [
      { label: "Revenue (MTD)", value: "$418,250", delta: "18.7%", positive: true },
      { label: "Growth", value: "24.3%", delta: "12.1%", positive: true },
      { label: "Active Users", value: "128,540", delta: "8.3%", positive: true },
      { label: "Profit Margin", value: "32.6%", delta: "6.2%", positive: true },
    ],
    flow: [
      { label: "Vision", icon: "eye" },
      { label: "Strategy", icon: "chess" },
      { label: "Delegate", icon: "network" },
    ],
    permissions: [
      {
        id: "spend",
        label: "Approve budget changes",
        description: "Allow the agent to adjust department spend without human sign-off.",
        enabled: false,
      },
      {
        id: "hiring",
        label: "Propose hires",
        description: "Allow the agent to draft hiring requests for open roles.",
        enabled: true,
      },
      {
        id: "roadmap",
        label: "Edit roadmap",
        description: "Allow the agent to reprioritize the product roadmap.",
        enabled: true,
      },
      {
        id: "external",
        label: "External communication",
        description: "Allow the agent to message investors or partners directly.",
        enabled: false,
      },
    ],
    targets: [{ id: "arr", label: "ARR Target", value: 1000000, unit: "$" }],
  },
  marketing: {
    id: "marketing",
    name: "Marketing Agent",
    departmentLabel: "Marketing Team",
    tagline: "Content runs 24/7.",
    status: "active",
    mode: "autonomous",
    kpis: [
      { label: "Content Pieces Created Today", value: "28", delta: "—", positive: true },
      { label: "Total Reach Today", value: "156K", delta: "—", positive: true },
      { label: "New Followers Today", value: "+2.4K", delta: "—", positive: true },
    ],
    flow: [
      { label: "Research", icon: "search" },
      { label: "Create", icon: "pencil" },
      { label: "Publish", icon: "send" },
    ],
    permissions: [
      {
        id: "publish",
        label: "Auto-publish content",
        description: "Allow the agent to publish without a human review pass.",
        enabled: true,
      },
      {
        id: "spend",
        label: "Adjust ad spend",
        description: "Allow the agent to reallocate ad budget between channels.",
        enabled: false,
      },
      {
        id: "brand",
        label: "Brand voice overrides",
        description: "Allow the agent to deviate from the approved brand style guide.",
        enabled: false,
      },
      {
        id: "scheduling",
        label: "Auto-scheduling",
        description: "Allow the agent to pick optimal publish times automatically.",
        enabled: true,
      },
    ],
    targets: [{ id: "output", label: "Weekly Content Output", value: 30, unit: "pieces" }],
  },
  sales: {
    id: "sales",
    name: "Sales Agent",
    departmentLabel: "Sales Team",
    tagline: "Finding customers automatically.",
    status: "active",
    mode: "autonomous",
    kpis: [
      { label: "New Leads This Week", value: "1,248", delta: "24%", positive: true },
      { label: "Outreach Sent This Week", value: "3,621", delta: "18%", positive: true },
      { label: "Meetings Booked This Week", value: "127", delta: "37%", positive: true },
      { label: "Deals Won This Week", value: "$98.4K", delta: "42%", positive: true },
    ],
    flow: [
      { label: "Prospect", icon: "user" },
      { label: "Contact", icon: "send" },
      { label: "Meet", icon: "calendar" },
      { label: "Close", icon: "dollar" },
    ],
    permissions: [
      {
        id: "outreach",
        label: "Send outreach unattended",
        description: "Allow the agent to send cold outreach without per-message review.",
        enabled: true,
      },
      {
        id: "discounts",
        label: "Offer discounts",
        description: "Allow the agent to offer discounts up to a preset limit to close deals.",
        enabled: false,
      },
      {
        id: "scheduling",
        label: "Book meetings directly",
        description: "Allow the agent to book meetings on reps' calendars automatically.",
        enabled: true,
      },
      {
        id: "crm",
        label: "Edit CRM records",
        description: "Allow the agent to update deal stages and contact records.",
        enabled: true,
      },
    ],
    targets: [{ id: "deals", label: "Monthly Deals Target", value: 50, unit: "deals" }],
  },
  support: {
    id: "support",
    name: "Support Agent",
    departmentLabel: "Support Team",
    tagline: "Replies in seconds.",
    status: "active",
    mode: "autonomous",
    kpis: [
      { label: "Emails Replied Today", value: "2,842", delta: "28%", positive: true },
      { label: "Chats Handled Today", value: "1,527", delta: "32%", positive: true },
      { label: "Tickets Closed Today", value: "342", delta: "24%", positive: true },
      { label: "Avg Response Time", value: "18s", delta: "61%", positive: true },
      { label: "Customer Satisfaction", value: "98%", delta: "14%", positive: true },
    ],
    flow: [
      { label: "Question", icon: "question" },
      { label: "Answer", icon: "chat" },
      { label: "Resolve", icon: "check" },
    ],
    permissions: [
      {
        id: "autoresolve",
        label: "Auto-resolve tickets",
        description: "Allow the agent to close tickets without human confirmation.",
        enabled: true,
      },
      {
        id: "refunds",
        label: "Issue refunds",
        description: "Allow the agent to issue refunds up to a preset limit.",
        enabled: false,
      },
      {
        id: "kb",
        label: "Edit knowledge base",
        description: "Allow the agent to publish and update help center articles.",
        enabled: true,
      },
      {
        id: "escalation",
        label: "Escalate to human",
        description: "Require escalation to a human for sensitive account issues.",
        enabled: true,
      },
    ],
    targets: [{ id: "response", label: "Max Response Time", value: 30, unit: "seconds" }],
  },
  finance: {
    id: "finance",
    name: "Finance Agent",
    departmentLabel: "Finance Team",
    tagline: "Every dollar is tracked.",
    status: "active",
    mode: "manual",
    kpis: [
      { label: "Revenue (MTD)", value: "$128,540", delta: "24.6%", positive: true },
      { label: "Expenses (MTD)", value: "$62,430", delta: "12.8%", positive: false },
      { label: "Profit (MTD)", value: "$66,110", delta: "38.3%", positive: true },
      { label: "Cash Balance", value: "$87,390", delta: "15.7%", positive: true },
      { label: "Runway", value: "8.4 months", delta: "1.2mo", positive: true },
    ],
    flow: [
      { label: "Track", icon: "file" },
      { label: "Analyze", icon: "search" },
      { label: "Grow", icon: "trending" },
    ],
    permissions: [
      {
        id: "payments",
        label: "Approve payments",
        description: "Allow the agent to approve outgoing payments under a preset limit.",
        enabled: false,
      },
      {
        id: "forecast",
        label: "Publish forecasts",
        description: "Allow the agent to publish revenue/expense forecasts without review.",
        enabled: true,
      },
      {
        id: "categorize",
        label: "Auto-categorize transactions",
        description: "Allow the agent to categorize incoming transactions automatically.",
        enabled: true,
      },
      {
        id: "insights",
        label: "Surface AI insights",
        description: "Allow the agent to post spend/revenue recommendations to the dashboard.",
        enabled: true,
      },
    ],
    targets: [{ id: "runway", label: "Minimum Cash Runway", value: 6, unit: "months" }],
  },
};

export const INITIAL_DECISIONS: Decision[] = [
  { id: "d1", agentId: "ceo", text: "Approved ad spend increase", timestamp: "Today", status: "approved" },
  { id: "d2", agentId: "ceo", text: "Hired Content Manager", timestamp: "Yesterday", status: "approved" },
  { id: "d3", agentId: "ceo", text: "Paused underperforming channel", timestamp: "2d ago", status: "approved" },
  { id: "d4", agentId: "ceo", text: "Approve new feature build for Q2 roadmap", timestamp: "3d ago", status: "pending" },

  { id: "d5", agentId: "marketing", text: "Publish 'AI Workflow' short-form video", timestamp: "10m ago", status: "pending" },
  { id: "d6", agentId: "marketing", text: "Shift 15% of budget to top-performing hook style", timestamp: "1h ago", status: "pending" },
  { id: "d7", agentId: "marketing", text: "Archived underperforming thumbnail set", timestamp: "Yesterday", status: "approved" },

  { id: "d8", agentId: "sales", text: "Booked demo with Acme Inc.", timestamp: "2m ago", status: "approved" },
  { id: "d9", agentId: "sales", text: "Offer 10% discount to close Nova Labs deal", timestamp: "20m ago", status: "pending" },
  { id: "d10", agentId: "sales", text: "Follow-up sent to 32 leads", timestamp: "1h ago", status: "approved" },

  { id: "d11", agentId: "support", text: "Refund requested for order #4821", timestamp: "5m ago", status: "pending" },
  { id: "d12", agentId: "support", text: "Resolved: payment method not working", timestamp: "2m ago", status: "approved" },
  { id: "d13", agentId: "support", text: "Published new knowledge base article: dark mode", timestamp: "32m ago", status: "approved" },

  { id: "d14", agentId: "finance", text: "Increase ad spend by 15% per AI insight", timestamp: "3h ago", status: "pending" },
  { id: "d15", agentId: "finance", text: "Categorized 128 new transactions", timestamp: "Today", status: "approved" },
  { id: "d16", agentId: "finance", text: "Flagged AWS spend anomaly for review", timestamp: "5h ago", status: "pending" },
];
