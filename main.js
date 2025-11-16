// PARALLAX EFFECT HERO BG + SMALL PARALLAX (kalau nanti dipakai)
const heroBg = document.querySelector(".hero-bg");
const smallParallaxEls = document.querySelectorAll("[data-parallax-small]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;

  if (heroBg) {
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  smallParallaxEls.forEach((el) => {
    const speed = 0.15;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// REVEAL ON SCROLL + AUTOPLAY VIDEO DI CHARACTER CARD
const observerOptions = {
  threshold: 0.4, // seberapa banyak elemen kelihatan sebelum dianggap "muncul"
};

const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // Tambah class visible untuk animasi
      el.classList.add("visible");

      // Kalau elemen ini mengandung video (misal: character-card)
      const video = el.querySelector("video");
      if (video) {
        // Optional: mulai dari awal setiap kali muncul
        // video.currentTime = 0;
        video.play().catch(() => {
          // kadang autoplay diblokir, aman diabaikan
        });
      }

      // Kalau mau hanya sekali animasi, bisa unobserve:
      // observer.unobserve(el);
    } else {
      // Ketika elemen keluar dari viewport, pause video
      const video = el.querySelector("video");
      if (video && !video.paused) {
        video.pause();
      }
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

// Observe semua elemen yang ingin dianimasi
document
  .querySelectorAll(".fade-on-scroll, .slide-up-on-scroll, .world-item")
  .forEach((el) => {
    observer.observe(el);
  });

// SIMPLE NEWSLETTER SUBMIT (dummy, tanpa backend)
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input[type='email']").value;
    if (!email) return;
    alert(`Thanks! We'll notify ${email} about updates.`);
    newsletterForm.reset();
  });
}
