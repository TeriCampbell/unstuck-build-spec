# Unstuck build specification (unstuck-spec)

Build reference for the Unstuck prototype: **user journeys**, fields, prompts, eval cases, workflows, screening, and data model/atlas.

**Not** the Product Faculty submission PRD (that is the Google Doc).

**Running markdown PRD (Desktop):** `../Unstuck_PRD_Draft.md` · **Capstone log:** `../AI_PM_Capstone_project (2).md` · **Deploy paste for Google Doc:** `../DEPLOY_Google_Doc_Paste.md` · **Portfolio notes:** `../Unstuck_Portfolio_Context.md`

## Live site (PRD link)

**https://tericampbell.github.io/unstuck-build-spec/index.html**

Published from public repo [TeriCampbell/unstuck-build-spec](https://github.com/TeriCampbell/unstuck-build-spec). Unlisted public URL.

**Wireframe (separate PRD link):** https://tericampbell.github.io/unstuck_wireframe.html — file on **TeriCampbell.github.io** (not a repo named `unstuck_wireframe`).

**Live app:** https://unstuck-app-flame.vercel.app/ — entry hub (student / counselor). Faculty screening demo: `/demo` (linked from this site, not the app hub).

**Backlog tracking:** [Linear · tcampbell](https://linear.app/tcampbell) only — not maintained in this build-spec.

## Edit locally

1. Change files in this folder (`Desktop/AI PM Capstone/unstuck-spec/`).
2. Upload changed files to [unstuck-build-spec on GitHub](https://github.com/TeriCampbell/unstuck-build-spec) (browser upload works).
3. Wait 1–3 minutes; hard-refresh the live URL.

## Upload queue (2026-09-28 — journeys + accuracy pass)

| File | What changed |
|------|----------------|
| **`index.html`** | Journey hub; Linear-only backlog (no tables); entry `/` + `/home`; `/demo` for faculty |
| **`wireframe.html`** | Entry hub 00 + `/home`; Live labels; check-in / paths |
| **`fields.html`** | Check-in counselor contact not per-task; barrier text = V2 |
| **`workflows.html`** | Live prototype map; entry hub wording |
| **`workflows-first-session.html`** | Hub → `/home`; Haiku/Sonnet routing |
| **`workflows-checkin-replan.html`** | Shipped vs V2; page-level counselor contact |
| **`prompts.html`** | Architecture + model tier = Haiku-first routing |
| **`data-atlas.html`** / **`DATA_ATLAS.md`** | Contact requests = page-level → `counselor_contact` row |
| **`spec-nav.js`** | Nav label “Journeys” |
| **`README.md`** | This note |

**Verify after upload:** Live `index.html` mentions entry hub and `/demo`. `wireframe.html` has screen 00. Check-in fields no longer list contact counselor as a per-task enum.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | **User journeys** — filterable map of student + counselor flows; backlog points to Linear |
| `fields.html` | Required / optional inputs + API routes |
| `prompts.html` | Prompt architecture, JSON shapes, **production v1 text** (`#production-prompts`) |
| `wireframe.html` | Screen map (links to live wireframe) |
| `workflows.html` | Integrated workflow PNG |
| `workflows-first-session.html` | First session diagram |
| `workflows-checkin-replan.html` | Check-in / replan diagram |
| `screening.html` | Four-tier distress screening |
| `eval.html` | Criteria and test cases T1–N6 + prototype smoke |
| `DATA_MODEL.md` | Supabase schema (mirror of `unstuck-app`) |
| `DATA_ATLAS.md` | KPI and aggregate definitions (mirror of `unstuck-app`) |

## PNG files

On GitHub, PNGs are at the **repo root** (upload flattened the folder). Local copy may still use `images/` subfolder.

## Private backup

Copy also lives in `TeriCampbell/maven-capstone` at `docs/unstuck/build-spec/` (optional; not the PRD link).

## Maintainer

Teri Campbell · Product Faculty AI PM Capstone (Cohort 9) · Builder track
