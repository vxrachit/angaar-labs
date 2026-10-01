# The Angaar Labs Website

## W3Grads — Full Stack Vibe Coding Examination

The Angaar Labs Website is the official website of a modern web-development studio.

The project is designed as a premium, UI-first agency website that showcases the studio's capabilities, services, work, process, and creative approach.

The primary visual direction is bold, fiery, premium, and high-energy, using a dark-first visual system with ember orange, amber, and warm accent colors.

---

## Team

| Member | Primary Responsibility |
|---|---|
| Rachit Verma | Hero, Scene3D, Scroll Utility, UI Polish |
| Ritika Rawat | Work, Closing CTA, Footer |
| Ratan | Intro, Logo, Reveal, Embers |
| Sanvi Jain | Navbar, Marquee |
| Rajat Shukla | Services, Process |


---

## Project Goals

- Create a visually exceptional agency website.
- Present The Angaar Labs as a premium digital studio.
- Showcase services and portfolio work.
- Create detailed project and case-study experiences.
- Create a memorable hero experience.
- Use purposeful motion and interaction.
- Maintain a consistent design system.
- Provide responsive layouts from mobile to desktop.
- Maintain reusable React components.
- Follow accessibility and performance best practices.

---


## Frontend Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- GSAP
- Lenis
- Lucide Icons

---

## Frontend Architecture

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

Detailed architecture: `docs/architecture.md`

---

## Design Direction

The website follows an "angaari" visual direction:

- Dark
- Fiery
- Bold
- Premium
- High-energy
- Cinematic
- Modern

The visual system uses deep charcoal backgrounds with ember orange, flame orange, amber, and gold accents.

---

## Motion Direction

Motion is used to guide attention and create a memorable experience.

The website uses:

- Hero entrance animation
- Scroll reveals
- Staggered animations
- Hover interactions
- Marquee animation
- Smooth scrolling
- 3D interaction
- CTA interactions
- Section transitions

Animations should remain purposeful and should not negatively affect performance or usability.

---

## Responsive Design

The website is designed for:

- 360px mobile
- Mobile
- Tablet
- Laptop
- Desktop

Requirements:

- No horizontal overflow
- Responsive typography
- Responsive grids
- Mobile navigation
- Touch-friendly interactions
- Responsive 3D experience
- Responsive spacing
- Responsive imagery

---

## Accessibility

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Appropriate image alt text
- Sufficient contrast
- Reduced-motion support
- Accessible navigation

---

## Development Workflow

The team follows a feature-branch workflow.

```text
main
├── feature/intro
├── feature/navbar-marquee
├── feature/hero-3d
├── feature/services-process
├── feature/work-closing-footer
└── docs/frontend-documentation
```

Each member works through their own GitHub account.

Changes are grouped into meaningful commits and merged through Pull Requests.

---

## AI Development

AI coding tools were used as permitted by the examination rules.

Important prompts are documented in `PROMPTS.md`.

The frontend specification is documented in `SPEC.md`.

---

## Documentation

| File | Purpose |
|---|---|
| `SPEC.md` | Frontend project specification |
| `PROMPTS.md` | Important AI prompts |
| `docs/architecture.md` | Frontend architecture |
| `docs/design-system.md` | Design and motion system |
| `docs/testing.md` | Frontend testing checklist |
| `docs/team-contribution.md` | Team ownership and Git workflow |

---

## Project Status

### Core UI

- [x] Intro experience
- [x] Navigation
- [x] Hero
- [x] 3D experience
- [x] Services
- [x] Process
- [x] Work
- [x] Closing CTA
- [x] Footer
- [x] Responsive UI
- [x] Motion system

### Final Polish

- [x] UI consistency pass
- [x] Responsive improvements
- [x] Animation refinements
- [x] Asset organization

---

## License

This project was created as part of the W3Grads Full Stack Vibe Coding Examination.
