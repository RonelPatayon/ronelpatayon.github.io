const toggleLink = document.getElementById('theme-toggle');
const body = document.body;

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Update link text + icon based on current theme
function updateLink(theme) {
  if (theme === 'dark') {
    toggleLink.innerHTML = '<i class="fa-solid fa-sun me-1"></i> Light Theme';
  } else {
    toggleLink.innerHTML = '<i class="fa-solid fa-moon me-1"></i> Dark Theme';
  }
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }

  updateLink(theme);
}

// 1️⃣ Check saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemTheme = systemPrefersDark.matches ? 'dark' : 'light';
  applyTheme(systemTheme);
}

// 2️⃣ Listen for system changes (only if no manual override)
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
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
