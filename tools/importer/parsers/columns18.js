/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const container = element.querySelector('.container');
  if (!container) return;
  // Look for the first .grid-layout inside the container (works for desktop/tablet/mobile)
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid--these are the columns
  const columns = Array.from(grid.children);

  // Defensive: skip if no columns
  if (columns.length === 0) return;

  // Table header as per requirements
  const headerRow = ['Columns (columns18)'];
  // Second row: each cell is one column (reference the actual existing elements)
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the block table
  element.replaceWith(table);
}
