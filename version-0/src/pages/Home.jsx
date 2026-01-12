import React from "react";
import CountryCard from "../components/CountryCard";
// This component shows the Home page
// It receives a list of countries as a prop
function Home({ countriesData }) {
  // This is what shows on the screen
  return (
    // This section wraps the whole home page
    <section className="home">
      {/* This div holds all the country cards in a grid */}
      <div className="grid">
        {/* We loop through the countriesData. For each country, we show the card */}
        {countriesData.map((country) => (
          <CountryCard
            key={country.cca3 || country.name?.common}
            country={country}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
