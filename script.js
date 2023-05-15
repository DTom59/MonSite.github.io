const hamburger = document.querySelector(".hamburger");
const navlinksContainer = document.querySelector(".navlinks-container");
const main = document.querySelector("main");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navlinksContainer.classList.toggle("open");
  main.classList.toggle("open");
});

function addClass(event) {
  const addonA = event.target.querySelector(".addonA");
  addonA.classList.add("fa-bounce");
}

function removeClass(event) {
  const addonA = event.target.querySelector(".addonA");
  addonA.classList.remove("fa-bounce");
}

const nlA = document.querySelectorAll(".navlinks-container a");

nlA.forEach(function (nlAset) {
  nlAset.addEventListener("mouseenter", addClass);
  nlAset.addEventListener("mouseleave", removeClass);
});

new ResizeObserver((entries) => {
  if (entries[0].contentRect.width <= 941) {
    navlinksContainer.style.transition = "transform 0.2s 0.15s ease-out";
  } else {
    navlinksContainer.style.transition = "none";
  }
}).observe(document.body);

const weatherAPI = "b8fe848a27a98090e0f21d87f4d69fe4";

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=Halluin&appid=" +
  weatherAPI +
  "&units=metric&lang=fr";

fetch(url).then((response) =>
  response.json().then((data) => {
    console.log(data);
    document.querySelector(".city").innerHTML =
      "<i class='fa-solid fa-location-dot pin-icon'></i>" + data.name;
    document.querySelector(".temp").innerHTML =
      "<i class='fa-solid fa-temperature-three-quarters temp-icon'></i>" +
      Math.trunc(data.main.temp) +
      "°C";
    document.querySelector(".sky").innerHTML =
      "<i class='fa-solid fa-cloud cloud-icon'></i>" +
      data.weather[0].description;
    document.querySelector(".wind").innerHTML =
      "<i class='fa-sharp fa-solid fa-arrow-right arrow-wind'></i>" +
      data.wind.speed;
    ddeg = data.wind.deg;
    const arrowWind = document.querySelector(".arrow-wind");
    arrowWind.style.transform = "rotate(" + ddeg + "deg)";
  })
);
