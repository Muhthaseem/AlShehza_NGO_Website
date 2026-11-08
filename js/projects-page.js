import { projects } from './projects-data.js';

function createCarousel(project) {
  const visual = document.createElement('div');
  visual.className = 'work-card__visual';

  if (!project.images.length) {
    visual.classList.add('work-card__visual--no-image');
    visual.setAttribute('role', 'img');
    visual.setAttribute('aria-label', `${project.title}; no project photos available`);
    const placeholder = document.createElement('span');
    placeholder.className = 'work-card__placeholder';
    placeholder.textContent = 'Care shared with purpose';
    visual.append(placeholder);
    return visual;
  }

  const figure = document.createElement('figure');
  figure.className = 'work-carousel__figure';
  const imageTrack = document.createElement('div');
  imageTrack.className = 'work-carousel__track';
  const imageLayers = [0, 1].map(() => {
    const image = document.createElement('img');
    image.className = 'work-carousel__image';
    image.alt = '';
    image.decoding = 'async';
    imageTrack.append(image);
    return image;
  });
  let activeImageLayer = 0;
  const firstImage = imageLayers[activeImageLayer];
  firstImage.classList.add('is-active');
  firstImage.src = project.images[0];
  firstImage.alt = `${project.title} — photo 1 of ${project.images.length}`;
  firstImage.loading = project.order <= 2 ? 'eager' : 'lazy';
  figure.append(imageTrack);

  const controls = document.createElement('div');
  controls.className = 'work-carousel__controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', `${project.title} photo controls`);
  const indicators = document.createElement('div');
  indicators.className = 'work-carousel__indicators';
  indicators.setAttribute('role', 'group');
  indicators.setAttribute('aria-label', 'Choose a project photo');
  const dots = project.images.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'work-carousel__dot';
    dot.setAttribute('aria-label', `Show ${project.title} photo ${index + 1}`);
    dot.addEventListener('click', () => showImageAt(index, index >= imageIndex ? 1 : -1));
    indicators.append(dot);
    return dot;
  });
  if (project.images.length > 1) controls.append(indicators);
  visual.append(figure);
  if (project.images.length > 1) visual.append(controls);

  let imageIndex = 0;
  let autoAdvance;
  let isVisible = false;
  const updateIndicators = () => {
    dots.forEach((dot, index) => {
      if (index === imageIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.removeAttribute('aria-current');
      }
    });
  };
  const scheduleAdvance = () => {
    window.clearTimeout(autoAdvance);
    if (isVisible && project.images.length > 1 && !document.hidden) {
      autoAdvance = window.setTimeout(() => showImage(1), 3000);
    }
  };
  const showImageAt = (index, direction = 1) => {
    const nextIndex = (index + project.images.length) % project.images.length;
    if (nextIndex !== imageIndex) {
      imageIndex = nextIndex;
      const nextLayer = 1 - activeImageLayer;
      const incomingImage = imageLayers[nextLayer];
      const requestedImage = project.images[imageIndex];
      const requestedIndex = imageIndex;
      incomingImage.onload = () => {
        incomingImage.onload = null;
        if (imageIndex === requestedIndex && incomingImage.src.endsWith(requestedImage)) {
          activateImage(incomingImage, nextLayer, direction);
        }
      };
      incomingImage.onerror = () => {
        console.error(`Unable to load project photo: ${requestedImage}`);
        scheduleAdvance();
      };
      incomingImage.src = requestedImage;
    } else {
      scheduleAdvance();
    }
  };
  const activateImage = (incomingImage, nextLayer, direction) => {
    incomingImage.onerror = null;
    incomingImage.alt = `${project.title} — photo ${imageIndex + 1} of ${project.images.length}`;
    imageTrack.dataset.direction = direction < 0 ? 'right' : 'left';
    incomingImage.classList.add('is-active', 'is-entering');
    imageLayers[activeImageLayer].classList.remove('is-active', 'is-entering');
    activeImageLayer = nextLayer;
    window.requestAnimationFrame(() => incomingImage.classList.remove('is-entering'));
    updateIndicators();
    scheduleAdvance();
  };
  const showImage = direction => {
    showImageAt(imageIndex + direction, direction);
  };
  updateIndicators();
  figure.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showImageAt(imageIndex - 1, -1);
    if (event.key === 'ArrowRight') showImageAt(imageIndex + 1, 1);
  });
  figure.tabIndex = 0;
  figure.setAttribute('aria-label', `${project.title} photo carousel. Use left and right arrow keys to browse.`);
  let pointerStart = null;
  figure.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      pointerStart = { x: event.clientX, y: event.clientY };
    }
  });
  figure.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      showImage(deltaX < 0 ? 1 : -1);
    }
  });
  figure.addEventListener('pointercancel', () => { pointerStart = null; });
  document.addEventListener('visibilitychange', scheduleAdvance);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      scheduleAdvance();
    }, { threshold: 0.35 });
    observer.observe(visual);
  } else {
    isVisible = true;
    scheduleAdvance();
  }
  return visual;
}

function createWorkCard(project) {
  const card = document.createElement('article');
  card.className = 'work-card';
  card.id = `project-${project.order}`;

  const visual = createCarousel(project);
  const content = document.createElement('div');
  content.className = 'work-card__content';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'work-card__eyebrow';
  eyebrow.textContent = `${String(project.order).padStart(2, '0')} · ${project.category}`;
  const title = document.createElement('h3');
  title.textContent = project.title;
  const summary = document.createElement('p');
  summary.className = 'work-card__summary';
  summary.textContent = project.summary;
  const details = document.createElement('div');
  details.className = 'work-card__details';

  project.sections.forEach(section => {
    const detail = document.createElement('section');
    const heading = document.createElement('h4');
    heading.textContent = section.heading;
    const description = document.createElement('div');
    description.innerHTML = section.content;
    detail.append(heading, description);
    details.append(detail);
  });

  const more = document.createElement('details');
  more.className = 'work-card__more';
  const moreLabel = document.createElement('summary');
  moreLabel.textContent = 'More about this initiative';
  more.append(moreLabel, details);
  content.append(eyebrow, title, summary, more);
  card.append(visual, content);
  return card;
}

export function renderFeaturedProjects() {
  const container = document.getElementById('featuredProjects') || document.getElementById('projectGrid');
  if (!container) return;

  const entries = Object.values(projects).sort((left, right) => left.order - right.order);
  container.replaceChildren(...entries.map(createWorkCard));
}

export function initializeProjectsPage() {
  if (!document.getElementById('projectGrid')) return;
  renderFeaturedProjects();
  initializeProjectFilters();
}

function initializeProjectFilters() {
  const filters = document.getElementById('projectFilters');
  const grid = document.getElementById('projectGrid');
  const status = document.getElementById('projectFilterStatus');
  if (!filters || !grid) return;

  const groups = [
    { label: 'All initiatives', matches: () => true },
    { label: 'Water', matches: category => /water|well/i.test(category) },
    { label: 'Food & nourishment', matches: category => /food|iftar|relief|nourishment|nutrition/i.test(category) },
    { label: 'Faith & learning', matches: category => /faith|quran|qurban/i.test(category) },
  ];
  const cards = [...grid.querySelectorAll('.work-card')];

  groups.forEach((group, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'work-filter';
    button.textContent = group.label;
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      let visibleCount = 0;
      cards.forEach(card => {
        const category = `${card.querySelector('.work-card__eyebrow')?.textContent || ''} ${card.querySelector('h3')?.textContent || ''}`;
        const visible = group.matches(category);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      filters.querySelectorAll('.work-filter').forEach(filter => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      if (status) status.textContent = `${visibleCount} ${visibleCount === 1 ? 'initiative' : 'initiatives'} shown`;
    });
    filters.append(button);
  });
}
