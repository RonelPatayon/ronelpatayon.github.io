const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Detect system theme
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to apply theme
function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
    toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('light-mode');
    toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// 1️⃣ Check saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // 2️⃣ Follow system preference
  if (systemPrefersDark.matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

// 3️⃣ Listen for system theme changes (if no manual override)
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// 4️⃣ Manual toggle
toggleButton.addEventListener('click', () => {
  const isLight = body.classList.contains('light-mode');

  if (isLight) {
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    applyTheme('light');
    localStorage.setItem('theme', 'light');
  }
});
