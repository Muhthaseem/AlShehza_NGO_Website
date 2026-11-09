import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '../js/projects-data.js';
import { siteConfig } from '../js/site-config.js';

const read = path => readFileSync(join(process.cwd(), path), 'utf8');

describe('redesigned foundation website', () => {
  it('presents the foundation story with the approved history and initiatives', () => {
    const aboutPage = read('about.html');
    expect(aboutPage).toContain('id="origin"');
    expect(aboutPage).toContain('id="approach"');
    expect(aboutPage).toContain('id="values"');
    expect(aboutPage).toContain('id="purpose"');
    expect(aboutPage).toContain('id="storyProjectSlideshow"');
    expect(aboutPage).toContain('ESTABLISHED 2021');
    expect(aboutPage).toContain('WATER ACCESS');
    expect(aboutPage).toContain('FOOD & NOURISHMENT');
    expect(aboutPage).toContain('SEASONAL GIVING & LEARNING');
    expect(aboutPage).toContain('rice_bag_donation/8.png');
    expect(aboutPage).toContain('MISSION');
    expect(aboutPage).toContain('VISION');
    expect(aboutPage).toContain('WHO WE SERVE');
    expect(aboutPage).toContain('Al Shehza Foundation (Guarantee) Limited');
    expect(read('index.html')).toContain('water, food, nourishment, and learning');
    expect(read('js/content-pages.js')).toContain('export function initializeStoryProjectSlideshow()');
  });

  it('provides the four primary navigation destinations', () => {
    expect(siteConfig.navigation.map(({ href }) => href)).toEqual([
      'index.html', 'projects.html', 'about.html', 'contact.html',
    ]);
    expect(siteConfig.navigation.map(({ name }) => name)).toEqual([
      'Home', 'Our Work', 'Our Story', 'Contact',
    ]);
  });

  it('uses the foundation identity and established theme configuration', () => {
    expect(siteConfig.organization.name).toBe('Al Shehza Foundation');
    expect(siteConfig.theme).toMatchObject({
      primary: '#10120F',
      accent: '#D8F36A',
      accentLight: '#8293FF',
      accentDark: '#4056DD',
      warmIvory: '#F3F1E7',
    });
    expect(siteConfig.pages.home.stats[0].value).toBe('2021');
  });

  it('supports dark-by-default theming and responsive, reduced-motion layouts', () => {
    const styles = read('css/style.css');
    for (const page of ['index.html', 'projects.html', 'about.html', 'contact.html']) {
      expect(read(page)).toContain("localStorage.getItem('al-shehza-theme')");
      expect(read(page)).toContain('Skip to content');
    }
    expect(styles).toContain(':root{color-scheme:dark');
    expect(styles).toContain(':root[data-theme="light"]');
    expect(styles).toContain('@media(max-width:760px)');
    expect(styles).toContain('@media(max-width:480px)');
    expect(styles).toContain('@media(prefers-reduced-motion:reduce)');
    expect(styles).toContain('@keyframes orbit');
    expect(styles).toContain('.reveal.is-visible');
    expect(read('js/main.js')).toContain("'.purpose-wall__grid article'");
    expect(read('js/main.js')).toContain("event.key === 'Escape'");
  });

  it('includes the approved Founder and President contact details', () => {
    expect(siteConfig.organization.email).toBe('alshehzafoundation@gmail.com');
    expect(siteConfig.pages.contact).toMatchObject({
      leaderRole: 'Founder & President',
      leaderName: 'S. Rismir',
      leaderPhone: '+94771415023',
      leaderEmail: 'sawahirrismir3@gmail.com',
    });
    const contactPage = read('contact.html');
    expect(contactPage).toContain('mailto:alshehzafoundation@gmail.com');
    expect(contactPage).toContain('tel:+94771415023');
    expect(contactPage).toContain('mailto:sawahirrismir3@gmail.com');
    expect(contactPage).not.toContain('<form');
  });

  it('keeps all seven initiatives and their photo galleries available', () => {
    expect(Object.keys(projects)).toEqual([
      'community-well', 'tube-well-donations', 'rice-bag-donations',
      'iftar-food-donations', 'nutrient-yoghurt-donations', 'qurban-programme', 'quran-donations',
    ]);
    const entries = Object.values(projects);
    expect(entries).toHaveLength(7);
    expect(entries.map(project => project.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(entries.every(project => project.title && project.summary && project.sections.length)).toBe(true);
    expect(entries.find(project => project.title === 'Community well project').summary).toContain('mosques and madrasas');
    expect(entries.find(project => project.title === 'Rice donations for households').summary).toContain('households experiencing hardship');
    expect(entries.find(project => project.title === 'Qurban programme').images).toEqual([]);
    expect(entries.find(project => project.title === 'Quran donations').images).toEqual([]);
    expect(entries.flatMap(project => project.images)).toHaveLength(29);
    expect(read('index.html')).toContain('id="homepageFeaturedWork"');
    expect(read('projects.html')).toContain('id="projectGrid"');
    expect(read('projects.html')).toContain('id="projectFilters"');
    const projectScript = read('js/projects-page.js');
    expect(projectScript).toContain('work-carousel__dot');
    expect(projectScript).toContain('work-carousel__toggle');
    expect(projectScript).toContain('automatic photo rotation for ${project.title}');
    expect(projectScript).toContain('setTimeout(() => showImage(1), 3000)');
    expect(projectScript).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(projectScript).toContain('project.sections.forEach');
    expect(read('js/content-pages.js')).toContain('homepage photo rotation');
  });

  it('maps every project photo to an existing asset exactly once', () => {
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
