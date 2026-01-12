// We import React so we can use JSX
import React from "react";

// We import routing tools so we can move between pages
import { Routes, Route, Link } from "react-router-dom";

// We import the pages for our app
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";

// We import the local country data
import localData from "../localData.js";

// This is the main App component
// It controls the header and page navigation
function App() {
  return (
    // This wraps the entire app
    <div className="app">
      {/* Header section at the top of the page */}
      <header className="app-header">
        {/* Navigation bar */}
        <nav className="nav">
          {/* Link to the Home page */}
          <Link to="/" className="where-link">
            Where in the world?
          </Link>

          {/* Link to the Saved Countries page */}
          <Link to="/saved" className="saved-link">
            Saved Countries
          </Link>
        </nav>
      </header>

      {/* This is where different pages will show */}
      <main className="app-main">
        {/* Routes decide which page shows based on the URL */}
        <Routes>
          {/* Home page
              We pass the country data into Home */}
          <Route path="/" element={<Home countriesData={localData} />} />

          {/* Saved Countries page */}
          <Route path="/saved" element={<SavedCountries />} />

          {/* Country Detail page
              The :code comes from the URL */}
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </main>
    </div>
  );
}

// This lets other files use the App component
export default App;
