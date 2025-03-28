document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  setTimeout(() => {
    loadingOverlay.classList.add('hidden');
  }, 500);
});

const text = "Hype got you here. Stay for the support.";
let index = 0;
const speed = 100;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing-effect").innerHTML = 
      text.substring(0, index + 1).replace("Stay", "<br>Stay") + 
      '<span class="blink">|</span>';
    index++;
    setTimeout(typeEffect, speed);
  } else {
    document.querySelector(".blink")?.remove();
  }
}

window.onload = function() {
  typeEffect();
};

AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

toggleTheme(prefersDarkScheme.matches);

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggleTheme(!isDark);
});

prefersDarkScheme.addEventListener('change', (e) => {
  toggleTheme(e.matches);
});

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("subscribe-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const emailInput = this.querySelector("input[type='email']");
  const email = emailInput.value;
  const messageElement = document.getElementById("form-message");

  if (!isValidEmail(email)) {
    messageElement.textContent = "Please enter a valid email address";
    messageElement.style.color = "#ff4444";
    return;
  }

  try {
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitButton.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1500));

    messageElement.textContent = `Thank you, ${email}! You're subscribed.`;
    messageElement.style.color = "#B1CCFB";
    this.reset();

    submitButton.innerHTML = originalText;
    submitButton.disabled = false;

    setTimeout(() => {
      messageElement.textContent = "Subscribe to our newsletter";
    }, 3000);
  } catch (error) {
    messageElement.textContent = "Something went wrong. Please try again.";
    messageElement.style.color = "#ff4444";
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch(searchInput.value);
  }
});

function performSearch(query) {
  if (!query.trim()) return;
  
  searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  
  setTimeout(() => {
    searchButton.innerHTML = '<i class="fas fa-search"></i>';
    console.log('Searching for:', query);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
});

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

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(() => {
}, 100));

const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

fadeSections.forEach(section => {
  observer.observe(section);
});