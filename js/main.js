document.addEventListener("click", (e) => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (navbar && hamburger) {
    navbar.classList.toggle("open");
  }
});
