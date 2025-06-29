/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required by the block specification - single column
  const headerRow = ['Columns (columns9)'];

  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main content (prefer the image inside)
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Compose the rows: header as single cell, then content row with one cell per column
  const tableRows = [
    headerRow,
    cells
  ];

  // Create the table as per block requirements
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new structured block table
  element.replaceWith(table);
}
