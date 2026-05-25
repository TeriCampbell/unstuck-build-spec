# Unstuck build specification (unstuck-spec)

Internal build reference for the Unstuck capstone prototype. This folder is **not** the faculty submission PRD. The Google Doc PRD is the submission artifact; this site holds the detailed tables, prompts, eval cases, and workflow maps used during implementation.

## How to open

1. Open `index.html` in any browser (double-click from Finder, or drag the file into Chrome).
2. Use the top navigation to move between Journeys, Fields, Prompts, Wireframe map, Workflows, Screening, and Evaluation.
3. For the interactive wireframe, use the link inside the site (Wireframe map page or hub notice) — https://tericampbell.github.io/unstuck_wireframe.html

No server or install is required. All pages are static HTML/CSS.

## What is in here

| Page | Purpose |
|------|---------|
| `index.html` | Journey hub and filters |
| `fields.html` | Required and optional AI inputs by prompt |
| `prompts.html` | Prompt architecture, invocation rules, JSON shapes |
| `wireframe.html` | Screen map aligned to wireframe v5 |
| `workflows.html` | Integrated workflow + links to journey views |
| `workflows-first-session.html` | New user → first plan |
| `workflows-checkin-replan.html` | Check-in and replan loop |
| `screening.html` | Four-tier distress screening |
| `eval.html` | Objective/subjective criteria and test cases T1–N6 |
| `images/` | PNG exports for PRD and portfolio |

## PNG workflow figures

- `images/integrated-workflow.png` — Design section (student + counselor)
- `images/workflow-first-session.png` — Develop / build reference
- `images/workflow-checkin-replan.png` — Develop / build reference

Regenerate HTML screenshots after diagram edits:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --window-size=720,2600 \
  --screenshot="images/workflow-first-session.png" \
  "file:///FULL/PATH/TO/unstuck-spec/workflows-first-session.html"
```

Replace the URL path with your machine path (encode spaces as `%20`).

## GitHub placement

This folder lives in the **private** repo: `TeriCampbell/maven-capstone` → `docs/unstuck/build-spec`.

**Clickable link for the PRD (after you enable Pages — see `PRD_CLICKABLE_LINKS.md` on Desktop):**

https://tericampbell.github.io/maven-capstone/unstuck/build-spec/index.html

Faculty need the repo invite **and** to be logged into GitHub. A `github.com/.../tree/...` link only shows files, not the running site.

**Wireframe in PRD (public):** https://tericampbell.github.io/unstuck_wireframe.html

## Maintainer

Teri Campbell · Product Faculty AI PM Capstone (Cohort 9) · Builder track
