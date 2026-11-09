import { siteConfig } from './site-config.js';
import { projects } from './projects-data.js';

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createProgramIcon(type) {
  const namespace = 'http://www.w3.org/2000/svg';
  const paths = {
    water: ['M12 2.5C9.2 6.4 5.5 10.3 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 10.3 14.8 6.4 12 2.5Z', 'M8.5 15.5a3.2 3.2 0 0 0 3.2 3.2'],
    'hand-holding-heart': ['M12 20.2s-7-4.3-7-9.1a4.1 4.1 0 0 1 7-2.9 4.1 4.1 0 0 1 7 2.9c0 4.8-7 9.1-7 9.1Z', 'M3 18.5h3.2l2.1 1.2h5.1a2 2 0 0 0 2-2v-.1h-4.1'],
    charity: ['M4 5.5h4.5A3.5 3.5 0 0 1 12 9v10a3.5 3.5 0 0 0-3.5-3.5H4z', 'M20 5.5h-4.5A3.5 3.5 0 0 0 12 9v10a3.5 3.5 0 0 1 3.5-3.5H20z'],
  };
  const svg = document.createElementNS(namespace, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  (paths[type] || paths.charity).forEach(d => {
    const path = document.createElementNS(namespace, 'path');
    path.setAttribute('d', d);
    svg.append(path);
  });
  return svg;
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
    const card = document.createElement('a');
    card.className = 'pillar-card';
    card.href = area.href;
    const icon = document.createElement('span');
    icon.className = `pillar-card__icon pillar-card__icon--${area.icon}`;
    icon.setAttribute('aria-hidden', 'true');
    icon.append(createProgramIcon(area.icon));
    const heading = createTextElement('h3', 'pillar-card__title', area.title);
    heading.id = `program-title-${area.number}`;
    const action = createTextElement('span', 'pillar-card__link', 'Explore initiatives');
    action.id = `program-action-${area.number}`;
    card.setAttribute('aria-labelledby', `${heading.id} ${action.id}`);
    card.append(
      createTextElement('span', 'pillar-card__number', area.number),
      icon,
      heading,
      createTextElement('p', 'pillar-card__text', area.description),
      action,
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
  let userPaused = false;
  let timer;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'story-slideshow-toggle';
  slideshow.append(toggle);

  const updateToggle = () => {
    toggle.disabled = reducedMotion.matches;
    toggle.textContent = reducedMotion.matches ? 'Motion reduced' : userPaused ? 'Play photos' : 'Pause photos';
    toggle.setAttribute('aria-label', reducedMotion.matches
      ? 'Automatic story photo rotation is disabled by your motion preference'
      : `${userPaused ? 'Resume' : 'Pause'} story photo rotation`);
    toggle.setAttribute('aria-pressed', String(userPaused || reducedMotion.matches));
  };

  const scheduleAdvance = () => {
    window.clearTimeout(timer);
    if (isVisible && !document.hidden && !reducedMotion.matches && !userPaused && slides.length > 1) {
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
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    updateToggle();
    scheduleAdvance();
  });
  updateToggle();

  document.addEventListener('visibilitychange', () => scheduleAdvance());
  reducedMotion.addEventListener('change', () => {
    updateToggle();
    scheduleAdvance();
  });

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
  if (photos.length < 2) return;

  let photoIndex = 0;
  let activeLayer = 0;
  let timer;
  let isVisible = false;
  let userPaused = false;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'home-hero__slideshow-toggle';
  const figure = container.closest('.home-hero__visual');
  figure?.append(toggle);

  const updateToggle = () => {
    toggle.disabled = reducedMotion.matches;
    toggle.textContent = reducedMotion.matches ? 'Motion reduced' : userPaused ? 'Play photos' : 'Pause photos';
    toggle.setAttribute('aria-label', reducedMotion.matches
      ? 'Automatic photo rotation is disabled by your motion preference'
      : `${userPaused ? 'Resume' : 'Pause'} homepage photo rotation`);
    toggle.setAttribute('aria-pressed', String(userPaused || reducedMotion.matches));
  };

  const showNextPhoto = () => {
    if (document.hidden || reducedMotion.matches || userPaused || !isVisible) return;

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
      scheduleAdvance();
    };
    image.onerror = () => {
      console.error(`Unable to load homepage project photo: ${photoSequence[nextIndex]}`);
      photoIndex = nextIndex;
      scheduleAdvance(1000);
    };
    image.src = photoSequence[nextIndex];
  };

  const pauseSlideshow = () => window.clearTimeout(timer);
  const scheduleAdvance = (delay = 5200) => {
    pauseSlideshow();
    if (isVisible && !document.hidden && !reducedMotion.matches && !userPaused) {
      timer = window.setTimeout(showNextPhoto, delay);
    }
  };
  const handleMotionChange = () => {
    updateToggle();
    scheduleAdvance();
  };
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    updateToggle();
    scheduleAdvance();
  });
  updateToggle();

  document.addEventListener('visibilitychange', () => scheduleAdvance());
  reducedMotion.addEventListener('change', handleMotionChange);
  if ('IntersectionObserver' in window && figure) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      scheduleAdvance();
    }, { threshold: 0.3 });
    observer.observe(figure);
  } else {
    isVisible = true;
    scheduleAdvance();
  }
}
