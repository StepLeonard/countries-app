import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryDetail({ countriesData }) {
  // get the countryName from the URL
  const countryName = useParams().countryName;

  // allows us to go back to the previous page
  const navigate = useNavigate();

  // store how many times this country was viewed
  // start at 0 so we don’t show null on the screen
  const [viewCount, setViewCount] = useState(0);

  console.log(countryName);

  // find the country that matches the name from the URL
  const country = countriesData.find(
    (item) => item.name.common === countryName,
  );

  // This function updates the country view count in the backend
  async function updateCountryViewCount(countryName) {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/update-one-country-count",
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

      // The backend sends back the updated view count
      const data = await response.json();

      // Save the new count so we can show it on the page
      setViewCount(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  // This runs once when the page loads
  useEffect(() => {
    if (countryName) {
      updateCountryViewCount(countryName);
    }
  }, [countryName]);

  // This function saves ONE country to the backend
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

          {/* Show how many times this country was viewed */}
          <p>
            <strong>Views:</strong> {viewCount}
          </p>

          {/* Save button */}
          <button
            className="savebtn"
            onClick={() => saveCountry(country.name.common)} // when clicked, save this country
          >
            Save
          </button>

          <p>
            {/* find population and use tolocalestring to use commas */}
            <strong>Population:</strong>{" "}
            {country.population.toLocaleString()}
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
