# Design System Document: The Luminal Obsidian Aesthetic

## 1. Overview & Creative North Star
**Creative North Star: The Celestial Navigator**

This design system is a rejection of the "flat web." It treats the user interface as a high-end digital cockpit—a dark, expansive void where information is not just displayed but "illuminated." Inspired by the precision of premium fintech and aerospace telemetry, the system breaks away from standard grid-heavy layouts by using **intentional asymmetry**, **floating glass layers**, and **light-driven boundaries**.

The experience should feel curated, quiet, and powerful. We achieve this by moving away from traditional structural elements (like solid borders and heavy fills) in favor of high-contrast typography and razor-thin "Glow Strips" that guide the eye through an obsidian-dark space.

---

## 2. Colors
Our palette is rooted in the depth of `background: #0a0e19`. Colors are not used to fill space; they are used to define light sources within the darkness.

### Surface Hierarchy & Nesting
Traditional UI uses borders; this system uses **Tonal Tiering**. Depth is created by nesting containers with increasing "luminosity" or shifts in depth:
- **Base Layer:** `surface` (#0a0e19) – The infinite void.
- **Secondary Sectioning:** `surface-container-low` (#0f131f) – Subtle shifts to define large content areas.
- **Active Cards/Modals:** `surface-container-high` (#1a1f2e) – Provides a physical sense of "lift."

### The "No-Line" Rule
**1px solid borders are strictly prohibited for sectioning.** 
Boundaries must be defined by background shifts or the **Glow Strip** technique. If a visual break is required, use a `surface-container` shift or a 10% opacity `outline-variant` as a "Ghost Border."

### The "Glass & Gradient" Rule
Floating elements should utilize Glassmorphism. 
- **Effect:** `surface-container-highest` (#202535) at 40-60% opacity with a `backdrop-blur` of 20px-40px.
- **Signature Textures:** Use a subtle linear gradient on primary CTAs transitioning from `primary` (#aca3ff) to `primary-dim` (#6f5fea). This creates a sense of "active gas" rather than a flat plastic button.

---

## 3. Typography
We utilize a high-contrast pairing of **Manrope** (for structural authority) and **Inter** (for functional clarity).

- **Display (Manrope):** Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments. The goal is editorial impact—treat text as a graphic element.
- **Headlines (Manrope):** `headline-md` (1.75rem) should be used sparingly to anchor new sections.
- **Titles & Body (Inter):** `title-md` (1.125rem) and `body-lg` (1rem) provide the functional legibility required for complex data. 
- **The Contrast Principle:** Always pair `on-background` (#e8eafb) text against the deep obsidian surfaces. For secondary information, drop to `on-surface-variant` (#a7aaba), but never lower, to maintain a premium, high-legibility feel.

---

## 4. Elevation & Depth
Elevation is achieved through light and layering, mimicking how light behaves in a physical vacuum.

- **The Layering Principle:** Stack `surface-container-lowest` cards on `surface-container-low` sections. This creates a soft, natural lift without the "muddy" look of standard shadows.
- **Ambient Shadows:** When a pill or card is truly "floating," use an extra-diffused shadow. 
    - **Shadow Color:** A tinted version of `primary` (#aca3ff) at 5% opacity. 
    - **Blur:** 40px to 80px.
- **The Glow Strip:** This is the signature of the system. For active states or "hero" containers, apply a 1px inner-border (or box-shadow) using `secondary` (#00d2ff) or `primary` (#aca3ff) that only appears on the top or left edge, simulating a light source hitting a glass edge.

---

## 5. Components

### Buttons
- **Primary:** Pill-shaped (`rounded-full`). Background is a gradient of `primary` to `primary-container`. Text is `on-primary` (#27009a).
- **Secondary (The Glass Button):** Pill-shaped. Semi-transparent `surface-container-high` with a 20% opacity `outline-variant` Ghost Border and `backdrop-blur`.
- **States:** On hover, increase the intensity of the "Glow Strip" (inner box-shadow) rather than changing the background color.

### Floating Pill Navigation
As seen in the reference, navigation should be a floating `surface-container-lowest` pill. Use `rounded-full` and a deep ambient shadow. The active state is indicated by a "Glow Strip" around the icon or label.

### Input Fields
- **Container:** `surface-container-low`.
- **Border:** No visible border in resting state.
- **Active State:** A thin, `secondary` (#00d2ff) Glow Strip appears on the bottom edge or as a subtle outer glow.
- **Typography:** Use `label-md` for helper text, positioned with a `3` (1rem) spacing unit from the input.

### Cards & Lists
- **Rule:** Forbid divider lines. 
- **Separation:** Use vertical white space (`spacing-6` or `spacing-8`) and subtle background shifts (`surface-container-low` vs `surface-container-high`).
- **Interaction:** Cards should "glow" on hover, increasing the opacity of their Glassmorphism layer.

---

## 6. Do's and Don'ts

### Do:
- **Do** use intentional asymmetry. Allow elements to overlap slightly to create depth.
- **Do** lean into "Floating" logic. Treat the screen as a 3D space where the background is infinitely deep.
- **Do** use the Spacing Scale rigorously. High-end design lives in the precision of its margins (use `12` or `16` for page gutters).

### Don't:
- **Don't** use 100% white (#FFFFFF). Always use `on-background` (#e8eafb) to prevent harsh eye strain and maintain the "Obsidian" tone.
- **Don't** use standard "drop shadows" (black, high-opacity). They look "dirty" on deep obsidian. Use tinted, low-opacity ambient glows.
- **Don't** fill containers with heavy, solid colors. This system is about light and transparency; heavy fills kill the "glass" illusion.
- **Don't** use sharp corners. Every container must follow the Roundedness Scale, favoring `md` (1.5rem) and `full` (9999px) to maintain the organic, liquid feel of the brand.