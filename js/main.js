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
      if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 420);
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
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }
}

function initScrollReveal() {
  const revealTargets = [
    '.home-hero__copy',
    '.home-hero__art',
    '.hero-bottom',
    '.stat-card',
    '.intro-layout > *',
    '.section-heading',
    '.pillar-card',
    '.home-cta__inner > *',
    '.page-intro__inner > *',
    '.story-layout > *',
    '.value-card',
    '.approach-layout > *',
    '.work-section__heading',
    '.work-card',
    '.work-note__inner > *',
    '.leadership-layout > *',
    '.leader-card',
    '.fieldnotes-cover__panel',
    '.fieldnotes-cover__photo',
    '.fieldnotes-origin__marker',
    '.fieldnotes-origin__copy',
    '.fieldnotes-work__heading',
    '.fieldnote-entry',
    '.fieldnotes-values__intro',
    '.fieldnotes-values__list article',
    '.fieldnotes-future__inner > *',
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

  if (!reveals.length || !('IntersectionObserver' in window)) {
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
  const links = siteConfig.navigation.map(page =>
    `<a class="site-nav__link${page.href === activePage ? ' is-active' : ''}" href="${page.href}">${page.name}</a>`
  ).join('');

  return `
    <header class="site-header">
      <div class="scroll-progress" aria-hidden="true"><span class="scroll-progress__fill"></span></div>
      <div class="site-header__inner">
        <a class="site-brand" href="index.html" aria-label="${siteConfig.organization.name} home">
          <img class="site-brand__logo" src="/assets/images/brand/al-shehza-circle-dark.png" alt="">
          <span class="site-brand__name">${siteConfig.organization.name}<small>Care • Dignity • Hope</small></span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">${links}</nav>
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
            <img class="site-brand__logo" src="/assets/images/brand/al-shehza-primary-light.png" alt="${siteConfig.organization.name}">
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
  const { headingFont, bodyFont, primary, primaryLight, primaryMedium, accent, accentText, accentLight, accentDark, warmIvory } = siteConfig.theme;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--font-heading', headingFont);
  rootStyle.setProperty('--font-body', bodyFont);
  rootStyle.setProperty('--clr-primary', primary);
  rootStyle.setProperty('--clr-primary-light', primaryLight);
  rootStyle.setProperty('--clr-primary-medium', primaryMedium);
  rootStyle.setProperty('--clr-gold', accent);
  rootStyle.setProperty('--clr-accent-red', accent);
  rootStyle.setProperty('--clr-accent-strong', accentText);
  rootStyle.setProperty('--clr-brand-gold', accentLight);
  rootStyle.setProperty('--clr-gold-dark', accentText);
  rootStyle.setProperty('--clr-burnt-orange', accentDark);
  rootStyle.setProperty('--clr-off-white', warmIvory);
  rootStyle.setProperty('--grad-gold', `linear-gradient(135deg, ${accent} 0%, ${accentLight} 100%)`);
  rootStyle.setProperty('--grad-gold-text', `linear-gradient(135deg, ${accentText}, ${primary})`);

  const navbar = document.getElementById('navbar-container');
  const footer = document.getElementById('footer-container');
  if (navbar) navbar.innerHTML = renderNavbar(page);
  if (footer) footer.innerHTML = renderFooter();

  const pageKey = page === 'index.html' ? 'home' : page.replace(/\.html$/, '');
  const pageConfig = siteConfig.pages[pageKey];
  if (pageConfig) {
    document.title = `${pageConfig.title} | ${siteConfig.organization.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageConfig.description);
  }
}
