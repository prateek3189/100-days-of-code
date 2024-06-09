const mobileMenuButton = document.getElementById("mobile-menu");
const mobileMenu = document.querySelector(".mobile-menu-aside");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("open");
}

mobileMenuButton.addEventListener("click", toggleMobileMenu);
