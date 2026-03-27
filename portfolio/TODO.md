# Golden Chronos — Fix & Feature TODO

## Bugs
- [x] 1. Projects disappearing on language switch — Fixed: `effect()` in projects.ts re-applies `.revealed` class when lang changes
- [x] 2. Timeline cards disappearing on language switch — Fixed: `effect()` in timeline.ts re-applies `.revealed` class when lang changes
- [x] 3. Timeline progress bar accuracy + diamond fill timing — Fixed: `isNodeFilled()` calculates per-node position, diamonds only fill when line reaches them

## Features
- [x] 4. Add photo (Habi.jpg) to home page identity section
- [x] 5. Add resume download button to home page + contact page
- [x] 6. Fix timeline dates & reorder chronologically (Feb 2026, Sep 2025, Jul-Aug 2025, 2023-2025, Oct 2024, 2019-2022)
- [x] 7. Top navbar hides on scroll (`.navbar-hidden` class with transition), only sidebar remains
- [x] 8. Sidebar labels: HOME / PROJECTS / TIMELINE / CONTACT (was IDENTITY/PORTFOLIO/CHRONOS/NEXUS)
- [x] 9. Simplify contact page wording — removed jargon (IDENTIFIER_NAME → YOUR NAME, SECURE_EMAIL → YOUR EMAIL, etc.)
- [x] 10. Remove "nexus" everywhere — replaced with "connection"/"touch" (0 occurrences remaining)
- [x] 11. Navbar: HABI logo → home, PROJECTS / TIMELINE / CONTACT links only (removed PORTFOLIO first link)

## Files Modified
- `translation.service.ts` — Full EN/FR translations updated, dates corrected, jargon removed
- `navbar.html` — Removed PORTFOLIO link, kept PROJECTS/TIMELINE/CONTACT
- `navbar.css` — Added `.navbar-hidden` transition class
- `timeline.html` — Updated button refs (downloadResume, getInTouch), added isNodeFilled
- `timeline.ts` — Fixed lang switch bug, reordered experiences, per-node progress calculation
- `timeline.css` — Diamond node fill animation tied to progress
- `projects.ts` — Fixed lang switch bug with effect() re-applying revealed class
- `home.html` — Added photo, resume button, simplified form labels
- `home.css` — Added photo wrapper + identity-actions styles
- `contact.html` — Removed "nexus" from status widget, added resume download link
- `app.html` — Sidebar labels updated to HOME/PROJECTS/TIMELINE/CONTACT
