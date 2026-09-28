# Unstuck build specification (unstuck-spec)

Build reference for the Unstuck capstone prototype. **Not** the Product Faculty submission PRD (that is the Google Doc). This site holds fields, prompts, eval cases, workflows, screening detail, data model/atlas HTML, and closeout priorities on the hub.

**Running markdown PRD (Desktop):** `../Unstuck_PRD_Draft.md` · **Capstone log:** `../AI_PM_Capstone_project (2).md` · **Deploy paste for Google Doc:** `../DEPLOY_Google_Doc_Paste.md` · **Portfolio notes:** `../Unstuck_Portfolio_Context.md`

## Live site (PRD link)

**https://tericampbell.github.io/unstuck-build-spec/index.html**

Published from public repo [TeriCampbell/unstuck-build-spec](https://github.com/TeriCampbell/unstuck-build-spec). Unlisted public URL; disable via repo Settings → Pages → None when capstone review ends.

**Wireframe (separate PRD link):** https://tericampbell.github.io/unstuck_wireframe.html — file on **TeriCampbell.github.io** (not a repo named `unstuck_wireframe`).

**Live app:** https://unstuck-app-flame.vercel.app/

## Edit locally

1. Change files in this folder (`Desktop/AI PM Capstone/unstuck-spec/`).
2. Upload changed files to [unstuck-build-spec on GitHub](https://github.com/TeriCampbell/unstuck-build-spec) (browser upload works).
3. Wait 1–3 minutes; hard-refresh the live URL.

## Upload queue (2026-09-27 — eval + routing)

| File | What changed |
|------|----------------|
| **`eval.html`** | Model routing section; route-1 results (N2–N4, T1, E2 Pass); models + smoke table updated |
| **`README.md`** | This upload note |

Prior May 30 doc sync is already on Pages; re-upload other files only if edited locally.

**Also upload wireframe:** Desktop `unstuck_wireframe_V5.html` → **TeriCampbell.github.io** as `unstuck_wireframe.html` (screen 01 updated).

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
