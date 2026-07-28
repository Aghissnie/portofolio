// =====================
// Loading screen logic
// =====================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loading-screen");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 700);
});

// =====================
// Custom cursor effect
// =====================
const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, input, textarea, .project-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
  });
  element.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// =====================
// Mobile navigation toggle
// =====================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
});

// =====================
// Scroll progress bar
// =====================
const progressBar = document.querySelector(".scroll-progress");
const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// =====================
// Typing animation
// =====================
const typedText = document.querySelector(".typed-text");
if (typedText) {
  const words = typedText.getAttribute("data-words").split(",");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex % words.length];
    typedText.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 90);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 50);
    } else {
      isDeleting = !isDeleting;
      wordIndex++;
      setTimeout(type, 1000);
    }
  };

  type();
}

// =====================
// Reveal on scroll using IntersectionObserver
// =====================
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

// =====================
// Counter animation
// =====================
const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const endValue = Number(target.getAttribute("data-count"));
      let startValue = 0;
      const duration = 1200;
      const startTime = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * endValue);
        target.textContent = `${value}`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          target.textContent = `${endValue}`;
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

// =====================
// Project filter
// =====================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      card.style.display = filter === "all" || category === filter ? "block" : "none";
    });
  });
});

// =====================
// Particle background
// =====================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

const resizeCanvas = () => {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.8 + 0.6,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35,
  }));
};

const drawParticles = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();

// =====================
// Back to top button behavior
// =====================
const backToTop = document.querySelector(".back-to-top");
backToTop?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
