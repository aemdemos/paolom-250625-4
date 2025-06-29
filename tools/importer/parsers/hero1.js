/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (each tab is a hero variant)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  if (!tabPanes.length) return;

  const blocks = [];

  tabPanes.forEach((tabPane) => {
    // Find the grid layout in this pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    
    // Get all children of the grid
    const children = Array.from(grid.children);
    // Find the image (first IMG element)
    const img = children.find(el => el.tagName === 'IMG');
    // Everything that is not an image
    const textContent = children.filter(el => el.tagName !== 'IMG');

    // Compose textContent as a single cell, referencing the existing elements in order
    let textCell;
    if (textContent.length === 1) {
      textCell = textContent[0];
    } else if (textContent.length > 1) {
      textCell = textContent;
    } else {
      textCell = '';
    }
    
    const cells = [
      ['Hero (hero1)'],
      [img || ''],
      [textCell]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    blocks.push(block);
  });

  // Replace the original element with all blocks (in order)
  if (blocks.length === 1) {
    element.replaceWith(blocks[0]);
  } else if (blocks.length > 1) {
    const wrapper = document.createElement('div');
    blocks.forEach(b => wrapper.appendChild(b));
    element.replaceWith(wrapper);
  }
}
