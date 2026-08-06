One-line: the house action control — a pill; use it for every button in a pane, toolbar or header.

```jsx
<PillButton tone="walk" glyph="\u25b6" onClick={start}>walk this</PillButton>
```

Tones: `quiet` (default), `primary` (moss — the affirmative action), `walk` (acorn — ONLY for things on the authored path), `danger`, `ghost`. `size="sm"` for dense pane headers. `selected` marks a toggle that is on. Labels are lower case and name a state ("optionals: on the road"), not a command.
