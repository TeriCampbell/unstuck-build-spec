# Unstuck — Data model & persistence decisions

**Purpose:** Single place for Supabase schema intent, privacy boundaries, and analytics design so Phase 2–4 do not require rework.  
**Status:** Migrations `001`–`005` in repo · apply `005_visitor_id.sql` in Supabase if not yet run · **Last updated:** May 2026  
**Owner:** Teri Campbell · Capstone prototype

**Confused by IDs?** Use [`DATA_ATLAS.md`](DATA_ATLAS.md) — identity cheat sheet, localStorage keys, journeys, and write triggers. This file holds schema columns and privacy decisions.

**Related:**

| Doc | Role |
|-----|------|
| [`DATA_ATLAS.md`](DATA_ATLAS.md) | **Identity atlas** — IDs, links, localStorage, what triggers each write |
| [`../unstuck-spec/fields.html`](../unstuck-spec/fields.html) | Intake field names → API payload |
| [`fixtures/T1.json`](fixtures/T1.json) | Example session payload shape |
| [`../PROTOTYPE_BUILD.md`](../PROTOTYPE_BUILD.md) | Build phases |
| [`../Unstuck_PRD_Draft.md`](../Unstuck_PRD_Draft.md) | Counselor aggregates, institutional value prop |
| [`EVALUATION.md`](EVALUATION.md) | Prompt/API evals (separate from production DB) |

**Implementation (when built):** SQL migrations under `supabase/migrations/` · seed under `supabase/seed.sql` or `scripts/seed-demo.mjs`.

There is **no** separate “data file” for production sessions today — eval fixtures live in `fixtures/*.json`; this document defines **runtime** storage.

---

## Goals

1. **Student:** Generate and **retrieve** a plan across visits (`visitor_id` links browser; each visit gets a **new** `session_id` — see D16 and [`DATA_ATLAS.md`](DATA_ATLAS.md)).
2. **Product / builder:** Tie structured session content to **grade** and **school** for learning and prompt iteration.
3. **Counselor value prop:** Answer “which grades at this school show which needs?” via **aggregates only** — not individual student profiles in the UI.
4. **Pilot / QA:** Same tables for **seed mock rows** and **real tester sessions** (`is_demo` flag).
5. **Events:** Record meaningful product actions (screens, resource clicks) early; avoid full clickstream or PII in analytics tables.

---

## Decisions log

| ID | Decision | Rationale | Date |
|----|----------|-----------|------|
| D1 | Use **Supabase (Postgres)** for plans, sessions, events | Already provisioned; matches stack; supports shareable Vercel prototype + tester data | May 2026 |
| D2 | **`session_id` (UUID)** on every row from day one | Join plans, events, check-ins without migration | May 2026 |
| D3 | **No student name, email, or school student ID** in v1 session tables | Minors + pilot; session URL / localStorage identity enough for capstone | May 2026 |
| D4 | **`school_id` (UUID)** on sessions, not school **name** on each event | Institutional rollups without repeating identifiable strings on every row | May 2026 |
| D5 | School **display name** only in `schools` table (counselor-facing config) | Ms. Smith sees “Westfield High” on dashboard header; student rows stay opaque id | May 2026 |
| D6 | **`grade_level` (9–12)** required on session | Already in PRD/wireframe screen 02; low PII risk; core segmentation | May 2026 |
| D7 | **Structured “session content”** stored in DB (intake + plan JSON) | Powers “which needs” (`situation_selections`, tasks, resources); aligns with eval fixtures | May 2026 |
| D8 | **Counselor UI = SQL aggregates only** | PRD: anonymized population insight; no per-student drill-down in v1 demo | May 2026 |
| D9 | **Suppress aggregate cells with &lt; 5 sessions** (small-n) | Reduce re-identification in small schools | May 2026 |
| D10 | **Free text** stored for plan generation but **excluded** from counselor exports/rollups | Safety + privacy; optional TTL/truncation post-capstone | May 2026 |
| D11 | **`events` table** from first Supabase wire-up | Screen views + resource clicks; same schema for mock + live testers | May 2026 |
| D12 | **Mock + live data share tables**; `is_demo` on `sessions` | One codebase; seed script for video; real pilot rows for feedback | May 2026 |
| D13 | **School association via pilot code** in v1 (dropdown / code), not free-text school name | Avoid messy PII; map code → `school_id` server-side | May 2026 |
| D14 | **Eval fixtures (`fixtures/`)** stay file-based | Reproducible T1–N6; not mixed into production analytics without explicit import | May 2026 |
| D15 | **Defer** full auth, Resend email tokens, counselor login | Capstone MVP: anonymous session + seeded counselor view OK | May 2026 |
| D16 | **`visitor_id`** (browser localStorage UUID) links visits; **`session_id`** = one engagement episode | Return visit is a **new** `session_id`; load prior plan/intake by `visitor_id` + last completed session | May 2026 |
| D17 | Return landing = **dashboard (04)**; plan update entry = **situation (05)** pre-filled, not screen 13 | Dashboard button: “Something has changed, I need to update my plan” (not “start new session”) | May 2026 |

---

## Considerations (privacy & product)

### What we store vs what we show

| Data | Store in DB? | Counselor sees? | Notes |
|------|--------------|-----------------|-------|
| `grade_level` | Yes | Aggregated | “11th grade” counts |
| `school_id` | Yes | Aggregated (their school only post-auth) | Opaque UUID |
| `situation_selections[]` | Yes | Aggregated % | Needs/categories |
| Tasks (titles, dates, types) | Yes | Aggregated patterns only | No essay body |
| `plan_json` | Yes | No (v1) | Full plan for student + product |
| `screening_tier` | Yes | Counts only | Never quote student text |
| Optional `free_text` | Yes (session) | **No** | Screening runs before plan |
| Resource clicks | Yes (`events`) | Engagement rates | Allowlisted resource ids only |
| Student name / email | **No** (v1) | No | Add with real auth later |

### Institutional question we enable

> Which schools have students in which grades with which needs?

**Answer shape (SQL):**

```sql
-- Conceptual; implement as view or dashboard query
SELECT s.school_id, s.grade_level, unnest(situation) AS need, COUNT(*) AS sessions
FROM sessions s
JOIN intake_snapshots i ON i.session_id = s.id
WHERE s.completed_plan = true
GROUP BY 1, 2, 3
HAVING COUNT(*) >= 5;  -- D9 small-n floor
```

Session **content** is associated with school via `sessions.school_id` + linked intake/plan rows; counselors see **counts and rates**, not row-level transcripts.

### Re-identification risk

- Risk rises with: small school + rare situation combo + exact timestamp + quoted text.
- Mitigations: aggregates, small-n suppression (D9), no names, no free text in counselor layer.

### Tester / friend pilot

- Short consent: prototype, not crisis care; anonymous session; don’t enter real names in optional text.
- Prefer **pilot school code** (maps to `school_id`) over typing school name.

### What we are not building in v1

- Full clickstream / session replay (Hotjar-style).
- Per-student counselor drill-down.
- Cross-school counselor access without auth.
- RAG / document store (see PRD — library in prompt only).

---

## Entity overview

```mermaid
erDiagram
  schools ||--o{ sessions : "has"
  sessions ||--o| intake_snapshots : "has"
  sessions ||--o{ plans : "generates"
  sessions ||--o{ events : "logs"
  sessions ||--o{ check_ins : "later"
  schools {
    uuid id PK
    text display_name
    text pilot_code UK
  }
  sessions {
    uuid id PK
    uuid school_id FK
    smallint grade_level
    timestamptz created_at
    text screening_tier_max
    boolean is_demo
    boolean completed_plan
  }
  intake_snapshots {
    uuid session_id PK_FK
    jsonb payload
  }
  plans {
    uuid id PK
    uuid session_id FK
    jsonb plan_json
    text prompt_version
  }
  events {
    uuid id PK
    uuid session_id FK
    text event_type
    jsonb properties
  }
```

---

## Tables (v1 minimal)

### `schools`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | `school_id` referenced by sessions |
| `display_name` | `text` | Shown on counselor dashboard only |
| `pilot_code` | `text` UNIQUE | e.g. `PILOT-A` — student enters or selects at intake |
| `created_at` | `timestamptz` | |

Seed at least one demo school + one pilot school for friend testing.

### Identity vs session (Phase 3)

**Full atlas:** [`DATA_ATLAS.md`](DATA_ATLAS.md) (cheat sheet, localStorage keys, journeys, triggers).

| Concept | Storage (v1) | When created |
|---------|--------------|--------------|
| **`visitor_id`** | `localStorage` (`unstuck_visitor_id`) | First visit to Home; persists across return visits |
| **`session_id`** | `sessions.id` + `localStorage` for current episode | **New** UUID per engagement: first intake at screen 02; **return** at dashboard entry; check-in visit may also get its own row (TBD in build) |
| **Prior plan / intake** | `plans`, `intake_snapshots` keyed by earlier `session_id` | Loaded by `visitor_id` (latest completed plan), not by reusing the old `session_id` |
| **`prior_session_id`** | `sessions.prior_session_id` + `localStorage` during update | Set when return visit updates a prior plan (migration `005`) |

### `sessions`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | One row per **engagement episode** (not one per student forever) |
| `visitor_id` | `uuid` nullable | Links episodes on same device/browser |
| `prior_session_id` | `uuid` nullable FK → `sessions` | Set when return visit updates a prior plan |
| `school_id` | `uuid` FK → `schools` | Required for institutional analytics |
| `grade_level` | `smallint` | 9–12; wireframe screen 02 |
| `screening_tier_max` | `text` | Worst tier this session: `standard` … `inappropriate` |
| `flagged_account` | `boolean` | Default false |
| `is_demo` | `boolean` | Seed / QA rows |
| `completed_plan` | `boolean` | True after successful plan generation |
| `created_at` | `timestamptz` | |

### `intake_snapshots`

One row per session when plan is requested (matches API body to Claude).

| Column | Type | Notes |
|--------|------|-------|
| `session_id` | `uuid` PK, FK | |
| `payload` | `jsonb` | Same shape as eval fixtures: `situation_selections`, `tasks`, clarifying fields, optional `free_text` object |
| `created_at` | `timestamptz` | |

Align keys with [`fields.html`](../unstuck-spec/fields.html) and [`fixtures/T1.json`](fixtures/T1.json).

### `plans`

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | |
| `session_id` | `uuid` FK | |
| `plan_json` | `jsonb` | Model output (acknowledgment, `seven_day_steps`, `full_scope_plan`, etc.) |
| `prompt_version` | `text` | e.g. `master-v1.3` |
| `created_at` | `timestamptz` | |

### `events`

Append-only product analytics.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | |
| `session_id` | `uuid` FK | |
| `event_type` | `text` | See catalog below |
| `properties` | `jsonb` | Event-specific; no free text |
| `created_at` | `timestamptz` | |

### `check_ins` (Phase 3)

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | |
| `session_id` | `uuid` FK | |
| `task_id` | `text` | From plan |
| `response` | `text` | `yes` \| `no` \| `in_progress` \| `attempted_incomplete` \| `contact_counselor` |
| `created_at` | `timestamptz` | |

---

## Event catalog (v1)

| `event_type` | When | Example `properties` |
|--------------|------|-------------------------|
| `session_started` | Intake begins | `{ "grade_level": 11 }` |
| `screen_viewed` | Route/step change | `{ "screen": "situation" }` |
| `intake_submitted` | Before API call | `{ "situation_count": 3 }` |
| `screening_completed` | After screening API | `{ "tier": "standard" }` |
| `plan_generated` | Plan API success | `{ "prompt_version": "master-v1.3" }` |
| `plan_blocked` | Inappropriate tier | `{ "tier": "inappropriate" }` |
| `resource_link_clicked` | Allowlisted URL tap | `{ "resource_id": "khan_sat" }` |
| `check_in_submitted` | Phase 3 | `{ "task_id": "essay", "response": "yes" }` |

Do **not** log: keystrokes, raw free text, full plan body in events (plan already in `plans`).

---

## Access patterns

| Actor | Access |
|-------|--------|
| **Student app** | Insert/read own `session_id` only (RLS). |
| **API route (server)** | Service role or server-side insert after Claude call. |
| **Counselor dashboard** | `POST /api/counselor-aggregates` — counts/rates by `school_id`, optional `grade_level`, date range, day of week. No row-level student view. v1 demo: `DEMO` school via `/counselor/dashboard`. See [`DATA_ATLAS.md`](DATA_ATLAS.md) → Counselor KPI definitions. |
| **Builder / you** | Supabase dashboard SQL for pilot analysis. |

**RLS (plan):** Students can `SELECT`/`INSERT` rows where `session_id` matches cookie/localStorage UUID. No cross-session reads. Counselor role added post-capstone.

---

## Mock / QA data strategy

1. **`supabase/seed.sql`** (or script):  
   - 1–2 `schools` (Demo High, Pilot A).  
   - 20–50 `sessions` across grades 9–12, `is_demo = true`.  
   - Varied `situation_selections` in `intake_snapshots`.  
   - Sample `plans` (can copy from eval outputs).  
   - `events` for plausible click-through rates.

2. **Real testers:** Same tables, `is_demo = false`, new `session_id` per visitor.

3. **Do not** import `fixtures/*.json` into production DB automatically — use seed derived from T1 shape, not eval run logs.

---

## Intake addition (product)

**School** is not yet in `fields.html` — add for prototype:

| Field | Source | Storage |
|-------|--------|---------|
| School | Screen 02 (pilot code or school picker) | `sessions.school_id` via lookup |
| Grade | Screen 02 (existing) | `sessions.grade_level` |

Intake UI (screen 02) is built in the app; sync `fields.html` on the build spec when you publish the next spec upload.

---

## Build order (avoid rework)

**Canonical sequence:** [`../PROTOTYPE_BUILD.md`](../PROTOTYPE_BUILD.md) → Phase 2 build order (API first).

1. **2a-api / 2a-ui / 2a-screening** — Vercel API + demo + tier UI.  
2. **2b-intake** — Multi-step UI → `/intake/plan` POSTs same JSON shape as fixtures (localStorage until DB).  
3. **2c-db** — Tables above; save `sessions` + `intake_snapshots` + `plans` after generate.  
4. **2d-events** — `events` on navigation + resource taps.  
5. **2e-pilot** — Seed + shareable URL.  
6. Phase 3 — `check_ins` + return visit.  
7. Phase 4 — Counselor aggregates (seed or live SQL).  

---

## Open questions (resolve during build)

| # | Question | Default if undecided |
|---|----------|----------------------|
| Q1 | Retain `free_text` in DB after plan, or delete after 24h? | Retain for capstone pilot; exclude from counselor queries |
| Q2 | Single Supabase project vs dev/demo projects? | Single project + `is_demo` |
| Q3 | Counselor dashboard: static JSON vs live SQL for video? | **Resolved:** live SQL via `POST /api/counselor-aggregates` |
| Q4 | When to add `schools.pilot_code` to wireframe screen 02? | With first Supabase migration |

---

## Documentation (Phase 4+ options — revisit at capstone wrap)

After Phase 4, optionally extend docs beyond this file + [`DATA_ATLAS.md`](DATA_ATLAS.md):

- SQL `COMMENT ON COLUMN` in migrations (Supabase UI tooltips)
- One-page PDF export of the atlas for portfolio
- Auto-generated DDL docs (if schema grows)

**Tracked in:** [`DATA_ATLAS.md` → Phase 4+ documentation options](DATA_ATLAS.md#phase-4-documentation-options-deferred). Revisit at end-of-build; not required for MVP.

---

## Changelog

| Date | Change |
|------|--------|
| May 2026 | Initial doc: schema, decisions D1–D15, privacy, events, school/grade analytics |
| May 2026 | D16–D17: `visitor_id` vs per-visit `session_id`; dashboard return landing; update via pre-filled situation (05) |
| May 2026 | Added [`DATA_ATLAS.md`](DATA_ATLAS.md); linked from this doc; Phase 4+ doc options deferred to atlas |
