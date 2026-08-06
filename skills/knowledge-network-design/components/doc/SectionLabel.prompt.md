One-line: the small lower-case heading that opens a section inside a pane.

```jsx
<SectionLabel count={2}>walks through here</SectionLabel>
```

**Every section head in the app is this component.** `--fs-caption` / `--fw-bold` / `--text-1` in the display face — rank 4 of the ladder. When the head needs a button beside it, pass `action`; do not build the row by hand. Hand-rolled heads are how this system acquired three different inks for one rank.

**The `count` is not emphasised with the label, and that is the point.** It sits in mono at `--text-2` / `--fw-medium` beside a bold `--text-1` word: mono says “this is a figure, not a quieter word”, and the ink step says the head names the section while the number only reports on it. Two type ranks in one line is correct here — they are two kinds of content, not two levels of importance. But keep the drop to ONE step: mono at regular against bold text-1 falls away on family, weight and ink at once, and the number stops looking attached to its head.

An outer group head that nests another group head beneath it — the map's domain over its modules — may step up to `--fs-body`, keeping bold and `--text-1`. That is the only permitted variation.
