/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child <a> elements (tab links)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build the rows: first row is a single-cell header, then 2-cell rows for each tab
  const cells = [];
  // Header row (single cell, as in the example)
  cells.push(['Tabs']);
  // Each tab row: [Tab Label, Tab Content (empty)]
  tabLinks.forEach((a) => {
    let label = '';
    const labelDiv = a.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = a.textContent.trim();
    }
    cells.push([label, '']);
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
