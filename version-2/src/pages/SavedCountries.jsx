import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import localData from "../localData.js";

// This page shows a form where the user types info
function SavedCountries() {
  // This holds the newest user from the API
  const [newestUser, setNewestUser] = useState(null);

  // This holds saved countries from the API
  const [savedCountries, setSavedCountries] = useState([]);

  // This runs when the user clicks the Submit button
  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing

    // This lets us know the submit button worked
    console.log("Submit button worked");

    // This grabs the whole form
    const form = e.currentTarget;

    // This grabs all the values typed into the form
    const data = new FormData(form);

    // This turns the form info into one object
    const formData = Object.fromEntries(data.entries());

    // This shows the whole object in the console
    console.log(formData);

    // This clears the form after submitting
    form.reset();
  }

  // get newest user form data
  async function getNewestUserData() {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user",
        {
          method: "GET",
        },
      );

      const data = await response.json();

      // API sends an array, so we grab the first user
      setNewestUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  // get all saved countries
  async function getSavedCountries() {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries",
        {
          method: "GET",
        },
      );

      const data = await response.json();

      // Save countries into state
      setSavedCountries(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Run the GET when the page loads
  useEffect(() => {
    getNewestUserData();
    getSavedCountries();
  }, []);

  // Create a new array that will hold the FULL country objects
  const fullCountryObj = savedCountries.map((saved) => {
    // Find the matching country from localData
    const usersSavedCountry = localData.find((country) => {
      return (
        country.name.common ===
        (saved.country || saved.country_name || saved.name)
      );
    });

    // Whatever we return here gets added to the new array
    return usersSavedCountry;
  });

  // Keep only the countries that were found
  const userSavedCountries = fullCountryObj.filter((item) => item);

  return (
    // This section holds everything on the page
    <section className="saved">
      {/* Page title */}
      <h1>My Saved Countries</h1>

      {/* Show saved countries using SAME grid as Home */}
      <div className="grid">
        {userSavedCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
      {/* Show newest user from API */}
      <div class="welcome">
        {newestUser && <p>Welcome {newestUser.name}</p>}
      </div>

      {/* This is the form */}
      <form className="form" onSubmit={handleSubmit}>
        {/* User types their full name here */}
        <input type="text" name="fullname" placeholder="Full name" />

        {/* User types their email here */}
        <input type="email" name="email" placeholder="Email" />

        {/* User types a country here */}
        <input type="text" name="country" placeholder="Country" />

        {/* User writes a short bio here */}
        <textarea name="bio" placeholder="Bio"></textarea>

        {/* This button submits the form */}
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default SavedCountries;
