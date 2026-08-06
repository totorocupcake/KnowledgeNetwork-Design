One-line: a row in the instrument palette; the bullet marks whether the pane is in the composition.

```jsx
<InstrumentRow label="Lens: uses" on swatch="var(--edge-uses)" onClick={toggle} />
```

Only lens rows carry a `swatch`, and it is always an `--edge-*` colour.

**The selection bullet is a system mark, not a glyph.** `bulletStyle(on)` is exported from this file (a lower-case export, so it is reachable by components *inside* the system — a consuming page gets the mark by using `InstrumentRow`, or by copying the four lines below): an 8px disc, filled `--accent-primary` when on and an inset 1.5px `--text-3` ring when off, in a 12px slot. Use it — never `●`/`○` — in any list where a row is IN or OUT of something: instruments, lenses, filters, saved views. Typed bullets are two different weights in the same face, sit off the baseline, and rescale with the font; the drawn disc holds one size and one weight everywhere, and it matches `DomainDot`'s 8px so both marks can share a column.

It is a **state light**, not a control glyph: no third state (that is `disabled`, which dims the whole row), and no radio semantics — rows toggle independently. The row says the same thing twice on purpose: the bullet fills and the label steps `--fw-medium` → `--fw-semibold`, so the state survives being read at a glance or in greyscale.
