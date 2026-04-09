import express from "express";
import pg from "pg";


// connect to the database
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// create our app
const app = express();

// this lets us read JSON from the frontend
app.use(express.json());

// set the port
const port = 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



// HELPER FUNCTIONS


// this function adds one user into the database
async function addOneUser(name, country_name, email, bio) {
  // run SQL to insert a new user
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}

// this function gets the newest user
async function getNewestUser() {
  // get the last user that was added
  const result = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );

  // return the data
  return result.rows;
}

// this function saves one country
async function saveOneCountry(country_name) {
  // insert the country into the table
  // if it already exists, do nothing (no error)
  await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) ON CONFLICT (country_name) DO NOTHING",
    [country_name]
  );
}

// this function gets all saved countries
async function getAllSavedCountries() {
  // get everything from the table
  const result = await db.query(
    "SELECT * FROM saved_countries"
  );

  // return the list
  return result.rows;
}

// this function updates the country count
async function updateOneCountryCount(country_name) {
  // if country is new → add it with count 1
  // if it already exists → add 1 to the count
  const result = await db.query(
    `INSERT INTO country_counts (country_name, count)
     VALUES ($1, 1)
     ON CONFLICT (country_name)
     DO UPDATE SET count = country_counts.count + 1
     RETURNING count`,
    [country_name]
  );

  // return the updated count
  return result.rows[0];
}



// FORM DATA ENDPOINTS


// this endpoint saves one user from the form
app.post("/add-one-user", async function (req, res) {
  try {
    // grab data from the frontend
    const name = req.body.name;
    const country_name = req.body.country_name;
    const email = req.body.email;
    const bio = req.body.bio;

    // call the helper function
    await addOneUser(name, country_name, email, bio);

    // send success message
    res.send("User saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving user");
  }
});

// this endpoint gets the newest user
app.get("/get-newest-user", async function (req, res) {
  try {
    // call the helper
    const newestUser = await getNewestUser();

    // send the data back
    res.json(newestUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting newest user");
  }
});



// SAVED COUNTRIES ENDPOINTS


// this endpoint saves one country
app.post("/save-one-country", async function (req, res) {
  try {
    // get the country name from frontend
    const country_name = req.body.country_name;

    // save it to the database
    await saveOneCountry(country_name);

    // send success message
    res.send("Country saved!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving country");
  }
});

// this endpoint gets all saved countries
app.get("/get-all-saved-countries", async function (req, res) {
  try {
    // get the countries from database
    const savedCountries = await getAllSavedCountries();

    // send them back
    res.json(savedCountries);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting saved countries");
  }
});



// COUNTRY COUNT ENDPOINT


// this endpoint updates the view count for a country
app.post("/update-one-country-count", async function (req, res) {
  try {
    // get the country name
    const country_name = req.body.country_name;

    // update the count
    const updatedCount = await updateOneCountryCount(country_name);

    // send the new count back
    res.json(updatedCount);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating country count");
  }
});