// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle button functionality
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText();
}

function updateButtonText() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// Initialize button text
updateButtonText();

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText();
});
// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// ===== Form Validation =====
const contactForm = document.getElementById('contact-form');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Name validation
  const name = document.getElementById('name').value.trim();
  if (name === '') {
    nameError.textContent = 'Name is required';
    nameError.style.display = 'block';
    isValid = false;
  } else {
    nameError.style.display = 'none';
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    emailError.textContent = 'Email is required';
    emailError.style.display = 'block';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email';
    emailError.style.display = 'block';
    isValid = false;
  } else {
    emailError.style.display = 'none';
  }

  // Message validation
  const message = document.getElementById('message').value.trim();
  if (message === '') {
    messageError.textContent = 'Message is required';
    messageError.style.display = 'block';
    isValid = false;
  } 
  else {
    messageError.style.display = 'none';
  }

  // Submit if valid
  if (isValid) {
    // Replace with Formspree submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  }
});

// ===== Animate sections on scroll =====
const animateOnScroll = () => {
  const sections = document.querySelectorAll('.fade-in');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
};

// Initial check when page loads
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Set initial state for animations
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
});

// Check on scroll
window.addEventListener('scroll', animateOnScroll);