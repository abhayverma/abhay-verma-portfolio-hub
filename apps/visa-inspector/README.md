# Global Tech Visa Inspector 🌐✈️

A high-fidelity, client-side global dev mobility dashboard and runway simulator. This tool allows engineers to evaluate multi-track visa eligibility, model progressive taxes, simulate localized runway based on lifestyle profiles, and view real-feel Purchasing Power Parity (PPP) benchmarks.

## 🚀 Core Features

* **Multi-Track Eligibility Matrix:** Evaluates multiple visa pathways simultaneously (e.g., UK Skilled Worker vs. Global Talent, or Germany EU Blue Card vs. IT Specialist Route) based on experience, degrees, and shortage profession toggles.
* **Live Currency Integration:** Connects to the free, public `frankfurter.app` API client-side for zero-auth real-time exchange rates against an INR base.
* **Progressive Tax Engine:** Simulates multi-bracket progressive tax thresholds alongside baseline social security surcharges to calculate precise monthly net income.
* **Runway & Cost-of-Living Simulator:** Computes dynamic urban outflows factoring in rent indices, dependent modifiers, and lifestyle tiers (Frugal, Balanced, Premium).
* **Real-Feel Purchasing Power Index (PPP):** Normalizes global salary offers back to an INR baseline to break the "high foreign salary illusion" and provide real lifestyle parity.

## 🛠️ Architecture & Maintenance

This application utilizes the **Data Registry Manifest Pattern**:
* All regulatory rules, visa thresholds, progressive tax brackets, and local cost-of-living metrics are isolated inside a single configuration ledger (`src/data/visaRegistry.ts`).
* Updating the application for future immigration updates requires zero component modification—simply update the data attributes inside the manifest registry.

## 📦 Tech Stack

* **Framework:** React 18 / Vite
* **Styling:** Tailwind CSS + Shared Component Tokens
* **Icons:** Lucide React
* **Workspace:** Interconnected Monorepo Architecture (`@portfolio/shared-ui`)

## 💻 Local Development

Boot up the local development server for this specific micro-app from the workspace root:

```bash
npm run dev -w apps/visa-inspector
```

## 🏗️ Build & Deployment
To compile the application for production delivery:
```bash
# Build the micro-app
npm run build -w apps/visa-inspector
```