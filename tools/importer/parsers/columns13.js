/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the two primary content columns (left: heading/eyebrow, right: description/author/button)
  const topGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCol = null;
  let rightCol = null;
  if (topGrid) {
    const gridChildren = getChildrenBySelector(topGrid, 'div');
    leftCol = gridChildren[0] || document.createElement('div');
    rightCol = gridChildren[1] || document.createElement('div');
  } else {
    // Fallback: grab first two divs
    const divs = element.querySelectorAll(':scope > div, :scope > section > div');
    leftCol = divs[0] || document.createElement('div');
    rightCol = divs[1] || document.createElement('div');
  }

  // Find the grid containing images for the second row
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCell1 = '';
  let imgCell2 = '';
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs[0]) {
      const img = imgDivs[0].querySelector('img');
      if (img) imgCell1 = img;
    }
    if (imgDivs[1]) {
      const img = imgDivs[1].querySelector('img');
      if (img) imgCell2 = img;
    }
  }

  // Build the table structure
  // Header row must be a single column, exactly as per example:
  const headerRow = ['Columns (columns13)'];
  // Subsequent rows should match the number of columns in the layout (2 columns)
  const firstContentRow = [leftCol, rightCol];
  const secondContentRow = [imgCell1, imgCell2];

  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
