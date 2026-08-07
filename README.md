# KnowledgeNetwork design system — export

Generated from the **KnowledgeNetwork Design System** design project. Everything
here is generated: do not hand-edit any of it. Changes are made upstream in the
design system and re-exported.

Sync direction is one-way — **design system → this repo → the app.** If the app
and this export disagree, the export is right.

## Install

Copy the three folders into the app:

```
export/tokens/      →  src/kn/
export/tailwind/    →  src/kn/
export/assets/      →  src/kn/
export/skills/knowledge-network-design/  →  skills/knowledge-network-design/
```

Then in the app's entry CSS:

```css
@import "tailwindcss";
@import "./kn/kn-tokens.css";   /* runtime vars — var(--moss-500), var(--lift-1) */
@import "./kn/kn-theme.css";    /* the Tailwind utility surface */
@import "./kn/kn-base.css";     /* element defaults, focus ring, scrollbars */
```

Order matters: `kn-base.css` sets element defaults that must win over Tailwind's
preflight, so it comes last.

Then load the scrollbar script once, at app start:

```ts
import './kn/scrollbars.js'
```

Without it the scrollbars simply stay in their resting (hidden) state — nothing
breaks, you just lose the three-state behaviour.

**On Tailwind v3?** Use `kn-theme.v3.js` as a `theme.extend` fragment instead of
`kn-theme.css`, and delete the other. Never have both live.

## What each file is for

| File | Role |
| --- | --- |
| `tokens/kn-tokens.css` | Every token as a CSS custom property. The runtime truth — what `var(--moss-500)` resolves to. |
| `tokens/kn-base.css` | Element defaults, focus ring, drill keyframes, the three-state scrollbar. |
| `tailwind/kn-theme.css` | Tailwind v4 `@theme`. Turns tokens into classes so no rule needs an arbitrary value. |
| `tailwind/kn-theme.v3.js` | Tailwind v3 fallback. Delete on v4. |
| `assets/scrollbars.js` | Sets `data-sb` / `data-sb-js` for the scrollbar states. |
| `skills/knowledge-network-design/` | The rules, for Claude Code. Read by the agent, not the bundler. `SKILL.md` is the entry point, `readme.md` the full argument, `components/contracts.d.ts` the prop shapes, `components/<area>/*.prompt.md` the per-component traps (areas: chrome, sidebar, graph, nav, doc, group). |

`kn-tokens.css` and `kn-theme.css` restate the same values — the first as
`--moss-500`, the second as `--color-moss-500`. That duplication is deliberate:
Tailwind v4's theme namespaces collide by name with several token names, and a
var pointing at itself is circular. Both files are generated in the same pass, so
they can't drift — but neither is safe to edit by hand.

## The loop

1. Ask for a change in the design system project.
2. It re-exports this folder.
3. You commit it here.
4. Claude Code reads `skills/knowledge-network-design/` and refactors the app.

Step 3 is the only manual hop.
