## ADDED Requirements
### Requirement: Computer-themed background image
The application SHALL display `assets/images/computer-background.png` as the global background layer so the prompt builder sits over a consistent, immersive scene. The image MUST cover the entire viewport by default and MAY upscale beyond its intrinsic dimensions, but it MUST NOT be scaled below its native size, preventing blur from downscaling artifacts.

#### Scenario: Desktop viewport coverage
- **WHEN** the user opens the app on a desktop-sized viewport
- **THEN** the background image fills the whole viewport without tiling or empty margins
- **AND** the prompt-building UI remains legible on top of the image

#### Scenario: Resizing the window larger than the asset
- **WHEN** the viewport becomes larger than the image's intrinsic size
- **THEN** the image scales up proportionally (maintaining aspect ratio) to continue covering the viewport

#### Scenario: Resizing the window smaller than the asset
- **WHEN** the viewport shrinks below the image's intrinsic size
- **THEN** the image retains at least its native resolution (no shrink rendering) while remaining centered behind the UI
