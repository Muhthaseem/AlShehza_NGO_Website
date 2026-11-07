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

export function renderHomeContent() {
  renderStats();
  renderProgramPillars();
}

export function initializeHeroProjectSlideshow() {
  const container = document.getElementById('homeProjectSlideshow');
  if (!container) return;

  const pauseButton = document.getElementById('homeSlideshowToggle');
  if (!pauseButton) {
    throw new Error('The homepage project slideshow requires a pause control.');
  }

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
  let photoIndex = 0;
  let activeLayer = 0;
  let timer;
  let userPaused = false;

  const updatePauseControl = () => {
    pauseButton.disabled = reducedMotion.matches || photos.length < 2;
    const label = reducedMotion.matches
      ? 'Paused for reduced motion'
      : photos.length < 2
        ? 'Background photos are still'
        : userPaused
          ? 'Play background photos'
          : 'Pause background photos';
    pauseButton.textContent = label;
    pauseButton.setAttribute('aria-label', label);
  };

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

  const scheduleNextPhoto = () => {
    window.clearTimeout(timer);
    if (!userPaused && !document.hidden && !reducedMotion.matches && photos.length > 1) {
      timer = window.setTimeout(showNextPhoto, 5200);
    }
  };

  pauseButton.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePauseControl();
    scheduleNextPhoto();
  });
  document.addEventListener('visibilitychange', scheduleNextPhoto);
  reducedMotion.addEventListener('change', () => {
    updatePauseControl();
    scheduleNextPhoto();
  });
  updatePauseControl();
  scheduleNextPhoto();
}
