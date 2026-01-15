import React from "react";
import { Link } from "react-router-dom";

// component that gets one country passed in a prop.
function CountryCard({ country }) {
  // grab the name of the country if it doesnt exist use "unknown country instead"
  const name = country.name.common || "Unknown country";

  // Get the country code (example: USA, FRA)
  const code = country.cca3;

  // showback to the user
  return (
    // when user clicks the card, go to the country detail page
    <Link to={`/country-detail/${name}`}>
      <div className="country-card">
        <img
          className="countryflag"
          src={country.flags.png}
          alt={`Flag of ${name}`}
        />

        {/* holds all info for card */}
        <div className="cardInfo">
          {/* name of country */}
          <h2 className="country-name">{name}</h2>

          {/* population */}
          <p className="pop_cap_reg">Population: {country.population}</p>

          {/* capital */}
          <p className="pop_cap_reg">Capital: {country.capital}</p>

          {/* region */}
          <p className="pop_cap_reg">Region: {country.region}</p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
