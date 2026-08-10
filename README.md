# KnowledgeNetwork design system — export

Generated from the **KnowledgeNetwork Design System** design project. Everything
here is generated: do not hand-edit any of it. Changes are made upstream in the
design system and re-exported.

Sync direction is one-way — **design system → this repo → the app.** If the app
and this export disagree, the export is right.

## Install

Copy the folders into the app:

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

### The components and the Studio

The skill folder also carries **real source**, not just rules:

```
skills/knowledge-network-design/components/  →  src/kn/components/
skills/knowledge-network-design/studio/      →  src/kn/studio/
```

23 components in TypeScript + Tailwind classes, and the Studio itself —
`studio-app.tsx.txt` (the shell), `panes.tsx.txt` (the five instrument panes) and
`corpus.ts.txt` (a typed sample graph). Port these rather than rebuilding from the prompt files: the
rules doc explains the decisions, the source carries the measurements.

**Strip the trailing `.txt` on copy.** The files ship as `pane-header.tsx.txt`
because the design system upstream compiles every `.tsx` it can see, and a shipped
copy of a component would collide with the component itself. The suffix is the only
thing standing between these files and being real source:

```sh
cd src/kn && find . -name "*.txt" -exec sh -c 'mv "$1" "${1%.txt}"' _ {} \;
```

Filenames are kebab-case (`pane-header.tsx`); the exported names are PascalCase
(`PaneHeader`) as always. Rename the files if the app uses PascalCase filenames —
nothing but the sibling imports depends on them.

The Studio renders as soon as those two folders and the CSS above are in place. The
one wiring step is `studio/corpus.ts` — replace it with the app's own
`src/corpus/graph.ts` and `walks.ts` behind the same export names.

Inline styles survive in a handful of places on purpose, each with a comment saying
why: runtime drag geometry, SVG viewBoxes, the two drawn marks, `-webkit-line-clamp`
stacks, and any value chosen per instance (a domain hue picked at runtime has no
build-time class).

## What each file is for

| File | Role |
| --- | --- |
| `tokens/kn-tokens.css` | Every token as a CSS custom property. The runtime truth — what `var(--moss-500)` resolves to. |
| `tokens/kn-base.css` | Element defaults, focus ring, drill keyframes, the three-state scrollbar. |
| `tailwind/kn-theme.css` | Tailwind v4 `@theme`. Turns tokens into classes so no rule needs an arbitrary value. |
| `tailwind/kn-theme.v3.js` | Tailwind v3 fallback. Delete on v4. |
| `assets/scrollbars.js` | Sets `data-sb` / `data-sb-js` for the scrollbar states. |
| `assets/leaf.png` | The one hand-drawn asset. `LeafMark` masks it and paints it with a token colour. |
| `skills/knowledge-network-design/` | The rules **and the source**, for Claude Code. `SKILL.md` is the entry point, `readme.md` the full argument, `components/contracts.d.ts` the prop shapes, `components/<area>/*.tsx.txt` the implementations (drop the `.txt`; kebab-case filenames, PascalCase exports), `components/<area>/*.prompt.md` the per-component traps (areas: chrome, sidebar, graph, nav, doc, group), `studio/` the app shell. |

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
