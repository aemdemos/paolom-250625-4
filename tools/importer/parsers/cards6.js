/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Select all immediate <a> children (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach(card => {
    // First cell: image element (the <img>), referenced directly from the DOM
    let imageEl = null;
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    if (imgWrapper) {
      imageEl = imgWrapper.querySelector('img');
    }

    // Second cell: all text content (tag, heading, paragraph)
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const textCellContents = [];
    if (textDiv) {
      // Tag (only if present)
      const tag = textDiv.querySelector('.tag-group .tag');
      if (tag) {
        textCellContents.push(tag);
      }
      // Heading (h3)
      const heading = textDiv.querySelector('h3');
      if (heading) {
        textCellContents.push(heading);
      }
      // Description (p)
      const paragraph = textDiv.querySelector('p');
      if (paragraph) {
        textCellContents.push(paragraph);
      }
    }
    rows.push([
      imageEl,
      textCellContents
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
