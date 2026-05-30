# Unstuck build specification (unstuck-spec)

Build reference for the Unstuck capstone prototype. **Not** the faculty submission PRD (that is the Google Doc). This site holds fields, prompts, eval cases, workflows, and screening detail.

## Live site (PRD link)

**https://tericampbell.github.io/unstuck-build-spec/index.html**

Published from public repo [TeriCampbell/unstuck-build-spec](https://github.com/TeriCampbell/unstuck-build-spec). Unlisted public URL; disable via repo Settings → Pages → None when capstone review ends.

**Wireframe (separate PRD link):** https://tericampbell.github.io/unstuck_wireframe.html

## Edit locally

1. Change files in this folder (`Desktop/AI PM Capstone/unstuck-spec/`).
2. Upload changed files to [unstuck-build-spec on GitHub](https://github.com/TeriCampbell/unstuck-build-spec) (browser upload works).
3. Wait 1–3 minutes; hard-refresh the live URL.

## Ready to upload (May 29, 2026)

Upload these three files to refresh GitHub Pages with prototype app changes (`925a037`, `03d6e32`, `5e7afaf`):

| File | What changed |
|------|----------------|
| **`eval.html`** | `#intake-prototype`, `#persistence`, enforcement, production smoke table with app commits, automated rows |
| **`prompts.html`** | Evolution rows (enforce, extract-tasks, unique session), catalog + flow, `#extract-tasks` section, changelog |
| **`README.md`** | This upload checklist |

**Verify after upload:** On live `eval.html`, search for **“enforcePlanRules”** and **“createPlanSessionId”**. On `prompts.html#evolution`, see rows **master v1.3 + code (May 28)** and **extract-tasks v1.0 (May 29)**.

Other pages (`fields.html`, `wireframe.html`, `screening.html`, `index.html`, PNGs) unchanged — no upload required unless you edited them.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Journey hub |
| `fields.html` | Required / optional inputs |
| `prompts.html` | Prompt architecture, JSON shapes, **production v1 text** (`#production-prompts`) |
| `wireframe.html` | Screen map (links to live wireframe) |
| `workflows.html` | Integrated workflow PNG |
| `workflows-first-session.html` | First session diagram |
| `workflows-checkin-replan.html` | Check-in / replan diagram |
| `screening.html` | Four-tier distress screening |
| `eval.html` | Criteria and test cases T1–N6 + prototype smoke |

## PNG files

On GitHub, PNGs are at the **repo root** (upload flattened the folder). Local copy may still use `images/` subfolder.

## Private backup

Copy also lives in `TeriCampbell/maven-capstone` at `docs/unstuck/build-spec/` (optional; not the PRD link).

## Maintainer

Teri Campbell · Product Faculty AI PM Capstone (Cohort 9) · Builder track
