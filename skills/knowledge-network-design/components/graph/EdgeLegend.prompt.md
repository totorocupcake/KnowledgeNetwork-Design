One-line: the four-relation legend for any view that draws typed links.

```jsx
<EdgeLegend />
```

Labels are fixed: `builds on`, `uses`, `see also`, `implemented with`. Do not rename them, and do not add a fifth relation the corpus does not author.

**One ink for a relation name.** "builds on", "uses", "see also", "implemented with" are corpus content, not chrome: wherever a relation is named — in this legend or beside a link in a list — it is `--fs-caption` / `--text-2` / `--fw-medium` with its coloured rule. Never `--text-3`; that reads as a hint, and the same word appearing at two inks in one pane looks like two different kinds of thing.

**The dash is `EdgeDash`, never a styled `<span>`.**

```jsx
<EdgeDash color="var(--edge-uses)" width={16} />
```

A 3px CSS box lands on a different subpixel offset in every row, because the line boxes above it are fractional — so some dashes antialias across four device rows and read thicker than their neighbours in the same list. `EdgeDash` is an SVG rect with `shape-rendering="crispEdges"`, which snaps every instance to the same device-pixel height wherever it sits. Ends are square as a result; do not try to round them back. Reach for it anywhere a hairline-scale bar repeats down a list — a legend, a link list, a lens picker.
