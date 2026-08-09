# EdgeEntry

One relationship, drawn: two nodes and the typed edge between them.

## What it is for

Stating a single edge, in full, where the reader needs to know *which* relation it is
and *which way* it points. It is the unit the Studio's connections rail is built from:
a stop opens and every link it holds is one `EdgeEntry`.

Use `EdgeLegend` instead when you are explaining the relation vocabulary rather than
stating an instance of it. Use `NodeArrow` when the connection is sequence — a walk,
an order — rather than a typed relation.

## The rules it encodes

- **The relation gets the emphasis, not the nodes.** An entry is a sentence, and both
  ends are usually already known from whatever the entry sits inside. So the label is
  body-size and semibold on a 3px rule, and the nodes recede to caption weight with a
  domain border and no fill. Reversing this — loud chips, faint edge — was the first
  version, and it read as two nodes with something grey between them.
- **The arrowhead goes on the end that receives.** `direction="both"` for a symmetric
  relation; the corpus treats `see_also` as symmetric, since its direction is an
  artifact of which document happened to be authored first.
- **The shaft is `EdgeDash`'s rule, not a CSS box.** It is an SVG rect with
  `shape-rendering="crispEdges"`. As a 3px `<span>` it landed on a different subpixel
  offset in every row — the line boxes above each entry are fractional — so some
  shafts antialiased across four device rows and read visibly thicker than the ones
  above and below them, in the same well.
- **The connector takes its room first.** It carries the string the entry exists for,
  so it claims its width and the two nodes share what is left. It shrinks to about 84
  in a narrow pane and never below 64.
- **The line is the connector column's only in-flow child.** The label floats above it
  absolutely. Stacked in flow, the label pushed the line down, and a node that wrapped
  to two lines left the arrow sitting at its foot instead of at its middle.
- **Clearance is margin, not padding.** Padding lives inside the box, so a label wider
  than its column still ran over the node beside it.
- **One end may be the anchor.** When an entry sits under a focus node — a rail stop,
  a neighbour list — one end is that focus node, repeated on every entry. `fromAnchor`
  / `toAnchor` give it the bold weight of the focus chip above, so the
  reader matches it at a glance and reads the other end as the new information. Weight
  only — filling it would raise it off the well, and an entry stands on nothing. Never
  mark both ends; an entry with two anchors has no subject.
- **An end reached through a descendant names its parent.** A list of edges filed
  under one node will often include edges that belong to that node's *children*;
  without saying so, the entry looks misfiled. `fromWithin` / `toWithin` print the
  containing node as a `Parent / ` prefix on that end — the ancestry grammar
  `DocHeader` already uses — so the reason the entry is there is on its face. With
  `fromAnchor`, the emphasis stays on the *prefix*: a list mixing direct and
  reached-through entries then opens every row on the same bold name, and the child
  that holds the link sits beside it at ordinary weight. A path deeper than one step
  keeps its first segment and elides the rest — `Networking / … / TCP & UDP` — with
  the whole path in the tooltip: set inline in a node column a third of a pane wide,
  three segments hit break-word and come apart mid-word.
- **It belongs in a recessed container.** The nodes are bordered rather than filled
  because they sit in a well. On paper they would need to be `NodeChip`s.

## Density

Nothing caps the number of entries — the caller decides that. In the Studio rail they
are grouped under a heading with a count, and the group is what collapses.

## Props

`from` · `to` are names. `fromDomain` · `toDomain` colour the borders. `type` supplies
both the label and the line colour from the corpus vocabulary; `relation` and `color`
override either. `relation=""` gives an unlabelled connector. `fromWithin` · `toWithin` name the containing node when that end was reached through
it. `fromAnchor` · `toAnchor` mark an end as the view's focus node. `onFrom` · `onTo` make
each end clickable — in the Studio they move the focus.
