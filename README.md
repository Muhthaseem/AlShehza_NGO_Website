# Al Shehza Foundation Website

The official public website for **Al Shehza Foundation (Guarantee) Limited**, a non-profit established in 2021. The site introduces the foundation, shares its community programs, and provides public contact information.

This is a responsive, multi-page static website built with HTML, CSS, vanilla JavaScript, and Vite. It has no application server, database, or user account system.

## Website pages

The main navigation is ordered as follows:

1. **Home** (`index.html`) — Foundation introduction, project-photo slideshow, program pillars, and links to the rest of the site.
2. **Our Work** (`projects.html`) — Seven project profiles covering community wells, tube wells, rice donations, iftar meals, children’s yoghurt donations, Qurban, and Quran donations.
3. **Our Story** (`about.html`) — The foundation’s purpose, approach, community programs, values, and vision.
4. **Contact** (`contact.html`) — Founder and President details and the foundation’s contact links.

The Our Work page includes per-project photo carousels where photos are available. Carousels can advance automatically or be controlled with the on-screen arrows, indicator buttons, keyboard arrow keys, and a pause/play button. Automatic movement pauses when a carousel is out of view, the browser tab is hidden, or reduced motion is enabled. Qurban and Quran profiles currently use illustrations because project photos have not been supplied.

The homepage slideshow uses supplied project photographs and includes a pause/play control. Motion effects throughout the site respect the operating system’s reduced-motion preference.

## Technology

- HTML5 multi-page entry points
- CSS, including responsive layouts, shared brand tokens, transitions, and reduced-motion styles
- Vanilla JavaScript ES modules
- Vite for local development and production builds
- Vitest for content and asset-mapping tests
- `gh-pages` for the optional `gh-pages` branch deployment script

## Brand palette

| Color | Use | Hex |
|---|---|---|
| Deep Teal | Typography and dark elements | `#1E4653` |
| Coral Red | Primary accent | `#CD4E3C` |
| Mustard Gold | Foliage and highlights | `#DC9C47` |
| Burnt Orange | Secondary accent | `#C45A3E` |
| Warm Ivory | Main background | `#F7F5EB` |

The shared palette and organization settings are maintained in `js/site-config.js` and reflected in the design tokens in `css/style.css`. Deep Teal is used for most text and controls. Contrast-safe supporting shades (`#AD4030`, `#E3B66C`, and `#173B46`) are used for small accent text on ivory, teal, and gold surfaces where the official brand colors do not provide sufficient contrast.

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)

Use a supported Node.js LTS release for local development and deployment.

## Getting started

Clone the repository, open its root directory, and install the locked dependencies:

```sh
npm ci
```

Start the local development server:

```sh
npm run dev
```

Vite prints the local URL in the terminal. Use `Ctrl+C` to stop the server.

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm test` | Run the Vitest suite once. |
| `npm run build` | Create the optimized production website in `dist/`. |
| `npm run preview` | Serve the production build locally for a final check. Run `npm run build` first. |
| `npm run deploy` | Build the site and publish `dist/` to the `gh-pages` branch using `gh-pages`. |

Before publishing, run:

```sh
npm test
npm run build
npm run preview
```

Check all four pages, links, project photos, carousels, mobile layouts, and browser console output in the preview.

## Project structure

```text
.
├── index.html                 Home page
├── projects.html              Our Work page
├── about.html                 Our Story page
├── contact.html               Contact page
├── css/
│   └── style.css              Shared styles, design tokens, responsive layouts, and motion
├── js/
│   ├── main.js                Shared navigation, footer, scroll UI, and scroll reveals
│   ├── site-config.js         Organization identity, palette, page copy, and navigation order
│   ├── content-pages.js       Homepage content and project-photo slideshow
│   ├── projects-data.js       Project descriptions and image lists
│   └── projects-page.js       Project cards and accessible photo carousels
├── public/
│   └── assets/images/
│       ├── brand/             Foundation logo variants
│       ├── community_water_well_donation/
│       ├── tube_well_donation/
│       ├── rice_bag_donation/
│       ├── iftar_food_donation/
│       └── nutrient_yoghurt_donation/
├── docs/
│   └── CONTENT_GUIDE.md       Guidance for maintaining website content
├── tests/
│   └── site-content.test.js   Content, navigation, and image-mapping checks
├── package.json               Scripts and development dependencies
├── package-lock.json          Reproducible npm dependency versions
└── vite.config.js             Multi-page Vite build configuration
```

`dist/` is generated by Vite and should not be edited by hand. The project’s `.gitignore` excludes it from the main source branch.

## Updating content and photographs

- Update the name, palette, navigation, and shared homepage copy in `js/site-config.js`.
- Update program summaries, detail text, and project image lists in `js/projects-data.js`.
- Update page structure or page-specific wording in the corresponding HTML file.
- Update presentation and responsive behavior in `css/style.css`.
- Keep image files in `public/assets/images/` and refer to them in source using `/assets/images/...` paths.
- Run `npm test` after editing program data. The tests verify that declared project images map to the supplied project image files.
- Read [the content guide](./docs/CONTENT_GUIDE.md) for additional content-maintenance details.

The project currently has 29 supplied project photographs. Qurban and Quran initiatives do not yet have project photos. Do not add made-up locations, beneficiary counts, dates, impact statistics, or outcomes. Only publish organization and leadership details that have been approved for public display.

Project detail copy in `js/projects-data.js` supports reviewed HTML in its section content. Treat this as trusted source code: do not insert untrusted or user-submitted HTML.

## Deployment

### GitHub Pages at a domain root

The current Vite configuration uses `base: '/'`, and page styles, scripts, navigation, and images use root-relative paths. This works when the site is served from the domain root, such as a GitHub Pages user/organization site or a custom domain configured at the root.

After setting up the repository and GitHub Pages permissions, run:

```sh
npm run deploy
```

This builds the site and uses `gh-pages` to publish the generated `dist/` directory to the `gh-pages` branch. The command requires a Git remote and credentials with permission to push to the repository.

### GitHub Pages project subpath or another host

A project site served from a path such as `https://example.github.io/repository-name/` needs more than a Vite `base` change: the HTML and JavaScript currently use root-relative URLs for assets and page navigation. Before deploying to a subpath, make the Vite base and all application URLs compatible with that subpath, then verify every route and asset in a production preview. Configure the equivalent base path for any other host that serves the site below a domain root.

## Public-repository and privacy notes

- Never commit passwords, tokens, private keys, `.env` files, or other credentials. `.gitignore` excludes common environment files; keep that protection in place.
- The site is static and contains no server-side form handler. Contact actions link to the public contact channels shown on the Contact page.
- Review all names, email addresses, phone numbers, photographs, and photo permissions before making a repository or deployment public. Do not add private personal data or information about beneficiaries without explicit approval.
- Do not publish unverified claims, statistics, or sensitive community information.
- No open-source license is currently specified. Add a license approved by the foundation before granting permission to reuse the source or its assets; a public repository alone does not grant reuse rights.
