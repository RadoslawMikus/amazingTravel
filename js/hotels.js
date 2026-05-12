const roomsDiv = document.querySelector(".all_rooms");
let roomsJSON;
let roomType = "Wszystkie";
let firstRoomsLoad = true;

fetch("assets/rooms.json")
  .then((response) => response.json())
  .then((data) => {
    roomsJSON = data;
    showRooms();
  });

const waitForRoomImages = () => {
  const images = [...roomsDiv.querySelectorAll("img")];

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

const showRooms = async () => {
  roomsDiv.classList.remove("loaded", "no-animation");
  roomsDiv.innerHTML = "";

  let arr;

  if (roomType === "Wszystkie") {
    arr = Object.values(roomsJSON).flat();
  } else {
    arr = roomsJSON[roomType];
  }

  let html = "";

  for (const x of arr) {
    html += `
      <article class="card">
        <img src="${x.img}" width="400" height="260" alt="${x.name}"/>
        <div class="text">
          <h3>${x.name}</h3>
          <p>
            Komfortowy pokój premium z wyjątkowym widokiem
            i nowoczesnym wyposażeniem.
          </p>
          <span>
            od <span class="cena">${x.price} zł</span>/noc
          </span>
        </div>
        <a href="contact.html" class="button">Zobacz</a>
      </article>
    `;
  }

  roomsDiv.innerHTML = html;

  await waitForRoomImages();

  requestAnimationFrame(() => {
    if (firstRoomsLoad) {
      roomsDiv.classList.add("loaded");
      firstRoomsLoad = false;
    } else {
      roomsDiv.classList.add("loaded", "no-animation");
    }
  });
};

const buttons = document.querySelectorAll(".select_room button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    roomType = button.textContent;
    showRooms();
  });
});
