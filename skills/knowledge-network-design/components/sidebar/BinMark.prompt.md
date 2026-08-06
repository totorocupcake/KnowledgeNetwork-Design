One-line: the bin mark for deleting a user-saved thing — inherits `currentColor`, so put it inside a normal icon button and let the button own the colour and hover.

```jsx
<button style={iconButtonStyle}><BinMark /></button>
```

This is the **only** drawn icon in the system, and it exists because Unicode has no bin in the house weight class — `🗑` renders as emoji at 10.5px against a 12–15px glyph set. Do not take it as licence to draw more marks: for anything else, find a geometric Unicode glyph that measures 12–15px at 15px.

Reserve it for destructive removal of something the user made. `✕` still means *remove from the composition*, which is a different, non-destructive act.
