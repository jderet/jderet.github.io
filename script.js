// GitHub Pages serves a valid certificate for both production hosts. Redirect
// HTTP visitors until the repository owner can enable the native HTTPS toggle.
const secureProductionHosts = new Set(["julesderet.fr", "www.julesderet.fr"]);

if (
  window.location.protocol === "http:" &&
  secureProductionHosts.has(window.location.hostname)
) {
  const secureUrl = new URL(window.location.href);
  secureUrl.protocol = "https:";
  window.location.replace(secureUrl);
}

// Preserve the former unlisted address while serving Latin from a static,
// noindex page whose language metadata is correct without JavaScript.
const requestedLanguage = new URLSearchParams(window.location.search).get(
  "lang",
);

if (requestedLanguage === "la") {
  const latinUrl = new URL("/latin/", window.location.origin);
  latinUrl.hash = window.location.hash;
  window.location.replace(latinUrl);
}

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navRight = document.querySelector(".nav-right");

if (hamburger && navRight) {
  hamburger.addEventListener("click", () => {
    navRight.classList.toggle("open");
    const isOpen = navRight.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    if (isOpen) navRight.querySelector("a")?.focus();
  });

  // Close the mobile menu after selecting a section.
  navRight.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navRight.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navRight.classList.contains("open")) {
      navRight.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.focus();
    }
  });
}

// Both public translations use the same section IDs. Retain the current section
// when a visitor changes language; ordinary links still work without JavaScript.
document.querySelectorAll(".language-switch a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.location.hash) {
      const destination = new URL(link.href);
      destination.hash = window.location.hash;
      link.href = destination.href;
    }
  });
});

// Content starts visible in the HTML. Only animate sections below the viewport
// after the observer is ready, so no-script and reduced-motion remain readable.
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const sections = [...document.querySelectorAll("main > section:not(#hero)")].filter(
    (section) => section.getBoundingClientRect().top > window.innerHeight * 0.8,
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );

  sections.forEach((section) => {
    section.classList.add("will-reveal");
    observer.observe(section);
  });
}
