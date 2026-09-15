# Project State

## Current architecture

- Next.js Pages Router is the web application at the repository root.
- The repository now uses npm workspaces for `apps/*` and `packages/*`.
- `packages/profile` contains shared TypeScript contracts.
- `apps/profile-sync` contains a small backend API and synchronization job for experiences.
- The sync job reads an authorized JSON source through `PROFILE_SOURCE_URL`, persists normalized data to `PROFILE_DATA_FILE`, and exposes `GET /experiences` and `POST /sync`.

## Next milestone

- Connect the web app to `GET /experiences` with a local fallback, then configure an authorized LinkedIn-compatible adapter or another profile source.
