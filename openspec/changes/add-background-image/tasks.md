## 1. Planning
- [ ] 1.1 Confirm `assets/images/computer-background.png` is present and sized for desktop use.

## 2. Implementation
- [ ] 2.1 Update `style.css` (or relevant global stylesheet) to apply the computer background image to the app background layer.
- [ ] 2.2 Ensure CSS uses `background-size: cover` (or equivalent) so the image stretches to fill large viewports but never scales down below its native resolution.
- [ ] 2.3 Keep existing layout readable by preserving foreground container contrast (e.g., glass panels, gradients).

## 3. Validation
- [ ] 3.1 Manually load `index.html` in a desktop browser, confirm the background image fills the viewport without tiling, and content remains legible.
- [ ] 3.2 Resize the window to ensure the image maintains coverage and never appears scaled below its original size.
