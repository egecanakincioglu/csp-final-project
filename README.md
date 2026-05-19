# CSP Final Project - Crypto Market Dashboard

This is my final project for the Client Side Programming (CSP) course instructed by **Prof. Rina Behadini**. It is a fully functional React application that connects to the CoinGecko REST API to show real-time crypto prices, display coin details, and let users manage a custom watchlist.

---

## 🎯 How Project Requirements Are Met

* **Vite & React:** Built using Vite with React 19 and TypeScript.
* **Real Public REST API:** Fetches live market data from the official CoinGecko API using Axios.
* **React Router (3 Pages):** Client-side navigation between 3 dynamic pages: Dashboard, Coin Detail, and Watchlist.
* **4 Core Hooks:** Uses `useState`, `useEffect`, `useMemo`, and `useContext` for handling data, fetching, and performance.
* **Version Control:** Managed entirely with Git branches and Pull Requests on GitHub.

---

## 🛠️ React Hooks Used & Why

1. `useState`: Used for storing API data lists, loading states, error messages, and search keywords.
2. `useEffect`: Used for fetching live data asynchronously from the API when pages load, and saving the watchlist to `localStorage`.
3. `useMemo`: Used on the Dashboard to optimize performance. It prevents filtering the 100+ coin list on every keystroke unless the search term actually changes.
4. `useContext` (React 19 Context): Used to share the watchlist state globally between the Dashboard, CoinDetail, and Watchlist pages without prop-drilling.

---

## 🗺️ Application Pages

* **Dashboard (`/`)**: Displays top cryptocurrencies in a clean table with dynamic search filtering and row hover effects.
* **Coin Detail (`/coin/:id`)**: Shows detailed info for a selected coin (Market Cap Rank, All-Time High) and renders the asset description text safely.
* **Watchlist (`/watchlist`)**: Displays the coins saved by the user. Users can view live prices or remove coins instantly. Shows a button to go back to the dashboard if empty.

---

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone [https://github.com/egecanakincioglu/csp-final-project](https://github.com/egecanakincioglu/csp-final-project)

# 2. Go to the project folder
cd csp-final-project

# 3. Install packages
npm install

# 4. Start the development server
npm run dev