/* ─────────────────────────────────────────────────────────────────────────────
   KnowledgeNetwork Design System — COMPONENT CONTRACTS
   Generated from the design system project. DO NOT EDIT BY HAND.

   Every component's props, in one file, grouped by area. The prose that goes
   with each one — how to use it, and the traps — is in the sibling
   <area>/<Name>.prompt.md.

   These are contracts, not an implementation. The app's components are
   TypeScript and Tailwind; match the prop shape and the rules, not this file's
   structure.
   ───────────────────────────────────────────────────────────────────────────── */


/* ═══════════════════════════════════════════════════════════════════════════
   CHROME — App shell, toolbars, pane headers, buttons, counters, the leaf mark.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── chrome/AppHeader ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

/**
 * The application bar: brand, product, what the corpus is, the shared focus, and session controls.
 */
export interface AppHeaderProps {
  /** the wordmark, set in plain type — P.Kt has no logo file */
  brand?: string
  /** the product name, e.g. "Studio" */
  product: string
  /** one lower-case line describing the loaded corpus */
  corpusLine?: string
  /** the bus's current focus */
  focus?: { title: string; domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se' } | null
  /** counts and session buttons, right-aligned */
  children?: ReactNode
}
export function AppHeader(props: AppHeaderProps): JSX.Element

/* ── chrome/CountBadge ─────────────────────────────────────────────── */
/** A live count in the header: the number in mono/tabular figures, the noun beside it in lower case. */
export interface CountBadgeProps {
  value: number | string
  /** lower case, no unit noun padding — "visited", "route", "entries" */
  label: string
  tone?: 'quiet' | 'primary' | 'walk'
}
export function CountBadge(props: CountBadgeProps): JSX.Element

/* ── chrome/LeafMark ─────────────────────────────────────────────── */
/**
 * The house brand motif — a hand-drawn wavy leaf, shipped as `assets/leaf.png`.
 * The PNG is used as a mask and painted with a token colour, so the drawn line is
 * preserved exactly while the system controls its weight. Decorative and
 * non-interactive; the closest thing P.Kt has to a mark, since no logo file exists.
 * Never redraw or trace it: the hand-drawn line is the asset.
 */
export interface LeafMarkProps {
  /** rendered HEIGHT in px; the artwork is landscape (2.224:1) and keeps its ratio.
   *  Size it TALLER than the strip it sits in — the artwork is drawn pre-cropped and
   *  is meant to overflow. ~96 in a 44px toolbar; 160+ as a quiet backdrop. */
  size?: number
  /** rest the blade's tip exactly on the parent's bottom rule. The mark then hangs
   *  below that rule by everything under the tip, so the container must clip
   *  (`overflow:hidden`) and anchor it at `bottom: 0`. `Toolbar`'s `motif` slot does
   *  both. */
  tipOnRule?: boolean
  /** ~0.55 in a toolbar, 0.15–0.25 behind content. The motif recedes by opacity,
   *  never by switching to a paler green — and not so far that the wash stops
   *  reading as the wordmark's green. */
  opacity?: number
  /** what the line is painted in. `--moss-600` by default — the SAME green as the
   *  wordmark, so the surface carries one brand green
   *  decorative. Any chrome colour, but NEVER a `--domain-*` or `--edge-*` value,
   *  which would read as a claim about the data. */
  color?: string
  /** path to the project root from the consuming page — "." at the root,
   *  "../.." from a two-deep kit directory */
  base?: string
  /** only when the leaf is the sole thing standing in for the brand; otherwise
   *  leave it decorative and unlabelled */
  title?: string
}
export function LeafMark(props: LeafMarkProps): JSX.Element

/* ── chrome/PaneHeader ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

/**
 * The pane's hat. The title sits ON the pane's hairline border — the frame and
 * the label are one thing. A pane carries a title and nothing else: no subtitle,
 * no description, no contract line.
 */
export interface PaneHeaderProps {
  /** lower case, one or two words: "tree", "document", "palette" */
  title: string
  /** an optional Unicode mark from the house set */
  glyph?: string
  /** drops the pane from the composition. Renders an 18px ✕ (tooltip "close")
   *  that is hidden while the pane is at rest and fades in — with its notch in
   *  the frame — whenever the pointer or the keyboard is inside the pane. */
  onClose?: () => void
  /** pane-scoped controls, rendered on the frame beside the title. The legend slot
   *  is 18px tall — put only icon-height controls here, never a full-height pill. */
  actions?: ReactNode
  /** legend = the title straddles the pane border (default); bar = a filled title row */
  variant?: 'legend' | 'bar'
  /** what sits BEHIND the pane, so the legend can mask the border it interrupts */
  legendBg?: string
}
export function PaneHeader(props: PaneHeaderProps): JSX.Element

/* ── chrome/PillButton ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

/**
 * A small round-cornered action button. Every control in a P.Kt pane is a pill.
 */
export interface PillButtonProps {
  /** quiet = the default bordered pill; primary = moss; walk = acorn (reserved for the authored path); danger = berry */
  tone?: 'quiet' | 'primary' | 'walk' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  /** a Unicode glyph from the house set, e.g. '\u25b6' or '\u2726'. Never an emoji. */
  glyph?: string
  disabled?: boolean
  /** on/toggled — draws the moss ring wash rather than a separate colour */
  selected?: boolean
  title?: string
  onClick?: () => void
  children?: ReactNode
}
export function PillButton(props: PillButtonProps): JSX.Element

/* ── chrome/Toolbar ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

export interface ToolbarItemSpec {
  /** rare — toolbar items are glyph-only; use only where a mark cannot carry the meaning */
  label?: string
  /** the item itself: a Unicode glyph from the house set, or a small drawn mark
   *  (an inline SVG node) where no glyph carries the meaning — see the prompt */
  glyph?: ReactNode
  /** names the action AND states the current truth: "optionals: on the road" */
  title?: string
  /** this toggle is currently on — draws a moss (or acorn) wash, never a hue swap */
  on?: boolean
  disabled?: boolean
  /** walk = acorn (the authored path); primary = moss */
  tone?: 'quiet' | 'walk' | 'primary'
  onClick?: () => void
}

/**
 * The topmost bar of a surface: icon-only pill actions, grouped by hairline rules.
 */
export interface ToolbarProps {
  /** left-to-right groups, divided by a hairline rule */
  groups?: Array<{ label?: string; items: ToolbarItemSpec[] }>
  /** right-aligned content — the live focus, counts, a session action */
  trailing?: ReactNode
  /** the wordmark in plain type — use when the toolbar is the topmost bar */
  brand?: string
  /** a decorative mark pinned to the trailing edge and CROPPED by the strip — pass
   *  `<LeafMark size={40} opacity={0.2} />`. Non-interactive; the toolbar clips it. */
  motif?: ReactNode
  /** 24px items instead of 30px, for a pane-level toolbar */
  dense?: boolean
}
export function Toolbar(props: ToolbarProps): JSX.Element

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR — The instrument palette: presets, rows, families, bin marks.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── sidebar/BinMark ─────────────────────────────────────────────── */
/**
 * A bin, drawn from plain geometry — the system's single drawn icon, used for
 * deleting a user-saved thing. Everything else in the system is a Unicode glyph.
 */
export interface BinMarkProps {
  /** px; 11 in a 20px icon button, which is the only place it appears today */
  size?: number
}
export function BinMark(props: BinMarkProps): JSX.Element

/* ── sidebar/InstrumentGroup ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

/**
 * One family in the instrument palette — the second layer of grouping, for when a
 * flat list of instruments would be too long to scan. Wraps `InstrumentRow`
 * children.
 */
export interface InstrumentGroupProps {
  /** the family name, lower case: "views", "walks", "lenses" */
  label: string
  /** expanded. An open family marks itself in weight — label and count medium →
   *  semibold — and its caret rotates and steps text-3 → text-2. Never in ink. */
  open?: boolean
  onToggle?: () => void
  /** how many members are on screen. Sits immediately after the label — which
   *  runs in a 76px minimum column, so counts align with each other while staying
   *  beside the name they belong to; an over-long name pushes its own count out of
   *  line rather than truncating. A FOLDED group still reports its state.
   *  0 hides it. */
  count?: number
  /** the shared label column for the whole list — pass `FamilyColumn(labels)`,
   *  the same value to every group, so the counts move right together instead of
   *  one row breaking the column. Default 76px. */
  labelWidth?: number | string
  /** the family's `InstrumentRow`s */
  children?: ReactNode
}
export function InstrumentGroup(props: InstrumentGroupProps): JSX.Element
/** The shared label column for a set of families: the longest name, in ch, never
 *  under 76px. Compute once per list and pass to every group as `labelWidth`.
 *  Capitalised so it is reachable as `window.<Namespace>.FamilyColumn`. */
export function FamilyColumn(labels: string[]): string

/* ── sidebar/InstrumentRow ─────────────────────────────────────────────── */
/** One instrument in the palette: toggles its pane on or off the composition. */
export interface InstrumentRowProps {
  /** as registered, e.g. "Map", "Walk \u00b7 Palette", "Lens: builds on" */
  label: string
  /** currently on screen — fills the selection bullet and steps the label to semibold */
  on?: boolean
  /** an edge-kind colour for lens rows; omit for every other instrument */
  swatch?: string
  /** registered but not available on this surface — dimmed to --opacity-disabled */
  disabled?: boolean
  onClick?: () => void
}
export function InstrumentRow(props: InstrumentRowProps): JSX.Element
/** The house selection bullet: an 8px disc, filled --accent-primary when on and
 *  an inset 1.5px --text-3 ring when off. Spread onto a <span> in a 12px slot.
 *  Use in ANY in/out list — never a typed ●/○. */
export function bulletStyle(on?: boolean): Record<string, string | number>

/* ── sidebar/PresetButton ─────────────────────────────────────────────── */
/** One row of the preset list: a named composition of instruments plus its one-line hint. */
export interface PresetButtonProps {
  /** Title-cased here, uniquely — preset names are proper nouns: "Present", "Explore", "Reading" */
  label: string
  /** the composition read left to right, lower case */
  hint?: string
  active?: boolean
  onClick?: () => void
  /** user-saved presets only — renders the bin mark in the top-right corner,
   *  which fades in on hover and turns berry on its own hover. Omit for the
   *  built-in presets, which cannot be deleted. */
  onDelete?: () => void
}
export function PresetButton(props: PresetButtonProps): JSX.Element

/* ═══════════════════════════════════════════════════════════════════════════
   GRAPH — Domain identity, node chips, relation dashes and the legend.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── graph/DomainDot ─────────────────────────────────────────────── */
/** The six-slot domain identity, rendered as a round dot. */
export interface DomainDotProps {
  domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se'
  /** px; 9 in rows and chips, 12+ in headers */
  size?: number
  /** paper halo, for dots sitting on a coloured or busy ground */
  ring?: boolean
}
export function DomainDot(props: DomainDotProps): JSX.Element

/* ── graph/EdgeLegend ─────────────────────────────────────────────── */
/** The relation legend: one crisp rule per edge kind, labelled with the corpus's own wording. */
export interface EdgeLegendProps {
  /** defaults to all four, in authoring order */
  types?: Array<'depends_on' | 'uses' | 'see_also' | 'implemented_with'>
  vertical?: boolean
}
export function EdgeLegend(props: EdgeLegendProps): JSX.Element

/**
 * A single relation dash, drawn as an SVG rect with `shape-rendering="crispEdges"`.
 *
 * Use this rather than a CSS box for any hairline-scale bar that repeats down a list: a 3px
 * `<span>` lands on a different subpixel offset in every row (the line boxes above it are
 * fractional), so some instances antialias across four device rows and read visibly thicker
 * than their neighbours. crispEdges snaps every instance to the same device-pixel height.
 * Square ends, by consequence — the snapping rules out a pill radius.
 */
export interface EdgeDashProps {
  /** the edge kind's colour, e.g. `var(--edge-uses)` */
  color: string
  /** px; 18 in the legend, 16 beside a link in a list */
  width?: number
}
export function EdgeDash(props: EdgeDashProps): JSX.Element

/* ── graph/NodeChip ─────────────────────────────────────────────── */
/**
 * A corpus node as a compact chip — the unit that appears in rails, routes and palettes.
 */
export interface NodeChipProps {
  title: string
  domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se'
  /** off the resolved path: no lift, no fill, --opacity-off-path */
  dim?: boolean
  /** cross-pane hover correspondence — a 1.5px pond ring over the chip's own lift */
  lit?: boolean
  /** tooltip; the stop's note when there is one */
  note?: string
  onClick?: () => void
}
export function NodeChip(props: NodeChipProps): JSX.Element

/* ═══════════════════════════════════════════════════════════════════════════
   NAV — Tree rows, trail chips, step dots, walk cards.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── nav/StepDot ─────────────────────────────────────────────── */
/** One stop of the active walk, as a numbered round button. */
export interface StepDotProps {
  n: number
  /** done = behind the cursor, current = the cursor, ahead = not yet reached */
  state?: 'done' | 'current' | 'ahead'
  /** the stop's authored note */
  title?: string
  onClick?: () => void
}
export function StepDot(props: StepDotProps): JSX.Element

/* ── nav/TrailChip ─────────────────────────────────────────────── */
/** An entry in the trail strip: where a focus landed, and how it got there. */
export interface TrailChipProps {
  title: string
  domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se'
  /** the three-letter writer tag: MAP TREE LNK TRL WLK GPH NAV */
  via?: string
  /** the focus crossed a typed link rather than stepping through containment */
  jump?: boolean
  onClick?: () => void
}
export function TrailChip(props: TrailChipProps): JSX.Element

/* ── nav/TreeRow ─────────────────────────────────────────────── */
/**
 * One indented row of the containment tree — the literal list reading of the corpus.
 */
export interface TreeRowProps {
  title: string
  domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se'
  /** indentation level; 16px per step */
  depth?: number
  /** has children — draws the disclosure caret (`caretStyle`, rotated when expanded) and answers to double-click */
  container?: boolean
  expanded?: boolean
  /** this row is the bus's focus */
  current?: boolean
  /** typed links touching this node; nonzero only at the topic level */
  linkCount?: number
  onSelect?: () => void
  onToggle?: () => void
  onZoom?: () => void
}
export function TreeRow(props: TreeRowProps): JSX.Element

/* ── nav/WalkCard ─────────────────────────────────────────────── */
/** An authored walk, offered from a node it passes through. */
export interface WalkCardProps {
  /** the walk's authored title, sentence case: "From transistor to running program" */
  title: string
  /** where this node sits in it: "stop 4 of 12 — <the stop's note>" */
  meta?: string
  active?: boolean
  onClick?: () => void
}
export function WalkCard(props: WalkCardProps): JSX.Element

/* ═══════════════════════════════════════════════════════════════════════════
   DOC — Document header and section labels.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── doc/DocHeader ─────────────────────────────────────────────── */
/** The document pane's head. The title is the ONE place a domain colour is used as ink. */
export interface DocHeaderProps {
  /** 'topic', 'container', or 'leaf' — lower case */
  kind: string
  title: string
  domain: 'sys' | 'math' | 'cs' | 'net' | 'sec' | 'se'
  /** containment path, slash-separated: "Computer Science / Networking / Protocol Stack" */
  ancestry?: string
}
export function DocHeader(props: DocHeaderProps): JSX.Element

/* ── doc/SectionLabel ─────────────────────────────────────────────── */
import type { ReactNode } from 'react'

/** A within-pane heading. Lower case; the count sits beside it, bare. */
export interface SectionLabelProps {
  children: ReactNode
  /** a bare number — never "(3 items)". Rendered mono / --text-2 / --fw-medium:
   *  one step below the head, because it reports rather than names. */
  count?: number
  /** a control pushed to the trailing edge — use this instead of hand-rolling a head row */
  action?: ReactNode
}
export function SectionLabel(props: SectionLabelProps): JSX.Element
