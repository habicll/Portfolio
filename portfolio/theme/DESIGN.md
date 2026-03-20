# Design System Document

## 1. Overview & Creative North Star: "The Obsidian Nexus"
The Creative North Star for this design system is **"The Obsidian Nexus."** It represents a shift away from the "flat web" toward a tactile, high-fidelity digital environment that feels like a high-end command interface. 

We break the "template" look by rejecting rigid, boxy layouts in favor of **Intentional Asymmetry** and **Atmospheric Depth**. Elements should feel like they are floating in a deep, pressurized vacuum, illuminated by internal light sources. Instead of standard grids, we use overlapping layers and "Light Leaks" (vibrant gradients) to guide the eye, creating an editorial experience that feels premium, cinematic, and profoundly technical.

---

## 2. Colors & Surface Philosophy
The palette is built on a foundation of obsidian blacks and charcoals, punctuated by high-energy luminescence.

### Palette Application
- **Base Layer:** `surface` (#131314) is your canvas.
- **Accents:** Use `primary_container` (#00f0ff) for "Neon Cyan" innovation highlights and `secondary_container` (#b600f8) for "Electric Violet" interactive depth.
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, use a background shift—for example, a `surface_container_low` section placed directly against the `surface` background.
- **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of dark glass.
    - An outer container uses `surface_container_low`.
    - An inner card or nested element uses `surface_container_high`.
    - This creates a "lift" through tonal shifts alone.
- **The "Glass & Gradient" Rule:** Floating elements must use Glassmorphism. Apply a background of `surface_variant` at 40% opacity with a `backdrop-filter: blur(20px)`. 
- **Signature Textures:** For Hero sections, use a subtle radial gradient: `radial-gradient(at top left, secondary_container 0%, surface 50%)`. This adds "soul" to the darkness.

---

## 3. Typography: The Industrial-Futurist Dialogue
The typography system relies on the contrast between the aggressive, wide stance of **Space Grotesk** and the precision of **Inter** (interpreted as a clean, technical mono-type feel in specific contexts).

- **Display & Headlines (Space Grotesk):** These are your "statements." Use `display-lg` for hero statements with tight letter-spacing (-0.02em). This conveys authority and innovation.
- **Body & Titles (Inter):** Used for narrative flow. `body-md` is the workhorse. It should feel invisible but perfectly legible.
- **Technical Labels (Space Grotesk Mono-style):** Use `label-md` for metadata, version numbers, or technical specs. This font represents the "code" behind the beauty.
- **Hierarchy Role:** The scale jump from `display-lg` (3.5rem) to `body-lg` (1rem) is intentional. It creates a high-contrast editorial feel that mirrors luxury fashion and tech journals.

---

## 4. Elevation & Depth
In this design system, shadows are light, and borders are invisible.

- **The Layering Principle:** Depth is achieved via **Tonal Layering**. Place `surface_container_lowest` (#0e0e0f) elements inside `surface_container_highest` (#353436) to create "wells" of content.
- **Ambient Shadows:** Shadows should be used sparingly. Use the `on_surface` color at 4% opacity with a blur of 40px and a spread of -10px. This creates an "atmospheric glow" rather than a drop shadow.
- **The "Ghost Border" Fallback:** If a container needs more definition, use a "Ghost Border": 1px stroke using `outline_variant` at 15% opacity.
- **Glow Borders:** For active states, use a 1px border with a `primary` (#dbfcff) to `primary_container` (#00f0ff) gradient. Apply a small `box-shadow` of the same color with a 15px blur to simulate a neon "emit" effect.

---

## 5. Components

### Buttons
- **Primary:** High-contrast. Background: `primary_container`. Text: `on_primary_fixed`. Shape: `md` (0.375rem).
- **Secondary (Glass):** `backdrop-filter: blur(12px)`. Background: `surface_variant` at 20% opacity. Border: Ghost Border (20% opacity).
- **Tertiary:** No background. `label-md` typography. On hover, a subtle `primary` underline expands from center.

### Chips & Metadata
- **Technical Chips:** Use `surface_container_highest` with `label-sm` text. These should look like hardware components. Use `0.25rem` (DEFAULT) roundedness.

### Input Fields
- **Sleek Fields:** Background: `surface_container_lowest`. No border. On focus, a "Glow Border" appears on the bottom edge only. 
- **Error States:** Use `error` (#ffb4ab) text and a subtle `error_container` glow behind the input.

### Cards & Lists
- **The "No-Divider" Rule:** Forbid the use of line dividers. Separate list items using `spacing-4` (1.4rem) and alternating `surface_container` subtle background shifts.
- **Glass Cards:** For featured portfolio pieces, use the Glassmorphism rule with a `secondary_container` (#b600f8) glow in the corner to highlight innovation.

### Interactive Progress Bars
- Use a `primary` to `secondary` gradient for progress. The "unfilled" portion should be `surface_container_highest`.

---

## 6. Do's and Don'ts

### Do:
- **Use "Breathing Room":** Use `spacing-16` and `spacing-24` to separate major content blocks. High-end design requires space to breathe.
- **Asymmetric Layouts:** Offset images or text blocks by `spacing-10` to break the standard vertical rhythm.
- **Subtle Motion:** Every interaction (hover, click, transition) must have a `300ms cubic-bezier(0.4, 0, 0.2, 1)` easing.

### Don't:
- **No Pure White:** Never use #FFFFFF. Always use `on_surface` (#e5e2e3) to maintain the cinematic, low-light aesthetic.
- **No 100% Opacity Borders:** Solid lines kill the "Obsidian" feel. If you need a line, it must be a "Ghost Border."
- **No Standard Shadows:** Avoid default black drop shadows. They look muddy on dark obsidian backgrounds. Use tinted ambient glows.
- **Don't Over-Glow:** If everything glows, nothing is important. Reserve "Glow Borders" for the most critical CTAs or active states.