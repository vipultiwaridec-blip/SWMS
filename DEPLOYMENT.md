# SWMS — Download and deployment

## What to download

Use the provided `swms-source.zip`. It includes the application source, lockfile, configuration, public assets, README and this guide. It intentionally excludes `node_modules`, generated build output, local SQLite data, uploaded photos, browser profiles and secret files. The application creates the database and upload directory when started.

## Hosting requirements

SWMS is a full-stack Node application—not a static-only website. Deploy it to a host that supports a continuously running Node.js service, Node 22, native npm packages (`better-sqlite3`), a host-assigned `PORT`, and a **writable persistent disk**. The same Express process serves the API, uploaded evidence and production frontend.

For reliable SQLite persistence, mount storage and run a single application instance. Do not deploy this version to a serverless or static-only host, or to multiple autoscaled instances sharing only ephemeral local storage.

## Build and start

After downloading and extracting the archive, run locally or use equivalent build/start commands in the hosting provider:

```bash
cd swms
npm ci --include=dev
npm run build
npm start
```

For a platform with separate build and start commands:

- **Build command:** `npm ci --include=dev && npm run build`
- **Start command:** `npm start`
- **Node version:** 22
- **Health-check path:** `/api/health`

Set the following environment variables in the provider's runtime settings. Do not commit real values to the project:

| Variable | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | Use the port assigned by the host; the app defaults to `3001` for local use. |
| `JWT_SECRET` | A private random secret, for example generated with `openssl rand -hex 32`. |
| `SWMS_DB_PATH` | Absolute path on the persistent disk, e.g. `/data/swms.sqlite`. |
| `SWMS_UPLOAD_DIR` | Writable directory on the same persistent disk, e.g. `/data/uploads`. |

`OPENAI_API_BASE` and `OPENAI_API_KEY` are optional. If they are not configured, report-image analysis uses the deterministic demo fallback.

After deployment, visit the provider URL and check `/api/health`. Back up the persistent database and uploads together.

## Important demo limitation

This project seeds demonstration residents, workers, administrators and sample records on startup. The seeded login details are documented in `README.md`. Keep a demo deployment private or restricted. Do not use this build for real municipal operations or sensitive citizen data without first removing/changing demo accounts, reviewing authentication/authorization, and completing a security and data-retention review.
