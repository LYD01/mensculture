# Server / client boundaries

Human-readable companion to [`.cursor/rules/server-client-boundaries.mdc`](../../.cursor/rules/server-client-boundaries.mdc). These conventions apply to **any** Next.js App Router project in this repo — not tied to a specific product feature.

## Why this exists

Mixing server and client boundaries incorrectly leads to:

- **"An unexpected response was received from the server"** — often from Server Actions that `redirect()` or `throw` on expected errors when called from a client component.
- **Hydration mismatches** — especially dates/locales rendered differently in Node vs the browser.
- **Accidental secret or DB access in the client bundle** — importing server-only modules from `"use client"` files.

The rules below make that class of bug hard to reintroduce.

## Baseline snapshot

| Item | Status |
| --- | --- |
| Public routes | `app/page.tsx`, `app/layout.tsx` — Server Components |
| Server Actions | None yet |
| Client islands | None yet |

Re-run the **checklist** at the bottom when adding actions, auth, a database layer, or interactive client components.

## Invariants

### Directives

- Server Components are the default for `page.tsx` and `layout.tsx`.
- `"use server"` marks Server Actions — it is not a page directive (`"use-server"` is invalid).
- `"use client"` is opt-in for leaves that need hooks, event handlers, or browser APIs.

### Page shape

Every route should be either:

1. Inline server JSX (no client state), or  
2. A thin server shell (prefetch, auth checks) that passes **fully serialised** props into one or more small client islands.

Do not put `"use client"` on `page.tsx` or `layout.tsx` to “make the page work” — extract the interactive part.

### Server Actions

- Return a **serialisable discriminated union** (pick one shape per file and stay consistent), e.g.  
  `{ success: true, data } | { success: false, error: string }` or  
  `{ ok: true, data } | { ok: false, error: string }`.
- **Never `redirect()` or `notFound()` in an error branch** when the action is invoked from a client component. Return an error (e.g. `unauthenticated`) and let the client call `router.push(...)`.
- **Never `throw`** across the action boundary for expected validation, auth, or not-found cases — thrown errors serialize poorly and surface as generic server errors.
- Validate external input at the start of every action (e.g. with Zod when the project uses it).
- Keep actions in `_actions/` — not co-located with route files — so boundaries stay easy to audit.

### Dates and other non-JSON values

- Any `Date` (or similar) that crosses server → client must be an **ISO string** at the boundary. Client props type those fields as `string`; parse with `new Date(iso)` at the point of use.
- When formatting dates/times in client components, **pin locale and clock** (e.g. `en-AU`, `hour12: true`) so SSR and the browser agree.

### Data fetching

- Load data in Server Components; pass props down. Avoid an initial `useEffect` + `fetch` when a parent server component could prefetch.
- After a mutation, prefer the action returning fresh data, or **narrow** `revalidatePath` / `revalidateTag` — not layout-wide revalidation unless necessary.

### Revalidation

- Avoid `revalidatePath(path, "layout")` unless you intentionally want every ancestor layout to re-run (including shared nav auth/queries).
- Prefer resource-scoped `revalidateTag` when the same data appears on multiple routes.

### Module imports

- Client components must **not** import database clients, server auth helpers, or other Node-only modules. If a client leaf needs data, it receives props from a server parent or calls a Server Action.
- Server-only modules should not import client component trees.

## Checklist before merge

- [ ] `page.tsx` / `layout.tsx` do not use `"use client"` without a documented reason.
- [ ] No client component imports server-only modules (`db/`, server auth, etc.).
- [ ] Server Actions do not `redirect()` / `throw` on expected errors when called from clients.
- [ ] Dates (and similar) sent to clients are ISO strings, with pinned locale for display.
- [ ] No unnecessary `revalidatePath(..., "layout")`.
- [ ] No client-side initial fetch that duplicates what a Server Component could pass as props.

## When to update this doc

Add a short note under **Baseline snapshot** when the architecture changes materially (first Server Action, first protected admin layout, first DB import path, etc.) so future diffs have a clear “before / after”.
