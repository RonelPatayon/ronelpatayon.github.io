const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check saved theme in localStorage
if(localStorage.getItem('theme') === 'light'){
  body.classList.add('light-mode');
  toggleButton.textContent = '☀️';
}

// Toggle theme on button click
toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if(body.classList.contains('light-mode')){
    toggleButton.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    toggleButton.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});
