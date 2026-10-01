# SWMS — Smart Waste Management System

SWMS is a mobile-first, role-based waste-management and municipal complaint-tracking demonstration. The existing local stack remains React/Vite, TypeScript, Node.js/Express and SQLite; it does not use Supabase or Firebase.

## Run locally

Requirements: Node.js 20 or later (Node 22 recommended) and npm.

```bash
cd /home/ubuntu/swms
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite serves the frontend and proxies `/api` and `/uploads` to the Express API on port 3001. Health check: [http://localhost:3001/api/health](http://localhost:3001/api/health).

All seeded accounts use `ClearCity123!`:

| Role | Email |
| --- | --- |
| Resident | `citizen@clearcity.demo` |
| Field worker | `worker@clearcity.demo` |
| Field worker | `theo@clearcity.demo` |
| Administrator | `admin@clearcity.demo` |

The login screen also provides one-tap demo access. Seeded accounts show a persistent **DEMO** workspace marker. Sample complaint, vehicle, site, scan, attendance and hotspot records are labelled DEMO where displayed. Residents can register additional accounts.

## Included workflows

- **Resident:** submit a waste report with optional photo, severity, location and bin context; track the incident timeline, SLA and notifications; connect to a nearby duplicate incident; request a scheduled pickup; rate a completed service; learn wet/dry sorting and responsible disposal; follow monthly demonstration challenges and simulated non-cash points.
- **Field worker:** view and accept assignments, add resolution notes/evidence, update pickup progress, view assigned fleet vehicles and QR identity, record manual attendance, and view the schematic operational map and DPARVP methodology.
- **Administrator:** manage vehicles, registration, driver and status; create authorized dumping sites; inspect QR scan and dumping records; review unauthorized-dumping flags; view worker task/SLA metrics; and advance open escalation cases from Local Admin to Higher Authority with a recorded reason and timestamp.
- **Map:** a lightweight schematic coordinate view can show complaints, bins, hotspots, vehicles and authorized sites. If no data-backed recurring hotspot exists, an explicitly labelled illustrative DEMO marker is used. Coordinate link-outs use OpenStreetMap; Leaflet/basemap tiles and Google Maps are not integrated.
- **DPARVP:** Detect → Prioritize → Assign → Respond → Verify → Predict, connected in-app to the existing report, triage, dispatch, worker response, verification and analytics workflows.
- **P3 presentation/stability:** explicit SWMS identity and tagline, a linked architecture explanation, persistent DEMO workspace markers for seeded accounts, truthful admin KPI descriptions, refined resident mobile headline spacing, focus/reduced-motion support, and clear loading, retry, empty and upload-validation states.
- **Existing P0/P1 flows preserved:** role-based login, resident reports, worker assignment/acceptance/resolution, optional image AI with deterministic fallback, duplicate linking, smart priority, SLA notifications, analytics, resolution evidence/feedback, user management and pickup lifecycle.

## Simulation boundaries

Vehicle IDs have genuine locally generated QR images. QR/dumping scans, attendance, vehicle location, challenges and escalation are **DEMO/SIMULATION** records; they do not connect to physical vehicle hardware, prove a real-world dump, or represent official/biometric timekeeping. Attendance is manually recorded with server timestamps; biometric integration is **Future Hardware Integration**. Higher Authority escalation is an in-app record, not an external notification or official filing. Points and rewards are simulated, non-cash and not redeemable.

The map is schematic and uses available/demo coordinates, not live navigation or a street basemap. Location is optional and can come from browser geolocation after permission, manually entered coordinates or demo site coordinates. There is no external geocoder or map-tile service.

## Optional vision provider

The backend uses the configured OpenAI-compatible chat-completions interface when `OPENAI_API_BASE` and `OPENAI_API_KEY` are available. The default vision model is `gemini-3-flash-preview`; choose another compatible model with `SWMS_VISION_MODEL`. Supply credentials via environment variables only; never hard-code or commit them. To force deterministic demo behavior:

```bash
SWMS_AI_MODE=demo npm run dev
```

If the provider is absent, unsupported or unavailable, the deterministic demo fallback keeps the report and resolution-verification flow operating. Photos are stored locally in `server/data/uploads/` by default.

## Build and run production mode

```bash
cd /home/ubuntu/swms
npm run build
JWT_SECRET='use-a-long-private-value' NODE_ENV=production npm start
```

The production process serves the built app and API on port 3001. Set a private `JWT_SECRET` outside a disposable demo.

## Project layout

- `DEPLOYMENT.md` — download, hosting, persistent-storage and run instructions
- `src/pages/` — existing P0/P1 routes and additive P2 field-operations/community pages
- `src/pages/FieldOperationsPage.tsx` — P2 vehicles/QR, dumping checks, attendance, performance, escalations, map and DPARVP
- `src/pages/CommunityPage.tsx` — waste awareness and monthly demo challenges/rewards
- `src/p3.css` — targeted P3 mobile/landing polish, DEMO markers and focus/reduced-motion adjustments
- `server/index.ts` — Express API, authentication, existing workflows and P1 SLA integration
- `server/p2.ts` — additive P2 fleet, dumping, attendance, performance, community, map and escalation endpoints
- `server/db.ts` — SQLite tables and additive migrations
- `server/smart.ts` and `server/ai/classifier.ts` — priority/hotspot and modular AI/fallback logic
- `server/seed.ts` — demo roles, reports, bins and workers
- `server/data/` — local SQLite database and uploaded evidence

## Verification performed

- `npm run build` — passed strict client/server TypeScript checks and the Vite production build.
- Isolated API end-to-end run on a separate temporary SQLite database and uploads folder, with the vision endpoint deliberately unavailable: seeded Citizen/Admin/Worker login, invalid credentials, role guards, known bin context, photo-backed complaint, deterministic AI fallback, smart priority, duplicate-citizen linking, geolocated no-bin report, admin/worker visibility and assignment, resolution proof/fallback verification, resident notification/feedback, full no-bin assignment/resolution, pickup request/assignment/progress/completion, plus P2 attendance, QR vehicle identity, authorized/unauthorized dumping, admin escalation, worker metrics, map layers and non-cash challenge progress.
- Upload/security checks: valid PNG accepted; spoofed image signature, unsupported MIME and invalid report form rejected with cleanup; image over 8 MB returned HTTP 413; invalid complaint ID returned HTTP 404; unauthenticated access returned HTTP 401; unauthorized roles returned HTTP 403.
- Chromium phone-width checks at 390×844 covered the landing page, resident dashboard/report form, worker dashboard/field operations, and admin dashboard/field operations. All had no document-level horizontal overflow; the SWMS/tagline/DPARVP and architecture copy, DEMO workspace marker and simulation notice rendered. The resident welcome heading spacing was corrected after visual inspection.
- Frontend source scan found no provider/JWT secret references or secret-like values. Production dependency audit reported zero vulnerabilities.

## Local demo considerations

SQLite and uploaded evidence are local project data; back up `server/data/` before moving or deleting the project. This is not a production municipal service. Production deployment would require reviewed authentication/authorization, HTTPS, rate limiting, audit retention, backups, external incident/authority coordination, verified mapping and jurisdiction-specific service rules.
