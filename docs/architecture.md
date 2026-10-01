# Frontend Architecture

## Overview

The Angaar Labs frontend follows a component-based React architecture.

The goal is to keep major visual sections isolated, reusable, and easy for different team members to develop independently.

---

## Application Structure

```text
src/
├── components/
│   ├── Intro.tsx
│   ├── Logo.tsx
│   ├── Reveal.tsx
│   ├── Embers.tsx
│   ├── Navbar.tsx
│   ├── Marquee.tsx
│   ├── Hero.tsx
│   ├── Scene3D.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Work.tsx
│   ├── Closing.tsx
│   └── Footer.tsx
├── lib/
│   └── scroll.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Application Flow

```text
main.tsx
    ↓
 App.tsx
    ├── Intro
    ├── Navbar
    ├── Hero
    │    └── Scene3D
    ├── Marquee
    ├── Services
    ├── Process
    ├── Work
    ├── Closing
    └── Footer
```

---

## Component Responsibilities

### Intro

Controls the opening experience and initial transition into the website.

### Logo

Reusable brand and logo presentation.

### Reveal

Reusable reveal animation component for sections and content.

### Embers

Atmospheric visual effects supporting the fiery brand identity.

### Navbar

Global navigation and responsive mobile navigation.

### Marquee

Continuous animated content presentation.

### Hero

Main visual introduction of The Angaar Labs.

Responsible for typography, CTA layout, hero composition, and hero-level animation.

### Scene3D

Dedicated 3D visual experience.

Keeping the 3D implementation separate from Hero keeps layout and 3D rendering responsibilities isolated.

### Services

Displays the studio's primary services.

### Process

Communicates:

Discover → Design → Build → Launch

### Work

Displays portfolio projects and visual case-study entry points.

### Closing

Provides the final project/contact CTA.

### Footer

Provides global footer navigation and studio information.

---

## Shared Utilities

### lib/scroll.ts

Provides shared scroll-related behavior so individual components do not duplicate scroll logic.

---

## Styling

Global styling is maintained through:

`src/index.css`

The styling system defines colors, typography, spacing, global resets, responsive behavior, and animation-related styling.

---

## Architecture Principles

### Component Isolation

Each major website section has its own component.

### Reusability

Common behavior should be implemented through reusable components rather than duplicated code.

### Separation of Responsibilities

A component should primarily manage its own visual and interaction concerns.

### Shared Utilities

Cross-cutting functionality belongs in `lib/`.

### Consistent Motion

Animations should follow the same motion language across the website.

### Responsive First

Every component must account for mobile, tablet, and desktop layouts.
