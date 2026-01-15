// pages/CountryDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function CountryDetail() {
  // get the countryName from the URL
  const countryName = useParams().countryName;

  console.log(countryName);

  return (
    <>
      <h1>CountryDetail page</h1>
      <p>{countryName}</p>
    </>
  );
}
