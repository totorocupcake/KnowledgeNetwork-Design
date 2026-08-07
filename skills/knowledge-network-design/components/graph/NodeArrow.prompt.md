One-line: the arrow in the gap between two nodes — it says *leads to*, and nothing else.

```jsx
<NodeChip title="IP & Routing" domain="net" mark="border" />
<NodeArrow />
<NodeChip title="TCP & UDP" domain="net" mark="border" />
```

**It is sequence, not a relation.** A typed relation is `EdgeDash` + `EdgeLegend`:
an `--edge-*` hue and the corpus's own `EDGE_LABEL`. This arrow has neither, because
there is nothing to name — the order belongs to the container, not to the corpus.
Never paint it a `--domain-*` or `--edge-*` colour; a data hue on it reads as a claim
about what kind of link this is.

**Acorn is the default tone, and it is not decoration.** A chain of nodes inside a
group is the resolved road, which is the one thing acorn means. `tone="quiet"`
(bark-400) where the sequence is structural rather than authored; `tone="hint"` for a
scaffold.

**Dashed means conditional** — an optional step, a gap awaiting a node — as it does
everywhere else in the system. Never dash for texture.

**Drawn in SVG, like `EdgeDash`.** A 1.5px shaft set as a `<span>` lands on a
different subpixel offset in every gap, so some shafts antialias across two device
rows and read thicker than their neighbours in the same column. `shapeRendering`
snaps every instance to the same device pixel. (The dash length is inlined rather
than read from `--dash-conditional`: an SVG presentation attribute cannot resolve a
custom property, and `var()` there fails silently to no dash at all.)

`VersionedGroup` draws one of these between each pair of its children, with
`pointer-events: none` so a press in the gap reaches the group's drag surface.
