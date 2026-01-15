import React, { useEffect, useState } from "react";

// We import routing  so we can move between pages
import { Routes, Route, Link } from "react-router-dom";

// We import the pages for our app
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";

//  We import local country data as a BACKUP
import localData from "../localData.js";

// This is the main App component
function App() {
  // This is where we will store the countries
  const [countries, setCountries] = useState([]);

  // This function goes to the API and gets the countries data. nname the function get countries
  async function getCountries() {
    try {
      // we need name, flags, pop, capital and region. adjust the url for these
      const url =
        "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders";

      // response = what we get back from the url
      const response = await fetch(url);

      // make a variable for data
      const data = await response.json();

      setCountries(data);
    } catch (error) {
      // If the API fails, use local data instead
      console.log("API failed, using local data instead");
      setCountries(localData);
    }
  }

  // run when page loads
  useEffect(() => {
    // call the api function
    getCountries();
  }, []);

  return (
    // This wraps the entire app
    <div className="app">
      {/* Header */}
      <header className="app-header">
        {/* Nav bar */}
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

      {/* This is where pages will show */}
      <main className="app-main">
        {/* Routes decide which page shows */}
        <Routes>
          {/* We pass the countries data into Home */}
          <Route path="/" element={<Home countriesData={countries} />} />

          {/* We pass countries here too */}
          <Route
            path="/saved"
            element={<SavedCountries countriesData={countries} />}
          />

          {/* Country Detail page
              The :countryName comes from the URL */}
          <Route
            path="/country-detail/:countryName"
            element={<CountryDetail countriesData={countries} />}
          />
        </Routes>
      </main>
    </div>
  );
}

// This lets other files use the App component
export default App;
