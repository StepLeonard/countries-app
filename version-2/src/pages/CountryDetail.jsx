import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryDetail({ countriesData }) {
  // get the countryName from the URL
  const countryName = useParams().countryName;

  // allows us to go back to the previous page
  const navigate = useNavigate();

  console.log(countryName);

  // find the country that matches the name from the URL
  const country = countriesData.find(
    (item) => item.name.common === countryName,
  );

  // ✅ This function saves ONE country to the backend
  async function saveCountry(countryName) {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/save-one-country",
        {
          // We are SENDING data, so we use POST
          method: "POST",

          // Tell the backend we are sending JSON data
          headers: {
            "Content-Type": "application/json",
          },

          // Send the country name in an object
          body: JSON.stringify({
            country_name: countryName,
          }),
        },
      );

      // The backend sends back a confirmation message (text)
      const result = await response.text();

      // This lets us see the confirmation in the console
      console.log("Save country result:", result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // This section holds the country detail page
    <section className="detailpage">
      {/* Back button navigates to page before */}
      <button className="backbtn" onClick={() => navigate(-1)}>
        ← Back
      </button>

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
          <button
            className="savebtn"
            onClick={() => saveCountry(country.name.common)} // when clicked, save this country
          >
            Save
          </button>

          <p>
            {/* find population and use tolocalestring to use commas */}
            <strong>Population:</strong> {country.population.toLocaleString()}
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
