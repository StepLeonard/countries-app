import React from "react";
import { useParams } from "react-router-dom";

// shows details for one country
function CountryDetail() {
  // grab the country code
  const { code } = useParams();
  //   this shows on screen
  return (
    <section className="country-detail">
      <h1>Country Detail</h1>
      <p>Details for: {code}</p>
    </section>
  );
}

export default CountryDetail;
