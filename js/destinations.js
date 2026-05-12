const citiesDiv = document.querySelector(".cities");
let citiesJSON;
let destinations = "Wszystkie";
let firstCitiesLoad = true;

fetch("assets/cities.json")
  .then((response) => response.json())
  .then((data) => {
    citiesJSON = data;
    showCities();
  });

const waitForCityImages = () => {
  const images = [...citiesDiv.querySelectorAll("img")];

  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }),
  );
};

const showCities = async () => {
  citiesDiv.classList.remove("loaded", "animate-load");

  if (firstCitiesLoad) {
    citiesDiv.classList.add("is-loading");
  } else {
    citiesDiv.classList.remove("is-loading");
  }

  let arr;

  if (destinations === "Wszystkie") {
    arr = Object.values(citiesJSON).flat();
  } else {
    arr = citiesJSON[destinations];
  }

  let html = "";

  for (const x of arr) {
    html += `
      <a href="hotels.html">
        <article class="card">
          <img src="${x.img}" width="300" height="300" alt="${x.name}" />
          <h3>${x.name}</h3>
          <p>od <span class="cena">${x.price} zł</span>/noc</p>
        </article>
      </a>
    `;
  }

  citiesDiv.innerHTML = html;

  await waitForCityImages();

  requestAnimationFrame(() => {
    if (firstCitiesLoad) {
      citiesDiv.classList.add("animate-load", "loaded");
      citiesDiv.classList.remove("is-loading");
      firstCitiesLoad = false;
    } else {
      citiesDiv.classList.add("loaded");
    }
  });
};

const buttons = document.querySelectorAll(".continents button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    destinations = button.textContent;
    showCities();
  });
});
