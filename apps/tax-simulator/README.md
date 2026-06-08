# Wealth & Tax Simulator 📊

A high-performance, standalone financial projection micro-app built as part of the Abhay Verma Portfolio Monorepo. 

This tool goes beyond basic tax calculations by offering dynamic wealth projections, inflation-adjusted purchasing power analysis, and structured asset allocation recommendations based on standard financial planning frameworks.

## ✨ Features

*   **Real-Time Tax Calculation:** Instantly calculates estimated tax liability and net take-home pay based on customizable effective tax rates.
*   **Intelligent Financial Planner:** Automatically segments net income into a standard allocation grid (Rent, Transportation, Investments, etc.) for both annual and monthly budgeting.
*   **N-Year Wealth Projection:** Calculates long-term portfolio growth factoring in:
    *   Annual salary increments (10%)
    *   Year-over-year SIP step-ups (2%)
    *   Market compound annual growth rates (12% for equities, 4% for liquid savings)
*   **Inflation Adjustment:** Discounts the future nominal portfolio value to reveal its *actual* purchasing power today based on a 5% inflation rate.
*   **Seamless Monorepo Integration:** Consumes the global `shared-ui` package to utilize the main portfolio's Navigation, Footer, and theme variables for consistent light/dark mode styling.

## 🛠 Tech Stack

*   **Framework:** React 18 & Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI (imported via `@portfolio/shared-ui`)
*   **Data Visualization:** Recharts

## 🚀 Local Development

Because this application operates as a workspace within the main monorepo, all commands should be run from the **root directory** of the repository.

**1. Install Dependencies**
Ensure all root and workspace dependencies are installed:
```bash
npm install
```

**2. Start the Development Server**
Run the Vite development server specifically for this workspace. It will automatically boot up on an available port (defaulting to 5174 to avoid conflicting with the main portfolio hub).
```bash
npm run dev -w apps/tax-simulator
```

## 📦 Build & Deployment

This application is designed to be built into a standard Single Page Application (SPA) and deployed via FTP to a dedicated subdomain (e.g., finance.abhayverma.com).

**1. Generate the Production Build**
Compile the TypeScript and build the optimized static assets:
```bash
npm run build -w apps/tax-simulator
```

**2. FTP Deployment Process**
*   Locate the generated `apps/tax-simulator/dist` folder.
*   Connect to your hosting provider via FTP.
*   Upload the contents of the `dist` folder to your subdomain's `public_html` directory.
*   **Crucial:** Ensure the following `.htaccess` file is present in the root of the `public_html` directory to route all traffic to `index.html`, preventing 404 errors on direct URL loads or page refreshes:

```Apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
---