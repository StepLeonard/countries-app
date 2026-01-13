import React from "react";

// This page shows the Saved Countries form
function SavedCountries() {
  // This runs when the form is submitted
  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing

    // This object holds everything the user typed
    const formData = {
      fullname: e.target[0].value,
      email: e.target[1].value,
      country: e.target[2].value,
      bio: e.target[3].value,
    };

    console.log(formData);
  }

  return (
    // This section holds the whole page
    <section className="saved">
      {/* Page title */}
      <h1>Saved Countries</h1>

      {/* This is the form */}
      <form className="form" onSubmit={handleSubmit}>
        {/* User types their full name here */}
        <input placeholder="Fullname" />

        {/* User types their email here */}
        <input placeholder="Email" />

        {/* User types a country here */}
        <input placeholder="Country" />

        {/* User writes a short bio here */}
        <textarea placeholder="Bio" />

        {/* This button submits the form */}
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default SavedCountries;
