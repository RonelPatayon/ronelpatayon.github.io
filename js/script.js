const toggleLink = document.getElementById('theme-toggle');
const body = document.body;

// Nav links
const navLinks = [
  document.getElementById('nav-about'),
  document.getElementById('nav-projects'),
  document.getElementById('nav-skills'),
  document.getElementById('nav-contact')
];

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function updateLinkIcons(theme) {
  // Icon colors
  const color = theme === 'light' ? '#0f172a' : '#e5e7eb';

  navLinks.forEach(link => {
    const icon = link.querySelector('i');
    if (icon) icon.style.color = color;
  });

  // Theme toggle text & icon
  toggleLink.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun me-1"></i> Light Theme'
    : '<i class="fa-solid fa-moon me-1"></i> Dark Theme';
}

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }

  updateLinkIcons(theme);
}

// 1️⃣ Load saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
}

// 2️⃣ Listen for system changes (only if no manual override)
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// 3️⃣ Manual toggle
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();

  const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
