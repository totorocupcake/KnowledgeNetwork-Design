One-line: the tree pane's row; use it for any indented containment list.

```jsx
<TreeRow title="Protocol Stack" domain="net" depth={1} container expanded onToggle={t} onSelect={s} onZoom={z} />
```

Only topics have a `linkCount`. A single click selects; a double click re-roots the pane — hold the select for one tick so the double click can cancel it.
