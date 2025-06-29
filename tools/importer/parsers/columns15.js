/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate columns
  const columnDivs = element.querySelectorAll(':scope > div');
  const columnsCount = columnDivs.length;

  // Header row: as many columns as the content row, only first cell has the block name
  const headerRow = ['Columns (columns15)'];
  while (headerRow.length < columnsCount) {
    headerRow.push('');
  }

  // Content row: each cell is a div (column)
  const contentRow = Array.from(columnDivs);

  // Build and replace
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
