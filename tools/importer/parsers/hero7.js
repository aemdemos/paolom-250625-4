/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of images for the background
  // We want the div with class 'grid-layout desktop-3-column utility-min-height-100dvh'
  let backgroundGrid = null;
  const gridLayouts = element.querySelectorAll('.grid-layout');
  for (const grid of gridLayouts) {
    if (grid.querySelectorAll('img').length >= 3) {
      backgroundGrid = grid;
      break;
    }
  }
  // The hero text content (headline, subheading, CTAs) is inside '.container.small-container'
  let heroContent = element.querySelector('.container.small-container');
  // Build table rows as required by the block spec
  const cells = [
    ['Hero (hero7)'],
    [backgroundGrid],
    [heroContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
