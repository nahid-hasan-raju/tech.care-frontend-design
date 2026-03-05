# Tech.Care — Patient Dashboard

A frontend skills test submission for Coalition Technologies. Converts an Adobe XD design mockup into a fully functional patient dashboard that pulls live data from the Coalition Technologies Patient Data API.

![Dashboard Preview](https://fedskillstest.ct.digital/4.png)

---

## Overview

This is a single-page patient dashboard built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. It fetches real patient data from a REST API and renders it across three panels: a patient list, a diagnosis history section with a live chart, and a detailed patient profile.

The dashboard focuses on **Jessica Taylor's** data as specified in the brief.

---

## Project Structure

```
techcare/
├── index.html          # Main HTML — semantic markup, no inline styles
├── css/
│   └── style.css       # All styling organised by component
└── js/
    ├── api.js          # API fetch logic + Basic Auth
    ├── chart.js        # Blood pressure chart (Chart.js)
    ├── ui.js           # DOM rendering functions
    └── main.js         # Entry point — wires everything together
```

---

## Features

- **Live API data** — fetches from the Coalition Technologies patient API on page load
- **Blood pressure chart** — line graph showing the last 6 months of systolic and diastolic readings, built with Chart.js
- **Vitals cards** — respiratory rate, temperature, and heart rate pulled from the most recent diagnosis entry
- **Diagnostic list** — table with color-coded status badges (Under Observation, Cured, Inactive)
- **Lab results** — scrollable list with download icons
- **Patient profile** — photo, DOB, gender, contact info, emergency contact, insurance provider
- **Patient sidebar** — full patient list from the API, with Jessica Taylor highlighted
- **Skeleton loaders** — shown while API data is loading
- **Responsive layout** — collapses gracefully on tablet and mobile

---

## Getting Started

No installation or build step required. Just open the file.

```bash
# Clone the repo
git clone https://github.com/your-username/techcare-dashboard.git

# Open in browser
cd techcare-dashboard
open index.html
```

Or drag `index.html` into any browser directly.

> **Note:** The API uses Basic Auth. The credentials are encoded at runtime using `btoa()` inside `js/api.js` — they are never hardcoded as a plain string in the source.

---

## API Reference

**Base URL:** `https://fedskillstest.coalitiontechnologies.workers.dev`

**Method:** `GET`

**Auth:** Basic Auth (`coalition` / `skills-test`)

The API returns an array of patient objects. Each patient includes diagnosis history, diagnostic list, lab results, and personal info. Full documentation is available on [Postman](https://documenter.getpostman.com/view/11861104/2sA35G42ve).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout (CSS Grid, Flexbox) |
| Vanilla JavaScript | Logic, DOM manipulation, API calls |
| [Chart.js v4.4.1](https://www.chartjs.org/) | Blood pressure line chart |

No frameworks. No build tools. No dependencies beyond Chart.js loaded via CDN.

---

## Design Reference

The UI was built to match this [Adobe XD mockup](https://xd.adobe.com/view/121254c9-532f-4772-a1ba-dfe529a96b39-4741/) provided as part of the Coalition Technologies FED skills test.

---

## Notes

- Data displayed is static test data — not real patient information
- Only Jessica Taylor's data is shown in the main view, per the brief
- The search bar, gear icon dropdown, and ellipsis menus are non-interactive (as per instructions — these were explicitly out of scope)

---

## License

This project was created as part of a frontend skills assessment. Not intended for production use.
