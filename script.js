/* ===== MATRIX RAIN ===== */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let cols, drops;

function resizeMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 18);
  drops = Array(cols).fill(1);
}
resizeMatrix();
window.addEventListener('resize', resizeMatrix);

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function drawMatrix() {
  ctx.fillStyle = 'rgba(5, 5, 8, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f0ff';
  ctx.font = '14px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 18, drops[i] * 18);
    if (drops[i] * 18 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

/* ===== TERMINAL TYPING ===== */
function typeLine(el, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    el.textContent = '';
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function runTerminal() {
  await typeLine(document.getElementById('line-name'), 'Test — Full Stack Developer');
  await new Promise(r => setTimeout(r, 400));
  await typeLine(document.getElementById('line-skills'), 'MERN  |  Java  |  Git / GitHub');
  await new Promise(r => setTimeout(r, 400));
  await typeLine(document.getElementById('line-status'), 'Available for projects');
}
runTerminal();

/* ===== SIDEBAR ACTIVE STATE ===== */
const sideLinks = document.querySelectorAll('.side-link');
const panels = document.querySelectorAll('.panel');

function updateActiveLink() {
  let current = 'hero';
  panels.forEach(panel => {
    const top = panel.offsetTop - 150;
    if (window.scrollY >= top) {
      current = panel.id;
    }
  });
  sideLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', updateActiveLink);

/* ===== MOBILE SIDEBAR ===== */
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.getElementById('sidebar');

mobileToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

sideLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});

/* ===== COUNTERS ===== */
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  update();
}

let counted = false;
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCount(el, +el.dataset.count);
      });
      counted = true;
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.cyber-stat, .git-box').forEach(el => countObserver.observe(el));

/* ===== STACK TABS ===== */
const stackTabs = document.querySelectorAll('.stack-tab');
const stackPanels = document.querySelectorAll('.stack-panel');

stackTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    stackTabs.forEach(t => t.classList.remove('active'));
    stackPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

/* ===== HEX SKILL INTERACTION ===== */
const skillInfo = {
  'React': 'React 18+ with hooks, concurrent features and production component systems.',
  'JS/TS': 'Strong JavaScript & TypeScript — type-safe, modern ES features daily.',
  'HTML/CSS': 'Semantic HTML, modern CSS, responsive layouts and animations.',
  'Next.js': 'Server components, App Router, SEO and full-stack Next.js apps.',
  'Redux': 'Redux Toolkit + RTK Query for predictable global state.',
  'Tailwind': 'Utility-first styling and custom design systems with Tailwind.',
  'Node': 'Scalable Node.js services, streams, workers and real-time systems.',
  'Express': 'Clean Express APIs with middleware, validation and security.',
  'MongoDB': 'Schema design, aggregation, indexing and MongoDB Atlas.',
  'Java': 'Solid Java foundations — OOP, collections, concurrency patterns.',
  'Spring': 'Spring Boot microservices, Security, JPA and Cloud components.',
  'REST': 'Well-designed REST & GraphQL APIs with proper versioning.',
  'Git': 'Advanced Git: branching strategies, rebase, bisect and clean history.',
  'GitHub': 'GitHub Actions, PRs, code review culture and open-source habits.',
  'Docker': 'Multi-stage Docker builds and compose for local + production.',
  'CI/CD': 'Automated pipelines for test, build and deploy stages.',
  'AWS': 'Core AWS services for hosting and simple infrastructure.',
  'Jest': 'Unit & integration tests with Jest and Testing Library.'
};

const readout = document.getElementById('skill-readout');
document.querySelectorAll('.hex').forEach(hex => {
  hex.addEventListener('click', () => {
    document.querySelectorAll('.hex').forEach(h => h.classList.remove('active'));
    hex.classList.add('active');
    const skill = hex.dataset.skill;
    readout.innerHTML = `
      <span class="readout-label">${skill}</span>
      <p>${skillInfo[skill] || 'Experienced with this technology.'}</p>
    `;
  });
});

/* ===== PROJECT FILTER ===== */
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.work-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ===== FAKE COMMIT FEED ===== */
const commits = [
  { hash: 'a3f91c2', msg: 'feat: add auth middleware', time: '2h ago' },
  { hash: 'b8e02d1', msg: 'fix: resolve race condition', time: '5h ago' },
  { hash: 'c1d44a9', msg: 'refactor: clean service layer', time: '1d ago' },
  { hash: 'e7b33f0', msg: 'docs: update API reference', time: '1d ago' },
  { hash: 'f9a12c8', msg: 'chore: bump dependencies', time: '2d ago' },
  { hash: '0d5e7b3', msg: 'feat: Project 3 endpoints', time: '3d ago' },
  { hash: '2c8f1a4', msg: 'test: add integration suite', time: '4d ago' },
  { hash: '6b9e0d7', msg: 'perf: optimize query path', time: '5d ago' },
];

const feed = document.getElementById('commit-feed');
commits.forEach(c => {
  const line = document.createElement('div');
  line.className = 'commit-line';
  line.innerHTML = `
    <span class="hash">${c.hash}</span>
    <span class="msg">${c.msg}</span>
    <span class="time">${c.time}</span>
  `;
  feed.appendChild(line);
});

/* ===== CONTACT FORM ===== */
document.getElementById('cyber-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = 'TRANSMITTING...';
  msg.className = 'form-msg';
  setTimeout(() => {
    msg.textContent = '✓ MESSAGE SENT — AWAITING RESPONSE';
    msg.className = 'form-msg ok';
    e.target.reset();
    setTimeout(() => { msg.textContent = ''; }, 4000);
  }, 1100);
});
