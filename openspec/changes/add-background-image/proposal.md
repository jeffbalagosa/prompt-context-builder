# Change: Add computer background image

## Why
Users requested the app reuse the bundled `assets/images/computer-background.png` graphic as a full-viewport backdrop so the interface feels more polished and immersive on desktop screens.

## What Changes
- Apply `assets/images/computer-background.png` as the global background imagery behind the app content.
- Ensure the image covers the entire viewport, scaling up as needed without shrinking below its intrinsic size so it remains crisp on large displays.
- Keep existing UI legible by layering the app shell above the image with current glassmorphism treatments.

## Impact
- Affected specs: `visual-theming`
- Affected code: `style.css`, potentially supporting assets configuration.
