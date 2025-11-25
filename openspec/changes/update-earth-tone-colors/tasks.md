## 1. Update CSS Custom Properties
- [x] 1.1 Replace `--bg-main` with Coffee Bean (#24180e)
- [x] 1.2 Replace `--bg-panel` and `--bg-card` with Dark Khaki 2 (#443b26) at appropriate opacity
- [x] 1.3 Replace `--bg-card-alt` with Dark Khaki (#5a5039) at appropriate opacity
- [x] 1.4 Replace `--accent`, `--accent-secondary`, and `--accent-hot` with Toffee Brown (#966f44)
- [x] 1.5 Replace `--text-primary` with Pearl Beige (#d4cca9)
- [x] 1.6 Replace `--text-muted` with Pearl Beige at reduced opacity
- [x] 1.7 Update `--border-soft` to use rgba variant of Toffee Brown or Pearl Beige
- [x] 1.8 Update `--shadow-soft` to use rgba variant of Coffee Bean
- [x] 1.9 Verify all CSS custom properties use earth-tone palette values

## 2. Remove Decorative Gradient Overlay
- [x] 2.1 Remove cyan and pink radial-gradient definitions from `body::after` pseudo-element
- [x] 2.2 Replace with simple earth-tone overlay or transparent wash if needed
- [x] 2.3 Confirm background displays only computer image without multi-color gradients

## 3. Remove Orb Animation System
- [x] 3.1 Delete `.orb-field` class and all its properties
- [x] 3.2 Delete `.orb` base class with all animation and styling rules
- [x] 3.3 Delete `.orb--1`, `.orb--2`, `.orb--3`, `.orb--4`, and `.orb--5` variant classes
- [x] 3.4 Delete `@keyframes orbFloatA`, `orbFloatB`, `orbFloatC`, `orbFloatD`, and `orbFloatE` animations
- [x] 3.5 Delete `@media (prefers-reduced-motion: reduce)` rule for `.orb` if no other usage exists
- [x] 3.6 Verify no orb elements render in browser and no console errors appear

## 4. Update Hard-Coded Colors
- [x] 4.1 Find and replace all hard-coded rgba colors in text-shadow properties
- [x] 4.2 Update all box-shadow rgba colors to earth-tone variants
- [x] 4.3 Update border rgba colors to earth-tone palette
- [x] 4.4 Replace background gradient rgba colors with earth-tone equivalents
- [x] 4.5 Update focus state colors to use Toffee Brown or Pearl Beige
- [x] 4.6 Update hover state colors to use earth-tone palette
- [x] 4.7 Visually inspect all interactive states (hover, focus, active) in browser

## 5. Validate Accessibility Compliance
- [ ] 5.1 Test Pearl Beige (#d4cca9) on Coffee Bean (#24180e) contrast ratio (target: ≥4.5:1)
- [ ] 5.2 Test Pearl Beige on Dark Khaki 2 (#443b26) contrast ratio (target: ≥4.5:1)
- [ ] 5.3 Test Toffee Brown (#966f44) on dark backgrounds for accent elements (target: ≥3:1 for large text)
- [ ] 5.4 Adjust opacity values if any combination fails WCAG AA requirements
- [ ] 5.5 Document final contrast ratios for all text-on-background combinations
- [ ] 5.6 Run accessibility audit in Chrome DevTools or axe DevTools

## 6. Final Verification
- [ ] 6.1 Test all preset options (Career Coach, UX Writer, Health Coach, Language Tutor, Startup Advisor) populate correctly
- [ ] 6.2 Verify clipboard copy functionality works with "Copy Prompt" button
- [ ] 6.3 Check browser console for any errors or warnings
- [ ] 6.4 Confirm keyboard navigation (Tab, Enter, Escape) functions properly
- [ ] 6.5 Verify ARIA attributes and roles remain unchanged
- [ ] 6.6 Complete full user workflow from preset selection through prompt editing to clipboard copy
