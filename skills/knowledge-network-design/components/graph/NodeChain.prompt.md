One-line: the chain — a sequence of nodes with an arrow in every gap, reorderable by drag.

```jsx
<NodeChain number onReorder={(from, to) => setSteps(move(steps, from, to))}>
  <NodeChip title="DNS & Naming" domain="net" mark="border" wrap onDelete={() => drop('dns')} />
  <VersionedGroup title="Reach the machine" versions={versions} activeId={live} />
  <NodeChip title="Public-Key Cryptography" domain="sec" mark="border" wrap />
</NodeChain>
```

## Rules

- **The chain owns the order, not the nodes.** A node that dragged itself would have
  to know its siblings, their sizes and their order; the chain knows all three. This
  is also why `NodeChip` has no drag props — the chain supplies the `move` cursor and
  the pointer handling around it.
- **A drag is constrained to the chain's axis and lands on a slot.** A chain is a
  sequence, so the only thing a drag can express is a different position in it. Free
  XY movement would promise a canvas that is not there. (`VersionedGroup`'s own
  `movable` is for a group standing on its own; inside a chain pass
  `movable={false}` and let the chain move it.)
- **The arrows do not travel with the node.** They are the chain's scaffolding, not
  the node's luggage: an arrow that followed a dragged node would leave its own gap
  empty and arrive pointing at nothing. They sit between the slots, untransformed,
  and one step of "making room" is a slot plus the arrow it displaces.
- **Siblings make room, legibly.** Each passed sibling translates one slot over
  `--dur-move` — the repo's own rule that a relayout should be legible rather than a
  teleport. The dragged slot itself does not transition: it tracks the pointer, and a
  transition on the thing under your finger reads as lag.
- **A press on a control belongs to the control.** Buttons, fields and the version
  menu never start a drag, so a group inside a chain keeps its own minimize, ungroup,
  picker and inline fields.
- **`number` renumbers on drop.** The chain hands each child its position as `index`,
  the same derived-number rule `VersionedGroup` uses for its own contents, so moving
  a node re-labels the chain instead of leaving stale figures. `prefix="2."` numbers
  a nested chain 2.1, 2.2.
- **Controlled or not.** Pass `onReorder` and the caller owns the order — the chain
  reports positions (`from`, `to`) and re-renders from the new children. Omit it and
  the chain keeps the order itself, **by key, not by position**: a node deleted or a
  group ungrouped no longer throws the arrangement away. But a chain that has to place
  a *new* child exactly — the two nodes an ungrouped group spills, which belong in the
  slot the group occupied — needs `onReorder` and a caller that owns the array. The
  chain cannot know that two new nodes stand in for the one that left, so an
  uncontrolled chain drops them at their source position and a moved group appears to
  spill in the wrong place.
