# Frontend Design Skills for Robusca Command OS

Status: planning artifact  
Purpose: define the design skill layer for the Command OS, War Room, desktop app, mobile app, and agent dashboards

---

## 1. Goal

Robusca Command OS needs design intelligence built into the operating system, not treated as decoration after the fact.

Every interface should be:

- clear
- spaced out
- premium
- readable
- fast to understand
- accessible
- black/gold aligned
- transparent only where still legible
- built from reusable design-system components

The design layer should guide:

- dashboard architecture
- page layout
- component design
- chart/table design
- mobile command cockpit
- voice/meeting interfaces
- agent status views
- approval flows
- daily routine screens
- finance and operations dashboards

---

## 2. Active design sources

| Source | Role | Status |
| --- | --- | --- |
| `UI_UX_STANDARD.md` | StudEx-specific command-glass design law | Active |
| UI UX Pro Max | external design-intelligence reference | Reference first; install only after review |
| gstack design skills | design review, design consultation, HTML/design QA workflows | Optional engineering workflow after vetting |
| Existing War Room style | black/gold typography, privacy toggle, executive dashboard DNA | Active |
| Figma / Code Connect | future design-to-code bridge | Planned |

Note: a built-in `frontend-design` skill was listed in the environment metadata, but the referenced skill file was not present on disk in this session. Treat it as unavailable here until the plugin cache is restored or the skill is provided.

---

## 3. Core Command OS design skills

### 3.1 Dashboard architecture

Ability:

- structure dashboards by purpose
- separate executive summary from activity feed
- place KPIs consistently
- create clear right-rail approval/action zones
- avoid cluttered all-in-one panels

Default structure:

```text
Header
-> critical status strip
-> KPI row
-> primary work panel
-> secondary context cards
-> approvals/action rail
-> audit/activity feed
```

### 3.2 Command-glass UI

Ability:

- black/gold premium glass surfaces
- transparent but readable cards
- soft borders and blur
- high-contrast text
- strong hierarchy

Rule:

```text
If transparency reduces readability, increase opacity.
```

### 3.3 Data visualization

Ability:

- finance charts
- agent status charts
- model/node health charts
- routine success/failure charts
- meeting/action-item charts

Rules:

- every chart needs a table fallback
- labels and legends must be explicit
- color cannot be the only indicator
- source and last-updated timestamp must be visible

### 3.4 Mobile cockpit design

Ability:

- approval-first mobile UX
- voice command button
- daily brief card
- meeting recorder
- urgent alerts
- simplified KPIs

Mobile rule:

```text
Mobile is for command, approval, and briefing — not full wall-dashboard density.
```

### 3.5 Desktop app design

Ability:

- command palette
- resizable panels
- persistent navigation
- model selector
- ClickClack/Rocket.Chat bridge panel
- meeting library
- device mesh panel

Desktop rule:

```text
Desktop may be dense, but never cramped.
```

### 3.6 Accessibility and readability review

Ability:

- contrast checks
- keyboard navigation review
- focus state review
- touch target review
- reduced-motion support
- semantic controls

Minimum:

- primary text contrast >= 4.5:1
- secondary text contrast >= 3:1
- touch targets >= 44x44px

---

## 4. Design skills by product surface

| Surface | Required design skills |
| --- | --- |
| War Room | dashboard architecture, KPI cards, table/chart clarity, privacy masking |
| Command Center | command hierarchy, approval rail, agent status, activity feed |
| Device Mesh | node cards, model status, capacity charts, Tailscale visibility |
| Meeting Memory | transcript readability, action review, sync status, playback UI |
| Daily Routines | timeline, artifact cards, approval states, run history |
| Finance/CashClaw | numeric precision, risk colors, source timestamps, privacy masking |
| Mobile App | voice-first UX, approval cards, push alerts, simplified status |
| AI Town | visual metaphor, agent identity, non-critical simulation layer |
| ClickClack Bridge | channel clarity, bot identity, safe action affordances |

---

## 5. Component library targets

Create reusable components:

```text
CommandShell
CommandHeader
KpiCard
StatusStrip
AgentCard
NodeCard
ApprovalCard
RoutineRunCard
MeetingCard
FinanceSnapshotCard
CommandGlassPanel
DataTable
AccessibleChart
RightRail
ActivityFeed
PrivacyMaskedValue
```

Each component must support:

- loading state
- empty state
- error state
- privacy mode
- keyboard/focus behavior
- responsive layout

---

## 6. Design workflow

Before implementing a new UI:

1. Identify surface type: dashboard, command screen, approval flow, mobile view, data table, chart.
2. Read [UI_UX_STANDARD.md](UI_UX_STANDARD.md).
3. Use UI UX Pro Max guidance as reference where needed.
4. Define information hierarchy.
5. Choose components from the Command OS component library.
6. Build with semantic design tokens.
7. Verify accessibility and mobile behavior.
8. Add screenshots or visual QA notes when possible.

---

## 7. Integration with gstack

If gstack is vetted and installed, use:

- `/plan-design-review` before major UI builds
- `/design-review` after implementation
- `/design-consultation` for major new surfaces
- `/design-html` for standalone prototypes
- `/qa` for browser interaction checks

Do not install or enable gstack team mode without explicit approval.

---

## 8. Integration with Figma

Future direction:

- create Figma variables for black/gold command-glass theme
- create components for KPI cards, agent cards, approval cards, tables, charts
- map components with Code Connect where possible
- keep Figma and code tokens aligned

Figma should be used for:

- high-fidelity dashboard exploration
- mobile cockpit flows
- design-system component documentation
- presentation mockups

---

## 9. Acceptance checklist

Before a frontend PR is ready:

- [ ] follows [UI_UX_STANDARD.md](UI_UX_STANDARD.md)
- [ ] information hierarchy is obvious
- [ ] spacing is consistent
- [ ] glass panels remain readable
- [ ] privacy mode works
- [ ] mobile layout works
- [ ] keyboard navigation works
- [ ] charts have labels and table fallback
- [ ] loading, empty, and error states exist
- [ ] no secrets or private data are visible in screenshots
- [ ] no emojis are used as structural icons

