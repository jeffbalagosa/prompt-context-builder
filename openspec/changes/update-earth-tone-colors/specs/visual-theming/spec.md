# visual-theming Specification Delta

## MODIFIED Requirements

### Requirement: Earth-tone color palette with accessibility compliance
The application SHALL use a warm, earth-tone color scheme defined by five core colors (Coffee Bean #24180e, Dark Khaki 2 #443b26, Dark Khaki #5a5039, Toffee Brown #966f44, Pearl Beige #d4cca9) mapped to semantic CSS custom properties. All text-on-background color combinations MUST meet WCAG AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text 18pt+) to ensure readability and accessibility compliance.

#### Scenario: Primary text legibility
- **WHEN** the user views any primary text content (headings, labels, body text)
- **THEN** the text color (Pearl Beige #d4cca9) on dark backgrounds achieves at least 4.5:1 contrast ratio
- **AND** all text remains clearly readable without eye strain

#### Scenario: Interactive element focus states
- **WHEN** a user focuses on an interactive element (input, textarea, button, select)
- **THEN** the focus indicator uses Toffee Brown (#966f44) or Pearl Beige with sufficient contrast against its background
- **AND** the focus state is clearly distinguishable from the unfocused state

#### Scenario: Color role mapping
- **WHEN** the stylesheet defines color roles via CSS custom properties
- **THEN** Coffee Bean (#24180e) is assigned to `--bg-main`
- **AND** Dark Khaki 2 (#443b26) is assigned to `--bg-panel` and `--bg-card`
- **AND** Dark Khaki (#5a5039) is assigned to `--bg-card-alt`
- **AND** Toffee Brown (#966f44) is assigned to `--accent`, `--accent-secondary`, and `--accent-hot`
- **AND** Pearl Beige (#d4cca9) is assigned to `--text-primary` and lighter variants to `--text-muted`
- **AND** all derived colors (borders, shadows) use rgba variants of these five base colors

### Requirement: Simplified visual design without decorative gradients
The application SHALL remove all decorative gradient overlays and animated orb elements to achieve a cleaner, more focused visual presentation. The background SHALL consist solely of the computer-themed background image and solid or subtly transparent color layers without multi-color radial gradients.

#### Scenario: Background overlay removal
- **WHEN** the application renders the background
- **THEN** the `body::after` pseudo-element does NOT contain cyan, pink, or multi-color radial gradients
- **AND** any overlay uses only solid earth-tone colors or simple transparent washes

#### Scenario: Orb animation system removal
- **WHEN** the stylesheet is parsed
- **THEN** no `.orb`, `.orb-field`, `.orb--1` through `.orb--5` classes exist
- **AND** no `@keyframes orbFloatA` through `orbFloatE` animations are defined
- **AND** the DOM does not render any orb elements

#### Scenario: Visual simplicity
- **WHEN** the user views the application interface
- **THEN** the visual design emphasizes content over decoration
- **AND** no animated colored orbs distract from the prompt-building workflow
- **AND** the earth-tone palette provides a cohesive, professional appearance
