# PRD: XML Output Mode

**Feature ID:** 0001
**Status:** Draft
**Created:** October 15, 2025
**Target Audience:** Junior Developer

---

## 1. Introduction/Overview

The Prompt Context Builder currently outputs structured prompts exclusively in Markdown format. This feature adds an XML output mode that allows users to toggle between Markdown and XML formats when copying their prompts. The XML format will enable programmatic parsing, structured documentation integration, and improved interoperability with systems that prefer or require XML.

**Problem:** Users who need to integrate prompts into XML-based systems, parse prompt data programmatically, or maintain structured documentation must manually convert the Markdown output to XML, which is time-consuming and error-prone.

**Goal:** Provide a seamless format toggle that allows users to generate well-structured XML output alongside the existing Markdown format.

---

## 2. Goals

1. **Enable XML export functionality** - Users can generate prompts in valid, nested XML format
2. **Preserve existing Markdown behavior** - Markdown remains the default format, ensuring no disruption to current users
3. **Provide intuitive format switching** - Users can easily toggle between Markdown and XML via a simple UI control
4. **Ensure XML structure consistency** - Generate predictable, well-formed XML that can be reliably parsed by external systems
5. **Maintain offline-first operation** - XML generation must work entirely client-side with no external dependencies

---

## 3. User Stories

Listed in priority order (1 = highest priority):

1. **As a power user**, I want to switch between Markdown and XML formats so that I can use the format that best fits my workflow
   - *Acceptance:* A toggle control in the header allows instant switching between formats
   - *Acceptance:* The copy button respects the selected format
   - *Acceptance:* The toggle state is visually clear

2. **As an API consumer**, I want consistent XML schema so that I can validate prompt structure
   - *Acceptance:* XML output follows a consistent nested structure
   - *Acceptance:* All field names are predictable and stable
   - *Acceptance:* Empty fields are handled consistently (e.g., self-closing tags or placeholder text)

3. **As a developer**, I want to export prompts in XML format so that I can parse them programmatically in my application
   - *Acceptance:* Generated XML is well-formed and parseable by standard XML parsers
   - *Acceptance:* All prompt fields are represented in the XML structure
   - *Acceptance:* Special characters are properly escaped (e.g., `<`, `>`, `&`, quotes)

4. **As a technical writer**, I want XML output so that I can integrate prompts into structured documentation systems
   - *Acceptance:* XML format includes all prompt sections with clear semantic tags
   - *Acceptance:* The hierarchy is logical and mirrors the Markdown structure
   - *Acceptance:* XML can be imported into documentation tools without modification

---

## 4. Functional Requirements

### FR-1: Format Toggle UI Control
The application **must** display a format toggle control in the page header, positioned near the preset picker.

- **FR-1.1:** The toggle must offer two options: "Markdown" and "XML"
- **FR-1.2:** The toggle must be implemented as a native HTML element (toggle switch, radio buttons, or select dropdown) with proper ARIA labels for accessibility
- **FR-1.3:** The toggle must be keyboard accessible and respect tab order
- **FR-1.4:** The toggle must visually indicate which format is currently selected

### FR-2: Default Format Behavior
The application **must** default to Markdown format on initial page load.

- **FR-2.1:** When the page loads, Markdown is pre-selected
- **FR-2.2:** The "Copy Prompt" button generates Markdown output by default
- **FR-2.3:** Existing users experience no change unless they interact with the toggle

### FR-3: XML Generation Logic
The application **must** generate well-formed XML when the XML format is selected.

- **FR-3.1:** The XML structure must follow a nested hierarchy:
  ```xml
  <prompt>
    <role>content</role>
    <objective>content</objective>
    <instructions>content</instructions>
    <context>content</context>
    <examples>
      <good>content</good>
      <bad>content</bad>
    </examples>
    <constraints>content</constraints>
    <output>
      <style>content</style>
      <format>content</format>
      <verbosity>content</verbosity>
    </output>
    <thinkingEffort>content</thinkingEffort>
  </prompt>
  ```
- **FR-3.2:** Special characters must be XML-escaped (e.g., `<` becomes `&lt;`, `>` becomes `&gt;`, `&` becomes `&amp;`, `"` becomes `&quot;`, `'` becomes `&apos;`)
- **FR-3.3:** Empty or whitespace-only fields must render as self-closing tags (e.g., `<role />`) or with placeholder text matching the Markdown behavior
- **FR-3.4:** Multi-line content must preserve line breaks using appropriate XML conventions (e.g., CDATA sections or escaped newlines)

### FR-4: Copy Button Integration
The "Copy Prompt" button **must** respect the selected format.

- **FR-4.1:** When Markdown is selected, copy the Markdown payload (existing behavior)
- **FR-4.2:** When XML is selected, copy the XML payload
- **FR-4.3:** The success message after copying must remain format-agnostic ("Prompt copied to clipboard")

### FR-5: Vanilla JavaScript Implementation
All functionality **must** be implemented using vanilla JavaScript (ES6+).

- **FR-5.1:** No external libraries or frameworks may be added
- **FR-5.2:** All code must operate client-side with no network requests
- **FR-5.3:** Code must follow existing project conventions (see `app.js` for style reference)

---

## 5. Non-Goals (Out of Scope)

The following are **explicitly excluded** from version 1:

- **XML validation UI** - No client-side XML validator or schema validation
- **XML preview/syntax highlighting** - No visual preview of XML output before copying
- **Format persistence** - No localStorage/session storage to remember user's format preference
- **XML schema export** - No separate XSD or schema documentation generation
- **Import from XML** - No ability to parse and load XML back into the form fields
- **JSON or other formats** - Only Markdown and XML are supported
- **Server-side processing** - All operations remain client-side only
- **Custom XML schema configuration** - The XML structure is fixed and not user-configurable

---

## 6. Design Considerations

### 6.1 UI Placement
The format toggle will be positioned in the `.page-header` element, ideally as a second control near the preset picker. This maintains visual hierarchy and groups related controls together.

**Suggested HTML structure:**
```html
<div class="format-toggle">
  <label for="formatSelect">Output format</label>
  <select id="formatSelect" aria-label="Output format selector">
    <option value="markdown" selected>Markdown</option>
    <option value="xml">XML</option>
  </select>
</div>
```

Alternatively, a toggle switch using radio buttons with custom styling to match the existing design aesthetic.

### 6.2 Accessibility
- The toggle must have a visible label ("Output format" or similar)
- ARIA labels must be present (`aria-label`, `aria-labelledby`)
- Keyboard navigation must work (Tab to focus, Space/Enter to toggle)
- Color alone should not convey state (use text labels or icons)

### 6.3 Visual Design
- Match existing UI components (preset picker, copy button) in terms of border radius, colors, and spacing
- Use CSS variables from `style.css` for consistency
- Respect the orb-field gradient background aesthetic
- Ensure toggle is visible against the background

---

## 7. Technical Considerations

### 7.1 XML Escaping
Special characters in user input must be properly escaped. A helper function should handle:
- `<` → `&lt;`
- `>` → `&gt;`
- `&` → `&amp;`
- `"` → `&quot;`
- `'` → `&apos;`

Example implementation approach:
```javascript
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
```

### 7.2 Code Organization
Create a new function `buildXMLPayload()` parallel to the existing `buildPromptPayload()` function in `app.js`. The copy button handler should check the format toggle state and call the appropriate builder.

### 7.3 Browser Compatibility
- The `navigator.clipboard` API is already in use; no changes needed
- The fallback `document.execCommand('copy')` will work with XML strings
- Target modern browsers (ES6+); no polyfills required per project conventions

### 7.4 Testing Approach
Manual testing should verify:
1. Toggle switches between formats correctly
2. Markdown output unchanged (regression test)
3. XML output is well-formed (paste into XML validator)
4. Special characters are escaped in XML
5. Copy button works for both formats
6. Keyboard navigation functions properly
7. Empty fields handled gracefully in both formats

---

## 8. Success Metrics

### Primary Success Criteria
- **Functional correctness:** 100% of prompts generated as valid, parseable XML when XML mode is selected
- **No regressions:** Existing Markdown functionality remains unchanged
- **Zero errors:** No console errors during format switching or copying

### User Experience Metrics
- **Discoverability:** Format toggle is immediately visible and understandable to new users
- **Ease of use:** Users can switch formats and copy in under 3 seconds
- **Accessibility:** Toggle is fully operable via keyboard and screen readers

### Technical Quality Metrics
- **Code simplicity:** XML generation function under 50 lines of code
- **No dependencies:** Zero new npm packages or CDN links added
- **Offline operation:** Feature works without network connectivity

---

## 9. Open Questions

1. **Multi-line content handling:** Should multi-line text fields use CDATA sections, or should newlines be preserved as-is within XML text nodes?
   - *Recommendation:* Preserve newlines as-is (e.g., `\n` becomes actual newline in XML). CDATA adds complexity and most parsers handle newlines fine.

2. **Empty field representation:** Should empty fields use self-closing tags (`<role />`) or empty paired tags (`<role></role>`)?
   - *Recommendation:* Use empty paired tags for consistency and better XML parser compatibility.

3. **XML declaration:** Should the XML output include an XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`)?
   - *Recommendation:* Yes, include the declaration for proper XML compliance.

4. **Indentation and formatting:** Should the XML output be pretty-printed with indentation, or compact?
   - *Recommendation:* Pretty-printed with 2-space indentation for human readability, matching common XML formatting standards.

---

## 10. Implementation Notes for Developer

### File Modifications Required
1. **`index.html`** - Add format toggle UI element in `.page-header`
2. **`app.js`** - Add:
   - `formatSelect` DOM reference
   - `buildXMLPayload()` function
   - `escapeXML()` helper function
   - Update `copyPrompt()` to check format and call appropriate builder
3. **`style.css`** - Add styles for format toggle control to match existing UI

### Implementation Order
1. Add HTML markup for format toggle
2. Add CSS styling for toggle
3. Implement `escapeXML()` helper function
4. Implement `buildXMLPayload()` function
5. Update `copyPrompt()` to handle both formats
6. Add DOM event listener for format toggle
7. Manual testing across both formats
8. Accessibility testing (keyboard navigation, screen reader)

### Testing Checklist
- [ ] Format toggle appears in header near preset picker
- [ ] Markdown is selected by default on page load
- [ ] Switching to XML mode generates valid XML output
- [ ] Special characters (`<`, `>`, `&`, quotes) are properly escaped in XML
- [ ] Copy button copies the correct format
- [ ] Status message appears after successful copy
- [ ] Fallback copy works if clipboard API fails
- [ ] All presets generate valid XML when XML mode is selected
- [ ] Empty fields are handled gracefully
- [ ] Keyboard navigation works (Tab, Space/Enter)
- [ ] No console errors occur during format switching
- [ ] Markdown output unchanged (regression test)

---

## Appendix A: Example XML Output

Given these field values:
- **Role:** "You are a helpful AI assistant"
- **Objective:** "Provide clear & accurate answers"
- **Instructions:** "Use simple language"
- **Context:** (empty)
- **Good Example:** "User: What's 2+2?\nAI: 4"
- **Bad Example:** (empty)
- **Constraints:** "Keep responses under 100 words"
- **Output Style:** "Friendly"
- **Output Format:** "Bullet points"
- **Output Verbosity:** "concise"
- **Thinking Effort:** "medium"

**Expected XML Output:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<prompt>
  <role>You are a helpful AI assistant</role>
  <objective>Provide clear &amp; accurate answers</objective>
  <instructions>Use simple language</instructions>
  <context></context>
  <examples>
    <good>User: What's 2+2?
AI: 4</good>
    <bad></bad>
  </examples>
  <constraints>Keep responses under 100 words</constraints>
  <output>
    <style>Friendly</style>
    <format>Bullet points</format>
    <verbosity>concise</verbosity>
  </output>
  <thinkingEffort>medium</thinkingEffort>
</prompt>
```

Note the `&` character properly escaped as `&amp;` in the objective field.

---

**End of PRD**
