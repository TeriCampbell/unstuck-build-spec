/**
 * Shared build-spec navigation — every HTML page uses the same links.
 * Set <body data-spec-page="fields"> (etc.) for active tab.
 */
(function () {
  const page = document.body.getAttribute('data-spec-page') || '';
  const links = [
    ['index.html', 'Journeys (hub)', 'hub'],
    ['fields.html', 'Fields', 'fields'],
    ['prompts.html', 'Prompts &amp; output', 'prompts'],
    ['wireframe.html', 'Wireframe map', 'wireframe'],
    ['workflows.html', 'Workflows', 'workflows'],
    ['screening.html', 'Screening', 'screening'],
    ['eval.html', 'Evaluation', 'eval'],
    ['data-model.html', 'Data model', 'data-model'],
    ['data-atlas.html', 'Data atlas', 'data-atlas'],
    ['index.html#backlog', 'Backlog', 'backlog'],
  ];
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  nav.innerHTML = links
    .map(function (entry) {
      const href = entry[0];
      const label = entry[1];
      const id = entry[2];
      const active = page === id ? ' class="active"' : '';
      return '<a href="' + href + '"' + active + '>' + label + '</a>';
    })
    .join('');
})();
