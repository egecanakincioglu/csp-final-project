# Crypto Market Dashboard & Watchlist Application

A fully functional React web application built as the final project for the Client Side Programming (CSP) course instructed by **Prof. Rina Behadini**. This application integrates with a real-time public REST API to provide a comprehensive cryptocurrency tracking dashboard, dynamic detail analysis, and a persistent client-side user watchlist.

---

## 🎯 Project Requirements & Compliance Matrix

This project fully demonstrates and satisfies all the architectural and engineering requirements specified in the course syllabus:

| Syllabus Requirement | Project Implementation Summary | Status |
| :--- | :--- | :---: |
| **Vite + React Framework** | Scaffolded with Vite using React 19 and TypeScript for optimized HMR and type-safety. | **Compliant** |
| **Real Public REST API** | Integrates with the official CoinGecko REST API for asynchronous financial data fetching. | **Compliant** |
| **React Router (Min. 3 Pages)** | Features client-side navigation handling 3 distinct views natively. | **Compliant** |
| **State Management & Hooks (Min. 4 Hooks)** | Utilizes exactly 4 distinct React Hooks, each solving a specific engineering purpose. | **Compliant** |
| **Git & Version Control** | Developed using an atomic Feature-Branch Git workflow with explicit Pull Requests. | **Compliant** |

---

## 🛠️ Core Hooks Architecture (Academic Justification)

To satisfy the core state management requirements, the codebase leverages four distinct React hooks, each serving a genuine, non-trivial performance or behavioral role:

1. `useState`: Manages dynamic, volatile component levels such as API data grids, network loading indicators, HTTP error catching, and user search queries.
2. `useEffect`: Coordinates side-effects by initiating asynchronous Axios fetch streams during component mount phases or when route parameters mutate. It is also used to mirror watchlist mutations directly into browser persistence.
3. `useMemo`: Implements client-side compute optimization. It caches and prevents costly re-filtering routines of the 100+ coin market table on the Dashboard during continuous keystroke searches unless the underlying dataset changes.
4. `useContext` (Global Context API): Resolves the prop-drilling problem by providing a centralized global state provider. It synchronizes active user favorite matrices (`watchlist`) seamlessly across multiple disjointed views.

---

## 🗺️ Application Architecture & Page Routing

The application utilizes a decoupled, clean folder directory structure (`/components`, `/context`, `/pages`, `/services`, `/types`) and features a strict client-side routing model handling 3 independent screens:

* **Dashboard (`/`)**: Displays top cryptocurrency market pairs via an organized analytical table grid with dynamic local filtering, real-time pricing metrics, 24-hour gains/losses calculations, and row hover visual states.
* **Coin Detail (`/coin/:id`)**: Uses dynamic segment tracking via URL routing variables to look up asset definitions. Renders large assets, granular metrics (Market Cap Rank, All-Time High), and securely interprets incoming structural description fields.
* **Watchlist (`/watchlist`)**: Aggregates tracked coins from global context, filters live system values, and enables independent item removal. Includes an intuitive, action-driven placeholder screen when the dashboard tracking layer is empty.

---

## ⚡ Technical Stack & Dependencies

* **Runtime:** React 19 & Vite
* **Language Compiler:** TypeScript
* **Routing Engine:** React Router (v7)
* **HTTP Client:** Axios
* **Persistence Layer:** Browser `localStorage` API

---

## 📦 Local Installation & Setup

Follow these commands to clone, install, and run the development environment locally:

```bash
# 1. Clone the repository
git clone https://github.com/egecanakincioglu/csp-final-project

# 2. Navigate to project directory
cd csp-final-project

# 3. Install required node dependencies
npm install

# 4. Spin up local hot-reloading development server
npm run dev