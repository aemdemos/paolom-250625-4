/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion header row, must match example exactly
  const headerRow = ['Accordion'];

  // Get all direct children with class 'accordion' (one per item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  
  // Each item is a row: [title cell, content cell]
  const rows = accordionItems.map(item => {
    // Title: usually in .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    let titleCell = null;
    if (toggle) {
      titleCell = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: usually in nav.w-dropdown-list > .utility-padding-all-1rem > .w-richtext
    const nav = item.querySelector(':scope > .w-dropdown-list');
    let contentCell = null;
    if (nav) {
      // Try to find rich text
      const pad = nav.querySelector(':scope > .utility-padding-all-1rem');
      if (pad) {
        const rich = pad.querySelector(':scope > .w-richtext');
        contentCell = rich || pad;
      } else {
        // fallback: just use nav
        contentCell = nav;
      }
    }
    // Defensive fallback to avoid empty rows
    if (!titleCell) titleCell = document.createTextNode('');
    if (!contentCell) contentCell = document.createTextNode('');
    return [titleCell, contentCell];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
