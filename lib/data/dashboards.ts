// Department-specific dashboard content (separate from agent runtime config in agents.ts).

export const ceoDashboard = {
  greeting: "Good morning, Founder.",
  subheading: "Here's what matters today.",
  goals: [
    { label: "Hit $1M ARR", progress: 72 },
    { label: "Launch New Product", progress: 60 },
    { label: "Scale Content Engine", progress: 85 },
    { label: "Improve Profit Margin", progress: 40 },
  ],
  priorities: [
    { label: "Finalize Q2 Strategy", priority: "High" as const },
    { label: "Review Growth Experiments", priority: "High" as const },
    { label: "Approve Marketing Budget", priority: "Medium" as const },
    { label: "Hire Senior Engineer", priority: "Medium" as const },
  ],
  roadmap: {
    quarter: "Q2 2024",
    now: { label: "Scale Content Engine", icon: "rocket" },
    next: { label: "Product Expansion", icon: "cube" },
    later: { label: "Global Launch", icon: "globe" },
  },
};

export const marketingDashboard = {
  overview: {
    heading: "Today's Marketing Overview",
    description: "AI is researching, creating, and publishing content that grows the brand.",
  },
  pipeline: [
    {
      key: "research",
      title: "Research",
      description: "AI finds what works.",
      items: ["Trend Analysis", "Competitor Tracking", "Audience Insights", "Keyword Research"],
      status: "Complete",
    },
    {
      key: "hooks",
      title: "Hooks",
      description: "AI writes scroll-stopping hooks.",
      items: ["Viral Hook Ideas", "A/B Tested", "Top Performers", "Hook Library"],
      status: "Complete",
    },
    {
      key: "scripts",
      title: "Scripts",
      description: "AI writes high-converting scripts.",
      items: ["Short Form Scripts", "Long Form Scripts", "CTA Optimization", "Tone Matching"],
      status: "Complete",
    },
    {
      key: "thumbnails",
      title: "Thumbnails",
      description: "AI creates thumbnails that convert.",
      items: ["Thumbnail Ideas", "A/B Tested", "High CTR Designs", "Brand Consistent"],
      status: "Complete",
    },
    {
      key: "publishing",
      title: "Publishing",
      description: "AI publishes at the perfect time.",
      items: ["Best Time Detection", "Auto Scheduling", "Cross-Platform", "Post & Monitor"],
      status: "Active",
    },
  ],
  calendar: [
    { day: "MON", title: "AI Automation", time: "10:00 AM" },
    { day: "TUE", title: "Build in Public", time: "11:30 AM" },
    { day: "WED", title: "AI Workflow", time: "9:00 AM" },
    { day: "THU", title: "Tools That Win", time: "12:00 PM" },
    { day: "FRI", title: "Systems Over Hustle", time: "10:30 AM" },
    { day: "SAT", title: "Case Study", time: "11:00 AM" },
    { day: "SUN", title: "Weekly Recap", time: "6:00 PM" },
  ],
};

export const salesDashboard = {
  pipeline: [
    { key: "leadFinder", label: "Lead Finder", description: "AI finds the best prospects.", value: 2341, unit: "Leads" },
    { key: "outreach", label: "Outreach", description: "AI sends personalized messages.", value: 1124, unit: "Contacted" },
    { key: "followups", label: "Follow-ups", description: "AI follows up until they reply.", value: 342, unit: "Replied" },
    { key: "meetings", label: "Meetings", description: "AI books and qualifies calls.", value: 127, unit: "Meetings" },
    { key: "closed", label: "Closed Deals", description: "AI helps close more deals.", value: 43, unit: "Closed" },
  ],
  leadSources: [
    { name: "Twitter / X", value: 42 },
    { name: "LinkedIn", value: 28 },
    { name: "Reddit", value: 16 },
    { name: "Website", value: 9 },
    { name: "Other", value: 5 },
  ],
  outreachPerformance: [
    { label: "Open Rate", value: "64%", delta: "21%" },
    { label: "Reply Rate", value: "18%", delta: "26%" },
    { label: "Meeting Rate", value: "7.3%", delta: "31%" },
  ],
  recentActivity: [
    { text: "Booked demo with Acme Inc.", timestamp: "2m ago" },
    { text: "New reply from Sarah J.", timestamp: "15m ago" },
    { text: "Follow-up sent to 32 leads", timestamp: "1h ago" },
    { text: "Closed deal with Nova Labs", timestamp: "3h ago" },
  ],
};

export const supportDashboard = {
  channels: [
    { key: "email", label: "Email Support", description: "AI replies to customer emails instantly.", value: 1842, unit: "Replied" },
    { key: "chat", label: "Live Chat", description: "AI agent handles live conversations.", value: 1527, unit: "Handled" },
    { key: "tickets", label: "Tickets", description: "AI triages and resolves support tickets.", value: 342, unit: "Closed" },
    { key: "kb", label: "Knowledge Base", description: "AI keeps docs up to date and accurate.", value: 128, unit: "Updated" },
    { key: "faq", label: "FAQ Automations", description: "AI answers common questions automatically.", value: 892, unit: "Answered" },
  ],
  ticketStatus: [
    { name: "Open", value: 42 },
    { name: "In Progress", value: 78 },
    { name: "Pending", value: 64 },
    { name: "Resolved", value: 112 },
    { name: "Closed", value: 46 },
  ],
  popularTopics: [
    { label: "Account & Billing", value: 42 },
    { label: "Product Usage", value: 28 },
    { label: "Integrations", value: 16 },
    { label: "Technical Issues", value: 9 },
    { label: "Other", value: 5 },
  ],
  knowledgeBase: {
    articles: 256,
    viewsThisMonth: "98.5K",
    helpfulRate: "96%",
    updatedToday: 12,
  },
  recentResolved: [
    { text: "Payment method not working", timestamp: "2m ago" },
    { text: "How to connect Google integration", timestamp: "6m ago" },
    { text: "Exporting data issue", timestamp: "18m ago" },
    { text: "Feature request: dark mode", timestamp: "32m ago" },
  ],
};

export const financeDashboard = {
  revenueOverview: [
    { label: "Week 1", value: 70000 },
    { label: "Week 2", value: 92000 },
    { label: "Week 3", value: 111000 },
    { label: "Week 4", value: 132000 },
    { label: "Week 5", value: 128540 },
  ],
  expensesBreakdown: [
    { name: "Salaries", value: 42 },
    { name: "Tools & SaaS", value: 18 },
    { name: "Marketing", value: 15 },
    { name: "Infrastructure", value: 10 },
    { name: "Other", value: 15 },
  ],
  profitMargin: [
    { label: "May", value: 44 },
    { label: "Jun", value: 47 },
    { label: "Jul", value: 49 },
    { label: "Aug", value: 51.4 },
  ],
  cashFlow: [
    { label: "Op.", value: 15200 },
    { label: "Inv.", value: -6400 },
    { label: "Fin.", value: 3100 },
    { label: "Net", value: 11240 },
  ],
  forecast: [
    { label: "Aug", value: 128540 },
    { label: "Sep", value: 165000 },
    { label: "Oct", value: 210000 },
    { label: "Nov", value: 280000 },
    { label: "Dec", value: 400000 },
    { label: "Jan", value: 542000 },
  ],
  recentActivity: [
    { text: "Payment received from Acme Inc.", amount: "+$12,500", timestamp: "2h ago", positive: true },
    { text: "AWS Infrastructure", amount: "-$2,340", timestamp: "5h ago", positive: false },
    { text: "Figma Team Plan", amount: "-$180", timestamp: "1d ago", positive: false },
    { text: "Payment received from Nova Labs", amount: "+$8,900", timestamp: "1d ago", positive: true },
  ],
  aiInsight: "Revenue is up 24.6% this month. Consider increasing ad spend by 15% to maximize growth.",
  topRevenueSources: [
    { label: "Product Sales", value: 58 },
    { label: "Subscriptions", value: 27 },
    { label: "Services", value: 10 },
    { label: "Other", value: 5 },
  ],
};
