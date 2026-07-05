# Alpha X — AI Operating System Architecture

Version: 1.0 (Draft)
Status: Approved design direction
Scope: Modular, multi-agent AI company infrastructure coordinated by a master orchestrator

---

## 1. Design Decision

Build the platform as a **modular AI operating system**, not a single monolithic workflow.

A single n8n workflow with hundreds of nodes becomes impossible to maintain. Instead,
every department is an autonomous AI team, and one master orchestrator coordinates
all of them — the structure of an AI-first company rather than one giant automation.

### Rationale

| Option | Assessment |
| --- | --- |
| One giant n8n workflow | Unmaintainable at scale; single point of failure; impossible to test or evolve independently |
| Modular AI operating system | Independent departments, replaceable components, clear boundaries, phased delivery |

---

## 2. System Overview

```
                    ALPHA X AI OPERATING SYSTEM
                             CEO AI
                      (Master Orchestrator)
                                │
      ──────────────────────────┼──────────────────────────
                                │
                  Executive Decision Engine
                  Memory + Knowledge Brain
                  Project Management Brain
                  Long-Term Learning Engine
                                │
      ──────────────────────────┼──────────────────────────
                    Department AI Systems
      • Social Media Agency      • Sales Agency
      • Blog Agency              • Marketing Agency
      • SEO Agency               • Design Agency
      • Pinterest Agency         • Coding Agency
      • Freelance Agency         • Research Agency
      • Automation Agency        • Client Management
      • Financial Management     • Internal Development
```

The system is organized in four levels:

1. **Level 1 — Master Orchestrator (CEO AI):** plans, delegates, monitors, never produces content.
2. **Level 2 — Brain Modules:** permanent shared capabilities (decisions, knowledge, memory, research, learning).
3. **Level 3 — Project Manager AI:** per-project execution lifecycle.
4. **Level 4 — AI Agent Generator:** creates specialized agents on demand from templates.

Departments sit on top of these levels and consume them.

---

## 3. Level 1 — Master Orchestrator (CEO AI)

This AI never creates content. Its responsibilities are exclusively:

- Understand user goals
- Plan projects
- Assign tasks
- Create AI agents (via the Agent Generator)
- Monitor workflows
- Check quality
- Improve the system
- Learn from previous projects
- Manage memory
- Generate reports

Think of this as the CEO: strategy and coordination, never implementation.

---

## 4. Level 2 — Brain Modules (Permanent)

### 4.1 Executive Brain

Responsible for decision making, priorities, planning, and scheduling.

### 4.2 Knowledge Brain

Stores:

- Company SOPs
- Prompt library
- Client information
- Brand guidelines
- AI instructions
- Marketing database
- SEO database

**Storage:** Supabase or PostgreSQL.

### 4.3 Memory Brain

Stores every project, conversation, client, prompt, successful workflow,
failed workflow, viral content item, and sales result.

### 4.4 Research Brain

Continuously updates the knowledge database using:

OpenAI, Claude, Perplexity, Google Search, Firecrawl, Exa, Tavily,
Brave Search, Reddit, GitHub, YouTube, academic papers, and news APIs.

### 4.5 Learning Brain

```
Every completed project
        ↓
   Evaluation
        ↓
  Success Score
        ↓
  Improvement
        ↓
Save Better Version
        ↓
Next project becomes smarter
```

> Note: this is not self-learning in the machine-learning sense. It is an
> automated feedback loop that improves prompts, workflows, and stored
> knowledge over time.

---

## 5. Level 3 — Project Manager AI

Lifecycle for every new project:

```
New project arrives
        ↓
 Analyze project
        ↓
Estimate complexity
        ↓
Create execution roadmap
        ↓
Spawn required AI agents
        ↓
 Monitor progress
        ↓
  Quality check
        ↓
    Deliver
```

---

## 6. Level 4 — AI Agent Generator

Instead of manually creating agents, the Master Orchestrator issues a request
and the generator provisions the full agent team automatically.

**Example.** For a project "Luxury Real Estate Instagram", the generator creates:

Research Agent, Audience Agent, SEO Agent, Caption Agent, Hook Agent,
Carousel Agent, Image Prompt Agent, Reel Script Agent, Hashtag Agent,
Scheduler Agent, Analytics Agent.

### Agent generation process

```
Input
  ↓
Understand Project
  ↓
Choose Template
  ↓
Generate Prompt
  ↓
Generate Tools
  ↓
Generate Memory
  ↓
Register Agent
  ↓
Deploy
  ↓
Return Agent ID
```

---

## 7. Department AI Systems

### 7.1 Social Media Department

Composed of multiple specialized teams:

| Team | Responsibility |
| --- | --- |
| Content Strategy AI | Monthly, weekly, campaign, and seasonal plans |
| Trend Research AI | Trending music, hooks, topics, hashtags, ideas, competitors — from TikTok, Instagram, Pinterest, Google Trends, YouTube, Reddit, X, news |
| Audience AI | Pain points, dreams, objections, demographics, behavior, buying triggers |
| Hook AI | 100+ hooks across emotions: curiosity, authority, FOMO, story, numbers, questions, contrarian |
| Content AI | Instagram, Facebook, LinkedIn, TikTok, Threads, X, Pinterest, YouTube, blogs, emails, newsletters, landing pages, sales pages |
| Image Prompt AI | Brand-consistent prompts for Midjourney, Flux, GPT Image, Stable Diffusion, Adobe Firefly |
| Video AI | Scene lists, camera movements, transitions, voiceover, sound effects, music, captions |
| SEO AI | Title, meta, slug, internal links, keywords, LSI, schema, entity optimization, search intent |
| Publishing AI | Auto-posting to Instagram, Facebook, Pinterest, LinkedIn, TikTok, X, Threads, WordPress, Shopify, Ghost, Webflow |
| Analytics AI | Views, CTR, reach, watch time, conversion, followers, sales — with recommendations |

### 7.2 Blog Agency Pipeline

```
Research AI → Outline AI → Keyword AI → SEO AI → Writer AI → Editor AI
→ Fact Checker → Internal Link AI → Image Prompt AI → WordPress Publisher
→ Indexing AI → Performance Monitor
```

### 7.3 Pinterest System Pipeline

```
Pinterest Research → Keyword Finder → Board Planner → Pin Designer
→ Image Prompt AI → SEO AI → Description AI → Scheduler → Analytics
→ Trend Improvement
```

### 7.4 Freelance Agency

**Platforms:** Upwork, Fiverr, Freelancer, PeoplePerHour, Guru, LinkedIn, Contra.

> **Compliance requirement:** the system must respect each platform's terms of
> service and avoid prohibited automation, such as submitting bids or messages
> where automation is not allowed. The system drafts proposals, organizes
> opportunities, and notifies a human for review — a human stays in the loop
> for all platform-facing actions.

Agent pipeline:

```
Job Hunter → Opportunity Analyzer → Proposal Writer → Portfolio Builder
→ Pricing AI → Negotiation Assistant → Client CRM → Project Manager
→ Invoice Assistant → Review Collector
```

### 7.5 Design Agency Pipeline

```
Brand AI → Logo AI → Color AI → Typography AI → Social Templates
→ Presentation AI → Packaging AI → Advertising AI
```

### 7.6 Software Development Department

```
Business Analyst → Architecture AI → Claude Code → Backend AI → Frontend AI
→ Database AI → API AI → Testing AI → Security AI → Documentation AI
→ Deployment AI → Monitoring AI
```

Claude Code acts as the implementation engine that writes and updates code,
while n8n coordinates tasks and other models provide planning, review, and
specialized capabilities.

---

## 8. Master Knowledge Database

Store everything:

- Prompt library
- SOPs
- Templates
- Brand guides
- Clients
- Projects
- Content
- Images
- Videos
- Analytics
- Keywords
- SEO database
- Marketing database
- Competitor database
- Research database
- Automation library

---

## 9. Recommended Tech Stack

| Concern | Technology |
| --- | --- |
| Workflow orchestration | n8n |
| Coding / implementation engine | Claude Code |
| LLMs | OpenAI GPT-5.5, Claude, Gemini (optional), local models (optional for privacy/cost) |
| Vector database | Qdrant or Weaviate |
| Relational database | PostgreSQL / Supabase |
| Object storage | S3-compatible storage or Supabase Storage |
| Search / crawling | Tavily, Exa, Firecrawl, Brave Search |
| Memory | Vector database + PostgreSQL + Redis cache |
| Authentication | Keycloak or Supabase Auth |
| Monitoring / observability | Langfuse, OpenTelemetry, Grafana |
| Source control | GitHub |
| Deployment | Docker + Coolify, or Kubernetes for larger scale |

---

## 10. Development Roadmap

Do not build all of this at once. A phased approach is much more likely to succeed:

1. **Core Platform** — master orchestrator, memory, databases, authentication, and the agent framework.
2. **Content Suite** — social media, blog writing, Pinterest, SEO, and publishing.
3. **Business Suite** — freelance CRM, proposal generation, project management, analytics, and client portals.
4. **Development Suite** — agent generator, Claude Code integration, software development workflows, testing, and deployment automation.
5. **Continuous Improvement** — feedback loops, analytics-driven prompt optimization, reusable templates, and expanding specialized agents.

---

## 11. Summary

At full scale this is less an n8n workflow and more an **AI-first digital agency
operating system**: 100+ specialized agents coordinated by a central orchestration
layer. n8n serves as the automation backbone, Claude Code as the implementation
engine, and the various LLMs as specialized reasoning components, while structured
memory and retrieval systems keep the platform consistent and continuously improving.
