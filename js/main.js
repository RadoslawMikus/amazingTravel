Promise.all([
  fetch("components/navbar.html").then((res) => res.text()),
  fetch("components/footer.html").then((res) => res.text()),
]).then(([navbar, footer]) => {
  document.querySelector("#navbar").innerHTML = navbar;
  document.querySelector("#footer").innerHTML = footer;
});

document.addEventListener("click", (e) => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  if (navbar && hamburger) {
    navbar.classList.toggle("open");
  }
});
