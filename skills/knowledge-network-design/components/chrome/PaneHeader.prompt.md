One-line: the standard pane hat — the title sits on the pane's own border, like a legend.

```jsx
<section style={{ position: 'relative', border: '1px solid var(--border-frame)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-paper)' }}>
  <PaneHeader title="tree" onClose={drop} />
  …
</section>
```

The pane must be `position: relative` and carry the border itself, and its corner radius must be `--radius-lg` (20px) — the header masks the border with a straight 2px bar, which cannot erase a curve, so the `✕` notch is inset to stop exactly where the corner arc begins. A tighter radius leaves a stub of border beside the button. **That inset is also the hard limit on the ✕'s position**: the button is pushed as far right as it goes by unbalancing its own padding (`0 1px 0 5px`), and the notch's left edge moves with it (`left: 4`) so the gap in the frame stays even on both sides of the button instead of trailing off to its left. Do not move it further right — the notch would reach into the arc. `legendBg` must match what is BEHIND the pane (default `--surface-canopy`) — that is what masks the border under the title. Use `variant="bar"` only where a pane sits flush against another surface and there is no border to interrupt.

Titles are lower case and that is **all** a pane header holds — no subtitle, no explanatory line. If a pane needs to explain itself, it does so in its body. Put icon-height pane controls in `actions`; `onClose` renders the `✕` (an 18px box, 10px glyph, tooltip “close”), which hovers like every other icon button. **The ✕ keeps the scrollbar's manners**: absent while the pane is at rest, fading in when the pointer or the keyboard is inside the pane, and receding on the scrollbar's own grace period (`window.PKT_SB.LEAVE`, 500ms) so the control and the bar leave together. Its notch in the frame fades with it — a dormant pane wears an unbroken border, never a gap where a control used to be. The pane element itself is what the header listens to, so `onClose` requires the wrapping `<section>` shown above. A pane is either in the composition or dropped from it — there is no minimized state.

**Weight against the app bar.** The legend is `--fs-title` / `--fw-semibold`; `AppHeader`'s product name is the same size at `--fw-bold`. Order is app name → pane legend → pane section head (`SectionLabel`, `--fs-caption` bold) → sub-head (`--text-2` semibold). The one thing allowed to out-shout a pane legend is `DocHeader`'s node title (`--fs-head`, in the domain hue) — it is the subject the whole workspace is focused on, not chrome.
