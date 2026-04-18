# Factoring Tiles

An interactive, game-style lesson that teaches monic quadratic factoring using the algebra-tiles area model. Drag the board's handles to resize the rectangle and reveal `(v + a)(v + b)`.

## Stack
- React 18 + Vite
- Plain CSS (custom properties for theming, no runtime CSS-in-JS)
- Pointer events for smooth mouse + touch drag
- No animation or UI libraries

## Run

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

Production build:
```bash
npm run build
npm run preview
```

## File tree

```
factoring-tiles/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── index.css
    ├── components/
    │   ├── AppShell.jsx
    │   ├── Header.jsx
    │   ├── ProgressBar.jsx
    │   ├── QuestionPrompt.jsx
    │   ├── AlgebraBoard.jsx
    │   ├── Tile.jsx
    │   ├── DimensionHandle.jsx
    │   ├── StartOverControl.jsx
    │   ├── FooterBar.jsx
    │   ├── CheckButton.jsx
    │   ├── SuccessTray.jsx
    │   ├── ExplanationView.jsx
    │   └── CompletionView.jsx
    ├── data/
    │   └── questions.js
    └── utils/
        ├── format.js
        └── themes.js
```

## Game logic

Each question is defined by:
- `v` - variable symbol (`x`, `y`, `z`, `m`, ...)
- `a`, `b` - positive integer factor pair
- `theme` - visual palette (`blue`, `coral`, `yellow`, `violet`)
- `initialW`, `initialH` - seed board dimensions

Displayed polynomial:  `v² + (a + b)·v + a·b`
Answer: `widthCount × heightCount === {a, b}` (either order accepted).

Validation lives in `src/utils/format.js` (`isCorrectAnswer`).

## Updating the question bank

Edit `src/data/questions.js`. Add rows with `{ id, v, a, b, theme, initialW, initialH }`. Polynomial and factor strings are generated dynamically; no other file needs updates. Theme names map into `src/utils/themes.js` - add a new palette object there to introduce a new color.

## Controls

- Drag the right (vertical pill) handle to change **width** (columns of variable + unit tiles).
- Drag the bottom (horizontal pill) handle to change **height** (rows of variable + unit tiles).
- Keyboard: tab to a handle, then arrow keys (← → on the right handle, ↑ ↓ on the bottom handle) to step in single tile increments.
- `Start over` resets the current question only, keeping session progress and XP.
- `Check` is enabled once the board has been touched.
- `Why?` opens a scrollable explanation view using the learner's own answer.

## Assumptions made

- Initial board state varies per question (`initialW` / `initialH`) so each prompt opens in a distinct layout the learner has to adjust, matching the screenshots.
- Wrong answers trigger a subtle horizontal shake on the board rather than a red error panel.
- XP defaults to `15` per correct answer (see `XP_PER_CORRECT`).
- Factor count is capped at 1-8 per side to keep the board legible.
- The `×` close button asks for confirmation and then restarts the session (no external navigation).
- The completion screen is a simple stats + "Practice again" card; wire to a real router when embedded in a larger lesson flow.

## Extending

- More question types: introduce a new question kind (e.g. `x² - 5x + 6` with negative factors) by adding a `kind` field in `questions.js` and branching inside `AlgebraBoard` / `format.js`. Keep the shared `AppShell`, `Header`, and footer components as-is.
- Alternate explanations: `ExplanationView` reads from `question` + board state; extend it to render step-by-step distribution.
- Persistence: replace in-memory `useState` in `App.jsx` with `localStorage` or a backend mutation.
