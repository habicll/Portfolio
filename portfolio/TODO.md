# Theme Migration TODO

- [x] Gather info (read all relevant files)
- [x] Confirm plan with user
- [x] Update `portfolio/src/styles.css` with new theme tokens + legacy aliases + `.dark` variant
- [x] Add `class="dark"` to `<html>` in `portfolio/src/index.html`
- [x] Update `portfolio/src/app/app.css` raw rgbas
- [x] Update `portfolio/src/app/pages/navbar/navbar.css` raw rgbas
- [x] Update `portfolio/src/app/pages/home/home.css` raw rgbas
- [x] Update `portfolio/src/app/pages/timeline/timeline.css` raw rgbas
- [x] Update `portfolio/src/app/pages/projects/projects.css` raw rgbas
- [x] Update `portfolio/src/app/pages/contact/contact.css` raw rgbas
- [x] Update `portfolio/src/app/pages/home/home.ts` canvas / spotlight colors
- [x] Update `portfolio/src/app/pages/projects/projects.ts` spotlight color
- [x] Verify build / run

## Result
- `ng build` succeeded (494.74 kB bundle)
- Preview server verified at http://localhost:4300
- New warm brown/cream tokens (`--primary: #ffe0c2`, `--background: #111111`) applied throughout
- Legacy `--gold`, `--bg-*`, `--text-*` aliases preserved → no component CSS needed rewriting logic
- Dynamic canvas / spotlight colors read `--primary-rgb` CSS variable at runtime
