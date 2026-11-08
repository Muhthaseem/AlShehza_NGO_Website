import { siteConfig } from './site-config.js';
import { projects } from './projects-data.js';

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderStats() {
  const container = document.getElementById('homepageStats');
  if (!container) return;

  container.replaceChildren(...siteConfig.pages.home.stats.map(stat => {
    const item = document.createElement('div');
    item.className = 'stat-card';
    item.append(
      createTextElement('div', 'stat-card__value', stat.value),
      createTextElement('div', 'stat-card__label', stat.label),
    );
    return item;
  }));
}

function renderProgramPillars() {
  const container = document.getElementById('homepageProgramPillars');
  if (!container) return;

  container.replaceChildren(...siteConfig.pages.home.programPillars.map(area => {
    const card = document.createElement('article');
    card.className = 'pillar-card';
    card.append(
      createTextElement('span', 'pillar-card__number', area.number),
      createTextElement('h3', 'pillar-card__title', area.title),
      createTextElement('p', 'pillar-card__text', area.description),
    );
    return card;
  }));
}

function renderFeaturedWork() {
  const container = document.getElementById('homepageFeaturedWork');
  if (!container) return;

  const featured = Object.values(projects)
    .filter(project => project.images.length)
    .sort((left, right) => left.order - right.order)
    .slice(0, 3);

  container.replaceChildren(...featured.map(project => {
    const link = document.createElement('a');
    link.className = 'home-feature-card';
    link.href = `projects.html#project-${project.order}`;
    const image = document.createElement('img');
    image.src = project.images[0];
    image.alt = `${project.title} project`;
    image.loading = 'lazy';
    image.decoding = 'async';
    const visual = document.createElement('div');
    visual.className = 'home-feature-card__visual';
    visual.append(image);
    const copy = document.createElement('div');
    copy.className = 'home-feature-card__copy';
    const category = createTextElement('p', 'home-feature-card__category', project.category);
    const title = createTextElement('h3', '', project.title);
    const arrow = document.createElement('span');
    arrow.className = 'home-feature-card__arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    copy.append(category, title, arrow);
    link.append(visual, copy);
    return link;
  }));
}

export function renderHomeContent() {
  renderStats();
  renderProgramPillars();
  renderFeaturedWork();
}

export function initializeStoryProjectSlideshow() {
  const slideshow = document.getElementById('storyProjectSlideshow');
  if (!slideshow) return;

  const slides = Object.values(projects).flatMap(project =>
    project.images.map((src, index) => ({
      src,
      alt: `${project.title} — project photo ${index + 1} of ${project.images.length}`,
      caption: `${project.category} · ${project.title}`,
    }))
  );
  if (!slides.length) {
    throw new Error('The story project slideshow requires at least one project photo.');
  }

  const caption = slideshow.querySelector('.fieldnotes-cover__photo-caption');
  const firstLayer = slideshow.querySelector('.fieldnotes-cover__slide');
  if (!caption || !firstLayer) {
    throw new Error('The story project slideshow is missing required markup.');
  }

  const secondLayer = document.createElement('img');
  secondLayer.className = 'fieldnotes-cover__slide';
  secondLayer.alt = '';
  secondLayer.setAttribute('aria-hidden', 'true');
  secondLayer.decoding = 'async';
  slideshow.insertBefore(secondLayer, caption);

  const layers = [firstLayer, secondLayer];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeLayer = 0;
  let slideIndex = 0;
  let isVisible = false;
  let timer;

  const scheduleAdvance = () => {
    window.clearTimeout(timer);
    if (isVisible && !document.hidden && !reducedMotion.matches && slides.length > 1) {
      timer = window.setTimeout(() => showSlide(slideIndex + 1), 3000);
    }
  };

  const showSlide = nextIndex => {
    const nextLayer = 1 - activeLayer;
    const incomingImage = layers[nextLayer];
    const requestedSlide = slides[nextIndex % slides.length];
    incomingImage.onload = () => {
      incomingImage.onload = null;
      incomingImage.onerror = null;
      slideIndex = nextIndex % slides.length;
      incomingImage.alt = requestedSlide.alt;
      incomingImage.removeAttribute('aria-hidden');
      incomingImage.classList.add('is-active');
      layers[activeLayer].classList.remove('is-active', 'is-entering');
      layers[activeLayer].alt = '';
      layers[activeLayer].setAttribute('aria-hidden', 'true');
      activeLayer = nextLayer;
      caption.textContent = requestedSlide.caption;
      scheduleAdvance();
    };
    incomingImage.onerror = () => {
      incomingImage.onload = null;
      incomingImage.onerror = null;
      console.error(`Unable to load story project photo: ${requestedSlide.src}`);
      timer = window.setTimeout(() => showSlide((nextIndex + 1) % slides.length), 3000);
    };
    incomingImage.src = requestedSlide.src;
  };

  firstLayer.alt = slides[0].alt;
  firstLayer.loading = 'eager';
  firstLayer.decoding = 'async';
  firstLayer.fetchPriority = 'high';
  firstLayer.classList.add('is-active');
  firstLayer.removeAttribute('aria-hidden');
  caption.textContent = slides[0].caption;

  document.addEventListener('visibilitychange', scheduleAdvance);
  reducedMotion.addEventListener('change', scheduleAdvance);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      scheduleAdvance();
    }, { threshold: 0.35 });
    observer.observe(slideshow);
  } else {
    isVisible = true;
    scheduleAdvance();
  }
}

export function initializeHeroProjectSlideshow() {
  const container = document.getElementById('homeProjectSlideshow');
  if (!container) return;

  const photos = Object.values(projects).flatMap(project => project.images);
  if (!photos.length) {
    throw new Error('The homepage project slideshow requires at least one project photo.');
  }

  const shufflePhotos = previousPhoto => {
    const shuffled = [...photos];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    if (shuffled.length > 1 && shuffled[0] === previousPhoto) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    return shuffled;
  };
  let photoSequence = shufflePhotos();

  const firstLayer = document.createElement('img');
  const secondLayer = document.createElement('img');
  firstLayer.alt = '';
  secondLayer.alt = '';
  firstLayer.decoding = 'async';
  secondLayer.decoding = 'async';
  firstLayer.fetchPriority = 'high';
  firstLayer.src = photoSequence[0];
  firstLayer.classList.add('is-active');
  container.replaceChildren(firstLayer, secondLayer);

  const layers = [firstLayer, secondLayer];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || photos.length < 2) return;

  let photoIndex = 0;
  let activeLayer = 0;
  let timer;

  const showNextPhoto = () => {
    if (document.hidden || reducedMotion.matches) return;

    const nextLayer = 1 - activeLayer;
    let nextIndex = photoIndex + 1;
    if (nextIndex === photoSequence.length) {
      photoSequence = shufflePhotos(photoSequence[photoIndex]);
      nextIndex = 0;
    }
    const image = layers[nextLayer];
    image.onload = () => {
      image.classList.add('is-active');
      layers[activeLayer].classList.remove('is-active');
      activeLayer = nextLayer;
      photoIndex = nextIndex;
      timer = window.setTimeout(showNextPhoto, 5200);
    };
    image.onerror = () => {
      console.error(`Unable to load homepage project photo: ${photoSequence[nextIndex]}`);
      photoIndex = nextIndex;
      timer = window.setTimeout(showNextPhoto, 1000);
    };
    image.src = photoSequence[nextIndex];
  };

  const pauseSlideshow = () => window.clearTimeout(timer);
  const resumeSlideshow = () => {
    pauseSlideshow();
    if (!document.hidden && !reducedMotion.matches) {
      timer = window.setTimeout(showNextPhoto, 5200);
    }
  };

  document.addEventListener('visibilitychange', resumeSlideshow);
  reducedMotion.addEventListener('change', resumeSlideshow);
  resumeSlideshow();
}
