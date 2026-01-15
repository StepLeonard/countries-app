import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail({ countriesData }) {
  // get the countryName from the URL
  const countryName = useParams().countryName;

  console.log(countryName);

  // find the country that matches the name from the URL
  const country = countriesData.find(
    (item) => item.name.common === countryName
  );

  return (
    // This section holds the country detail page
    <section className="detailpage">
      {/* Back button */}
      <Link to="/" className="backbtn">
        ← Back
      </Link>

      {/* This holds the flag and the text */}
      <div className="detailbox">
        {/* Flag image */}
        <img
          className="bigflag"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
        />

        {/* Country info */}
        <div className="detailtext">
          <h1>{country.name.common}</h1>

          {/* Save button */}
          <button className="savebtn">Save</button>

          <p>
            <strong>Population:</strong> {country.population}
          </p>

          <p>
            <strong>Region:</strong> {country.region}
          </p>

          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
        </div>
      </div>
    </section>
  );
}
