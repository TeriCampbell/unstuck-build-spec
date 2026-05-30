# Unstuck build specification (unstuck-spec)

Build reference for the Unstuck capstone prototype. **Not** the faculty submission PRD (that is the Google Doc). This site holds fields, prompts, eval cases, workflows, screening detail, and **data model copies** for PRD links.

**Running markdown PRD (Desktop):** `../Unstuck_PRD_Draft.md` · **Capstone log:** `../AI_PM_Capstone_project (2).md` · **Deploy paste for Google Doc:** `../DEPLOY_Google_Doc_Paste.md` · **Portfolio notes:** `../Unstuck_Portfolio_Context.md`

## Live site (PRD link)

**https://tericampbell.github.io/unstuck-build-spec/index.html**

Published from public repo [TeriCampbell/unstuck-build-spec](https://github.com/TeriCampbell/unstuck-build-spec). Unlisted public URL; disable via repo Settings → Pages → None when capstone review ends.

**Wireframe (separate PRD link):** https://tericampbell.github.io/unstuck_wireframe.html

**Live app:** https://unstuck-app-flame.vercel.app/

## Edit locally

1. Change files in this folder (`Desktop/AI PM Capstone/unstuck-spec/`).
2. Upload changed files to [unstuck-build-spec on GitHub](https://github.com/TeriCampbell/unstuck-build-spec) (browser upload works).
3. Wait 1–3 minutes; hard-refresh the live URL.

## Upload queue (2026-05-30 — Phase 3–4 sync)

Upload these to refresh GitHub Pages after counselor dashboard + return/check-in ship:

| File | What changed |
|------|----------------|
| **`index.html`** | Capstone vs V2 journeys; live app links; DATA nav |
| **`wireframe.html`** | Capstone routes on every screen; check-in path; counselor 15 |
| **`prompts.html`** | `#capstone-scope` — Phase 3–4 did not change prompt versions |
| **`eval.html`** | Persistence 001–007; Phase 3–4 production smoke rows |
| **`fields.html`** | `#api-routes` table including `counselor-aggregates` |
| **`DATA_MODEL.md`**, **`DATA_ATLAS.md`** | You committed these — no re-upload unless app schema changed |
| **`README.md`** | This file |

**Verify after upload:** On live `eval.html`, search for **“check_ins”** and **“counselor-aggregates”**. Open `DATA_MODEL.md` on GitHub. Counselor card on `index.html` should reference live app `/counselor/dashboard`.

Other pages (`prompts.html`, `screening.html`, PNGs) — upload only if you edited them.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Journey hub |
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
