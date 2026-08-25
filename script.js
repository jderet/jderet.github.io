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

hamburger.addEventListener("click", () => {
  navRight.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", navRight.classList.contains("open"));
});

// Close mobile menu on link click
navRight.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navRight.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navRight.classList.contains("open")) {
    navRight.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
  }
});
