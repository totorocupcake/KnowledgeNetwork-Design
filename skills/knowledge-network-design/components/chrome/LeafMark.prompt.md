One-line: the hand-drawn leaf motif — the brand's one decorative mark; use it cropped at the trailing edge of a toolbar, or very faint behind an empty state.

```jsx
<Toolbar brand="P.Kt" groups={…} motif={<LeafMark base="../.." size={96} tipOnRule />} />
```

**It is a real hand-drawn asset** (`assets/leaf.png`), not a generated shape. Never redraw it in SVG, trace it, or tidy the line — the wobble is the whole point, and it is the only hand-drawn material in the system.

The PNG is drawn in a very pale green that disappears against paper, so `LeafMark` uses it as a **CSS mask** and paints it with `color` (default `--moss-300` at 0.6 opacity) rather than showing the file directly. The drawn line is untouched; the system just controls its weight. That also means the motif follows the palette instead of pinning one hard-coded green — pass `color="var(--moss-500)"` to go heavier, or a bark tone on a coloured ground. Keep it light: it is texture, and it must never compete with the controls beside it.

Set `base` to the path from your page to the project root (`"."` at the root, `"../.."` two deep) or the mask will not resolve.

The house use is **cropped into the corner with the tip on the rule**: pass it to `Toolbar`'s `motif` slot with `tipOnRule`, which anchors it flush bottom-right and clips it, so the blade's point rests exactly on the toolbar's bottom border while the rest of the leaf hangs below and is cut off. **Size it taller than the strip** (≈96 in a 44px toolbar) — the artwork is drawn pre-cropped, with the blade already running off the right of its own canvas and empty space at the left and bottom, so it expects to overflow rather than sit centred in a box.

`tipOnRule` works off two measured constants in the component (the artwork's aspect, and the tip at 45.1% of its height). **Re-measure both if the drawing is replaced** — otherwise the tip drifts off the rule. Cropping is what keeps the leaf a texture instead of reading as a logo; same idea on an empty state: oversize it, drop it to ~0.2, and let the container cut it.

Rules: **one per surface.** Never inside a button, a row, or anything interactive — it carries no state and means nothing clickable. Never paint it a `--domain-*` or `--edge-*` hue; a data colour on a decorative mark reads as a claim about the data.
