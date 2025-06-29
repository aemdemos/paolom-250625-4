/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Hero (hero8)'];

  // Get immediate children of grid-layout (2 main columns: image, then content)
  const mainGrid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let imgEl = null;
  let contentEl = null;

  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // Typically first child has the image, second has the content
    if (gridChildren.length > 0) {
      imgEl = gridChildren[0].querySelector('img');
    }
    if (gridChildren.length > 1) {
      // The content column may contain nested grid, but we want the whole block
      contentEl = gridChildren[1];
    }
  }

  // Fallbacks for robustness if structure changes
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  if (!contentEl) {
    // Find a container with a heading and CTA
    const allDivs = element.querySelectorAll('div');
    for (const div of allDivs) {
      if (div.querySelector('h1, h2, h3, h4, h5, h6')) {
        contentEl = div;
        break;
      }
    }
    if (!contentEl) {
      contentEl = element;
    }
  }

  // Each row is a single cell (1 col, 3 rows)
  const rows = [
    headerRow,
    [imgEl],
    [contentEl]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
