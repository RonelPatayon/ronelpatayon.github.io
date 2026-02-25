// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Gallery Lightbox Functionality (optional)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    // You can implement a lightbox modal here
    console.log('Open lightbox with:', imgSrc);
  });
});

// Smooth scroll for anchor links
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

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + (element.textContent.includes('%') ? '%' : '+');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Observer for stats animation
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target;
      const value = parseInt(statNumber.textContent);
      statNumber.textContent = '0';
      animateValue(statNumber, 0, value, 2000);
      observer.unobserve(statNumber);
    }
  });
}, observerOptions);

statNumbers.forEach(stat => observer.observe(stat));
