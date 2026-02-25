// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Theme Toggle
const toggleLink = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = toggleLink.querySelector('i');

// Check system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Update theme icon
function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }
  
  updateThemeIcon(theme);
}

// Check saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemTheme = systemPrefersDark.matches ? 'dark' : 'light';
  applyTheme(systemTheme);
}

// Listen for system changes
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  }
});

// Manual toggle
toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  
  const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(2, 6, 23, 0.98)';
  } else {
    navbar.style.background = 'rgba(2, 6, 23, 0.95)';
  }
});

// Light mode navbar scroll effect
if (body.classList.contains('light-mode')) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });
}

// Contact form submission (prevent default and show success message)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Typing effect for hero section (optional)
const roleElement = document.querySelector('.hero h2');
if (roleElement) {
  const text = roleElement.textContent;
  roleElement.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      roleElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Uncomment to enable typing effect
  // typeWriter();
}

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress-bar');
const animateProgressBars = () => {
  progressBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (barPosition < screenPosition) {
      bar.style.width = bar.style.width; // Width already set in HTML
    }
  });
};

window.addEventListener('scroll', animateProgressBars);
