/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const rows = [['Cards']];
  // Each card is a direct child div
  const cards = element.querySelectorAll(':scope > div');
  cards.forEach((card) => {
    // Each card has an icon and a p, but only the p is needed
    const p = card.querySelector('p');
    if (p) {
      rows.push([p]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
