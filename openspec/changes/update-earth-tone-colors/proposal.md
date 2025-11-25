# Change: Update earth-tone color scheme

## Why
The user requested a warmer, earth-tone color palette to replace the current blue/purple/pink cyberpunk aesthetic. The new palette features browns, beiges, and toffee tones that provide a more grounded, natural visual theme while maintaining professional appearance and accessibility standards.

## What Changes
- Replace all CSS custom properties in `:root` with earth-tone colors:
  - Coffee Bean (#24180e) → main background
  - Dark Khaki 2 (#443b26) → panel/card backgrounds
  - Dark Khaki (#5a5039) → card alternates
  - Toffee Brown (#966f44) → primary accent color
  - Pearl Beige (#d4cca9) → text color
- Remove decorative gradient overlays in `body::after` that use cyan/pink radial gradients
- Remove entire `.orb-field` system including `.orb`, `.orb--1` through `.orb--5` classes and their animations (`@keyframes orbFloatA` through `orbFloatE`)
- Update all hard-coded rgba colors throughout `style.css` to align with new earth-tone palette
- Ensure all text-on-background combinations meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Remove or replace color-specific references in shadows, borders, and focus states to use new palette

## Impact
- Affected specs: `visual-theming`
- Affected code: `style.css` (comprehensive update to color system, removal of decorative elements)
- User impact: Completely different visual aesthetic—warmer, simpler, more accessible
- Accessibility: Enhanced compliance with WCAG AA standards through validated contrast ratios
