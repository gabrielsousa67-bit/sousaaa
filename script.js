// ---------- pág de naveg ----------
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
const visited = new Set(['inicio']);

function goToTab(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));

  visited.add(id);
  updateProgress();

  document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => goToTab(tab.dataset.tab));
});

document.querySelectorAll('.quicklink').forEach(btn => {
  btn.addEventListener('click', () => goToTab(btn.dataset.goto));
});

function updateProgress() {
  const total = tabs.length; // inicio, bandeira, cultura, culinaria, idioma, politica
  const pct = Math.round((visited.size / total) * 100);
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

// ---------- contadores ----------
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.querySelectorAll('.stat-value').forEach(el => animateCount(el));

updateProgress();