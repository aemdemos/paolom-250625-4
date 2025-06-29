/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    // No columns grid found; nothing to process
    return;
  }
  // The columns are direct children of the grid
  const columns = Array.from(grid.children);
  // Compose the table header and column row
  const headerRow = ['Columns (columns3)'];
  const contentRow = columns.map(col => col);
  // Only create the columns block table, no Section Metadata as per the example
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
