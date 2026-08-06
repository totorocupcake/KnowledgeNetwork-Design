One-line: the walk's stop track — one dot per stop, clickable to jump.

```jsx
{stops.map((s, i) => <StepDot key={i} n={i + 1} state={i === cursor ? 'current' : i < cursor ? 'done' : 'ahead'} title={s.note} />)}
```

Acorn is load-bearing here: it means "on the authored path".
