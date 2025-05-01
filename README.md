# Weather Forecast Web App

This is a responsive, full-featured weather forecast web app built using **React.js**, with a **Node.js + Express** backend and **MongoDB** for data persistence. Users can search for current weather and forecasts, sign in to save cities, and delete saved locations securely with JWT authentication.

---

## Features

### Weather Display
- Search any city for current weather, 4-hour forecast, and 3-day outlook
- Styled using **Tailwind-inspired custom CSS** with dark mode support

### User Authentication
- Sign Up / Sign In using JWT authentication
- Sessions persist using `localStorage`

### Saved Cities
- Authenticated users can:
  - Save searched cities
  - View saved cities in a dropdown
  - Delete cities from their saved list

---

## Tech Stack

### Frontend
- React
- React Router
- Context API for Auth
- Custom CSS (`WeatherHeader.css`)
- OpenWeatherMap API

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- CORS, dotenv, body-parser

---

## API Routes

### Auth Routes

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| POST   | `/auth/signup`   | Register new user  |
| POST   | `/auth/login`    | Authenticate user  |

### History Routes (Requires JWT)

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/history`           | Fetch saved cities         |
| POST   | `/history`           | Save a new city            |
| DELETE | `/history`           | Delete a city (with body)  |

> DELETE body example: `{ "city": "Denver" }`

---

## Weather APIs Used

All weather data is retrieved from [OpenWeatherMap](https://openweathermap.org/api):

- Current: `https://api.openweathermap.org/data/2.5/weather`
- Hourly: `https://pro.openweathermap.org/data/2.5/forecast/hourly`
- Daily: `https://api.openweathermap.org/data/2.5/forecast/daily`

---

