const hamburger = document.querySelector(".hamburger");
const navlinksContainer = document.querySelector(".navlinks-container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navlinksContainer.classList.toggle("open");
});

new ResizeObserver(entries => {
  if(entries[0].contentRect.width <= 850) {
    navlinksContainer.style.transition = "transform 0.3s ease-out"
  } 
  else {
    navlinksContainer.style.transition = "none"
  }
}).observe(document.body);
