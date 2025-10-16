# Task List: XML Output Mode
**Based on:** `0001-prd-xml-output-mode.md`
**Created:** October 15, 2025

---

## Relevant Files

- `index.html` - Add format toggle UI control in the `.page-header` section near the preset picker
- `app.js` - Core logic for XML generation, format toggle handling, and copy button integration
- `style.css` - Styling for the format toggle control to match existing UI patterns

### Notes

- This project uses vanilla JavaScript with no build process or external dependencies
- All functionality must work offline and client-side only
- Follow existing code conventions in `app.js` (ES6, pure functions, DOM manipulation)
- Maintain ARIA accessibility standards for the format toggle
- No test files are needed as this project uses manual testing only

---

## Tasks

- [ ] 1.0 Add Format Toggle UI to Header
  - [ ] 1.1 Locate the `.page-header` section in `index.html` (around line 18)
  - [ ] 1.2 Add a new `<div class="format-toggle">` container after the `.preset-picker` div (before closing `</header>`)
  - [ ] 1.3 Add a `<label for="formatSelect">` with text "Output format"
  - [ ] 1.4 Add a `<select id="formatSelect">` element with `aria-label="Output format selector"`
  - [ ] 1.5 Add two `<option>` elements: `<option value="markdown" selected>Markdown</option>` and `<option value="xml">XML</option>`
  - [ ] 1.6 Verify the format toggle appears in the header near the preset picker when opening `index.html` in browser

- [ ] 2.0 Implement XML Escaping Helper Function
  - [ ] 2.1 Open `app.js` and locate the utility functions section (after the presets array, around line 170)
  - [ ] 2.2 Create a new function `escapeXML(str)` that takes a string parameter
  - [ ] 2.3 Implement the escaping logic: replace `&` with `&amp;` (must be first to avoid double-escaping)
  - [ ] 2.4 Chain additional replacements: `<` to `&lt;`, `>` to `&gt;`, `"` to `&quot;`, `'` to `&apos;`
  - [ ] 2.5 Return the escaped string
  - [ ] 2.6 Test the function manually in browser console with test strings containing special characters (e.g., `escapeXML("Test <tag> & 'quotes'")`))

- [ ] 3.0 Implement XML Payload Builder Function
  - [ ] 3.1 Locate the existing `buildPromptPayload()` function in `app.js` (around line 399)
  - [ ] 3.2 Create a new function `buildXMLPayload()` immediately after `buildPromptPayload()`
  - [ ] 3.3 Start with the XML declaration: `<?xml version="1.0" encoding="UTF-8"?>\n`
  - [ ] 3.4 Open the root `<prompt>` tag
  - [ ] 3.5 Add `<role>` element with escaped content from `fields.role.value.trim()`
  - [ ] 3.6 Add `<objective>` element with escaped content from `fields.objective.value.trim()`
  - [ ] 3.7 Add `<instructions>` element with escaped content from `fields.instructions.value.trim()`
  - [ ] 3.8 Add `<context>` element with escaped content from `fields.context.value.trim()` (use empty tag if blank)
  - [ ] 3.9 Add nested `<examples>` section with `<good>` and `<bad>` child elements (use empty tags for blank fields)
  - [ ] 3.10 Add `<constraints>` element with escaped content (use empty tag if blank)
  - [ ] 3.11 Add nested `<output>` section with `<style>`, `<format>`, and `<verbosity>` child elements
  - [ ] 3.12 Add `<thinkingEffort>` element with value from dropdown
  - [ ] 3.13 Close the root `</prompt>` tag
  - [ ] 3.14 Apply 2-space indentation for proper XML formatting
  - [ ] 3.15 Return the complete XML string

- [ ] 4.0 Integrate Format Toggle with Copy Button
  - [ ] 4.1 At the top of `app.js`, add a new DOM reference: `const formatSelect = document.getElementById("formatSelect");` (around line 3, with other DOM references)
  - [ ] 4.2 Locate the `copyPrompt()` function (around line 418)
  - [ ] 4.3 Modify the function to check the current format selection: `const format = formatSelect.value;`
  - [ ] 4.4 Update payload generation to use conditional logic: `const payload = format === 'xml' ? buildXMLPayload() : buildPromptPayload();`
  - [ ] 4.5 Ensure the rest of the copy logic (clipboard API and fallback) remains unchanged
  - [ ] 4.6 Test by selecting Markdown format, filling form fields, and clicking "Copy Prompt" - verify Markdown output
  - [ ] 4.7 Test by selecting XML format, filling form fields, and clicking "Copy Prompt" - verify XML output
  - [ ] 4.8 Test with a preset loaded to ensure both formats work with pre-populated fields
  - [ ] 4.9 Test with special characters in fields (e.g., `<`, `>`, `&`, quotes) to verify XML escaping works correctly

- [ ] 5.0 Add Styling for Format Toggle Control
  - [ ] 5.1 Open `style.css` and locate the `.preset-picker` styles (around line 235)
  - [ ] 5.2 Create a new `.format-toggle` class selector below the preset picker styles
  - [ ] 5.3 Apply `display: flex;`, `flex-direction: column;`, and `gap: 8px;` for layout
  - [ ] 5.4 Style the label with `font-size: 0.875rem;`, `font-weight: 500;`, and `color: var(--text-muted);`
  - [ ] 5.5 Style the select dropdown with consistent border, padding, background, and border-radius to match `.preset-picker select`
  - [ ] 5.6 Use `background: var(--bg-card);`, `border: 1px solid var(--border-soft);`, `border-radius: var(--radius-md);`
  - [ ] 5.7 Add padding: `padding: 10px 14px;`, font styles, and color: `color: var(--text-primary);`
  - [ ] 5.8 Add hover and focus states with `border-color: var(--accent);` and `outline` styling
  - [ ] 5.9 Verify the format toggle visually matches the preset picker styling
  - [ ] 5.10 Test responsive behavior - ensure toggle remains accessible on smaller screens
