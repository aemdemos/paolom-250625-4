/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract text content for a card
  function extractTextContent(cardDiv) {
    // Look for a heading or text node sibling after the image
    // Try heading, then paragraph, then all text
    let textParts = [];
    // If cardDiv has more than just the image, collect text nodes
    // For this HTML, there is only an image, so text cell will be empty
    // But the logic below will handle variants if text is present.
    // Try all child elements except for images
    const children = Array.from(cardDiv.children);
    for (const child of children) {
      if (child.tagName && child.tagName.toLowerCase() === 'img') continue;
      // If heading or paragraph, push the element
      if (/^h[1-6]$/i.test(child.tagName) || child.tagName.toLowerCase() === 'p' || child.tagName.toLowerCase() === 'a') {
        textParts.push(child);
      } else if (child.textContent && child.textContent.trim()) {
        // Fallback: push any element with text
        textParts.push(child);
      }
    }
    // In case there is no text element, check for text nodes after the image
    if (!textParts.length) {
      // Find the img
      const img = cardDiv.querySelector('img');
      if (img) {
        let next = img.nextSibling;
        while (next) {
          if (next.nodeType === 3 && next.textContent.trim()) {
            // text node
            textParts.push(document.createTextNode(next.textContent));
          } else if (next.nodeType === 1 && next.textContent.trim()) {
            textParts.push(next);
          }
          next = next.nextSibling;
        }
      }
    }
    // Return the cell content: if nothing, return empty string
    if (!textParts.length) return '';
    if (textParts.length === 1) return textParts[0];
    return textParts;
  }

  const cardDivs = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    const textContent = extractTextContent(div);
    return [img || '', textContent];
  });

  const tableRows = [
    ['Cards (cards5)'],
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
