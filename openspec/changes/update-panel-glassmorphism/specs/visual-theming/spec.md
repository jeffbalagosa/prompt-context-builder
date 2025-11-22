## ADDED Requirements
### Requirement: Glassmorphic prompt panels
The template guide (`.structure-panel`) and prompt builder (`.builder-panel`) SHALL render as translucent glass layers that let the scenic background remain partially visible while preserving readable contrast for all content. Each panel MUST combine semi-transparent gradients, frosted blur, and luminous borders to create the perception of suspended glass. Nested elements inside the panels (list items, inputs, fieldsets, and action buttons) MUST reuse the glass aesthetic so the entire stack feels cohesive, and every state (default, hover, focus) MUST maintain WCAG-compliant contrast.

#### Scenario: Background remains visible through panels
- **WHEN** the user views either panel over the full-screen background
- **THEN** the background image is faintly visible through the panel surface because of semi-transparent fills and blur
- **AND** panel content (text and icons) retains sufficient contrast for readability

#### Scenario: Controls stay accessible in glass theme
- **WHEN** a user interacts with inputs or buttons inside either panel
- **THEN** those elements continue the glassmorphic styling (translucent fills, border glow)
- **AND** focus and hover indicators remain obvious so keyboard and assistive-tech users can track state changes
