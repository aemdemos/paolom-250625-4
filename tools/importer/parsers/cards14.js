/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as in the example
  const cells = [['Cards (cards14)']];
  // Get all card anchors directly under the grid
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // Image: first child .utility-aspect-2x3 inside card
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    // Use the <img> element inside as-is
    const img = imageDiv && imageDiv.querySelector('img');
    // Compose the right cell
    const parts = [];
    // Tag and date: the .flex-horizontal row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Reference direct child divs (tag and date)
      const tag = tagRow.children[0];
      const date = tagRow.children[1];
      if (tag) parts.push(tag);
      if (date) parts.push(date);
    }
    // Heading (usually h3)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) parts.push(heading);
    // Only include cells if there is content
    cells.push([
      img || '',
      parts.length ? parts : ''
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
