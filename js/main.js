import { siteConfig } from './site-config.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
});

function initNavbar() {
  const navbar = document.querySelector('.site-header');
  const menuButton = document.querySelector('.site-menu-button');
  const mobileMenu = document.querySelector('.site-mobile-menu');
  const scrollProgress = document.querySelector('.scroll-progress__fill');
  const backToTop = document.querySelector('.back-to-top');

  if (navbar) {
    let updateScheduled = false;
    const updateScrollUI = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableDistance > 0 ? Math.min(window.scrollY / scrollableDistance, 1) : 0;
      navbar.classList.toggle('is-scrolled', window.scrollY > 24);
      if (scrollProgress) scrollProgress.style.transform = `scaleX(${progress})`;
      if (backToTop) {
        const visible = window.scrollY > 420;
        backToTop.classList.toggle('is-visible', visible);
        backToTop.tabIndex = visible ? 0 : -1;
        backToTop.setAttribute('aria-hidden', String(!visible));
      }
      updateScheduled = false;
    };
    const scheduleScrollUI = () => {
      if (updateScheduled) return;
      updateScheduled = true;
      window.requestAnimationFrame(updateScrollUI);
    };
    updateScrollUI();
    window.addEventListener('scroll', scheduleScrollUI, { passive: true });
    window.addEventListener('resize', scheduleScrollUI, { passive: true });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  }

  if (menuButton && mobileMenu) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    };
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
  }
}

function initThemeToggle() {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;

  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    button.title = `Switch to ${dark ? 'light' : 'dark'} theme`;
    document.querySelectorAll('[data-theme-logo-light][data-theme-logo-dark]').forEach(image => {
      image.src = dark ? image.dataset.themeLogoDark : image.dataset.themeLogoLight;
    });
  };

  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  button.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem('al-shehza-theme', nextTheme);
    } catch {
      // The theme still works for this page when storage is unavailable.
    }
  });
}

function initScrollReveal() {
  const revealTargets = [
    '.journal-hero__copy',
    '.journal-hero__photo',
    '.manifesto__grid > *',
    '.pillar-card',
    '.home-feature-card',
    '.closing-banner__inner > *',
    '.index-hero__grid > *',
    '.work-card',
    '.story-cover__grid > *',
    '.origin-grid > *',
    '.purpose-wall__grid article',
    '.story-programme-list article',
    '.values-board__grid > *',
    '.contact-masthead__grid > *',
    '.founder-card > *',
    '.site-footer__inner > *',
  ];
  const reveals = document.querySelectorAll(revealTargets.join(','));
  const siblingIndexes = new Map();
  reveals.forEach(element => {
    const siblingIndex = siblingIndexes.get(element.parentElement) || 0;
    siblingIndexes.set(element.parentElement, siblingIndex + 1);
    element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 5) * 90}ms`);
    element.classList.add('reveal');
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || !reveals.length || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(element => observer.observe(element));
}

export function renderNavbar(activePage) {
  const logoLight = `${import.meta.env.BASE_URL}assets/images/brand/al-shehza-circle-dark.png`;
  const logoDark = `${import.meta.env.BASE_URL}assets/images/brand/al-shehza-circle-light.png`;
  const links = siteConfig.navigation.map(page =>
    `<a class="site-nav__link${page.href === activePage ? ' is-active' : ''}" href="${page.href}"${page.href === activePage ? ' aria-current="page"' : ''}>${page.name}</a>`
  ).join('');

  return `
    <header class="site-header">
      <div class="scroll-progress" aria-hidden="true"><span class="scroll-progress__fill"></span></div>
      <div class="site-header__inner">
        <a class="site-brand" href="index.html" aria-label="${siteConfig.organization.name} home">
          <img class="site-brand__logo" src="${logoDark}" data-theme-logo-light="${logoLight}" data-theme-logo-dark="${logoDark}" alt="">
          <span class="site-brand__name">${siteConfig.organization.name}<small>Care • Dignity • Hope</small></span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">${links}</nav>
        <button class="theme-toggle" type="button" aria-label="Switch to dark theme" aria-pressed="false" title="Switch to dark theme">
          <svg class="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>
          <svg class="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.8 8.8 0 0 1 8.8 3.5 8.8 8.8 0 1 0 20.5 15.2Z"></path></svg>
        </button>
        <button class="site-menu-button" type="button" aria-expanded="false" aria-controls="siteMobileMenu" aria-label="Toggle navigation">
          <span></span><span></span>
        </button>
      </div>
      <nav class="site-mobile-menu" id="siteMobileMenu" aria-label="Mobile navigation" hidden>${links}</nav>
    </header>
    <button class="back-to-top" type="button" aria-label="Back to top">
      <span aria-hidden="true">↑</span><small>Top</small>
    </button>`;
}

export function renderFooter() {
  const quickLinks = siteConfig.navigation.map(page =>
    `<a href="${page.href}">${page.name}</a>`
  ).join('');

  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <a class="site-brand site-brand--footer" href="index.html">
            <img class="site-brand__logo" src="${import.meta.env.BASE_URL}assets/images/brand/al-shehza-primary-light.png" alt="${siteConfig.organization.name}">
          </a>
          <p>${siteConfig.footer.description}</p>
        </div>
        <div class="site-footer__links"><h2>Explore</h2>${quickLinks}</div>
        <div class="site-footer__motto"><span>Our promise</span><p>${siteConfig.organization.slogan}</p></div>
      </div>
      <div class="site-footer__bottom">
        <span>© ${new Date().getFullYear()} ${siteConfig.organization.name}. ${siteConfig.footer.copyright}</span>
        <a href="contact.html">Leadership & contact</a>
      </div>
    </footer>`;
}

export function initializeSite(page) {
  document.documentElement.lang = siteConfig.language;
  const { headingFont, bodyFont, primary, primaryLight, primaryMedium, accent, accentLight, accentDark, warmIvory } = siteConfig.theme;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--font-heading', headingFont);
  rootStyle.setProperty('--font-body', bodyFont);
  rootStyle.setProperty('--clr-primary', primary);
  rootStyle.setProperty('--clr-primary-light', primaryLight);
  rootStyle.setProperty('--clr-primary-medium', primaryMedium);
  rootStyle.setProperty('--clr-gold', accent);
  rootStyle.setProperty('--clr-gold-light', accentLight);
  rootStyle.setProperty('--clr-gold-dark', accentDark);
  rootStyle.setProperty('--clr-off-white', warmIvory);
  rootStyle.setProperty('--grad-gold', `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`);
  rootStyle.setProperty('--grad-gold-text', `linear-gradient(135deg, ${accent}, ${accentLight})`);

  const navbar = document.getElementById('navbar-container');
  const footer = document.getElementById('footer-container');
  if (navbar) navbar.innerHTML = renderNavbar(page);
  initThemeToggle();
  if (footer) footer.innerHTML = renderFooter();

  const pageKey = page === 'index.html' ? 'home' : page.replace(/\.html$/, '');
  const pageConfig = siteConfig.pages[pageKey];
  if (pageConfig) {
    document.title = pageKey === 'home'
      ? siteConfig.organization.name
      : `${pageConfig.title} | ${siteConfig.organization.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageConfig.description);
  }
}
