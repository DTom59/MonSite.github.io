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

// Correction of transition on the Resize page

new ResizeObserver((entries) => {
  if (entries[0].contentRect.width <= 941) {
    navlinksContainer.style.transition = "transform 0.2s 0.15s ease-out";
  } else {
    navlinksContainer.style.transition = "none";
  }
}).observe(document.body);

//API OpenWeather

const weatherAPI = "b8fe848a27a98090e0f21d87f4d69fe4";
const weatherDiv = document.querySelector(".weather");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log(
    "La géolocalisation n'est pas prise en charge par votre navigateur."
  );
  weatherDiv.style.visibility = "hidden";
}

function successCallback(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    weatherAPI +
    "&units=metric&lang=fr";
  fetch(url).then((response) =>
    response.json().then((data) => {
      console.log(data);
      document.querySelector(".city div").innerHTML = data.name;

      document.querySelector(".temp div").innerHTML =
        Math.trunc(data.main.temp) + "°C";

      document.querySelector(".wind div").innerHTML =
        Math.trunc(data.wind.speed) + " km/h";
      winddeg = data.wind.deg;
      const arrowWind = document.querySelector(".arrow-wind");
      arrowWind.style.transform = "rotate(" + winddeg + "deg)";

      document.querySelector(".humidity div").innerHTML =
        data.main.humidity + "%";

      weatherDescri = data.weather[0].description;
      const skyContainer = document.querySelector(".sky .content-div");
      skyContainer.innerHTML = weatherDescri;
      const skyIcon = document.querySelector(".sky-icon");
      if (weatherDescri === "pluie") {
        skyIcon.classList.add("fa-solid", "fa-cloud-rain");
      } else if (weatherDescri === "ensoleillé") {
        skyIcon.classList.add("fa-solid", "fa-sun");
      } else {
        skyIcon.classList.add("fa-solid", "fa-cloud");
      }
    })
  );
}

function errorCallback(error) {
  console.log(
    "Erreur lors de la récupération de la position : " + error.message
  );
}
