const filterBtn = document.getElementById("open-filter");
const filtersSection = document.querySelector(".filters");

filterBtn.addEventListener("click", () => {
  filtersSection.classList.toggle("hidden");
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  filtersSection.classList.add("hidden");
});
