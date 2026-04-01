# 🌍 Countries App

## 📌 Project Description & Purpose

This project is a full-stack Countries App that lets users browse different countries, click on a country to see more details, save countries they like, and submit their own user information through a form. The purpose of this project was to practice building a React frontend, connecting it to an Express backend, and storing data in a PostgreSQL database.

## 🚀 Live Site

Here's the link to view the live app: https://version-4-countries.netlify.app/

## 🖼️ Screenshots

<img width="1319" height="697" alt="Screenshot 2026-04-01 at 1 21 28 PM" src="https://github.com/user-attachments/assets/636039d6-d901-4502-88d1-0907eafb53d9" />


## ✨ Features

This is what you can do on the app: 
- View a grid of country cards on the home page
- Click on a country to see its details like flag, population, capital, and region
- Save countries to a saved countries page
- Submit a form with user information and display the newest user

## 🛠️ Tech Stack

**Frontend**

- **Languages:** JavaScript, HTML, CSS
- **Framework:** React
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript
- **Framework:** Express.js, Node.js
- **Deployment:** Render

**Database**

- **Languages:** SQL
- **Deployment:** Neon PostgreSQL


## 🔹 API Documentation

These are the API endpoints I built: 
1. `POST /add-one-user`
2. `GET /get-newest-user`
3. `POST /save-one-country`
4. `GET /get-all-saved-countries`
5. `POST /update-one-country-count`

Here's the link to the full API documentation: https://github.com/ac-backend/countries-app-instructions/blob/main/version-3/api-documentation.md

## 🗄️ Database Schema

Here’s the SQL I used to create my tables:  

```sql

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  bio VARCHAR NOT NULL
);

CREATE TABLE saved_countries (
  country_name VARCHAR PRIMARY KEY
);

CREATE TABLE country_counts (
  country_name VARCHAR PRIMARY KEY,
  count INT NOT NULL
);
```

## 💭 Reflections

**What I learned:** I learned how to connect a React frontend to an Express backend, how to send GET and POST requests, and how to store and retrieve data from a PostgreSQL database.

**What I'm proud of:** I'm proud that I built a full-stack app where the frontend, backend, and database all work together. I’m also proud that users can save countries and track how many times a country page was viewed.

**What challenged me:** One challenge was making sure the frontend and backend were connected correctly and that the right data was being sent and received. Another challenge was matching saved country names with the full country objects.

**Future ideas for how I'd continue building this project:** 
1. Add a search bar to find countries faster
2. Add filtering by region
3. Add more country details like languages, currencies, and borders

## 🙌 Credits & Shoutouts 

Shout out to my instructors Arianna and Phil, who pointed me in the right direction everytime I had questions!

