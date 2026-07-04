# Robusca Command OS UI/UX Standard

Status: planning artifact  
Purpose: visual and interaction standard for Robusca Command OS dashboards, desktop app, mobile app, and War Room surfaces

---

## 1. Design intent

Robusca Command OS should feel:

- premium
- calm
- spacious
- high-contrast
- executive-grade
- transparent where beautiful
- readable where operational
- structured like a command office, not a generic SaaS dashboard

The interface should make complex agentic operations feel organized and easy to command.

---

## 2. Reference module

Reference repository:

```text
https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
```

Use:

- design-system reasoning
- dashboard layout guidance
- spacing/accessibility checks
- chart/data visualization guidance
- cross-platform app UI rules

Do not install into production until the CLI/scripts are reviewed and approved. Use as reference/design guidance first.

---

## 3. Core visual direction

### Command glass

Use transparent/glass panels, but never at the cost of readability.

Recommended:

```text
background: deep black / obsidian
surface: rgba(14, 13, 16, 0.78-0.92)
surface elevated: rgba(21, 20, 14, 0.82-0.95)
border: rgba(201, 168, 76, 0.14-0.32)
blur: 12px-24px
shadow: soft, low spread, gold/black only
```

Avoid:

- overly transparent cards that blur hierarchy
- gray-on-gray text
- neon clutter
- random gradients
- unreadable glass over busy backgrounds
- decorative motion that competes with data

### Brand palette

Use existing War Room colors as canonical:

```text
BG_DEEP:    #0a0908
BG_CARD:    #0e0d10
BG_CARD2:   #15140e
GOLD:       #C9A84C
GOLD_DIM:   #9a8a5a
GOLD_DARK:  #5a4f2e
CREAM:      #f5ecd0
GREEN:      #4CFFA8
RED:        #c14e3c
RED_BRIGHT: #ff4444
BLUE_DISC:  #5865F2
```

Use semantic tokens, not raw colors scattered across components.

---

## 4. Information placement

Every dashboard view should have a predictable information hierarchy:

```text
1. Page title and purpose
2. Critical status strip
3. Primary KPIs
4. Main operating panel
5. Secondary context panels
6. Activity/audit trail
7. Approvals/actions
```

For command screens:

- top-left: current business/context
- top-center: main status/KPIs
- top-right: time, model/agent status, privacy toggle
- center: primary work area
- right rail: approvals, alerts, pending actions
- bottom/right: activity feed and logs

---

## 5. Spacing rhythm

Use a 4/8px spacing system.

Recommended scale:

```text
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

Dashboard rules:

- cards should breathe; no cramped data walls
- related items group tightly
- unrelated sections get clear vertical separation
- primary cards use larger spacing than utility cards
- mobile layouts stack with consistent gutters

---

## 6. Typography

Canonical War Room typography:

| Use | Font | Rule |
| --- | --- | --- |
| Labels/caps | Helvetica Neue / sans | 9-11px, uppercase, 2-4px letter spacing |
| Body | Helvetica Neue / Inter | 14-16px, readable line-height |
| Headings | Cormorant Garamond / Georgia | italic for premium executive tone |
| Data/numbers | Menlo / Monaco / JetBrains Mono | tabular, stable, precise |
| Section headers | Rajdhani / sans | uppercase, spaced |

Rules:

- body text must not drop below 12px; prefer 14-16px
- numbers should be monospaced/tabular
- headings should create hierarchy through size and weight, not color alone
- long text should be constrained to readable measure

---

## 7. Dashboard components

### KPI cards

Use for:

- revenue
- agent count
- approval count
- meeting count
- model/node status
- daily routine status

Required fields:

- label
- value
- trend/status
- source timestamp
- privacy-mask compatibility

### Command cards

Use for active operations:

- run routine
- approve output
- sync integration
- generate report
- start/stop meeting recording

Required:

- one clear primary action
- visible loading state
- disabled state
- audit trail link

### Tables

Use for:

- meetings
- tasks
- Linear issues
- sync status
- finance snapshots

Rules:

- provide table alternative for charts
- sticky headers for long tables
- readable row height
- action buttons aligned consistently
- no color-only status

### Charts

Rules:

- label axes clearly
- avoid relying only on color
- include tooltip and table fallback
- keep chart density controlled
- show source and last updated
- use gold/green/red sparingly for semantic meaning

---

## 8. Transparency rules

Glass panels are allowed only when:

- text contrast remains WCAG AA
- panel has visible border/elevation
- background is calm enough
- important controls are opaque enough

Recommended opacity:

| Surface | Opacity |
| --- | --- |
| critical action cards | 90-100% |
| data/KPI cards | 82-94% |
| decorative shells | 50-75% |
| modal foreground | 95-100% |
| modal scrim | 40-60% black |

If readability drops, increase opacity. Data clarity beats decoration.

---

## 9. Responsive layout

Breakpoints:

```text
mobile: 375px
tablet: 768px
desktop: 1024px
wide: 1440px
command-wall: 1920px+
```

Rules:

- mobile-first
- no horizontal scroll
- primary actions stay reachable
- right rail becomes bottom sheet on mobile
- dashboards convert from grid to stacked cards
- tables become cards or horizontally scrollable only when unavoidable
- keep 44x44px minimum touch targets

---

## 10. Motion

Motion should express state and hierarchy.

Use:

- 150-300ms micro-interactions
- opacity/transform animations
- subtle loading states
- skeletons for longer loads
- pulsing only for live/recording/online indicators

Avoid:

- layout-shifting animation
- slow decorative animation
- excessive parallax
- animations that block input

Always respect reduced-motion settings.

---

## 11. Accessibility

Required:

- primary text contrast >= 4.5:1
- secondary text contrast >= 3:1
- visible focus states
- keyboard navigation
- ARIA labels for icon-only buttons
- semantic buttons/links
- chart table alternatives
- color not the only indicator
- reduced motion support
- responsive text without layout breakage

No dashboard is complete until it passes accessibility review.

---

## 12. Platform-specific standards

### Desktop

- dense but not cramped
- keyboard shortcuts
- resizable panels
- persistent left navigation
- optional right approval rail
- command palette

### Mobile

- pocket cockpit, not full wall dashboard
- bottom navigation with max 5 primary items
- approval-first UX
- voice command button reachable
- meeting recorder prominent
- large touch targets

### Web War Room

- single pane of glass
- dashboard-first
- privacy toggle always visible
- live status and clock visible on desktop

---

## 13. Pre-delivery checklist

Before shipping any Command OS UI:

- [ ] information hierarchy is obvious in 5 seconds
- [ ] panels are transparent only where still readable
- [ ] spacing follows 4/8px rhythm
- [ ] typography follows War Room hierarchy
- [ ] primary action is clear
- [ ] loading/empty/error states exist
- [ ] privacy toggle masks sensitive values
- [ ] all charts have labels and table fallback
- [ ] mobile layout is usable
- [ ] keyboard navigation works
- [ ] reduced motion works
- [ ] no emojis are used as structural icons
- [ ] no raw hardcoded colors where semantic tokens exist

---

## 14. First implementation targets

Apply this standard first to:

1. Command Center tab
2. Device Mesh tab
3. Meeting Memory tab
4. Daily Routines tab
5. Finance/CashClaw dashboard
6. Rocket.Chat bridge
7. Mobile approval cockpit

