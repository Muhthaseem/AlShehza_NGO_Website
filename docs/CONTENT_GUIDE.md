# Website Content Guide

This site is a static HTML, CSS, and JavaScript website built with Vite. Make changes to source files; `dist/` is generated output and should not be edited by hand.

## Where content lives

| Content | Source |
|---|---|
| Foundation identity, palette, navigation order, shared copy, and homepage content | [`js/site-config.js`](../js/site-config.js) |
| Project titles, summaries, detail sections, and image lists | [`js/projects-data.js`](../js/projects-data.js) |
| Home page structure and fixed copy | [`index.html`](../index.html) |
| Our Work page structure | [`projects.html`](../projects.html) |
| Our Story page structure and copy | [`about.html`](../about.html) |
| Founder & President information and foundation contact links | [`contact.html`](../contact.html) |
| Shared styles, layout, typography, and animation | [`css/style.css`](../css/style.css) |

Primary navigation is configured in `js/site-config.js` in this order: Home, Our Work, Our Story, Contact. Shared navigation and footer markup are rendered in `js/main.js`.

## Brand colors

The field-journal digital palette is defined in `js/site-config.js`; the light and dark theme values are maintained in `css/style.css`. Foundation logo artwork keeps its original colors.

| Color | Hex |
|---|---|
| Charcoal | `#10120F` |
| Acid lime | `#D8F36A` |
| Cobalt | `#8293FF` |
| Warm paper | `#F3F1E7` |

The site uses light and dark theme tokens in `css/style.css`, informed by the foundation palette. When changing the brand palette, update the configuration and both theme tokens together, then check color contrast in each theme.

## Foundation information and public details

Update the `organization`, `theme`, `navigation`, and page content in `js/site-config.js`. The Founder & President profile and contact links are in `contact.html`.

Before publishing a change, confirm that names, contact details, photographs, permissions, and organization claims are approved for public use. Keep claims evidence-based; do not invent impact totals, beneficiary counts, dates, locations, or outcomes. Do not add private details about staff, donors, or beneficiaries.

## Project content and images

Projects are entries in the `projects` object in `js/projects-data.js`. Each entry includes an order, category, title, summary, image paths, and detail sections.

The seven current initiatives are:

1. Community well project
2. Tube well donations
3. Rice donations for households
4. Iftar food donations
5. Nutrient-rich yoghurt donations
6. Qurban programme
7. Quran donations

Project photos are stored in `public/assets/images/` by initiative. Use root-relative public paths such as `/assets/images/community_water_well_donation/12.jpeg` in source code. The home page cycles through the available project photos. On Our Work, project carousels support automatic rotation, photo dots, keyboard arrows, and touch swipes. Automatic rotation pauses when the carousel is not visible, when the browser tab is hidden, or when reduced motion is enabled.

Qurban and Quran donations currently do not have project photographs. Their carousel area uses a branded placeholder. Add images only after they are approved, then add their paths to the correct project in `js/projects-data.js`.

Project detail section content is rendered as HTML. Only use reviewed, trusted markup from source; never put untrusted or user-submitted HTML in `sections[].content`.

## Local checks

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Run the tests and production build before publishing. The content tests check navigation, approved site content, and that project image declarations match the available project photographs.
