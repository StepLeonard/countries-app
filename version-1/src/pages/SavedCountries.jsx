import React from "react";

// This page shows a form where the user types info
function SavedCountries() {
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

  return (
    // This section holds everything on the page
    <section className="saved">
      {/* Page title */}
      <h1>Saved Countries</h1>

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
