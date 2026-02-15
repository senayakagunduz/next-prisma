# PRD: Fix Next.js 15 Dynamic Route params Type Error

## Overview
Fix the Next.js 15 type error where dynamic route `params` must be a Promise. The build is failing because three route pages use the old synchronous params pattern. This fix ensures the project compiles and deploys successfully.

## Goals
- Fix all dynamic route pages to use Promise-based params for Next.js 15 compatibility
- Ensure the project builds successfully (`npm run build`)
- Pass TypeScript type checking (`npm run typecheck` or `npx tsc`)
- Fix linting errors if any (`npm run lint`)

## Quality Gates

These commands must pass for every user story:
- `npm run typecheck` - Type checking
- `npm run lint` - Linting
- `npm run build` - Production build

For UI stories, also include:
- Verify the pages load correctly (optional if build passes)

## User Stories

### US-001: Fix app/admin/products/[id]/edit/page.tsx params type
**Description:** As a developer, I want the admin product edit page to compile with Next.js 15 so that the build passes.

**Acceptance Criteria:**
- [ ] Change function to `async function`
- [ ] Change params type to `Promise<{ id: string }>`
- [ ] Add `await params` before destructuring `id`
- [ ] Verify `npm run typecheck` passes
- [ ] Verify `npm run build` succeeds

### US-002: Fix app/products/[id]/page.tsx params type
**Description:** As a developer, I want the product detail page to compile with Next.js 15 so that the build passes.

**Acceptance Criteria:**
- [ ] Change function to `async function`
- [ ] Change params type to `Promise<{ id: string }>`
- [ ] Add `await params` before destructuring `id`
- [ ] Update all references to `params.id` after the await
- [ ] Verify `npm run typecheck` passes
- [ ] Verify `npm run build` succeeds

### US-003: Fix app/blog/[id]/page.tsx params type
**Description:** As a developer, I want the blog detail page to compile with Next.js 15 so that the build passes.

**Acceptance Criteria:**
- [ ] Change function to `async function`
- [ ] Change params type to `Promise<{ id: string }>`
- [ ] Add `await params` before destructuring `id`
- [ ] Verify `npm run typecheck` passes
- [ ] Verify `npm run build` succeeds

### US-004: Verify full build passes
**Description:** As a developer, I want to verify the entire project builds successfully after all fixes.

**Acceptance Criteria:**
- [ ] Run `npm run build` and verify it completes without errors
- [ ] Confirm deployment would succeed

## Functional Requirements

- FR-1: All dynamic route pages with `[id]` parameters must use `Promise<{ id: string }>` for params type
- FR-2: All page components accessing params must be async functions
- FR-3: All params must be awaited before destructuring (e.g., `const { id } = await params`)
- FR-4: The build command must exit with code 0

## Non-Goals
- Fixing other Next.js 15 migration issues (searchParams, etc.)
- Adding new features
- Refactoring other parts of the codebase

## Technical Considerations

The Next.js 15 change requires:
```typescript
// Old (Next.js 14)
function Page({ params }: { params: { id: string } }) {
  const { id } = params;
}

// New (Next.js 15)
function Page({ params }: { params: Promise<{ id: string }>) {
  const { id } = await params;
}
```

## Open Questions

None - the scope is clear and the fix pattern is well-established.
