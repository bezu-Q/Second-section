# Addis Eats 🍽️ 

## Overview
Addis Eats is a single-page, data-driven front-end web application built for the CodeOps Full Stack Software Development Module 2 Capstone. It allows users to browse a dynamic menu of Ethiopian dishes, search for specific items in real-time, and build a shopping cart with calculated ETB totals. 

## Features
* **Live Search:** Filters the menu instantly as the user types, including empty-state handling.
* **Dynamic Cart:** Users can add items, update quantities, and remove items via event delegation.
* **Persistent State:** Uses `localStorage` to ensure the user's cart survives page refreshes.
* **Responsive Layout:** Built with a mobile-first approach using CSS Grid, seamlessly scaling to a 2-column layout on PC screens.
* **Semantic HTML:** Fully accessible structure utilizing `<header>`, `<main>`, `<section>`, and `<aside>` tags.

## Data Source
The application's data is managed locally. The menu items are modeled as objects and stored in a static JSON file (`data/menu.json`). The application uses the asynchronous `fetch()` API to load this data into a centralized JavaScript state object, which then drives all UI rendering.

## How to Run the Project
Because this application uses the `fetch()` API to load local files, it must be run through a local development server to avoid browser CORS (Cross-Origin Resource Sharing) restrictions.

1. Clone this repository to your local machine.
2. Open the project folder in your code editor (e.g., VS Code).
3. Ensure the file structure is maintained (specifically that `menu.json` is inside the `data` folder and images are inside the `images` folder).
4. Launch a local server:
   * **Using VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
   * **Using Python:** Run `python -m http.server` in the terminal and navigate to `http://localhost:8000` in your browser.