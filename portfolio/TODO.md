# TODO — Warm Brown/Cream Theme Migration

## Phase 1 — Token system
- [ ] Replace `:root` block in `src/styles.css` with user-provided light semantic tokens.
- [ ] Add `.dark` block with user-provided dark semantic tokens.
- [ ] Add legacy compatibility layer (map `--gold`, `--bg-primary`, `--text-*`, `--border-*`, `--bg-card`, etc. to the new semantic tokens) in both `:root` and `.dark`.
- [ ] Update `::selection`, scrollbar, selection highlights to use `var(--primary)`.
- [ ] Add `class="dark"` to `<html>` in `src/index.html`.

## Phase 2 — Purge hardcoded gold/bg rgba from component CSS
- [ ] `src/app/pages/navbar/navbar.css` — replace `rgba(201,168,76,…)` and `rgba(5,5,5,…)`.
- [ ] `src/app/pages/timeline/timeline.css` — replace `rgba(201,168,76,…)`.
- [ ] `src/app/pages/projects/projects.css` — replace `rgba(5,5,5,…)`.
- [ ] `src/app/pages/contact/contact.css` — replace `rgba(201,168,76,0.03)` watermark.
- [ ] `src/app/pages/home/home.css` — change all hero backgrounds to `transparent`, remove `var(--bg-primary)` where it would cover the dot-matrix bg.

## Phase 3 — CPU / background visual bridge
- [ ] Reduce CPU size (cap via max-width on `.hero-cpu-wrapper` SVG).
- [ ] Shrink line-start circle markers to match the 6px background dots.
- [ ] Make CPU marker fill use the same white-ish color as the bg dots so they visually connect.

## Phase 4 — Verify
- [ ] `ng build` with no errors.
- [ ] Visual test `/`, `/projects`, `/timeline`, `/contact` in browser.
