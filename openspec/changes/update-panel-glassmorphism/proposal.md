# Change: Add glassmorphic panels over scenic background

## Why
The new background illustration now fills the entire viewport, but the primary panels still look opaque and heavy. Users have asked for translucent, see-through panels so the background imagery feels cohesive without sacrificing readability.

## What Changes
- Rebuild the structure and builder panels as colorless glass overlays that rely on blur, refraction, and subtle edge lights so the computer background is clearly visible through them.
- Adjust supporting elements (list items, inputs, fieldsets) to inherit the transparent aesthetic for a consistent stack of floating panes.
- Tune shadows, borders, and focus states to keep text contrast high and accessibility intact while allowing the background art to peek through.

## Impact
- Affected specs: visual-theming
- Affected code: style.css (panel, list-item, form block styling)
