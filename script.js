// ✅ Page Loader
document.body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
  document.body.classList.remove("loading");
});

// ✅ Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link (mobile)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// ✅ Typing Effect
const typingText = document.getElementById("typing");
const words = ["Frontend Developer", "Web Designer", "Full Stack Learner"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 900);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 110);
}
typeEffect();

// ✅ Reveal Animation
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 80;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

// ✅ Active Navbar Link Highlight
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-link");

// ✅ Skills Progress Bar Animation
const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".progress-bar");
let skillsAnimated = false;

function animateSkills() {
  if (!skillSection) return;

  const sectionTop = skillSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 150 && !skillsAnimated) {
    progressBars.forEach((bar) => {
      const value = bar.getAttribute("data-width");
      bar.style.width = value;
    });
    skillsAnimated = true;
  }
}

// ✅ Back To Top Button
const topBtn = document.getElementById("topBtn");

// ✅ ONE scroll listener (optimized)
window.addEventListener("scroll", () => {
  // Reveal
  revealOnScroll();

  // Skills animate
  animateSkills();

  // Back to top show/hide
  if (topBtn) {
    if (window.scrollY > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  }

  // Active navbar highlight
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ✅ Run once on load
revealOnScroll();
animateSkills();

// ✅ Back to top click
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
