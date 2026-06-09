# Global Domain Oracle 🌐

A client-side WHOIS availability engine featuring semantic name suggestions, zero-latency DNS lookups, and an interactive history cache. Built as part of the Abhay Verma Micro-App Portfolio.

## Architecture & Strategy

This application is engineered to operate with **zero backend infrastructure** and **no proprietary API keys**, avoiding common CORS limitations:
* **Availability Checking:** Utilizes Google's DNS-over-HTTPS (DoH) API. Domains returning an `NXDOMAIN` status are flagged as likely available.
* **Registration Data Retrieval:** For unavailable domains, a client-side RDAP fetcher queries public registries to extract key lifecycle metadata—including `expirationDate`, `registrationDate`, `registrarName`, and domain `statuses`.
* **Semantic Engine:** Leverages the free Datamuse API to generate linguistic associations, mixing them with high-converting TLDs and prefixes for dynamic "AI" suggestions.
* **State Management:** Fully client-side cache using `LocalStorage` for instantaneous, re-triggerable search history.

## Tech Stack

* **Framework:** React 18 / Vite
* **Styling:** Tailwind CSS + custom Shadcn UI components
* **Icons:** Lucide React
* **Workspace:** Interconnected Monorepo architecture (`@portfolio/shared-ui`)

## Local Development

From the root of the monorepo, run the development server for this specific micro-app:

```bash
npm run dev -w apps/whois-oracle
```

## Build & Deployment
To compile the application for production:

```bash
# Build the micro-app
npm run build -w apps/whois-oracle
```
---
