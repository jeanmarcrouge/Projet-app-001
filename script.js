const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");
const header = document.querySelector(".site-header");
const form = document.getElementById("leadForm");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 8);
});

if (form && emailInput && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      formMessage.textContent = "Veuillez saisir un email valide.";
      formMessage.style.color = "#ffe2e2";
      emailInput.focus();
      return;
    }

    formMessage.textContent = "Merci ! Notre equipe vous contacte rapidement.";
    formMessage.style.color = "#dcfce7";
    form.reset();
  });
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
