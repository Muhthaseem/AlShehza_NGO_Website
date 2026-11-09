# Al Shehza Foundation — Design Reset

## Objective

Create a visually distinct, complete redesign of the four-page foundation website. The design should feel like a contemporary community field journal: direct, confident, image-led, and informative. Keep the existing static HTML, CSS, vanilla JavaScript, Vite, project photography, verified programme details, contact information, theme switch, and GitHub Pages deployment.

## Visual system

- Use a graphic, high-contrast palette: near-black and warm white foundations, acid-lime highlights, and cobalt-blue section fields. Keep the existing dark-mode default and saved user preference.
- Use bold geometric sans-serif typography with compact monospace labels for programme categories, issue marks, section numbers, and photo captions. Avoid the previous serif-led visual language.
- Use asymmetric grids, full-width color fields, indexed programme rows, large typographic statements, and documentary photographs. Keep borders crisp and shadows minimal.
- Use purposeful motion: short reveals, photo dissolves, and restrained rotating graphic marks. Keep the content readable without motion and honor `prefers-reduced-motion`.

## Page plans

### Home (`index.html`)

- Lead with the foundation’s community-support purpose and established year.
- Pair a large statement with an automatically advancing project photograph, caption, and user-controlled pause/resume.
- Show the four work themes in a compact service ribbon, then explain the foundation’s purpose, present linked programme pillars, and show selected project dispatches.
- End with a clear contact invitation. Do not add unsupported statistics or an unconfigured donation flow.

### Our Work (`projects.html`)

- Introduce the seven current initiatives as a programme index.
- Present each initiative as a horizontal, alternating image-and-copy entry with its accurate category, summary, photo gallery where available, and expandable details.
- Keep category filters, active filter state, results announcement, photo dots, keyboard and touch navigation, and gallery pause/resume. Automatically rotate only while visible, and stop rotation for reduced-motion preferences.
- Label Qurban and Quran artwork as illustrative placeholders until photographs are supplied.

### Our Story (`about.html`)

- Explain the 2021 founding, purpose, people the programmes serve, mission, vision, current initiatives, and guiding values.
- Use a documentary image cover, persistent section index, an explicit purpose panel, programme summaries, and a bold values section.
- Keep mission and vision language clearly aspirational and avoid adding legal, geographic, operational, or impact claims without approved source material.

### Contact (`contact.html`)

- Make the foundation email immediately visible for programme, community, collaboration, and general enquiries.
- Show the Founder and President’s approved name, role, phone, and email in a direct contact directory.
- Keep the contact paths tap-friendly and do not imply that a web form or donation service exists.

## Shared experience

- Build a compact header with theme-aware brand mark, active page state, keyboard-operable mobile menu, and theme toggle.
- Use a clear shared footer with organization information and primary navigation.
- Keep skip links, visible focus, semantic headings, descriptive image text, and reduced-motion behavior throughout.
- Use `BASE_URL`-aware assets and keep repository subpath builds compatible with GitHub Pages.

## Responsive rules

- Use narrow-screen-first decisions and validate layouts at 320, 360, 390, 768, 1024, and wide desktop widths.
- Collapse multi-column compositions into readable stacked layouts; preserve photo subjects, readable type, non-overlapping navigation controls, and touch-sized targets.
- Check both themes, landscape layouts, keyboard navigation, reduced motion, and horizontal overflow.

## Delivery sequence

1. Lock the visual concept and page structures; inventory approved content and supplied images.
2. Replace the global styles and page markup with the field-journal system.
3. Refit shared navigation, theme-aware logos, page interactions, galleries, and mobile behavior.
4. Check content accuracy, asset paths, links, responsive states, and accessible controls.
5. Run the existing content tests and a GitHub Pages base-path production build; review the output before any merge or publication.

## Completion checklist

- All four pages use the new field-journal visual system and distinct page compositions.
- Existing verified NGO details, all seven programmes, available photos, and approved contact information remain intact.
- Dark mode remains the default, the theme choice persists, and reduced-motion preferences disable automatic motion.
- Navigation, filters, galleries, footer links, and contact links work on desktop and mobile.
- Tests and the GitHub Pages project-path build pass.
- No merge, push, or deployment occurs without a separate request.
