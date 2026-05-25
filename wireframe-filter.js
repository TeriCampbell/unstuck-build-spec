/** Journey filter for wireframe map table rows */
(function () {
  const bar = document.querySelector(".filter-bar[data-wireframe-filter]");
  if (!bar) return;
  const rows = document.querySelectorAll("tr[data-journey]");
  const buttons = bar.querySelectorAll("button[data-filter]");

  function apply(filter) {
    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    rows.forEach((row) => {
      const journeys = (row.dataset.journey || "").split(/\s+/);
      const show = filter === "all" || journeys.includes(filter);
      row.style.display = show ? "" : "none";
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.filter));
  });
  apply("all");
})();
