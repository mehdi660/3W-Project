const filterBtn = document.getElementById("open-filter");
const filtersSection = document.querySelector(".filters");

filterBtn.addEventListener("click", () => {
  filtersSection.classList.toggle("hidden");

  if (filtersSection.classList.contains("hidden")) {
    filterBtn.textContent = "Open Filters";
  } else {
    filterBtn.textContent = "Close Filters";
  }
});

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  filtersSection.classList.add("hidden");
  filterBtn.textContent = "Open Filters";
});
