const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme from localStorage
if(localStorage.getItem('theme') === 'light'){
  body.classList.add('light-mode');
  toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle dark/light mode
toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
 if(body.classList.contains('light-mode')){
  toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  localStorage.setItem('theme', 'light');
} else {
  toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', 'dark');
}
});
