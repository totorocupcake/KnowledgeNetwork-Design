One-line: a preset in the Studio sidebar — a saved instrument composition, not a mode.

```jsx
<PresetButton label="Present" hint="map + unfold + document + walk — accumulating, authored order" active onClick={apply} />
<PresetButton label="Custom preset" hint="map + connections" onClick={apply} onDelete={remove} />
```

Pass `onDelete` **only** for user-saved presets — the built-in ones are part of the product and cannot be removed. The bin mark sits in the top-right corner, is invisible until the row is hovered, and turns berry on its own hover, so a destructive control never sits permanently in a scanning list.

The row's border is `--border-rule` at rest **and** on hover — the same weight as
every other rule in the palette. Hover is the `--surface-hover` wash only; active
swaps to `--moss-300` with the primary wash.
