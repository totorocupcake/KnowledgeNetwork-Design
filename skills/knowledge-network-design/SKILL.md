---
name: knowledge-network-design
description: The KnowledgeNetwork (P.Kt) design system — tokens, component contracts, and the rules behind them. Use whenever writing or changing UI in this app.
---

# KnowledgeNetwork design system

This folder is the design system's contract with this app. It is **generated
upstream** and copied in — treat every file here as read-only.

## The one rule about direction

Sync is one-way: **design system → this repo → the app.**

If a value in the app disagrees with a value here, the app is out of date and
the app changes. Never edit a token, a colour, or a rule in this folder to match
what the code currently does. If something here looks wrong, say so and stop —
it gets fixed upstream and re-exported, not patched here.

## What is where

| Path | What it is |
| --- | --- |
| `../../tokens/kn-tokens.css` | every token, as CSS custom properties. The runtime truth. |
| `../../tokens/kn-base.css` | element defaults, focus ring, keyframes, the three-state scrollbar |
| `../../tailwind/kn-theme.css` | the Tailwind v4 `@theme` block — the utility surface |
| `../../assets/scrollbars.js` | drives the scrollbar's `data-sb` states |
| `readme.md` | the full design system: every rule, and why |
| `components/contracts.d.ts` | every component's props, in one file, grouped by area |
| `components/<area>/<name>.tsx.txt` | **the implementation** — TypeScript + Tailwind. Drop the `.txt` on copy. Kebab-case filename, PascalCase export |
| `components/<area>/<Name>.prompt.md` | how to use it, and the traps |
| `components/wash.ts.txt` | the one shared hover transition, and the domain-hue class maps |
| `studio/studio-app.tsx.txt` | **the app shell** — the four bands, the pane row, the palette |
| `studio/panes.tsx.txt` | the five instrument panes, and the `PANE` / `PANE_BODY` recipes |
| `studio/corpus.ts.txt` | a typed sample graph. Swap for the app's own corpus — same export names |

The contracts are a prop shape; the `.tsx.txt` beside them is the real thing (the
suffix keeps the upstream compiler from treating a shipped copy as a component
definition — strip it on copy). **Port the
source rather than re-deriving it from the prose** — the rules doc explains the
decisions, the source carries the measurements, and several of those took a few passes
to settle. Inline styles survive in a handful of places, each with a comment saying
why: runtime drag geometry, SVG viewBoxes, the two drawn marks, `-webkit-line-clamp`
stacks, and any value picked per instance.

## The shell is most of the look

If a screen has the right colours and still reads as a different app, the geometry is
wrong — not the tokens. `readme.md`'s **Layout** section is the spec and
`studio/studio-app.tsx.txt` is the reference. The three rules that get missed most:

- **`bg-canopy` is the only full-bleed background.** A pane never sits on white, and
  white is never the page.
- **`min-w-0` on every pane wrapper.** Node titles are unbounded corpus text; without
  the floor override one long name widens its own pane at its neighbours' expense.
- **A pane is `overflow-visible`.** `PaneHeader`'s legend sits ON the top border, and
  a hidden overflow clips it — which is exactly what makes a rebuilt pane read as a
  plain card with a title inside it.

## How to write UI in this app

1. **Read `readme.md` first.** It is the argument behind every token. Most
   "which one do I use" questions are answered there explicitly.
   Then `components/contracts.d.ts` for the prop shapes, and the `.tsx` beside a
   component when you are about to change it.
2. **Use Tailwind utilities from `kn-theme.css`.** `bg-paper`, `text-ink-2`,
   `rounded-lg`, `shadow-lift-1`, `text-body`, `border-hair`. If you find
   yourself writing an arbitrary value like `text-[13px]` or `bg-[#fdfcfa]`,
   the token exists — find it.
3. **Layout constants stay token references.** `w-[var(--sidebar-w)]`,
   `h-[var(--pane-header-h)]`, `gap-[var(--road-gap)]`. These are
   measurements, not a scale, so they are deliberately not utilities.
4. **Check the component's `.prompt.md` before changing it.** Nearly every one
   records a decision that looks arbitrary and isn't.

## Things that are easy to get wrong

- **Chrome colour and data colour never mix roles.** `--moss-*` / `--acorn-*` /
  `--pond-*` are interface. `--domain-*` / `--edge-*` are claims about what a
  node *is*. Never use a domain hue as an accent, or an accent to mean a domain.
- **`--*-raw` is only for pixel-matching the current build.** New work uses the
  naturalised values.
- **Acorn is reserved.** It means "on the authored path". Nothing else.
- **Pond is reserved.** Selection and cross-pane correspondence only.
- **One ring per meaning, never stacked.** A ring over an element's own `--lift-1`
  is not stacking — that combination is correct for a `lit` chip.
- **Never a lift and a sink on the same element.**
- **Never animate colour.**
- **Mono loads at 400 and 500 only.** A weight step on a count must be
  regular → medium, never medium → semibold — 600 silently renders as 500.
- **11px (`text-micro`) is the floor**, and only for numerals, glyph marks and
  tags. Anything a person reads is `text-body` or larger.
- **Thin repeated bars are SVG, not CSS boxes.** A 3px `<span>` lands on a
  different subpixel offset in every row and some instances read visibly
  thicker. Use an SVG `rect` with `shape-rendering="crispEdges"` — see
  `EdgeDash` in `components/contracts.d.ts`.
- **Dashed borders always mean conditional.** Never decorative.
- **A destructive control wears berry AT REST, not on hover.** Hover is a one-step
  wash of an element's own family and never a hue change, so a ✕ that turns berry
  under the pointer breaks the rule and withholds the warning until it is too late
  to matter. Delete controls are `--state-danger` inked from the moment they are
  visible. Removing something from a composition — a pane's ✕, a group's ungroup —
  is NOT destructive: neutral recipe.
- **Everything that recedes shares one clock**, `window.PKT_SB.LEAVE` from
  `scrollbars.js`: the scrollbar, a pane's ✕, a group's controls, a chip's ✕. Never
  invent a second timeout.
- **A hidden control must leave the tab order.** `opacity: 0` and
  `pointer-events: none` do not stop Enter, so anything that recedes also takes
  `tabIndex={-1}` while hidden — otherwise a keyboard lands on an invisible delete.
- **Order belongs to the container, not the item.** A node does not drag itself; the
  chain it sits in owns reordering, constrains the drag to its own axis, and hands
  each child its step number. See `NodeChain`.
- **A count needs its word.** A bare figure beside a control reads as a stray number.
  Mono figure, lower-case noun, one ink step down.

## Migrating off the as-built sizes

The app currently renders at 9–11px (`text-ab-*` in the theme). Those utilities
exist so the migration is mechanical: `text-ab-body` → `text-body`,
`text-ab-caption` → `text-caption`. Do it per pane, not globally — the dense
instruments need their line heights re-checked when the type grows.
