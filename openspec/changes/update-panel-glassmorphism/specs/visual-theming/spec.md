## ADDED Requirements
### Requirement: Glassmorphic prompt panels
The template guide (`.structure-panel`) and prompt builder (`.builder-panel`) SHALL render as translucent glass layers that let the scenic background remain partially visible while preserving readable contrast for all content. Each panel MUST remain colorless (no opaque or tinted fills) and instead rely on clear glass techniques—blur, refraction, highlights, and edge lighting—to make the background image visibly pass through. Nested elements inside the panels (list items, inputs, fieldsets, and action buttons) MUST reuse the glass aesthetic so the entire stack feels cohesive, and every state (default, hover, focus) MUST maintain WCAG-compliant contrast.

#### Scenario: Background remains visible through panels
- **WHEN** the user views either panel over the full-screen background
- **THEN** the background image is visible through the panel surface because the panel has no intrinsic color and only adds blur/refraction
- **AND** panel content (text and icons) retains sufficient contrast for readability

#### Scenario: No tinted overlays
- **WHEN** the user inspects any prompt panel or nested control
- **THEN** there is no colored overlay or tint applied to the background
- **AND** any visual treatment comes solely from neutral highlights, borders, and blur so the underlying art keeps its original palette

#### Scenario: Controls stay accessible in glass theme
- **WHEN** a user interacts with inputs or buttons inside either panel
- **THEN** those elements continue the glassmorphic styling (translucent fills, border glow)
- **AND** focus and hover indicators remain obvious so keyboard and assistive-tech users can track state changes
