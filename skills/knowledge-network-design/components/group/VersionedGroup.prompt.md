# VersionedGroup

A nested subgroup that keeps several versions of itself. One version is on screen
at all times; the picker names it and opens the list of the others.

```jsx
const [versions, setVersions] = useState([
  { id: 'a', name: 'the packet\u2019s own account' },
  { id: 'b', name: 'layer by layer, top down' },
])
const [active, setActive] = useState('a')

<VersionedGroup
  index="2."
  title="Reach the machine"
  description="a typed name must become an address before anything moves"
  versions={versions}
  activeId={active}
  onRetitle={setTitle}
  onDescribe={setDescription}
  onSelect={setActive}
  onRename={(id, name) => setVersions(vs => vs.map(v => v.id === id ? { ...v, name } : v))}
  onAddVersion={() => {
    const id = crypto.randomUUID()
    setVersions(vs => [...vs, { id, name: 'new version' }])
    setActive(id)          // the picker then opens its rename field on it
  }}>
  <NodeChip title="IP & Routing" domain="net" wrap />
  <NodeChip title="TCP & UDP" domain="net" wrap />
</VersionedGroup>
```

## Rules

- **The well is the group, not a border.** Open, it is `--surface-sunken` at
  `--radius-lg` with `--sink-1`; children are raised white inside it. Folded, it
  becomes a node again — raised white face, the well tint stacked behind. Never both
  shadows at once, and never a coloured face.
- **A folded group sits at `--lift-2`, one step above a chip.** In a chain it stands
  beside `NodeChip`s at `--lift-1`, and a chip's domain hue would otherwise
  out-shout the group's deliberately neutral edge — a stack of nodes outranks a
  single node. One step, never two, and the group's border stays grey: its contents
  span domains, so it cannot claim one of them.
- **Do not give the open well a node's grey border.** `NodeChip` is white + 1px
  `--border-rule` + `--lift-1`; that outline is what makes a node a node. Putting
  it on the well would make the group read as one enormous chip, which is the one
  distinction the containment grammar cannot afford to lose — depth says group,
  the outline says node. Consistency with the chips comes from the shared radius
  family, the shared ink and the shared hover recipe. Folded, the group *is* a
  node again, and there it takes exactly the chip's border and lift.
- **The controls stay INSIDE the well**, on the title's row, 2px apart. A pane puts
  its ✕ on its frame; a group must not. A pane's frame sits on the desk, while a
  group's edge can land against a raised white node in the pane, and a 12px glyph
  half over white and half over the well tint is hard to read at any ink. Inside
  the well they always have one flat surface behind them.
- **The menu hangs off the picker.** It overlays the contents rather than opening
  under the well, which would put the list an arbitrary distance — a whole
  subgroup's height — from the control that opened it.
- **The menu is exactly as wide as the picker**, and its rows crop with an
  ellipsis. It is absolutely positioned, so the group's `maxWidth` cannot reach it;
  left to size itself, one long version name drags the list across the pane. It
  scrolls at `menuMaxHeight` (240).
- **The version owns its body, and a rail says so.** Every node in the group hangs
  off one 1.5px `--bark-300` rail that starts under the
  picker's state light. The contents follow the version, not the group, and
  nothing else in the layout says that. The rail is neutral bark because it is an
  ancestry line — a coloured rule would read as a claim about the nodes.
- **No domain dot on the head.** The contents can span domains; the dots belong to
  the nodes, which already carry them.
- **The title is rank 4, one step up.** `--fs-body` bold `--text-1` in the display
  face — the nesting-head variation, because this head sits over content that has
  heads of its own. Never `--fs-title`: that rank belongs to a pane.
- **One live version, said twice.** A drawn check in `--accent-primary-ink` plus a
  semibold label; every other row takes `bulletStyle`'s inset ring and stays
  `--text-1` at medium. A row label is never faded to say "not chosen".
- **The live mark is a check, not a moss disc, because of the data channel.**
  `--domain-sys` (#4a8a3c) and `--domain-se` (#4aa583) are greens within a step of
  `--accent-primary`, and `NodeChip`'s domain dot is the same 7–8px disc a few
  pixels below the picker. Two green discs of the same size — one meaning "this
  version is live", one meaning "this node is a systems node" — is a collision no
  ink step fixes; a shape fixes it, since nothing else in the system is a check.
  Drawn in two 1.75px strokes, the same construction as `caretStyle`, so it lands
  at an exact weight at an exact size.
- **The tally sits with the controls, and drops to its own line only under ~250px.**
  `4 nodes` at the right edge; below that width the head cannot hold the index, the
  tally, two controls and a legible name at once — in the row it left the title ~50px
  and broke a name mid-word, and a second line is cheaper than a clipped name. The
  width is **measured** (ResizeObserver), not inferred from being folded: a wide folded
  group has room for one line and should use it. Either way both halves sit at `--text-3` — a
  figure glanced at beside a name is the one content kind the system licenses that ink
  for — with the figure in mono medium (JetBrains ships 400 and 500, and at 11px on
  warm paper the lighter face stops holding its own beside the word). Two earlier tries failed: a bare figure
  read as a stray number — worst of all folded, where there is no visible body for it
  to be counting — and the same figure against the name made the head compete with
  itself for the first thing you read. The right edge collects everything that
  reports on or acts on the body. `countLabel` renames it; the singular is derived.
- **The buttons recede; the tally does not.** `–` and `✕` follow the pane's manners:
  absent while the group is at rest, present the moment the pointer or the keyboard
  is inside it, receding on the scrollbar's own grace period
  (`window.PKT_SB.LEAVE`) so everything that recedes in this product runs on one
  clock. They keep their space while hidden, so nothing reflows when they arrive.
  The tally stays: it is the one thing a dormant group still has to say, and it is
  what a folded group is read for.
- **Ungrouping is a spill, not a delete.** The live version's nodes take the group's
  own place in the parent, in order, and inherit the parent's numbering — `2.`
  containing `2.1`/`2.2` becomes `2.`/`3.` beside its former siblings. The children
  belong to the caller, so `onClose` is handed `{ versionId, count }` and the caller
  splices those nodes into the slot the group occupied.
- **Deleting a version is confirmed, in the row.** ✕ turns that row into
  `delete this version?` on a berry wash with two text-weight answers — `keep` and
  `delete` — so the thing being deleted stays visible and in place, and the answers sit
  where the ✕ was. A dialog would cover the very list you are choosing from, and a
  filled button inside a washed row states the same alarm twice. Escape or a click away
  cancels. `confirmDelete={false}` to delete on the first press.
- **Deleting is confirmed; ungrouping is refused.** The difference is what is at
  stake: deleting a version destroys authored work you cannot see (the nodes of a
  version you are not looking at), so it asks. Ungrouping with several versions would
  silently discard all but one, and there is no wording that makes approving that
  sensible — so it is blocked instead.
- **Ungrouping is refused, not confirmed, while there is more than one version.**
  Ungrouping spills the group's nodes into its parent, and only one version's nodes
  can be spilled — the rest would go silently. So ✕ answers with a note naming the
  condition and what clears it ("cannot ungroup — 3 versions live here; delete all
  but one first"), dismissing itself on the next click or after a few seconds.
  `onClose` is not called. A confirm dialog would be asking the user to approve
  losing work they cannot see. Override the wording with `ungroupBlockedLabel`.
- **A version is deleted from its own row.** Pass `onDeleteVersion` and each menu row
  carries a ✕ at its trailing edge, arriving with the row's hover **or focus** and
  leaving on the same `window.PKT_SB.LEAVE` grace period as the head's controls, the
  chip's ✕ and the scrollbar — one clock for everything that recedes. It is **berry at rest**, not
  berry on hover (hover is a one-step wash of an element's own family, never a hue
  change, so the destructive hue is the control's own identity — same recipe as
  `NodeChip`'s ✕), and it is **absent while the group has a single version**: there is no
  version left to fall back to, and emptying the group is the group's own ✕. If the
  deleted version was the live one, the caller selects another.
- **Three controls, left to right: the tally, minimize, ungroup.** Their tooltips
  say exactly that — "3 nodes inside", "minimize", "ungroup nodes" — and the
  minimize button becomes **maximize** when the group is folded, drawn as two
  stacked square frames the way a window's restore control reads. That mark is
  drawn in 1.25px strokes, not typed: the candidate glyphs fall through to a
  symbol or emoji face and come back the wrong weight beside `–` and `✕`.
- **Both buttons follow the standard icon-button recipe at 18px — the size of a
  pane's own ✕** (`PaneHeader`, legend variant): a control inside a pane may never
  out-size the pane's. A 1px transparent border is reserved at rest so hovering
  never moves the glyph. The glyphs are point-sized separately (✕ at 10, – at 12)
  because a cross puts more ink on the page than a single stroke; that is optical
  sizing, not a weight change. `✕` appears only when `onClose` is passed.
- **One description, optional.** It sits under the title and is true of the group
  whichever version is showing. Empty, it shows its invitation in italic
  `--text-3` — the register of "add new version"; filled, it is prose at
  `--text-2` and drops the italic. Committing an empty field clears it back to the
  invitation. There is no per-version description: a version's name is its
  description.
- **The number is not part of the name.** `index` ("2.") is derived — where the
  group sits among its siblings — so it renders outside the editable string, in
  mono like every other figure. Renaming never disturbs it and re-ordering never
  has to rewrite a name.
- **The body is a `NodeChain`.** A version's contents are a chain like any other, so
  the group hands them to one rather than keeping a second, poorer copy of that
  behaviour: the arrows, drag-to-reorder and the derived numbering are the chain's.
  A node inside a version can therefore be deleted and moved exactly as one on the
  road can. `onReorderNodes` if the caller owns that order.
- **The children's numbers come from the group's.** `2.` hands `2.1`, `2.2`, `2.3`
  to its children (`NodeChip` takes an `index`; so does a nested group), matching
  the group's own trailing period. Passing them down rather than writing them at
  the call site means re-ordering can never leave a stale figure in a child. A
  child that carries its own `index` keeps it; `numberSteps={false}` turns the
  whole thing off.
- **One click opens any field**: the title, the live version's name, the group's
  description. Enter or blur commits, Escape reverts.
- **The name never yields first.** The title wrapper carries a 96px floor, so a narrow
  group shrinks its own furniture — tally, controls — before it shortens the one string
  the reader came for.
- **The title wraps, open or folded** — two lines open, three folded, where the title
  is all there is to read. It is a name kept verbatim, and the head row also carries
  the tally and two controls, so a single line cut most titles off at their most
  useful end. `foldedMinWidth` (190) stops the shell being squeezed narrower than the
  head's own furniture allows.
- **A version name wraps to two lines, then clips.** It is authored text and runs
  long, and the end of the name is usually the part that distinguishes one version
  from another — so one-line truncation hid the only thing worth reading. Two lines
  is the cap: an unbounded name pushes the whole body down the pane. The clamp is
  `-webkit-line-clamp`, which paints an ellipsis on engines that support one and
  clips flush on those that do not; either way the full name stays in the `title`
  tooltip and in the field when you click it. Keep the label out of a flex row —
  a flex item is blockified and the clamp goes inert.
- **The group has a size, and it is not the pane's.** `maxWidth` (300) bounds it;
  undragged, the contents scroll at `bodyMaxHeight` (260) rather than growing
  without end, and the well's own bottom padding keeps the scrollbar's end arrows
  clear of the `--radius-lg` corners. Dragging the bottom edge sets a real **height**
  on the body rather than raising that ceiling — a max-height taller than the nodes
  changes nothing on screen, and the box appears not to resize at all. An empty
  version's dashed zone fills that height, because the zone is the space the nodes
  will land in.
- **The edges resize it, and the drag then wins.** Drag the right edge for width,
  the bottom edge for height, the corner for both. **Folded, only the width edge
  exists** — there is no body to make taller, and the height a folded group has is its
  own title wrapping — no visible grip, the cursor is
  the affordance; a drawn handle would be one more mark in a well that is already
  dense. The strips are inset from the corners so they never sit on the
  `--radius-lg` arc. Once dragged, `maxWidth` stops applying — a limit the user has
  already answered is not a limit. Bounds are 200–680 wide, 72 tall at least. The
  pointer is captured so the drag survives leaving the strip, and nothing
  transitions during it: an animated width reads as lag. `onResize` fires on
  pointer-up if the caller wants to persist it; a folded group is not resizable.
- **The background is the drag handle.** Pointer-down on the group's own surface —
  the well between its rows, the empty part of the title row — carries the whole
  group. The cursor is `move`, the four-direction arrow: a hand reads as "follow
  this" or "pick this up and drop it on something that accepts it", while this drag
  just repositions the group. A pointer-down on a control, a name or a node never
  starts a drag. No top-centre grip: the background already is the handle, and a
  drawn grip would add a mark to a well that carries three controls, a check, a rail
  and a tally. While carried the group swaps its
  sink for `--lift-drag` — the one moment a group is legitimately raised, having
  been lifted off the pane — and nothing transitions. The component applies a
  transform; take `onMove` and own the position if the pane has real coordinates.
- **The I-beam belongs to the words, not to the row.** An editable string is sized
  to its own text and carries `cursor: text`; the empty remainder of its line stays
  the group's `move` surface. A caret over that strip promised a field where there
  is only background. `user-select: none` on the well means dragging across a label
  never paints a selection — only the open field takes selectable text.
- **Double-click an edge to give that dimension back.** The right edge resets the
  width, the bottom edge the height, the corner both — the drag is an override, and
  this withdraws it, so the group goes back to sizing itself from its container and
  its contents rather than to another fixed number. `onResize` fires with `null` on
  the axis that was reset.
- **The picker row splits the click.** The version's name edits; the disc, the
  figure, the caret and the space between them open the menu. Editing a name and
  choosing another version are different acts and they get different targets.
- **The tally is bare, not badged.** No ring, no circle: the head already carries
  two 18px round controls, and a ringed numeral beside them reads as a third
  button. `CountBadge` is the ringed form and it works because it carries its own
  word; a lone circled figure does not. Mono and tabular is what marks it as a
  figure.
- **A new version starts empty, and says so.** With no children the body draws a
  dashed `--border-dashed` zone at `--radius-md` carrying `emptyLabel` in
  `--text-3` — dashed always means conditional in this system, and a placeholder
  awaiting a node is the case the dash is for. State the mechanism ("drag one in"),
  never "no results".
- **Chain arrows are acorn** — the contents of a group are stops on the authored
  path, the one thing acorn is allowed to mean — and drawn in SVG, not typed, so
  every shaft lands on the same device pixel.
- **`addLabel` is a lower-case verb phrase** set in italic: an action among names,
  not another version.
- `defaultOpen` is for specimens only. Do not ship a group whose menu opens on
  mount.
