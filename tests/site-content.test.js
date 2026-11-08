import { readdirSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '../js/projects-data.js';
import { siteConfig } from '../js/site-config.js';

describe('site content configuration', () => {
  it('presents the foundation story and its core initiatives', () => {
    const aboutPage = readFileSync(join(process.cwd(), 'about.html'), 'utf8');
    expect(aboutPage).toContain('fieldnotes-cover');
    expect(aboutPage).toContain('id="storyProjectSlideshow"');
    expect(aboutPage).not.toContain('data-story-slide=');
    expect(aboutPage).toContain('initializeStoryProjectSlideshow');
    expect(aboutPage).toContain('fieldnotes-origin');
    expect(aboutPage).toContain('fieldnotes-work__entries');
    expect(aboutPage).toContain('fieldnotes-values__list');
    expect(aboutPage).toContain('fieldnotes-future');
    const styles = readFileSync(join(process.cwd(), 'css', 'style.css'), 'utf8');
    const mainScript = readFileSync(join(process.cwd(), 'js', 'main.js'), 'utf8');
    expect(styles).toContain('.fieldnote-entry:hover figure img');
    expect(styles).toContain('.fieldnotes-cover__photo img');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(mainScript).toContain("'.fieldnote-entry'");
    expect(aboutPage).toContain('Established in 2021');
    expect(aboutPage).toContain('WATER & DAILY LIFE');
    expect(aboutPage).toContain('FOOD & NOURISHMENT');
    expect(aboutPage).toContain('FAITH & LEARNING');
    expect(aboutPage).toContain('donors whose generosity');
    expect(aboutPage).toContain('/assets/images/community_water_well_donation/12.jpeg');
    const contentPages = readFileSync(join(process.cwd(), 'js', 'content-pages.js'), 'utf8');
    expect(contentPages).toContain('export function initializeStoryProjectSlideshow()');
    expect(contentPages).toContain('project.images.map((src, index)');
    expect(contentPages).toContain('setTimeout(() => showSlide(slideIndex + 1), 3000)');
    expect(contentPages).toContain('reducedMotion.addEventListener(\'change\', scheduleAdvance)');
  });

  it('provides a destination for every primary navigation item', () => {
    expect(siteConfig.navigation.map(({ href }) => href)).toEqual([
      'index.html',
      'projects.html',
      'about.html',
      'contact.html',
    ]);
    expect(siteConfig.navigation.map(({ name }) => name)).toEqual([
      'Home',
      'Our Work',
      'Our Story',
      'Contact',
    ]);
  });

  it('uses the foundation identity and official palette', () => {
    expect(siteConfig.organization.name).toBe('Al Shehza Foundation');
    expect(siteConfig.theme).toMatchObject({
      primary: '#1E4653',
      accent: '#CD4E3C',
      accentLight: '#DC9C47',
      accentDark: '#C45A3E',
      warmIvory: '#F7F5EB',
    });
    expect(siteConfig.pages.home.stats[0].value).toBe('2021');
  });

  it('uses consistent, readable type across navigation and page copy', () => {
    const styles = readFileSync(join(process.cwd(), 'css', 'style.css'), 'utf8');
    expect(styles).toContain("--font-heading: 'Lora'");
    expect(styles).toContain("--font-body: 'DM Sans'");
    expect(styles).toContain('main p:not(.eyebrow):not(.work-card__eyebrow):not(.work-card__summary) { font-size: 15px;');
    expect(styles).toContain('.work-card__summary, main .work-card__content > p.work-card__summary { font-size: 16px;');
    expect(styles).toContain('.site-nav__link { font-size: 13px;');
    expect(styles).toContain('.site-footer__bottom { font-size: 11px;');
  });

  it('includes the approved Founder and President contact details', () => {
    expect(siteConfig.organization.email).toBe('alshehzafoundation@gmail.com');
    expect(siteConfig.pages.contact).toMatchObject({
      leaderRole: 'Founder & President',
      leaderName: 'S. Rismir',
      leaderPhone: '+94771415023',
      leaderEmail: 'sawahirrismir3@gmail.com',
    });
  });

  it('lists all seven community projects in order with descriptions', () => {
    expect(Object.keys(projects)).toEqual([
      'community-well',
      'tube-well-donations',
      'rice-bag-donations',
      'iftar-food-donations',
      'nutrient-yoghurt-donations',
      'qurban-programme',
      'quran-donations',
    ]);
    const entries = Object.values(projects);
    expect(entries).toHaveLength(7);
    expect(entries.map(project => project.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(entries.every(project => project.title && project.summary && project.sections.length > 0)).toBe(true);
    expect(entries.find(project => project.title === 'Qurban programme').images).toEqual([]);
    expect(entries.find(project => project.title === 'Quran donations').images).toEqual([]);
    expect(entries.find(project => project.title === 'Community well project').images[0]).toBe('/assets/images/community_water_well_donation/12.jpeg');
    expect(entries.find(project => project.title === 'Rice-bag donations').images[0]).toBe('/assets/images/rice_bag_donation/7.png');
    expect(entries.find(project => project.title === 'Iftar food donations').images[0]).toBe('/assets/images/iftar_food_donation/1.png');
    const homePage = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
    expect(homePage).toContain('homeProjectSlideshow');
    expect(homePage).toContain('initializeHeroProjectSlideshow');
    expect(homePage).not.toContain('homepageProjectPhotos');
    expect(Object.values(projects).flatMap(project => project.images)).toHaveLength(29);
    const projectsPage = readFileSync(join(process.cwd(), 'projects.html'), 'utf8');
    const contactPage = readFileSync(join(process.cwd(), 'contact.html'), 'utf8');
    const projectsScript = readFileSync(join(process.cwd(), 'js', 'projects-page.js'), 'utf8');
    expect(projectsPage).toContain('work-hero__collage');
    expect(projectsPage).not.toContain('page-intro__inner');
    expect(contactPage).toContain('contact-options__grid');
    expect(contactPage).toContain('mailto:alshehzafoundation@gmail.com');
    expect(contactPage).not.toContain('page-intro__inner');
    expect(projectsPage).not.toContain('projectModal');
    expect(projectsScript).toContain('work-carousel__arrow');
    expect(projectsScript).toContain('work-carousel__dot');
    expect(projectsScript).toContain('setTimeout(() => showImage(1), 4800)');
    expect(projectsScript).toMatch(/updateIndicators\(\);\s+scheduleAdvance\(\);/);
    expect(projectsScript).toContain('work-carousel__track');
    expect(projectsScript).toMatch(/firstImage\.classList\.add\('is-active'\);\s*firstImage\.src = project\.images\[0\];/);
    expect(projectsScript).toContain('dataset.direction');
    expect(projectsScript).not.toContain('is-changing');
    const styles = readFileSync(join(process.cwd(), 'css', 'style.css'), 'utf8');
    expect(styles).toContain('.work-carousel__track[data-direction="left"] .work-carousel__image.is-active.is-entering');
    expect(styles).toContain('.work-carousel__track[data-direction="right"] .work-carousel__image.is-active.is-entering');
    expect(styles).not.toContain('@keyframes work-carousel-arrive');
    expect(projectsScript).not.toContain('mouseenter');
    expect(projectsScript).toContain('project.sections.forEach');
  });

  it('assigns every project photo to exactly one project', () => {
    const declaredImages = Object.values(projects).flatMap(project => project.images).sort();
    const imageRoot = join(process.cwd(), 'public', 'assets', 'images');
    const actualImages = readdirSync(imageRoot, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && entry.name !== 'brand')
      .flatMap(directory => readdirSync(join(imageRoot, directory.name), { withFileTypes: true })
        .filter(entry => entry.isFile() && /\.(?:png|jpe?g)$/i.test(entry.name))
        .map(entry => `/assets/images/${directory.name}/${entry.name}`))
      .sort();
    expect(declaredImages).toEqual(actualImages);
  });
});
