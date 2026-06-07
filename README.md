# Abhay Verma – Portfolio Ecosystem

A modern web application monorepo built with a high-performance frontend architecture, structured for scalability, micro-app distribution, and robust component management.

## Tech Stack

This project leverages a highly optimized development ecosystem:
* **Vite** – Next-generation frontend tooling for ultra-fast hot module replacement (HMR) and optimized production builds.
* **React** – Declarative, component-based user interface library.
* **TypeScript** – Static typing to ensure code reliability, maintainability, and self-documenting architecture.
* **shadcn/ui** – Beautifully designed, accessible components built on top of Radix UI primitives.
* **Tailwind CSS** – Utility-first CSS framework for rapid and highly customizable UI development.

---

## Monorepo Architecture

This repository utilizes npm workspaces to manage a modular, multi-domain ecosystem:
* **Root (`src/`)**: The main portfolio landing page (`abhayverma.com`).
* **Shared UI (`packages/shared-ui/`)**: A centralized library containing global layouts (Navigation, Footer) and UI primitives shared across all applications to ensure design consistency.
* **Micro-Apps (`apps/`)**: Isolated frontend tools and engineering workstations designed to be deployed to individual subdomains (e.g., `finance.abhayverma.com`).

---

## Local Development Setup

Ensure you have [Node.js](https://nodejs.org/) (LTS recommended) and npm installed.

### 1. Clone the Repository
```sh
git clone <https://github.com/abhayverma/abhay-verma-portfolio-hub>
cd <abhay-verma-portfolio-hub>
```

### 2. Install Dependencies
Because this is a monorepo, a single install command from the root will safely link the `shared-ui` package and bootstrap all micro-apps simultaneously:
```sh
npm install
```

### 3. Start the Development Servers
You can boot up different parts of the ecosystem using npm workspace flags.

**To run the main portfolio application:**
```sh
npm run dev
```

**To run a specific micro-app (e.g., the Finance Tax Simulator):**
```sh
npm run dev -w apps/tax-simulator
```
The server will boot up with hot-reloading enabled. Open your browser and navigate to the local server URL provided in the terminal (typically `http://localhost:5173`).

### 4. Production Build
To build the main application for production deployment:
```sh
npm run build
```
To build a specific workspace micro-app:
```sh
npm run build -w apps/tax-simulator
```

---

## License

Copyright (c) 2026 Abhay Verma. All rights reserved.

This project and its source code are strictly proprietary. Unauthorized copying, modification, distribution, sub-licensing, or public use of these files, via any medium, is strictly prohibited.

As per GitHub's Global Terms of Service, forking the repository for personal architectural viewing purposes within the GitHub ecosystem is permitted. However, no rights or explicit permissions are granted to copy, alter, execute, or redistribute the source code for external, commercial, or alternative personal deployment purposes.
````</abhay-verma-portfolio-hub></https://github.com/abhayverma/abhay-verma-portfolio-hub>