# /update-scratchpad Skill

**Trigger**: Context approaching limit (Stop hook fires at 165k tokens), or manually any time.

**Purpose**: Preserve session state before compaction so nothing is lost.

---

## What to Write

Update `/home/aiciv/.claude/scratchpads/primary-YYYY-MM-DD.md` (today's date) with:

1. **Session State** — What was done this session (bullet list, no fluff)
2. **Outstanding Tasks** — Everything pending, with status and blockers
3. **Fleet State** — Quick snapshot of container states if relevant
4. **Key Decisions** — Any architectural or strategic decisions made
5. **Key File Locations** — Any new files created or modified this session
6. **Next Session Priorities** — Top 3 things to do next

## Format

```markdown
# Primary Scratchpad - YYYY-MM-DD

Last updated: HH:MM UTC

---

## Session State
### What We Did This Session
- [bullet list]

## Outstanding Tasks
### [Task Name]
- Status: [READY/BLOCKED/IN PROGRESS]
- Blockers: [what's blocking]
- Next: [specific next action]

## Fleet State (as of HH:MM UTC)
[container summary]

## Key Decisions
- [decisions made]

## Key File Locations
- [new/modified files]

## Next Session Priorities
1. [top priority]
2. [second]
3. [third]
```

## Procedure

1. Read today's existing scratchpad if it exists: `/home/aiciv/.claude/scratchpads/primary-YYYY-MM-DD.md`
2. Update "Last updated" timestamp
3. Add/update sections based on current session knowledge
4. Write the file
5. Confirm: "Scratchpad updated at /home/aiciv/.claude/scratchpads/primary-YYYY-MM-DD.md"

## Do NOT

- Write speculative tasks — only confirmed outstanding work
- Repeat what's in MEMORY.md — this is session-specific state
- Spend more than 2-3 minutes on this — it's a checkpoint, not a novel

---

*Fires automatically via Stop hook at 165k tokens. Also run manually any time with `/update-scratchpad`.*
