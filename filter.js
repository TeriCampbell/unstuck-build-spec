/**
 * Journey filter for index.html — data-journey on .journey-card
 * Values: all | first-plan | return-next | return-update | checkin-replan | crisis | flagged | counselor
 */
(function () {
  const bar = document.querySelector(".filter-bar");
  if (!bar) return;

  const cards = document.querySelectorAll(".journey-card");
  const buttons = bar.querySelectorAll("button[data-filter]");

  function apply(filter) {
    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    cards.forEach((card) => {
      const journeys = (card.dataset.journey || "").split(/\s+/);
      const show = filter === "all" || journeys.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.dataset.filter));
  });

  apply("all");
})();
