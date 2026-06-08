const portfolioData = [
  { src: "media/Beautylush Complete (1).jpg", cat: "beauty", title: "Brand Post", client: "Beautylush" },
  { src: "media/Copy of Yumi (1).jpg", cat: "beauty", title: "Social Post", client: "Yumi" },
  { src: "media/Green Minimalist Green Tea Testimonial Instagram Post (5).jpg", cat: "beauty", title: "Testimonial Post", client: "Green Tea" },
  { src: "media/Green Minimalist Green Tea Testimonial Instagram Post (6).jpg", cat: "beauty", title: "Testimonial Post", client: "Green Tea" },
  { src: "media/Green Minimalist Green Tea Testimonial Instagram Post.jpg", cat: "beauty", title: "Testimonial Post", client: "Green Tea" },
  { src: "media/CapCeylon Currnt post (1).jpg", cat: "food", title: "Current Post", client: "CapCeylon" },
  { src: "media/CapCeylon2.jpg", cat: "food", title: "Social Post", client: "CapCeylon" },
  { src: "media/CapCeylon3.jpg", cat: "food", title: "Social Post", client: "CapCeylon" },
  { src: "media/CapCeylon4.jpg", cat: "food", title: "Social Post", client: "CapCeylon" },
  { src: "media/Greenpower New Posts (10).jpg", cat: "business", title: "New Post", client: "Greenpower" },
  { src: "media/Greenpower New Posts (15).jpg", cat: "business", title: "New Post", client: "Greenpower" },
  { src: "media/Greenpower New Posts (6).jpg", cat: "business", title: "New Post", client: "Greenpower" },
  { src: "media/AIGburth Estate (4).jpg", cat: "business", title: "Estate Post", client: "AIGburth Estate" },
  { src: "media/Sealand Completed Posts (1).jpg", cat: "business", title: "Completed Post", client: "Sealand" },
  { src: "media/Wash & Dry ( One Day) (6).jpg", cat: "business", title: "Service Post", client: "Wash & Dry" },
  { src: "media/motogo.jpg", cat: "business", title: "Brand Post", client: "Motogo" },
  { src: "media/Range Global Education Malta.jpg", cat: "education", title: "Education Post", client: "Range Global Education" },
  { src: "media/Range Global Education UK.jpg", cat: "education", title: "Education Visual", client: "Range Global Education" },
  { src: "media/King and Queen (3).jpg", cat: "events", title: "Event Post", client: "King & Queen" },
  { src: "media/King and Queen (9).jpg", cat: "events", title: "Event Post", client: "King & Queen" },
  { src: "media/Globe Trotter.jpg", cat: "travel", title: "Brand Post", client: "Globe Trotter" },
  { src: "media/videos/Greenpower New Posts (Instagram Reel).mp4", cat: "video", title: "Instagram Reel", client: "Greenpower", isVideo: true },
  { src: "media/pdfs/Leopard Flyer (4).pdf", cat: "flyer", title: "Flyer Design", client: "Leopard", isPdf: true },
];

const grid = document.getElementById('portfolioGrid');
let currentFilter = 'all';

function renderPortfolio(filter) {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? portfolioData.filter(p => !p.isVideo && !p.isPdf) : portfolioData.filter(p => p.cat === filter);

  filtered.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.dataset.index = portfolioData.indexOf(item);
    div.style.animationDelay = `${i * 0.08}s`;

    if (item.isPdf) {
      div.innerHTML = `
        <div class="pdf-thumb">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div class="portfolio-overlay">
          <span>${item.client}</span>
          <strong>${item.title}</strong>
          <span class="video-badge">📄 PDF</span>
        </div>
      `;
      div.addEventListener('click', () => window.open(item.src, '_blank'));
    } else if (item.isVideo) {
      div.innerHTML = `
        <video src="${item.src}" muted loop playsinline preload="metadata"></video>
        <div class="portfolio-overlay">
          <span>${item.client}</span>
          <strong>${item.title}</strong>
          <span class="video-badge">▶ Reel</span>
        </div>
      `;
      div.addEventListener('click', () => openLightbox(portfolioData.indexOf(item)));
    } else {
      div.innerHTML = `
        <img src="${item.src}" alt="${item.client} — ${item.title}" loading="lazy">
        <div class="portfolio-overlay">
          <span>${item.client}</span>
          <strong>${item.title}</strong>
        </div>
      `;
      div.addEventListener('click', () => openLightbox(portfolioData.indexOf(item)));
    }
    grid.appendChild(div);
    requestAnimationFrame(() => div.classList.add('visible'));
  });
}

renderPortfolio('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderPortfolio(currentFilter);
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;

function getFilteredIndices() {
  return portfolioData
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => currentFilter === 'all' || item.cat === currentFilter)
    .map(({ i }) => i);
}

function openLightbox(index) {
  currentIndex = index;
  const item = portfolioData[index];
  lightboxMedia.innerHTML = '';
  if (item.isPdf) {
    lightboxMedia.innerHTML = `
      <div class="lightbox-pdf">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <p>PDF Document</p>
        <a href="${item.src}" target="_blank" class="btn btn-primary">Open PDF</a>
      </div>
    `;
  } else if (item.isVideo) {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.loop = false;
    video.className = 'lightbox-video';
    lightboxMedia.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = `${item.client} — ${item.title}`;
    img.className = 'lightbox-img';
    lightboxMedia.appendChild(img);
  }
  lightboxCaption.textContent = `${item.client} — ${item.title}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxMedia.innerHTML = '';
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  const indices = getFilteredIndices();
  const pos = indices.indexOf(currentIndex);
  const next = (pos + dir + indices.length) % indices.length;
  openLightbox(indices[next]);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

document.querySelectorAll('.portfolio-item video').forEach(v => {
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { v.play(); } else { v.pause(); }
  }, { threshold: 0.4 });
  obs.observe(v);
});
