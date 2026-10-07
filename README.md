# John Angelo Vasquez — Portfolio

A premium, dark-themed personal portfolio for a **Web Developer & Designer**,
built as a static site ready for **GitHub Pages**. No build step, no backend,
no heavy dependencies — just HTML, CSS, and vanilla JavaScript.

## Preview

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
portfolio/
├── index.html                 # All page content and sections
├── assets/
│   ├── css/
│   │   └── main.css           # Full design system (dark / charcoal / orange)
│   ├── js/
│   │   └── main.js            # Nav, reveal animations, GitHub stats
│   ├── img/
│   │   ├── project-capstone.webp
│   │   ├── project-attendance.webp
│   │   ├── project-funnel.webp
│   │   └── project-valentine.webp
│   └── files/
│       └── John-Angelo-Vasquez-CV.pdf   # Linked from "Download CV"
└── README.md
```

## Customizing

### Replace the portrait placeholder
The hero shows a styled `JV` monogram as a clearly-marked placeholder.
To use a real photo:

1. Add your photo as `assets/img/portrait.jpg` (square works best, ~800×1000).
2. In `index.html`, find the `.portrait-frame` block and replace the
   `.portrait-inner` div with:
   ```html
   <img src="assets/img/portrait.jpg" alt="Portrait of John Angelo Vasquez" class="portrait-photo">
   ```
3. Add this to `assets/css/main.css`:
   ```css
   .portrait-photo { width: 100%; height: 100%; object-fit: cover; }
   ```

### Add or update a project
Each project is an `<article class="project">` in `index.html`. Copy one block,
swap the image in `assets/img/`, title, description, tech tags, category, and links.
Project images work best at 1200×800 or larger.

### Update social links
Search `index.html` for `TODO` and `#` placeholder links:
- **LinkedIn** appears in the Contact section and footer — replace both `#`
  hrefs with your profile URL.
- Email, phone, and GitHub URL appear in Contact and footer.

### GitHub stats
The hero stats and GitHub section fetch live counts from
`https://api.github.com/users/gegelo070903`. If the API is unreachable, the
static fallback values in the markup are shown instead. To point the site at a
different GitHub username, update the username in `assets/js/main.js` and the
profile/repo links in `index.html`.

### Colors & typography
All design tokens live in `:root` at the top of `assets/css/main.css`
(`--accent` is the warm orange, `--bg` the page background).

## Deploying with GitHub Pages

**Option A — from this chat (already done if the repo exists):**
The repo was created and pushed directly. Enable Pages once:

1. On GitHub, open the repo → **Settings → Pages**.
2. Under *Build and deployment*, set **Source** to **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. Your site goes live at `https://gegelo070903.github.io/portfolio/`.

**Option B — manual:**
1. Create a new public repository named `portfolio` on GitHub.
2. Upload the contents of this folder (or push via git).
3. Follow steps 1–3 of Option A.

## Notes

- No emojis are used anywhere in the site; icons are inline SVG.
- All personal details (experience, education, skills, contact) come from the
  owner's CV. Statistics shown are real, verified counts — nothing is fabricated.
- Animations respect `prefers-reduced-motion`.
