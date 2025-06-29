/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the grid of images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each containing the image)
  const slideDivs = Array.from(grid.children);

  // Construct rows for the Carousel block table
  // Header row must be single column: ['Carousel']
  const cells = [['Carousel']];

  // For each slide: image in first cell, empty string in second cell for proper 2-column structure
  slideDivs.forEach((slideDiv) => {
    const aspectDiv = slideDiv.querySelector('.utility-aspect-2x3');
    if (!aspectDiv) return;
    const img = aspectDiv.querySelector('img');
    if (!img) return;
    // Each slide row must be 2 columns: [img, '']
    cells.push([img, '']);
  });

  // Ensure all rows after the header have two columns
  // (Not needed, as above loop always creates two-column rows)

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
