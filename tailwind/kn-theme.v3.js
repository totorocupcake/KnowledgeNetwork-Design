/* ─────────────────────────────────────────────────────────────────────────────
   KnowledgeNetwork Design System — TAILWIND THEME (v3 fallback)
   Generated from the design system project. DO NOT EDIT BY HAND.

   Only needed if the app is still on Tailwind v3. On v4, use kn-theme.css and
   delete this file — a JS config and a CSS-first @theme should never both be
   live, or utilities resolve differently depending on which one Tailwind reads.

   Values are var() references here, so kn-tokens.css stays the runtime truth.
   Opacity modifiers (bg-moss-500/50) do NOT work on var()-based colours in v3 —
   another reason to move to v4.

       // tailwind.config.js
       const kn = require('./src/kn/kn-theme.v3.js')
       module.exports = { theme: { extend: kn } }
   ───────────────────────────────────────────────────────────────────────────── */

const ramp = (name, steps) =>
  Object.fromEntries(steps.map(s => [s, `var(--${name}-${s})`]))

module.exports = {
  fontFamily: {
    display: ['var(--font-display)'],
    ui: ['var(--font-ui)'],
    mono: ['var(--font-mono)'],
  },
  fontSize: {
    micro: 'var(--fs-micro)',
    caption: 'var(--fs-caption)',
    body: 'var(--fs-body)',
    title: 'var(--fs-title)',
    head: 'var(--fs-head)',
    display: 'var(--fs-display)',
    'display-lg': 'var(--fs-display-lg)',
    // as-built sizes the app renders today; not a target
    'ab-micro': 'var(--asbuilt-fs-micro)',
    'ab-meta': 'var(--asbuilt-fs-meta)',
    'ab-caption': 'var(--asbuilt-fs-caption)',
    'ab-label': 'var(--asbuilt-fs-label)',
    'ab-body': 'var(--asbuilt-fs-body)',
    'ab-pane': 'var(--asbuilt-fs-pane)',
  },
  lineHeight: { tight: 'var(--lh-tight)', snug: 'var(--lh-snug)', normal: 'var(--lh-normal)' },
  fontWeight: {
    regular: 'var(--fw-regular)', medium: 'var(--fw-medium)',
    semibold: 'var(--fw-semibold)', bold: 'var(--fw-bold)', heavy: 'var(--fw-heavy)',
  },
  letterSpacing: { display: 'var(--ls-display)', caps: 'var(--ls-caps)', eyebrow: 'var(--ls-eyebrow)' },

  colors: {
    bark: ramp('bark', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    moss: ramp('moss', [50, 100, 200, 300, 400, 500, 600, 700, 800]),
    acorn: ramp('acorn', [50, 100, 200, 300, 400, 500, 600]),
    pond: ramp('pond', [50, 100, 200, 300, 400, 500, 600]),
    berry: ramp('berry', [50, 100, 500, 600]),

    domain: {
      sys: 'var(--domain-sys)', math: 'var(--domain-math)', cs: 'var(--domain-cs)',
      net: 'var(--domain-net)', sec: 'var(--domain-sec)', se: 'var(--domain-se)',
      'sys-raw': 'var(--domain-sys-raw)', 'math-raw': 'var(--domain-math-raw)',
      'cs-raw': 'var(--domain-cs-raw)', 'net-raw': 'var(--domain-net-raw)',
      'sec-raw': 'var(--domain-sec-raw)', 'se-raw': 'var(--domain-se-raw)',
    },
    edge: {
      'depends-on': 'var(--edge-depends-on)', uses: 'var(--edge-uses)',
      'see-also': 'var(--edge-see-also)', 'implemented-with': 'var(--edge-implemented-with)',
      mixed: 'var(--edge-mixed)',
    },

    canopy: 'var(--surface-canopy)',
    paper: 'var(--surface-paper)',
    raised: 'var(--surface-raised)',
    sunken: 'var(--surface-sunken)',
    'sunken-2': 'var(--surface-sunken-2)',
    hover: 'var(--surface-hover)',
    'hover-raised': 'var(--surface-hover-raised)',
    press: 'var(--surface-press)',
    veil: 'var(--surface-veil)',

    hair: 'var(--border-hair)',
    rule: 'var(--border-rule)',
    frame: 'var(--border-frame)',
    'border-strong': 'var(--border-strong)',
    'border-dashed': 'var(--border-dashed)',

    ink: {
      1: 'var(--text-1)', 2: 'var(--text-2)', 3: 'var(--text-3)',
      inverse: 'var(--text-inverse)', accent: 'var(--text-accent)', walk: 'var(--text-walk)',
    },

    primary: 'var(--accent-primary)',
    'primary-ink': 'var(--accent-primary-ink)',
    'primary-wash': 'var(--accent-primary-wash)',
    walk: 'var(--accent-walk)',
    'walk-wash': 'var(--accent-walk-wash)',
    selected: 'var(--state-selected)',
    'selected-wash': 'var(--state-selected-wash)',
    linked: 'var(--state-linked)',
    danger: 'var(--state-danger)',
    'danger-wash': 'var(--state-danger-wash)',
    optional: 'var(--state-optional)',
  },

  borderRadius: {
    xs: 'var(--radius-xs)', sm: 'var(--radius-sm)', md: 'var(--radius-md)',
    lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', pill: 'var(--radius-pill)',
  },
  spacing: {
    '05': 'var(--space-05)', 15: 'var(--space-15)',
    'pane-x': 'var(--pane-pad-x)', 'pane-y': 'var(--pane-pad-y)',
  },
  width: {
    sidebar: 'var(--sidebar-w)', tree: 'var(--tree-w)',
    walkstack: 'var(--walkstack-w)', rail: 'var(--rail-w)', 'road-node': 'var(--road-node-w)',
  },
  height: {
    'pane-header': 'var(--pane-header-h)', 'walk-strip': 'var(--walk-strip-h)',
    'trail-strip': 'var(--trail-strip-h)', 'road-node': 'var(--road-node-h)',
    hit: 'var(--hit-min)', 'hit-comfortable': 'var(--hit-comfortable)',
  },

  boxShadow: {
    'lift-1': 'var(--lift-1)', 'lift-2': 'var(--lift-2)', 'lift-3': 'var(--lift-3)',
    'lift-drag': 'var(--lift-drag)', 'sink-1': 'var(--sink-1)', 'sink-2': 'var(--sink-2)',
    'ring-selected': 'var(--ring-selected)', 'ring-linked': 'var(--ring-linked)',
    'ring-primary': 'var(--ring-primary)', 'ring-walk': 'var(--ring-walk)',
    'ring-danger': 'var(--ring-danger)', 'ring-focus': 'var(--ring-focus)',
  },
  opacity: {
    'off-path': 'var(--opacity-off-path)',
    'drag-rest': 'var(--opacity-drag-rest)',
    disabled: 'var(--opacity-disabled)',
  },

  transitionTimingFunction: { soft: 'var(--ease-soft)', settle: 'var(--ease-settle)' },
  transitionDuration: {
    tap: 'var(--dur-tap)', hover: 'var(--dur-hover)', trace: 'var(--dur-trace)',
    move: 'var(--dur-move)', fade: 'var(--dur-fade)', enter: 'var(--dur-enter)',
    relayout: 'var(--dur-relayout)',
  },
}
