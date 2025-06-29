/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly
  const headerRow = ['Cards (cards16)'];

  // 2. Find all card anchors (each card is a top-level <a> child)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];

  cards.forEach((card) => {
    // Image: first img in card
    const img = card.querySelector('img');
    // Content: the div after the img (contains all text)
    const cardContent = card.querySelector('img ~ div');
    const pieces = [];
    if (cardContent) {
      // Extract meta row (tags and read time)
      const metaDiv = cardContent.querySelector('.flex-horizontal');
      if (metaDiv) pieces.push(metaDiv);
      // Heading
      const heading = cardContent.querySelector('h3, .h4-heading');
      if (heading) pieces.push(heading);
      // Description paragraph
      const desc = cardContent.querySelector('p');
      if (desc) pieces.push(desc);
      // CTA: a div with text 'Read', not part of tag/meta
      const ctas = Array.from(cardContent.querySelectorAll(':scope > div'));
      const cta = ctas.find((d) => d.textContent.trim().toLowerCase() === 'read');
      if (cta) pieces.push(cta);
    }
    rows.push([
      img,
      pieces
    ]);
  });

  // 3. Build and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
