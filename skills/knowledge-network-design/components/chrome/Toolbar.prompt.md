One-line: the topmost bar of a surface — icon-only pill actions, grouped by hairline rules.

```jsx
<Toolbar
  brand="P.Kt"
  groups={[
    { items: [{ glyph: '\u229e', title: 'group the selection' }, { glyph: '\u25c7', title: 'optionals: on the road', on: true }] },
    { items: [{ glyph: '\u21b6', title: 'undo' }, { glyph: '\u21b7', title: 'redo', disabled: true }] },
    { items: [{ glyph: '\u25b6', title: 'walk this', tone: 'walk', on: true }] },
  ]}
  motif={<LeafMark size={44} opacity={0.22} />}
/>
```

**A closable pane needs its switch here.** Any pane the user can close (`PaneHeader onClose`) that cannot be reopened from inside the workspace must have a toolbar toggle — first group, `on` while the pane is open. Closing is then reversible, and the toolbar states which panes exist.

**Items are glyph-only.** The action is named in the `title` tooltip, and that tooltip states the current truth ("optionals: on the road"), not a command. Reach for `label` only where a control genuinely cannot be read as a mark. `brand` renders the wordmark when this is the topmost bar; `dense` for a toolbar inside a pane.

**Drawn marks.** `glyph` normally takes a Unicode mark from the house set. Where no glyph reads (the palette pane's switch), pass a small inline SVG instead: `viewBox="0 0 20 20"`, rendered at 17px, `stroke="currentColor"` with `strokeWidth` 1.3–1.5, round caps and joins, and only the smallest details filled — so it sits at the same weight and colour as the glyphs beside it and inherits the on / disabled ink for free. Never an emoji, never a multi-colour icon.

The `motif` slot pins a decorative mark to the trailing edge and **clips it** — the house use is an oversized `LeafMark` running off the bottom rule. It is non-interactive and carries no state. Keep `trailing` for live content (counts, focus); most surfaces need one or the other, not both.
