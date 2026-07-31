// ============================================================
// Menu mobile
// ============================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Highlight do link ativo conforme a rolagem
// ============================================================
const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));

// ============================================================
// Reveal on scroll para as seções
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(sec => revealObserver.observe(sec));

// ============================================================
// Efeito de digitação no terminal do hero
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const command = 'whoami';
const outputLines = [
  'gabriel_bandeira',
  '> estudante de Sistemas de Informação (Mackenzie)',
  '> foco: desenvolvimento web, testes & automação',
  '> este espaço: uma coletânea da minha trajetória'
];

const typedCommandEl = document.getElementById('typedCommand');
const typedOutputEl = document.getElementById('typedOutput');

function typeText(el, text, speed, onDone) {
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (onDone) onDone();
    }
  }, speed);
}

function revealOutput() {
  outputLines.forEach((line, idx) => {
    setTimeout(() => {
      const p = document.createElement('div');
      if (idx === 0) {
        p.innerHTML = `<span class="hl">${line}</span>`;
      } else {
        p.textContent = line;
      }
      typedOutputEl.appendChild(p);
    }, idx * 260);
  });
}

if (typedCommandEl && typedOutputEl) {
  if (prefersReducedMotion) {
    typedCommandEl.textContent = command;
    outputLines.forEach((line, idx) => {
      const p = document.createElement('div');
      if (idx === 0) p.innerHTML = `<span class="hl">${line}</span>`;
      else p.textContent = line;
      typedOutputEl.appendChild(p);
    });
  } else {
    setTimeout(() => {
      typeText(typedCommandEl, command, 110, () => {
        setTimeout(revealOutput, 300);
      });
    }, 500);
  }
}
