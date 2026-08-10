# P.Kt Software — design system

The visual and interaction language for **P.Kt Studio**, the knowledge-network
teaching product in `alwaysmiddle/KnowledgeNetworkThesisDemo`. The app calls
itself the *Graph Disclosure Lab*: one corpus of computer-science teaching
material, explored through composable *instruments* — a territory map, a
containment tree, a connections diagram, a document pane, authored walks, and a
trail that records how you got here.

This system does two things at once, and it is important to know which is which:

- It **records** what the product is built from today — the corpus's authored
  colours, the road's layout arithmetic, the instrument registry, the Unicode
  glyph vocabulary, the as-built type ramp. Those values are cited in comments
  and marked `-raw` / `--asbuilt-*` where they differ from what is recommended.
- It **proposes** a new visual direction, asked for by name: *minimalist,
  natural, round, friendly.* Warm paper instead of slate, moss instead of
  Tailwind green, generous radii, soft warm shadows, and a legibility floor that
  retires the 9px type.

## Sources

- GitHub: <https://github.com/alwaysmiddle/KnowledgeNetworkThesisDemo>, branch
  `main`. Read via the connected app; the reader may not have access — recorded
  in case they do. **Explore that repository directly** before doing serious
  design work here: the instruments are where the real interaction problems live,
  and the code comments explain *why* far better than any spec.
- Read in full: `src/studio/{StudioView.tsx,instruments.tsx}`,
  `src/instruments/{KnowledgePanel,TrailStrip,TreePanel,PlexPanel}.tsx`,
  `src/instruments/walkdesk/shared.tsx`, `src/corpus/{graph,walks}.ts`,
  `src/index.css`, `src/App.tsx`, `README.md`, `CLAUDE.md`.
- Read as prior art: `skills/knowledge-network-studio-design/` in that same repo
  — an earlier design system covering the **Railroad** authoring surface only. Its
  as-built token values (road geometry, motion durations, the containment
  grammar) are carried forward here; its slate/amber palette is not.
- Stack: React 19 + TypeScript + Vite, Tailwind v4 with **no config file**, so
  Tailwind's defaults are the current palette. There is **no design tooling, no
  Figma file, and no brand asset of any kind** in the sources — the leaf in
  `assets/` was drawn for this system, not found in the repo.

### No logo

There is **no logo, wordmark file, or brand mark** anywhere in the sources, and
none has been drawn. Where a mark would go, set the name in plain type:
`P.Kt` in Quicksand 700, moss-600, beside the product name in ink. See
`guidelines/brand-wordmark.html`.

The one concession is **`LeafMark`** — a **hand-drawn wavy leaf**, shipped as
`assets/leaf.png`. It is the first real hand-drawn material in the system and the
thing that gives the palette its warmth; **never redraw it in SVG, trace it, or
tidy the line** — the wobble is the asset. The PNG is drawn in a pale green that
vanishes against paper, so it is used as a **CSS mask and painted with a token
colour** (`--moss-600` at 0.55 by default): the drawn line is preserved exactly, while
the system controls its weight and the motif follows the palette instead of pinning one
hard-coded green. **The motif and the wordmark are the same green** — both `--moss-600`
— and the motif recedes by being **more transparent, not paler**. There is one brand
green on a surface; two near-identical moss steps read as a mismatch rather than a
relationship. **The transparency has a floor, though.** Held back too far (0.28 was
tried) the wash desaturates against warm paper and stops reading as `--moss-600` at
all — which reintroduces the exact two-greens problem the shared colour was meant to
solve. **0.55 in a toolbar** is the point where the motif is clearly quieter than the
wordmark while still visibly the same green; **0.15–0.25** only when the mark sits
*behind* content, where hue-matching no longer matters. Keep it light — it is texture,
and must never compete with the
controls beside it. It is a *motif*, not a logo and not an icon: decorative,
non-interactive, one per surface. The house use is **cropped into the corner with the
tip on the rule** — in `Toolbar`'s `motif` slot with `tipOnRule`, anchored flush
bottom-right and sized taller than the strip, so the blade's point rests exactly on
the toolbar's bottom border and the rest of the leaf hangs below, cut off; the artwork
is drawn pre-cropped for exactly this. Clipping is what keeps it a texture rather than a
mark. It does not stand in for a wordmark, and it must never be painted a `--domain-*`
or `--edge-*` hue — a data colour on a decorative mark reads as a claim about the data.

### About the "Totoro" brief

The direction asked for was *"minimalist, natural, round, friendly — a Totoro
feel."* What is built here is **forest-natural**: warm paper, moss and acorn,
fully rounded geometry, soft warm shadows, nothing that bounces. No Studio Ghibli
character, artwork, or design element is reproduced or approximated — that is
protected work. If you want hand-drawn warmth in this system, the right move is
your wife's own simple-geometry drawings, dropped into `assets/` and referenced
from here. See **Caveats**.

---

## Index

Everything in this table is in this folder or its siblings in the export. Paths are
relative to the export root, so `../tokens/kn-tokens.css` is one level up.

| Path | What |
| --- | --- |
| `../tokens/kn-tokens.css` | every token as a CSS custom property — the runtime truth for `var(--moss-500)` |
| `../tokens/kn-base.css` | element defaults, focus ring, `drill-*` keyframes, all scrollbar paint |
| `../tailwind/kn-theme.css` | the Tailwind v4 `@theme` — what turns tokens into the classes the source below uses |
| `../tailwind/kn-theme.v3.js` | Tailwind v3 fallback. Delete on v4 |
| `../assets/scrollbars.js` | scrollbar behaviour — the only script in the system |
| `../assets/leaf.png` | the one hand-drawn asset, masked by `LeafMark` |
| `components/chrome/` | AppHeader · Toolbar · PaneHeader · PillButton · CountBadge · LeafMark |
| `components/sidebar/` | PresetButton · InstrumentRow · InstrumentGroup · FamilyColumn · BinMark |
| `components/graph/` | DomainDot · NodeChip · NodeArrow · NodeChain · EdgeEntry · EdgeLegend · EdgeDash |
| `components/group/` | VersionedGroup |
| `components/nav/` | TreeRow · TrailChip · StepDot · WalkCard |
| `components/doc/` | DocHeader · SectionLabel |
| `components/<area>/*.tsx.txt` | **the component source**, TypeScript + Tailwind — port these, do not re-derive them. Drop the `.txt`; kebab-case filenames, PascalCase exports |
| `components/contracts.d.ts` | every component's props in one file |
| `components/<area>/*.prompt.md` | the per-component traps, one file each |
| `components/wash.ts.txt` | the shared hover transition and the domain-hue class maps |
| `studio/` | **the Studio**, the app shell to refactor onto: `studio-app.tsx.txt`, `panes.tsx.txt`, `corpus.ts.txt` |
| `SKILL.md` | makes this folder usable as an Agent Skill |

The design system project upstream also holds `guidelines/*.html` specimen cards
(Brand · Colors · Type · Space · Motion) and the authored `tokens/*.css` split by
concern. Those are not exported — ask for a specimen if you need to see one rendered.
| `components/sidebar/` | PresetButton · InstrumentRow · InstrumentGroup · FamilyColumn · BinMark |
| `components/graph/` | DomainDot · NodeChip · NodeArrow · NodeChain · EdgeEntry · EdgeLegend · EdgeDash |
| `components/group/` | VersionedGroup |
| `components/nav/` | TreeRow · TrailChip · StepDot · WalkCard |
| `components/doc/` | DocHeader · SectionLabel |
| `components/<area>/*.tsx.txt` | **the component source**, TypeScript + Tailwind — port these, do not re-derive them. Drop the `.txt`; kebab-case filenames, PascalCase exports |
| `components/contracts.d.ts` | every component's props in one file |
| `components/<area>/*.prompt.md` | the per-component traps, one file each |
| `components/wash.ts.txt` | the shared hover transition and the domain-hue class maps |
| `studio/` | **the Studio**, the app shell to refactor onto: `studio-app.tsx.txt`, `panes.tsx.txt`, `corpus.ts.txt` |
| `SKILL.md` | makes this folder usable as an Agent Skill |

### Components

`AppHeader`, `Toolbar`, `PaneHeader`, `PillButton`, `CountBadge`, `LeafMark`, `PresetButton`,
`InstrumentRow`, `InstrumentGroup`, `BinMark`, `DomainDot`, `NodeChip`, `NodeArrow`, `NodeChain`, `EdgeEntry`, `EdgeLegend`, `EdgeDash`, `TreeRow`, `TrailChip`,
`StepDot`, `WalkCard`, `DocHeader`, `SectionLabel`, `VersionedGroup`.

**Thin bars are SVG, not CSS boxes.** A 3px relation dash drawn as a `<span>` lands on a
different subpixel offset in every row — line boxes above it are fractional — so some dashes
antialias across four device rows and read visibly thicker than their neighbours in the same
list. `EdgeDash` draws the dash as an SVG `rect` with `shape-rendering="crispEdges"`, which
snaps every instance to the same device-pixel height whatever its position. Use it anywhere a
hairline-scale bar repeats down a list.

Plus one exported helper, `FamilyColumn(labels)` — the shared label column for a
list of `InstrumentGroup`s. It is capitalised for the same reason the components
are: `window.<Namespace>` carries capital-initial exports only.

Every one has a counterpart in the source. Each carries a `.d.ts` props contract, a
`.prompt.md` with a usage example, and — as of this export — **a `.tsx.txt`
implementation in TypeScript and Tailwind classes** (strip the suffix on copy). Port it: it is the same
component this design system renders, with the theme moved onto utility classes and
only the genuinely non-class values (runtime drag geometry, SVG viewBoxes, the two
drawn marks, `-webkit-line-clamp` stacks) left as inline styles. Re-deriving one from
its prompt file loses measurements that took several passes to settle.

**Intentional additions** — five, mostly consolidations rather than inventions:

- **`PillButton`** — the source spells the same button out inline in six places
  with slightly different padding and border colours each time. One control,
  five tones.
- **`CountBadge`** — the header's `12 visited` / `23 route` spans, given tabular
  figures so a live count stops jittering.
- **`Toolbar`** — the source has no docked action strip; its per-pane buttons sit
  in pane footers. Added on request as an icon-only strip at the top of the
  surface, built entirely from the existing glyph vocabulary.
- **`InstrumentGroup`** — the registry is flat today, but it already holds fifteen
  instruments and grows with every new view. Added so the palette groups into
  families (views / unfold / walks / lenses) rather than becoming an unscannable
  list. It reuses the tree's disclosure grammar rather than inventing a second
  way to nest.
- **`NodeArrow`** — the arrow in the gap between two chained nodes. The road draws
  one inline today (the gap is already reserved: `--road-gap`, 26px), and
  `VersionedGroup` needed the same mark, so it is one component rather than two
  hand-rolled SVGs. It says *leads to* and nothing else: sequence belongs to the
  container, a typed relation belongs to `EdgeDash` with an `--edge-*` hue and the
  corpus's own label. Acorn by default, because a chain inside a group is the
  resolved road.
- **`NodeChain`** — the sequence a chain of nodes forms, and the owner of their
  order. Reordering could not live in the nodes: a chip that dragged itself would
  need its siblings' sizes and order to know where it had landed. The chain also
  fixes what a drag can MEAN — motion is constrained to its axis and lands on a slot,
  because a sequence has no second dimension to move in.
- **`VersionedGroup`** — a nested subgroup that keeps several versions of itself,
  one on screen at a time. The source has no versioning surface at all; this is
  the first, and it is built entirely out of existing grammar rather than a new
  one: the containment well for the group, `bulletStyle` for which version is
  live, `caretStyle` for the menu, inline fields at `--radius-xs` for naming.
  The caret here opens the version list rather than folding the group — folding
  stays with whatever draws it, so the two disclosures never contend.
- **`BinMark`** / **`LeafMark`** — the system's only two drawn marks, and they are
  different categories: `BinMark` is an *icon* (Unicode has no bin in the house
  weight class), `LeafMark` is a decorative *motif*. Neither is licence to draw more.

---

## Content fundamentals

The product's voice is unusually consistent and it is *not* generic product copy.
Match it.

- **Lower case, always.** Pane titles are `tree`, `document`, `projected route`.
  Never Title Case. The **only** exceptions are preset names (`Present`,
  `Explore`, `Reading` — proper nouns), instrument labels in the registry
  (`Map`, `Walk · Palette`), and corpus content, which is authored teaching
  material and keeps its own capitalisation (`TCP & UDP`).
- **All caps carry `--ls-caps`.** Every uppercase string in the system — via
  tags (`MAP`, `TREE`, `LNK`), document eyebrows, toolbar group labels, axis
  labels — is set with `letter-spacing: var(--ls-caps)` (0.12em). Caps at
  default tracking read as one solid block at 11–12px. There is no
  per-component exception; `--ls-eyebrow` is an alias of the same value.
- **A pane header holds a title and nothing else.** No subtitle, no description,
  no explanatory line — if a pane needs to explain its mechanism, it does so in
  its body. Where prose does appear, it explains the mechanism, not the benefit:
  *"the road can fork and rejoin; ● picks the branch"*, *"the flat route the bus
  would read · 23 entries"*. Never a value proposition.
- **Buttons name a state, not a command**: `◇ optionals: on the road` /
  `bypassed`, `route → right`. The label reads as the current truth.
- **Domain metaphors are load-bearing and mixed on purpose** — road, rail, stop,
  fork, bypass, walk, desk, instrument, trail, territory, country, terrain.
  Use them. Do not flatten them into "item", "container", "list".
- **Second person is absent.** Copy describes the artifact, not the user. No
  "you", no "let's", no exclamation marks, no encouragement.
- **Numbers are bare** — `12`, `23 entries`, `stop 4 of 12` — never "12 items".
- **Notes are lowercase fragments with no terminal period** (*"a typed name must
  become an address before anything moves"*); authored corpus prose in `walks.ts`
  is full sentences with em-dashes and is a different register — keep both.
- **No emoji. Anywhere.** Not in copy, not in code, not in a commit message.
- Code comments in this product are essay-like and explain *why*. That register
  is worth keeping in component docs.

---

## Visual foundations

**Palette.** Warm neutrals (**bark**) carry everything structural — surfaces,
borders, ink. **Moss** is the primary: growth, containment, the affirmative
action. **Acorn is reserved**: it means *on the authored path* — a walk, a walk
stop, a jump mark, the resolved road — and nothing else. **Pond** is selection
and cross-pane hover correspondence only. **Berry** is destructive only. Two
background colours in any one screen, at most: canopy behind, paper on top.

**Data colour is a separate channel.** Six domain hues and four relation hues,
kept hue-disjoint so an edge colour can never be misread as a domain colour.
`--domain-*` and `--edge-*` are P.Kt naturalisations (lower chroma, mid
lightness) of the hex authored in `src/corpus/graph.ts`; the authored values
survive as `--domain-*-raw` / `--edge-*-raw` for pixel-matching the live build.
Per-node colour is subdivided recursively in OKLCH by `src/model/color.ts` — each
child's hue sits inside its parent's arc (arc span 46°, sibling floor 11°,
`KEEP` 0.82), so hue does sibling discrimination locally and lineage globally.
Recompute with that module; the tokens record the recipe and the fallbacks.
A node's domain colour tints **border, dot and title only** — the face stays
white so elevation reads cleanly.

**Watch the case when naming an edge token.** The corpus authors edge types in
snake_case (`depends_on`, `see_also`, `implemented_with`) while CSS custom
properties are kebab-case (`--edge-depends-on`). Anything building a token name
from a corpus key must map it (`key.replace(/_/g, '-')`) — `var()` on an undefined
property fails **silently** to transparent, so a mismatch shows up as a blank
swatch rather than an error.

**Type.** Quicksand for display, pane titles and section labels: geometric,
fully rounded, calm. Nunito for everything read: rounded humanist, and legible
where this product needs it. JetBrains Mono for every numeral, id and count. The
ramp is 11 / 12 / 13 / 15 / 18 / 28 / 44. **11px is the floor**, and only for
numerals, via tags and glyph marks; anything read rather than glanced at is 13px.
The as-built ramp (9 / 9.5 / 10 / 10.5 / 11) is recorded in
`--asbuilt-fs-*` for recreations and should not be used for new work.
Every step number is `tabular-nums` — rails line up on it.

**The ink ramp is darker than a first pass suggests, on purpose.** `--text-2` is
`--bark-700` (#4e483e) and `--text-3` is `--bark-500` (#8a8071). Both were one step
lighter early on — `bark-600` / `bark-400` — and on warm paper that read as *disabled*
rather than *secondary*: `bark-400` measured ~2.4:1, under any legibility floor, so
hints, ancestry lines and counts looked switched off. Each moved down a step. If a
label still feels faint, the fix is a **darker step, not a heavier weight** — bolding
pale ink just makes it look smudged.

**`--text-3` is still not an ink for prose.** Even at `bark-500` (~3.9:1) it is for a
glyph, a disclosure arrow, a divider label, or a numeral sitting beside its own bold
value — things you glance at. Anything a reader actually reads — a caption, a specimen
label, a meta line — is **`--text-2` at 11px minimum**. Specimen cards in `guidelines/`
follow this: labels are 11px `--text-2`, captions 11.5px `--text-2`.

**A row label is `--text-1`, whatever its state.** Instrument rows, instrument group
headers and doc section labels all sit at full ink. They were drawn at `--text-2`
originally and it was a mistake: they sit directly beside `TreeRow`, which is
`--text-1`, and a lighter neighbour in the same column reads as unavailable rather
than merely unselected. **On/off is carried by weight and the fill dot**
(`●` / `○`), never by fading the label — fading is reserved for genuinely disabled
rows, which also take `--opacity-disabled`.

**Spacing.** A 4px grid with a 6px half-step. The `--road-*` block is different
in kind: those are live constants from `AuthorRoad.tsx` (`NODEW 150`,
`AGAP 26`, `PAD 10`, `HEAD 28`, `RAIL_W 186`). The road does measure-free
layout, so those numbers *are* the layout — change one here and change it there.

**Backgrounds are flat.** No images, no illustrations, no textures, no
gradients, ever. The only imagery in this product is the graph itself. A pane is
paper on canopy; the one translucency in the system is `--surface-veil`, for a
floating layer over a board. Blur is not used.

**Corner radii — nothing is square.** 6px is the smallest radius in the system
(inline fields), 10px for buttons and rows, 14px for menus and inputs, 20px for
cards and panes, 28px for the shell, and a full pill for every chip, dot, node
and counter. Roundness *is* the brand; a sharp corner reads as a bug.

**Cards.** A card is `--surface-raised` (white), `--radius-lg`, a 1px
`--border-hair`, and `--lift-1`. No coloured left border, no accent stripe, no
tinted card body. If a card needs to say something about state, it says it with
a ring or a wash, not with a new shape.

**Panes are framed, and the title is part of the frame.** A pane is a light-grey
`--border-frame` hairline at `--radius-lg` around paper, and its title straddles
that border like a legend — masked by the desk colour behind it, with the pane's
two controls sitting on the same rule at the far end. The header holds the title
and nothing else. There is no filled title bar and no second divider under it: the
frame *is* the header. `PaneHeader` renders this; `variant="bar"` is the older
filled row, kept only for surfaces with no border to interrupt.

**A pane's one control is `✕`** — *remove from the composition*, the same act the
palette's `●`/`○` rows perform. It sits on the frame rule at the far end, inside
the corner radius (a control that overlaps the curving border reads as a bug), as
a 20px round icon button following the standard hover recipe. A pane is either in
the composition or dropped from it; there is no minimized state.

**Shadow.** Warm — cast in bark, never blue-grey — soft, wide and low-contrast.
`--lift-1` is a 1px contact shadow plus a wide faint ambient one. Sinks are
inset. **Never a lift and a sink on the same element**: raised means node,
recessed means group, and that is the whole containment grammar.

**Containment is depth, not hue.** A node is raised and white. An open group is
recessed with the sunken tint. A folded group is raised *again* — because it is a
node again — with the well tint stacked behind it. Depth survives nesting; a
green border does not.

**Hover / press / disabled.** Hover is a one-step wash of the element's own
family (`--surface-hover`), or a one-step-darker tone — never a hue change,
never a scale, never a lift jump of more than one step. Press is
`--surface-press` and nothing else: no shrink, no bounce. Disabled is
`--opacity-disabled` (0.35), never a grey repaint. Off the resolved path is
`--opacity-off-path` (0.5). During a drag, everything illegal drops to
`--opacity-drag-rest` (0.35).

**Icon buttons — one hover, everywhere.** Every glyph-only control in the system
(toolbar items, a pane's `–` and `✕`, a row's disclosure) is a round transparent
button with a **1px transparent border reserved from the start**, so hovering
never changes its box. On hover: background → `--surface-hover`, border-color →
`--border-rule`, ink → `--text-1`. Nothing else moves. The border must be
declared transparent at rest — adding one on hover shifts the glyph by a pixel,
which is the tell of a hand-rolled control. At rest the ink is `--text-2`;
`--text-3` is too faint for a control. Toolbar items are 30px (24px `dense`), a
pane's icons are 20px, and both use `--radius-pill`.

**The same hover, generalised to every control.** Three values, one recipe —
**face one step, border to `--border-rule`, ink to `--text-1`** — and *nothing
else changes*. No scale, no translate, no shadow step, no hue change:

| control sits on | hovered face |
| --- | --- |
| transparent (icon buttons, rows, quiet pills) | `--surface-hover` |
| a raised white surface (node chips, cards) | `--surface-hover-raised` |
| a tinted wash (moss/acorn pills) | the next step of that ramp — `--moss-100`, `--acorn-100` |

A wash cannot tint white, which is why raised elements get their own token
instead of a transparent overlay. Press is `--surface-press`. Both cards
demonstrate it: `guidelines/state-icon-hover.html`.

**A DESTRUCTIVE control wears its hue at rest, not on hover.** Because hover is a
one-step wash of the element's OWN family and never a hue change, a ✕ that turns
berry under the pointer breaks the rule twice over — it changes hue, and it
withholds the one thing the user needed before pressing. So a delete control is
`--state-danger` inked from the moment it is visible, and hovers within its own
ramp: face `--state-danger-wash`, border `--state-danger`, ink one step down to
`--berry-600`. Nothing else moves. Both `NodeChip`'s ✕ and `VersionedGroup`'s
per-version ✕ follow it, and they are hidden until the row or chip is hovered or
focused, so a berry mark never sits on a resting surface. A control that merely
removes something from the composition — a pane's ✕, a group's ungroup — is NOT
destructive and keeps the neutral recipe. **Controls that live on a
frame recede with the pane.** A pane's ✕ follows the scrollbar's rule — absent
at rest, present while the pointer or the keyboard is inside the pane, receding
on the scrollbar's own grace period (`window.PKT_SB.LEAVE`) — and the
notch it cuts in the border fades with it, so a dormant pane's frame reads as one
unbroken line rather than a line with a hole in it. Never leave the notch behind
a hidden control, and keep the notch centred on whatever it exposes — the ✕ sits
as far into the pane's top-right as the corner radius allows, and its notch is
inset to match, so the gap reads as a cut made for that button. An open group's head steps to semibold, the weight of an
ON row — never bold: a head at more weight than its own children inverts the
hierarchy, and the count beside it must move with the label rather than lighting
on its own. A row that already carries a
border at rest — a preset — does **not** darken it on hover: the wash alone is
the hover, so the list's rules stay one even weight while the pointer moves.

**A count is a different KIND of content, not a lesser rank.** A number beside a
head sits in mono — that is what marks it as a figure rather than a quieter word
— and one ink step down (`--text-2`), because the head names the section and the
number only reports on it. One step, though: mono at `--fw-regular` under a bold
`--text-1` head drops family, weight and ink at once, and the number stops
looking attached to the words it counts.

**A count belongs to its name, not to a column.** Where a head carries a number
— an `InstrumentGroup` family, a section with a tally — the number sits
immediately after the label, not flush right. A right-hand column of counts
looks tidier and reads worse: with several groups open, each number is separated
from its name by a run of unrelated rows, and the eye has to walk back to pair
them. Align them by giving the LABEL a minimum column instead — the numbers then
line up with each other and still touch their names. Size that column from the
longest label in the LIST, never per row (`FamilyColumn(labels)` in
`InstrumentGroup.jsx`): a long name moves every number right together, keeping
the column. Only a name that overruns even that pushes its own number out of
line — cheaper than truncating a name, and cheaper than orphaning every number
at the right edge to keep the edge tidy. `CountBadge` is the exception, because the badge carries its own label.

**Only capitalised exports cross the boundary.** A consuming page reads the
system off `window.<Namespace>`, which carries capitalised names only — hence
`FamilyColumn`, not `familyColumn`. Lower-case helpers (`caretStyle`,
`bulletStyle`) are for components inside the system; a consumer gets those marks
by using the components that draw them.

**One selection bullet, drawn.** A list that says a row is IN or OUT of
something — instruments, lenses, filters, saved views — marks it with
`bulletStyle(on)` from `InstrumentRow.jsx`: an 8px disc in a 12px slot, filled
`--accent-primary` when on, an inset 1.5px `--text-3` ring when off. Never a
typed `●`/`○` — those are two different weights in the same face, sit off the
baseline, and rescale with the font. 8px is `DomainDot`'s diameter, so a row can
carry a state light and a domain dot in one column without them arguing. The
state is always said twice — bullet plus a `--fw-medium` → `--fw-semibold` step
on the label — so it survives a glance and greyscale alike.

**Marks are strokes, not fills.** The disclosure is drawn, not typed: a 6px
square wearing two 1.5px borders, rotated −45° closed and +45° open, at ordinary
chrome ink (`--text-3`, `--text-2` when open). It is the one exception to “use
the house Unicode set”, and it is exported as `caretStyle` from `TreeRow.jsx` so
the tree and the palette share a single mark. Three glyphs were tried first: a
filled triangle puts far more ink on the page than the letterform beside it and
pulls the eye off the labels; fading it enough to fix that leaves a mark too
faint to aim at; and the hollow triangle and the `›` angle quote are both too
small and too oddly proportioned at this size to read as a shape at all. Drawn
strokes give exact weight at exact size, and rotating one element means open and
closed can never drift apart — the turn animates the disclosure for free.

**Draw it with border longhands, never the `border` shorthand.** `caretStyle` sets
`borderRight` and `borderBottom` at `currentColor` and nothing else. Writing it as
`border` plus `borderTop: 'none'` looks equivalent and is not: React diffs style
objects key by key, so a re-render that changes only the shorthand's colour re-sets
`border` and never re-sets the two sides that were switched off. The mark fills in,
and the caret becomes a diamond the first time it is hovered. `currentColor` avoids
the whole class of problem — the colour then lives on the wrapper and the border
declarations never change at all.

**Every disclosure in the system is that same mark, including the pair.** A row's own
caret, the connections rail's head, and the rail's *expand all* / *collapse all* are
all the rotated square: one mark for a single disclosure, **two of it stacked** for
the act that opens or closes a whole level — down for expand, up for collapse. The
pair is deliberately not a new drawn chevron. The drawn vocabulary is exactly two
marks (`BinMark` and the caret), and a nesting affordance that invents a third is how
an icon set starts; saying the same mark twice reads as *one level up* without adding
anything to learn. `caretStyle` is a lower-case helper and does not cross the
`window` boundary, so a UI kit or template repeats the recipe rather than importing
it — repeat it, do not draw something new.

**Borders and dashes.** `--border-hair` (9% → 13% → **17%** bark) divides inside a
pane, `--border-rule` (15% → 20% → **25%**) edges a pane or card and is also the
resting border of a list row you can click — both were lifted twice because at
their original alphas they all but vanished on paper. `--border-strong` marks
something you can act on, a node's own border is 2px in its domain colour. **Dashed always means conditional** — an
optional stop, an inactive bypass, a placeholder awaiting a node. Never dash for
decoration.

**Focus and selection.** One ring per meaning, never stacked — two rings on one
element is always a bug. A ring over an element's own `--lift-1` is not stacking,
though, and is correct for `lit`: the chip stays raised and *also* corresponds.
`--ring-selected` (pond) for selection, `--ring-linked` (pale pond, 1.5px —
thinner than the rest, because correspondence is a hint not a commitment) for
cross-pane hover correspondence, `--ring-primary` for a confirmed target,
`--ring-danger` for a destructive target, `--ring-focus` for the keyboard only.

**Animation.** Everything is a short soft ease-out. Nothing bounces, nothing
springs, nothing overshoots. The repo's own rationale governs: a relayout should
be *legible* — "nodes visibly make room" — so blocks transition their box over
200ms, expand/collapse over 300ms, edge tracing over 180ms, and a scope change
enters *from its navigation direction* (`drill-down/up/left/right`, 280ms).
**Never animate colour.** `prefers-reduced-motion` collapses every duration to
1ms in `tokens/motion.css`.

**Nesting is one grammar, used twice.** Wherever the system nests things — the
containment tree, the instrument palette, the connections rail — it is the drawn
caret in a **16px slot** plus a **16px indent per level**, and the parent row reports its own state
so folding
hides detail without hiding information (a folded instrument family still shows
how many of its members are on screen). Those two numbers are fixed: `TreeRow` is
the reference, and anything else that nests matches it rather than picking its own
step. **Two layers is the limit** in the palette: family, then instrument. A third
would mean the families are wrong.

**A pane's `✕` stops at the corner arc.** The legend header interrupts the frame by
painting a straight 2px bar of the background over the border line — which cannot erase
a curve. So the header row is inset on the trailing side by the pane's corner radius
(`--radius-lg`, 20px), putting the notch's outer edge exactly where the arc begins;
any closer and a stub of border survives beside the button, which reads as a
misdrawn frame. The row also sits on the border centre with no lift — the 1px optical
raise belongs to the *title text* alone, because it is baseline-aligned. Lifting the
whole row instead puts the line under the `✕` rather than through it.

**The toolbar owns the top of a surface.** Icon-only pills in hairline-separated
groups, the wordmark at the leading edge, and a `motif` slot at the trailing edge
that **clips its contents**. It carries no counts and no text labels; a toolbar
item's meaning lives in its glyph and its tooltip.

**The trailing motif is anchored, not floated.** The house use is `LeafMark` with
`tipOnRule`, and its geometry is deliberate: the leaf is sized **taller than the
toolbar strip** and pinned flush to the bottom-right, so the blade's **pointed tip
lands exactly on the toolbar's bottom border** and the wider part of the leaf fills
the full visible height of the strip before being cut off below. It reads as a leaf
growing up out of the rule rather than a sticker dropped in the corner. Two
consequences to respect: the slot must keep `overflow: hidden` (the clip is the
effect), and the tip must touch the border **and only the border** — a leaf floating
above the rule, or one whose tip is cropped off, both break it. The two anchor
constants live at the top of `LeafMark.jsx`; tune the motif there, never with
ad-hoc margins at the call site. Right edge only, one per surface, always painted
from a token — never a `--domain-*` colour.

**Layout rules.** Instruments are panes in a flex composition. Each owns a
`shrink-0` header, a `flex-1 min-h-0` body, and (for authoring panes) a
`shrink-0` docked footer. Columns flow left to right; strips pin full-width to
the bottom. A pane never decides its own size — where it sits does. Pane
arrangement flips via CSS `order` so the DOM order stays stable and toggling one
pane never remounts another.

**Scrollbars.** Three states, and the pane is quiet in the first one. Behaviour
lives in `assets/scrollbars.js` (it only sets `data-sb`), every pixel in
`tokens/base.css`. The script publishes its timings as `window.PKT_SB`
(`FLASH`, `LEAVE`, `PAD`) so other controls that recede — a pane's ✕ — can share
the same clock instead of inventing one.

| state | when | what you see |
| --- | --- | --- |
| rest | you are not in the pane | nothing — the pane reads as a solid sheet of paper |
| `on` | pointer or focus is in the pane | one 4px bar, `--bark-300`. No track, no wash, no arrows |
| `near` | pointer is in the gutter, or you are dragging | the bar grows to 7px, a faint wash appears behind it, and the end arrows arrive (1.6px chevrons, `#c8bfaf`) |

**A state never flickers on the way to itself.** `near` holds for as long as the
pointer is in the gutter, including across a click: releasing a press must not
drop the bar to `on` for the frame before the next `pointermove` restores
`near`. That one-frame round trip is invisible as logic and very visible as a
blink. Any handler that *ends* an interaction (`pointerup`, drag end) re-reads
where the pointer actually is rather than assuming the interaction is over.

The bar is **`--bark-300` in both live states** — it widens, it never darkens.
Hovering the gutter is an invitation, not a state change on the bar itself. The
arrowheads belong to the same instrument and should look the same weight, but a
1.6px anti-aliased stroke spreads its colour over partial pixels and reads
lighter than the solid bar at the identical hex. They are stroked at `#c8bfaf`
instead — `--bark-300` nudged 30% toward `--bark-400` — hard-coded inside the
four data: URLs, because a data: URL cannot read a custom property. **Correct an
optical mismatch with a shade of ink, not with weight**: thickening the arrows
would make them the heaviest thing in a gutter built to disappear.

It also keeps **one edge**. The outer inset is 2px in both states, so the bar
grows *inward* — from a fixed right edge, or a fixed bottom edge when horizontal
— instead of fattening about its centre. Nothing appears to shift sideways.
Horizontal bars are the same ladder on the other axis: same 12px gutter, same
4→7px, same wash, left/right chevrons in place of up/down.

**The corner** (a scroller with both bars) takes the wash but stays bare. It is
where the two gutters meet, not a control — leave it untinted and the L has a
hole punched at its vertex. Do **not** paint the horizontal end arrow into it to
line up under the down arrow: `::-webkit-scrollbar-corner` is inert, so the
glyph would look like a button and do nothing. The horizontal bar keeps its own
end square, one short of the vertical.

A wheel or keyboard scroll flashes `on` for 900ms, and the bar always waits
500ms after you leave before it recedes — it must never vanish under the
cursor's heels. The 12px gutter and the two 12px arrow squares are **reserved in
every state** — only paint changes, so growing the bar never reflows a line of
text and never makes the bar jump. The gutter wash is `--surface-hover` on its
own: a tint, not a channel, and never a rule or a groove. It runs the full
length of the gutter, arrow squares included, so the whole strip reads as one
surface rather than a bar with two lids.

**A rounded pane insets its scroller 12px from the bottom** (`marginBottom`, not
a radius on the scrolling element) so the end arrows stay clear of the
`--radius-lg` corners; the pane's own paper fills the strip. One inset serves
both axes — it lifts a horizontal bar off the bottom corners too. Do not reach
for a `::-webkit-scrollbar-track` margin — the arrow buttons pin to the ends of
the gutter, not the track, so a track margin leaves the arrow where it was and
just opens a gap between it and the wash.

**Radii must be per-corner *and* per-axis** (the `border-radius: … / …` form).
The painted bar rounds by `radius − border-width`, resolved separately for x and
y, so a single value stretches the caps on the fat side into ellipses and
`--radius-pill` collapses them entirely. Each value is that edge's inset plus
half the bar.

Behaviour lives in `assets/scrollbars.js` (self-installing, sets `data-sb`; opt
out with `data-sb-off`), every pixel in `tokens/base.css`. A page that never
loads the script keeps the plain resting bar rather than an invisible one.

**Footgun.** The bar's width comes from `background-clip: content-box` plus a
transparent border. Any state rule that uses the `background` **shorthand**
resets `background-clip` to `border-box`, and the bar silently paints its full
12px in every state — the widths look identical and nothing errors. Always
`background-color:` on `::-webkit-scrollbar-thumb`, never `background:`.

---

## Iconography

There is **no icon library, icon font, or SVG sprite** in this codebase, and none
has been added. Every icon is a **Unicode glyph inline in the markup**, and it is
a real, consistent vocabulary:

| Glyph | Means |
| --- | --- |
| `◇` | optional — may be bypassed |
| `▽` | a fork: this container offers a choice |
| `⊞` | a group / "group the selection" |
| `↺` | a revisit: this node already appeared |
| `●` / `○` | on screen / benched; the chosen branch / an available one |
| `⤳` | a jump — the focus crossed a typed link |
| `▶` | walk this / next stop |
| `✦` | teach me this (generate a curriculum) |
| the drawn caret | a disclosure — expanded / collapsed, in a **16px slot**; **two stacked** opens or closes a whole level. See "Marks are strokes, not fills" |
| a drawn bin | delete a user-saved thing — `BinMark`, the system's one drawn **icon**, because `🗑` renders as emoji at 10.5px against a 12–15px glyph set |
| a drawn leaf | `LeafMark`, the brand **motif** — a hand-drawn PNG asset, decorative, not an icon; see "No logo" above |
| `⋯` | this block's actions |
| `↶` / `↷` | undo / redo |
| `✎` / `✓` | rename mode on / done |
| `✕` | remove from the composition |
| `⇄` | a symmetric relation (`see_also`), in corpus comments |

Rules: **keep the glyphs.** They are consistent, they cost nothing, and they
match the product's plain-spoken register. Do **not** introduce Lucide,
Heroicons, or any icon CDN for these. Do **not** hand-roll SVG replacements. Do
**not** use emoji. If a genuinely new affordance needs a mark, take another
geometric Unicode glyph in the same weight class — and **measure it before
committing**: at 15px the house glyphs advance 12–15px, and a glyph that comes in
at 7–10px is falling through to a fallback face and will look faint and undersized
beside its siblings. That is why the fork is `▽` and not `⑂` (7.5px, half its
neighbours). Do not hand-draw a replacement mark; find a glyph that measures right.

**One deliberate exception:** `BinMark` — a bin drawn from a lid rule and a
tapered body — exists because Unicode has no bin in the house weight class
(`🗑` renders as emoji at 10.5px). It is the single drawn icon in the system and
should stay that way.

The connections diagram used to be the second exception — a drawn one, SVG lines and
circles ported from `PlexPanel.tsx`. It is not any more. `ConnectionsPane` in
`studio/panes.tsx.txt` draws its edges as `EdgeEntry` rows: DOM boxes, a text
arrowhead, and a shaft that is an SVG rect only for `EdgeDash`'s device-pixel reason
— nothing about it is a picture. Nothing in the system is drawn now except `BinMark`
and the disclosure caret.

### The connections grammar

A neighbourhood is a **rail**, not a diagram: the focus at the head, every neighbour
a **stop** hanging off it, and the stop's rung carrying the one number that matters
at rest — how many relationships run between the two. It grows in the only direction
a pane can afford: a hundred neighbours is a longer rail, never a denser one, and
nothing overlaps at any count because nothing shares a row. Opening a stop lists its
relationships in full as `EdgeEntry` rows in a well.

Three rules the pane encodes, and any other view of the graph should:

- **A container's links are its children's links, rolled up.** The corpus authors
  typed links between topics; a module or a domain has none of its own. An edge joins
  the rail when **exactly one end is inside the focus's subtree** — both ends inside is
  internal wiring, and drawing it would put the focus on both ends of its own entry.
  The subtree is derived by walking `parent`, so it holds at any depth.
- **An entry reached through a descendant says so.** Rolled-up edges are grouped
  separately as *via children*, and the entry prints the path from the focus down to
  the node that actually holds the link (`fromWithin`). "This depends on X" and
  "something inside this depends on X" are different claims and must not be filed as
  one. A path deeper than a step keeps its first segment and elides the rest.
- **Every row opens on the same bold name.** Whether an entry is direct or reached
  through a child, the emphasis sits on the **anchor** — the focus node — so a well
  reads down a column instead of being re-parsed row by row.

---

## Layout — the shell, and why the app looks different without it

Most of what makes a screen look like this product is **composition**, not tokens.
The palette and the type ramp are necessary and not sufficient: get the geometry
wrong and the right colours still read as a different app. `studio/studio-app.tsx.txt` is
the reference, and it is meant to be refactored onto rather than admired.

**Four bands, outside in.**

1. `h-screen flex flex-col bg-canopy` — the desk. Canopy (`#f2eee6`) is the ONLY
   full-bleed background in the product. A pane never sits directly on white, and
   white is never the page.
2. `Toolbar` — `flex-none`, one docked action strip under nothing. The leaf motif is
   cropped into its bottom-right corner and overflows its own strip on purpose.
3. The surface — `flex-1 min-h-0 flex gap-3 p-3`. **The gutter and the inset are the
   same 12px measure**: a pane's distance to its neighbour equals its distance to the
   window edge, so the desk reads as one grid rather than as a frame around a frame.
4. The palette at `w-[var(--sidebar-w)]` (208px, `shrink-0`), beside a column holding
   the instrument row above and the trail below, both at `gap-3`.

**The pane row is flex, and the flex numbers are the layout.** Each instrument
declares its own share (`INSTRUMENTS[].flex`: Map 1.9, Connections 1.3, Document
1.1); a pane with `flex: 0` takes a fixed width from a token instead (Tree at
`--tree-w`, 240px; the trail at 116px). Do **not** replace this with a CSS grid of
equal columns — the ratios are the composition, and a Map at the same width as a
Document is a different product.

**`min-w-0` on every pane wrapper is load-bearing.** A node title is unbounded corpus
text. Without the floor override, one long name widens its own pane at its
neighbours' expense and the composition shifts every time the focus changes. This is
the single most commonly missed rule when the shell is rebuilt from a screenshot.

**Every pane is the same box.** `PANE` in `studio/panes.tsx.txt`:
`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-visible rounded-lg border
border-frame bg-paper`. Three things about it are easy to get wrong:

- **`overflow-visible`, not hidden.** `PaneHeader`'s legend variant sits ON the top
  border, and a hidden overflow clips it away — which is what makes a rebuilt pane
  read as a plain card with a title inside it.
- **`border-frame`, a visible bark hairline.** A pane's own frame is meant to be seen;
  it is not `border-hair`, which divides things *inside* a pane.
- **The scroller is a child, and it carries `mb-3`** (`PANE_BODY`). That strip holds
  the scrollbar's bottom arrow clear of the pane's `rounded-lg` corner. The pane's
  own paper fills it, so it reads as nothing at all — until it is missing, and the
  scrollbar collides with the curve.

**Depth is the only containment signal.** Four surfaces, and they nest in one
direction: `bg-canopy` (desk) → `bg-paper` (pane) → `bg-raised` (a card or a node) →
`bg-sunken` / `bg-sunken-2` with `--sink-1` (a well). A group is a well; a node is
raised; nothing says "group" with a colour or a coloured border. One step of
elevation, never two, and never a lift and a sink on the same element.

**Density.** Pane padding is `p-3` with `pt-4` where a legend header sits above it;
row gaps inside a pane are `gap-2` or `gap-3`; controls are 18–30px and hit targets
floor at `--hit-min` (28px). The product is dense on purpose — but nothing a person
*reads* goes below `--fs-body` (13px).

---

## Caveats — read these

1. **The fonts are a choice, not a recovery.** The app ships no webfont at all.
   Quicksand + Nunito + JetBrains Mono are loaded from Google Fonts via
   `tokens/fonts.css`. If P.Kt ever licenses a face, swap that one file. If you
   want the fonts vendored rather than CDN-loaded, say so and hand over the
   `.woff2` files.
2. **The brand rests on one hand-drawn asset.** `assets/` now holds exactly one:
   `leaf.png`, the wavy leaf behind `LeafMark`. It is real drawn material and it is
   what gives the palette its warmth — but it is also the *whole* brand. There is
   still **no logo, no wordmark file, no illustration and no photography** (the
   wordmark is set in plain Quicksand; see "No logo"), and the leaf is a decorative
   motif that deliberately does not stand in for one. **This is still the biggest
   gap in the system**, just a narrower one than it was. Hand-drawn marks in the
   same hand would suit this palette exactly — empty-state marks, dividers,
   ornaments, a proper mark. Drop scans or PNGs into `assets/` and this system will
   use them; the masking recipe in `LeafMark` means a pale pencil scan works as-is
   and inherits the palette.
3. **The domain and edge colours were naturalised.** The authored hex
   (`#008300`, `#eda100`, `#eb6834` …) are high-chroma and fight the paper
   palette. `--*-raw` preserves them exactly; if the data channel must stay
   pixel-identical to the current build, use the raw tokens and tell me.
4. **The type ramp was raised.** 9–11px is what the app renders; 11–13px is what
   this system recommends. Recreations of the current build should use
   `--asbuilt-fs-*`.
5. **Ten of fifteen instruments are not recreated.** `studio/studio-app.tsx.txt` ships
   four — Map, Tree, Connections, Document — and its `FAMILIES` list names the rest
   with `soon: true` rather than faking them. The Railroad authoring surface is
   covered by the earlier design system in the repo rather than duplicated here.
6. **Document prose is not mirrored.** `src/corpus/docs.ts` and `deep.ts` were
   not copied, and no substitute prose was written.
7. **Component cards are live mounts** of the compiled bundle, so they need
   `_ds_bundle.js` to have been built. If a card is blank, the bundle is stale.

## Hierarchy — the ladder

Every piece of type in the app is one of eight ranks. Pick the rank, then take all
three values from it: size, weight and ink are not chosen separately. Specimen:
`guidelines/type-hierarchy.html`.

| # | rank | size | weight | ink | where |
| --- | --- | --- | --- | --- | --- |
| 1 | the subject | `--fs-head` | bold | domain hue | `DocHeader` — the focused node's name |
| 2 | the app | `--fs-title` | bold | `--text-1` | `AppHeader` product name |
| 3 | a pane | `--fs-title` | semibold | `--text-1` | `PaneHeader` legend |
| 4 | a group head | `--fs-caption` | bold | `--text-1` | `SectionLabel`, sidebar heads, map module labels |
| 5 | a sub-head | `--fs-caption` | medium / semibold when open | `--text-2` | `InstrumentGroup` family label |
| 6 | content | `--fs-body` | medium / semibold when on | `--text-1` | rows, chips, tree nodes, buttons, prose |
| 7 | a qualifier | `--fs-caption` | medium | `--text-2` | relation names, counts, ancestry (a count moves with the head it belongs to: regular → medium when its family opens) |
| 8 | a hint | `--fs-caption` | regular | `--text-3` | preset hints, empty states, placeholder prose |

Ranks 1-5 are the display face; 6-8 are the UI face. Only rank 1 is allowed to
out-shout rank 2.

One permitted variation: an outer group head that nests another group head beneath
it — the map's domain over its modules — steps up to `--fs-body`, keeping bold and
`--text-1`. Rank 4 is otherwise fixed.

**Size and ink may not both give at once.** A rank drops one step of size *or* one
step of ink against its neighbour — never both. The map's module label failed on
both (`--fs-micro` **and** `--text-2`) above `NodeChip`s at `--fs-body` semibold
`--text-1`, raised on white with `--lift-1` and a domain dot: it lost on size, ink,
weight and elevation simultaneously, and the group read upside down.

**A head is never lighter than its children.** Chrome gets quieter as it nests;
content stays at full ink. When a group's items are elevated or coloured, the head
has to be paid for — it competes with the shadow and the hue, not only the type.

**`--text-3` is for hints only.** If a string names a thing — a relation, a family,
a section — it is not rank 8, however small it is.

**One name, one ink, everywhere.** The same string at two inks in one pane reads as
two different kinds of thing.

**Never hand-roll a head.** Use `SectionLabel`. Every inversion found so far came
from a head written inline, drifting to `--text-3` while the component beneath it
stayed at `--text-1`.

## Content kinds — what a string is allowed to say

The ladder decides how loud a line is; this decides what it is. One document head
stacks three different kinds — a category ("topic"), a name ("TCP & UDP") and a
location ("Computer Science / Networking / The stack"). Specimen:
`guidelines/type-content-kinds.html`.

| kind | rule | source |
| --- | --- | --- |
| **name** | verbatim; never re-cased, re-worded or abbreviated. Truncates with an ellipsis, keeps its full text in `title` | corpus |
| **category** | a closed set — *topic*, *container*. Uppercase `--fs-micro` + `--ls-caps`; the only uppercase *prose* in the app | closed set |
| **location** | ancestry, root first, joined with ` / `. Never shortened to the parent alone — the depth is the point | derived |
| **relation** | the corpus's own `EDGE_LABEL`, always beside its coloured rule. Reverse direction is marked `←`, never reworded | corpus |
| **authored prose** | stop notes and document bodies, verbatim. Never invented to fill a pane | corpus |
| **system prose** | the app's own voice: what is missing and why. The only kind that takes `--text-3` | this system |
| **number** | bare, mono, tabular. "12 visited", not "12 items" or "(12)" | derived |
| **action** | lower-case verb phrase: "reset session", "walk this". Never Title Case | this system |

**Corpus text is never authored here.** Where the source has no body, the pane says
so and names the file it would come from. Inventing prose to fill a rectangle lies
about the data.

**Lower case is the house voice** — heads, actions, panes, hints. Two exceptions:
names keep the corpus's casing, and categories are uppercase precisely because
nothing else is. Anything that *is* uppercase — a category, a via tag, a group
label — is tracked out with `--ls-caps`.

**Absence is not emptiness.** "no typed links — this node shows containment" states
a structural fact; "no results" hides one.
