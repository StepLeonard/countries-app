// We import React so we can use JSX
import React from "react"; // component that gets one country passed in a prop.
function CountryCard({ country }) {
  // grab the name of the country if it doesnt exist use "unknown country instead"
  const name = country?.name?.common || "Unknown country";
  // Get the country code (example: USA, FRA)
  const code = country.cca3;
  // showback to the user
  return (
    <article className="country-card">
      <img
        //   shows coutry flag
        className="countryflag"
        src={country.flags?.png || country.flags?.svg}
        alt={country.flags?.alt || `Flag of ${name}`}
      />
      {/* holds all info for card */}

      <div className="cardInfo">
        {/* name of country */}
        <h2 className="country-name">{name}</h2>

        {/* population */}
        <p className="pop_cap_reg">
          Population: {country.population?.toLocaleString() ?? "N/A"}
        </p>
        <p className="pop_cap_reg">
          {/* capital */}
          Capital: {country.capital ? country.capital.join(", ") : "N/A"}
        </p>
        {/* capital city */}
        <p className="pop_cap_reg">Region: {country.region || "N/A"}</p>
      </div>
    </article>
  );
}

export default CountryCard;
