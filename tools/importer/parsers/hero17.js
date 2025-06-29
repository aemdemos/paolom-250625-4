/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero17)'];

  // 2. Background image row - look for image inside the block (first img found is background image)
  let img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Content row
  // The content cell includes headline, subheading (if present), and CTAs (if present)
  const contentCell = [];

  // Headline (h1)
  const h1 = element.querySelector('h1');
  if (h1) contentCell.push(h1);

  // Subheading: h2, h3, or paragraph etc - not present in this HTML, but handle for robustness
  // We'll collect all headings below h1, and all direct paragraph children under the primary content container
  // Find the main content container
  let mainContentContainer = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      mainContentContainer = div;
      break;
    }
  }
  if (!mainContentContainer) {
    // fallback to search in the whole element
    mainContentContainer = element;
  }
  // Add any h2, h3, h4, or paragraphs below h1 (but dedupe h1)
  const possibleSubs = Array.from(mainContentContainer.querySelectorAll('h2, h3, h4, p'));
  for (const sub of possibleSubs) {
    // Don't include empty or whitespace paragraphs
    if (sub.textContent && sub.textContent.trim()) {
      contentCell.push(sub);
    }
  }

  // Call-to-action(s): all links in button group after main heading
  let ctaLinks = [];
  const buttonGroups = mainContentContainer.querySelectorAll('.button-group');
  for (const group of buttonGroups) {
    ctaLinks = ctaLinks.concat(Array.from(group.querySelectorAll('a')));
  }
  if (ctaLinks.length > 0) {
    // Place links in a paragraph for spacing
    const p = document.createElement('p');
    ctaLinks.forEach(link => p.appendChild(link));
    contentCell.push(p);
  }

  // Compose the content row (always as a single cell, possibly with multiple elements inside)
  const contentRow = [contentCell];

  // Compose table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
