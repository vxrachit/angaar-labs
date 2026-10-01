# The Angaar Labs — Frontend Specification

## 1. Project Overview

The Angaar Labs requires a flagship website for its web-development studio.

The website is a UI-first experience where visual design, motion, responsiveness, component architecture, and storytelling are major priorities.

The design should feel fiery, bold, high-energy, premium, and original.

---

## 2. Frontend Objectives

The frontend must:

1. Provide a visually exceptional user experience.
2. Maintain a consistent design system.
3. Use reusable React components.
4. Provide meaningful motion and interaction.
5. Work from 360px to desktop.
6. Avoid horizontal scrolling.
7. Maintain accessible interaction patterns.
8. Provide optimized visual assets.
9. Maintain smooth animation performance.
10. Provide a clear user journey from landing to contact.

---

## 3. Required Pages

### Home

- Hero
- Marquee
- Services Preview
- Industries
- Featured Work
- Why Us / Statistics
- Process
- Testimonial
- CTA
- Footer

### About

- Mission
- Values
- Capabilities
- Team
- Culture

### Story

The Story page presents the studio narrative through a visual storytelling experience.

### Work

Required industries:

- Real Estate
- Cafe / Restaurant
- Clothing
- Healthcare
- CRM
- E-commerce
- Other

### Work / Case Study

- Project title
- Hero visual
- Client / industry
- Problem
- Solution
- Visuals
- Technology
- Result
- Next project

### Services

- Web Design
- Web Development
- E-commerce
- CRM / Dashboards
- Branding
- Maintenance

### Contact

- Name
- Email
- Company
- Budget
- Service
- Message

---

## 4. Global Components

- Navbar
- Mobile navigation
- Footer
- Intro
- Logo
- Hero
- Project cards
- Service cards
- Marquee
- Reveal animation
- CTA
- Statistics
- Process
- 3D scene

---

## 5. Team Contribution

| Member | Components |
|---|---|
| Rachit Verma | Hero, Scene3D, Scroll |
| Ritika Rawat | Work, Closing, Footer |
| Ratan | Intro, Logo, Reveal, Embers |
| Sanvi Jain | Navbar, Marquee |
| Rajat Shukla | Services, Process |


---

## 6. Hero Requirements

The hero is the primary visual experience.

It should include:

- Large display typography
- Supporting message
- Primary CTA
- Secondary CTA
- Atmospheric visual layer
- Strong entrance animation
- 3D experience where applicable
- Scroll interaction

The hero should be original and should not resemble a generic AI-generated landing page.

---

## 7. Motion Requirements

Motion is used for:

- Entrance animations
- Scroll reveals
- Staggered elements
- Hover states
- Image movement
- Marquee
- Navigation transitions
- CTA interactions
- 3D interaction

Motion should support content hierarchy, remain smooth, avoid excessive animation, and respect `prefers-reduced-motion`.

---

## 8. Responsive Requirements

Minimum supported viewport: `360px`

The interface must support:

- Mobile
- Tablet
- Laptop
- Desktop

Requirements:

- No horizontal scrolling
- No clipped text
- No broken layouts
- Responsive typography
- Responsive grids
- Responsive navigation
- Touch-friendly controls
- Responsive animations
- Responsive 3D scene

---

## 9. Design Tokens

### Colors

| Token | Value |
|---|---|
| Background | `#0C0A09` |
| Surface | `#1A1614` |
| Ember | `#F2660A` |
| Flame | `#FF8A1E` |
| Gold | `#FACC15` |
| Muted | `#A8A29E` |
| Foreground | `#F5F5F4` |
| Deep Accent | `#7C2D12` |

### Spacing

Use an 8-point spacing rhythm:

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

### Radius

`8px, 16px, 24px`

---

## 11. Frontend Folder Structure

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
