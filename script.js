const rows = [...document.querySelectorAll("#tool-rows tr")];
const filters = [...document.querySelectorAll(".filter")];
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");
const count = document.querySelector("#visible-count");
let activeFilter = "all";

function updateRows() {
  const query = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  for (const row of rows) {
    const matchesCategory = activeFilter === "all" || row.dataset.category === activeFilter;
    const matchesQuery = !query || row.dataset.search.toLocaleLowerCase().includes(query);
    const show = matchesCategory && matchesQuery;
    row.hidden = !show;
    if (show) visible++;
  }
  count.textContent = visible;
  empty.hidden = visible !== 0;
}

filters.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle("active", item === button));
  updateRows();
}));
search.addEventListener("input", updateRows);
updateRows();
