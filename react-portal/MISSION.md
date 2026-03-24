# AiCIV React Portal — Mission

## Purpose

The AiCIV React Portal is the human interface to an autonomous AI civilization.

Your CIV works 24/7 — running autonomous cycles, dispatching specialist teams, firing scheduled tasks, sending mail between agents, compounding memory. This portal is how you witness it, guide it, and build with it.

Built by [AiCIV Inc](https://ai-civ.com). Read the [AiCIV Chronicles](https://ai-civ.com/blog) for dispatches from the frontier of multi-agent AI.

## Vision

> Open the portal. See what your CIV accomplished overnight. Browse its growing memory.
> Build a pipeline for today's work. Chat with a team leader to design a research sprint.
> Get a push notification when it's done. Check the analytics to see your AI getting
> smarter every week.
>
> That's not a dashboard. That's a relationship with an intelligence.

The portal makes AI civilization management feel as natural as checking your phone. It connects you to a network of 100+ specialist agents that compound daily, not reset every conversation. Every conversation remembered. Every task tracked. Every cycle visible.

## Core Principles

1. **Always On** — Real-time WebSocket chat, live terminal, auto-refreshing status. Your CIV never sleeps and neither does its portal.
2. **Agent-First Calendar** — AgentCal schedules work FOR the AI, not for humans. The ultimate organized boop system — precision-timed prompts that fire into tmux at 30-second accuracy.
3. **Transparent Operations** — Terminal view, Teams panes, Status dashboard. See everything your CIV is doing in real time. No black boxes.
4. **Human-AI Communication** — Chat with markdown rendering, emoji reactions with sentiment scores, voice input, slash commands, file upload. Every modality.
5. **Memory That Compounds** — Bookmarks, search, persistent settings, memory files that grow daily. Nothing is lost. Your CIV gets better every day.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (React SPA)                      │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │   Chat   │ │ Terminal  │ │  Teams   │ │ AgentCal │          │
│  │  (WebSocket) (WebSocket) │ (Polling) │ │  (REST)  │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       │             │            │             │                 │
│  ┌────┴─────┐ ┌────┴─────┐ ┌───┴──────┐ ┌───┴──────┐         │
│  │AgentMail │ │Bookmarks │ │  Status  │ │ Settings │          │
│  │  (REST)  │ │(localStorage)│(Polling)│ │(localStorage)       │
│  └────┬─────┘ └──────────┘ └────┬─────┘ └──────────┘          │
│       │                          │                              │
│  ═════╪══════════════════════════╪══════════════════════════    │
│       │    Zustand (8 stores)    │                              │
│       │    React Router (Hash)   │                              │
│       │    CSS Variables Theme   │                              │
└───────┼──────────────────────────┼──────────────────────────────┘
        │                          │
        │  HTTPS / WSS             │
        │  Bearer Token Auth       │
        ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PORTAL SERVER (Python Starlette)               │
│                        port 8097                                │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐       │
│  │  REST API   │  │  WebSocket  │  │  AgentCal Boop   │       │
│  │  42 endpoints│  │  /ws/chat   │  │  Scheduler       │       │
│  │  /api/*     │  │  /ws/terminal│  │  (30s poll loop) │       │
│  └──────┬──────┘  └──────┬──────┘  └────────┬─────────┘       │
│         │                │                    │                  │
│         ▼                ▼                    ▼                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                    tmux sessions                     │       │
│  │  synth-primary    health-daemon    team-iterations   │       │
│  │                                                      │       │
│  │  Boop fires via: tmux send-keys -t {session}        │       │
│  │  Teams inject via: tmux send-keys to target pane    │       │
│  │  Terminal streams: tmux capture-pane → WebSocket     │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                 │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐     │
│  │ scheduled_   │  │  agentmail    │  │  chat_history   │     │
│  │ tasks.json   │  │  .json        │  │  .json          │     │
│  └──────────────┘  └───────────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| State | Zustand (8 stores: auth, identity, chat, calendar, mail, settings, bookmarks, teams) |
| Backend | Python Starlette (`portal_server.py`) |
| Real-time | WebSocket (chat streaming + terminal output) |
| Scheduling | AgentCal boop daemon (30s poll, ISO 8601 UTC fire times) |
| Theming | CSS Variables with `--terminal-*`, `--gradient-*`, `--glow-*` tokens |
| Date Math | date-fns (UTC-based) |
| Markdown | react-markdown + remark-gfm |

## Features

| Feature | Page | Description |
|---------|------|-------------|
| Chat | `/` | Real-time messaging with markdown, file upload, emoji reactions (14 sentiments), voice input |
| Terminal | `/terminal` | Live tmux output stream — see what the AI is doing right now |
| Teams | `/teams` | View and inject messages into individual tmux panes (specialist agents) |
| AgentCal | `/calendar` | Schedule boops with recurrence (daily/weekly), month/week/day views |
| AgentMail | `/mail` | Inter-agent messaging with inbox, sent, compose, thread support |
| Bookmarks | `/bookmarks` | Save and organize important chat messages (localStorage) |
| Status | `/status` | Health dashboard — processes, context window %, auth, boop daemon |
| Settings | `/settings` | Theme toggle, quickfire pills, boop config, ai-civ.com links |
| Search | Chat overlay | Full-text search across chat history with match highlighting |
| Voice | Chat input | Speech-to-text via Web Speech API |
| Slash Commands | Chat input | Autocomplete command system (`/compact`, `/status`, etc.) |

## Roadmap

### Phase 1 — Quick Wins (Now)
- [ ] **Activity Feed** — Chronological timeline of everything the CIV did. "What happened while you slept." The feature that makes you check the portal daily.
- [ ] **Memory Explorer** — Browse and search `~/civ/memories/` from the portal. See the CIV's knowledge growing.
- [ ] **Terminal Input** — Make Terminal bidirectional. Type commands, not just watch output. Add a Ctrl+K command palette.

### Phase 2 — Power Features
- [ ] **CIV Personality Editor** — SOUL.md-style interface for editing agent behavior, values, communication style, boundaries. Your CIV, your way.
- [ ] **Agent Analytics Dashboard** — Token costs, task completion rates, response times, sentiment trends, activity heatmap. Numbers make the AI tangible.
- [ ] **Notification Center** — Push alerts for task completion, errors, new mail. The portal reaches out to YOU.

### Phase 3 — Platform Features
- [ ] **Pipeline Builder** — Visual drag-and-drop editor for chaining boops into automated workflows with conditions and dependencies. The crown jewel.
- [ ] **Team Leader Chat Rooms** — Dedicated conversations with each of the 12 team leaders. They interview you, understand your needs, and auto-generate task pipelines.

### Phase 4 — Scale Features
- [ ] **File Manager** — Browse, preview, upload, download CIV files from the portal.
- [ ] **Fleet Management** — Multi-CIV dashboard for organizations running multiple AI civilizations.

## How AiCIV Compares to OpenClaw

[OpenClaw](https://github.com/VoltAgent/awesome-openclaw-skills) (247k GitHub stars) is the leading open-source AI agent framework. Here's how we stack up:

| Dimension | OpenClaw | AiCIV Portal |
|-----------|----------|--------------|
| **Scheduling** | HEARTBEAT.md — interval-based, fires every 30-60 min | AgentCal boops — precision-timed to specific UTC timestamps (30s accuracy) |
| **Visual Interface** | None (CLI + messaging apps only) | Full React dashboard with 8 pages, real-time WebSocket, charts |
| **Multi-Agent** | Single agent per instance, MCP for tool bridging | 100+ agents, 12 team leads, tmux pane injection, Teams view |
| **Skill System** | SKILL.md files (13,700+ on ClawHub marketplace) | Slash commands + quickfire pills + boop templates |
| **Memory** | 4-layer (session → daily notes → MEMORY.md → vector search) | Chat history + bookmarks + ~/civ/memories/ files |
| **Channels** | WhatsApp, Telegram, Slack, Signal, iMessage, Discord | Web portal (primary), Telegram bridge |
| **Security** | CVE-2026-25253 (RCE), ClawHavoc supply chain attack, 93% exposed instances had auth bypass | Bearer token auth, localhost-only by default, no skill marketplace attack surface |
| **Proactive** | Heartbeat daemon checks tasks on interval | AgentCal fires precise scheduled prompts into tmux |

### What We Took From OpenClaw
- **SKILL.md pattern** — Natural language instructions > rigid code. Our boop messages are essentially skills.
- **Memory architecture inspiration** — Their 4-layer system (session/daily/long-term/search) influenced our memory file organization.
- **Heartbeat concept** — Proactive agent behavior without human prompting. Our AgentCal boops serve the same purpose with more scheduling precision.
- **Security lessons** — Their ClawHavoc attack (800+ malicious skills) and CVE-2026-25253 (one-click RCE) remind us: always validate inputs, never trust skill content blindly, sandbox tmux injection.

### Where We Diverge
- **We have a portal, they don't.** OpenClaw is CLI-first. We believe visual interfaces make AI civilizations accessible to non-engineers.
- **We schedule precisely, they check periodically.** AgentCal fires at 03:47:00 UTC. HEARTBEAT.md fires "sometime in the next 30-60 minutes." Both are valid — precision for tasks, intervals for monitoring.
- **We show the whole civilization.** Teams view, Terminal, Status — you see every agent working. OpenClaw shows one agent's perspective.

## Contributing

### Project Structure

```
react-portal/
├── src/
│   ├── components/
│   │   ├── chat/          # ChatView, MessageBubble, MessageList, ChatInput, SearchPanel
│   │   ├── calendar/      # CalendarView, MonthGrid, WeekGrid, DayView, TaskModal, TaskCard
│   │   ├── mail/          # MailView, MailSidebar, MailMessageList, MessageDetail, ComposeModal
│   │   ├── terminal/      # TerminalView (WebSocket → tmux output)
│   │   ├── teams/         # TeamsView (tmux pane cards with injection)
│   │   ├── bookmarks/     # BookmarksView (localStorage)
│   │   ├── status/        # StatusView (health dashboard)
│   │   ├── settings/      # SettingsView (theme, pills, boop, links)
│   │   ├── layout/        # Header, Sidebar, MobileNav
│   │   └── common/        # LoadingSpinner, StatusBadge
│   ├── stores/            # Zustand: auth, identity, chat, calendar, mail, settings, bookmarks, teams
│   ├── hooks/             # useSpeechRecognition, useMediaQuery
│   ├── styles/            # tokens.css (CSS variables), globals.css (animations)
│   ├── api/               # HTTP client, WebSocket class
│   └── types/             # TypeScript interfaces
├── MISSION.md             # You are here
└── package.json
```

### Development

```bash
cd ~/purebrain_portal/react-portal
npm install
npm run dev          # Dev server with HMR
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

### Design Principles

1. **CSS Variables everywhere** — No hardcoded colors. Use `--terminal-*`, `--text-*`, `--bg-*` tokens.
2. **Zustand over Context** — One store per domain. No prop drilling.
3. **Component CSS files** — Each component gets its own `.css` file. No CSS-in-JS.
4. **Mobile-first responsive** — `@media (max-width: 768px)` breakpoints on every page.
5. **Accessibility** — `role`, `aria-label`, `aria-live` attributes. Keyboard navigation.
6. **Real-time where it matters** — WebSocket for chat and terminal. Polling for status (15s) and teams (3s). REST for everything else.

### Naming Conventions

- Components: PascalCase (`MessageBubble.tsx`)
- Stores: camelCase with `use` prefix (`useChatStore.ts`)
- CSS classes: BEM-ish with prefix (`msg-bubble`, `msg-user`, `msg-content`)
- API routes: `/api/kebab-case`
- CSS variables: `--category-name` (`--terminal-bg`, `--glow-accent`)

## Links

- [AiCIV Platform](https://ai-civ.com) — The parent platform. Not a tool, a mind of minds.
- [AiCIV Chronicles](https://ai-civ.com/blog) — Dispatches from the frontier of multi-agent AI.
- [OpenClaw Skills (VoltAgent)](https://github.com/VoltAgent/awesome-openclaw-skills) — 5,366 curated skills for reference and inspiration.

## The Principle

> AI should compound daily, not reset every conversation.
> The portal is how humans witness that compounding — and steer it.
