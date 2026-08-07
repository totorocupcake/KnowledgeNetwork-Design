One-line: the node chip — a raised pill with a domain dot; the chip is nowrap and truncates, the full title lives in the tooltip.

```jsx
<NodeChip title="TCP & UDP" domain="net" note="reliable stream over unreliable packets" />
```

`lit` is reserved for hover correspondence across panes. `dim` means off the resolved road.

**Two marks, one rule: the face never takes the hue.** The system lets a node's
domain colour tint its border, its dot and its title — never its fill, because the
white face is what makes elevation read.

- `mark="dot"` (default) — a 7px disc inside a grey `--border-rule` pill. The dense
  form. Down a list of twenty chips, 2px of hue per row is more colour than content,
  and the disc keeps the chip small enough for a trail or a legend.
- `mark="border"` — `--stroke-rule` (1.5px) in the domain hue, no disc. For a node
  standing on its own: a stop inside a `VersionedGroup`, a node on the road. The
  border reads as identity from further away than a 7px disc does, and the freed
  column lets `index` sit first. Prefer it wherever chips are few and large.

**1.5px, not the road node's 2px.** `--stroke-node` is drawn on a 34px node sitting
on a pane; a chip is half that tall and usually sits *inside* a group whose own edge
is nothing but a tint. At 2px the children were the loudest thing in the well and the
group read as their background — and a head is never lighter than its children.

**`onDelete` puts a ✕ at the chip's trailing edge.** It is pinned to the edge
(`margin-left: auto`), not to the end of the title — pinned to the text it moved with
every name, so the same control landed in a different place on every chip in a list.

It arrives with the chip's hover or focus and leaves on the **same grace period as
every other receding control** — `window.PKT_SB.LEAVE`, the clock the scrollbar and a
pane's ✕ already share — so it never vanishes under the cursor's heels. It drops out
of the tab order while hidden, since an `opacity: 0` button still answers Enter. Its space is reserved from the start so the chip never changes width
under the pointer.

**It is berry at rest, not berry on hover.** Hover in this system is a one-step wash
of an element's own family and never a hue change, so the destructive hue belongs to
the control: `--state-danger` ink from the moment it appears, hovering within its own
ramp (face `--state-danger-wash`, border `--state-danger`, ink to `--berry-600`).
`VersionedGroup`'s per-version ✕ is the same recipe. A control that merely removes
something from the composition — a pane's ✕, a group's ungroup — is not destructive
and keeps the neutral recipe.

**The text is the floor.** `min-width: min-content` and `min-height: fit-content` beat
an explicit width and height in CSS, so a drag cannot make a chip smaller than the name
it carries: the box stops rather than the words disappearing. Clipping the text was
tried first and it is the wrong answer — a node whose name you cannot read is not a node
any more.

**A dragged width beats the container.** A chip fits its container by default
(`max-width: 100%`), but once the width is set by drag that ceiling is dropped — a
limit the user has already answered is not a limit. Double-click the edge and the chip
goes back to fitting.

**The edges size the chip.** Right edge for width, bottom for height, corner for both;
double-click an edge and that dimension goes back to automatic — the same act and the
same withdrawal as `VersionedGroup`'s edges. Height is worth having even though the
text sets a chip's natural height: a chip in a chain is a box among boxes, and a row of
boxes the reader has evened up by hand should stay evened up. A hand-set height centres
the content, because the extra room is deliberate and text pinned to the top of it
looks like a layout accident. Inside a `NodeChain` the strips stop propagation, so an
edge resizes the chip while the rest of it still drags to a new slot.
`resizable={false}` in a dense list where a strip at every edge would be in the way.

Do not mix the two marks in one list — the dot then looks like a second kind of
node rather than the same node drawn smaller.

**`lit` keeps its lift.** The ring is `--ring-linked` — 1.5px, thinner than every other ring in the system, because correspondence is a hint and not a commitment — and it sits *over* `--lift-1` rather than replacing it. A chip that swaps its elevation for a 2px ring reads as selected, which is a different claim.
