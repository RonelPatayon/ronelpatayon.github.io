const toggleDesktop = document.getElementById('theme-toggle');
const toggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function updateIcons(theme) {
  const icon = theme === 'light'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  if (toggleDesktop) toggleDesktop.innerHTML = icon;
  if (toggleMobile) toggleMobile.innerHTML = icon;
}

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }
  updateIcons(theme);
}

// Check saved theme
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
}

// Listen to system change
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// Toggle function
function toggleTheme() {
  const isLight = body.classList.contains('light-mode');
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

// Attach events
if (toggleDesktop) toggleDesktop.addEventListener('click', toggleTheme);
if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);
