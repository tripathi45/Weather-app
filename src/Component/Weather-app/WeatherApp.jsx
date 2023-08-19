import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  BsFillCloudFog2Fill,
  BsFillCloudSunFill,
  BsWater,
} from "react-icons/bs";
import { GiRaining } from "react-icons/gi";
import { LuCloudy } from "react-icons/lu";
import { FaWind } from "react-icons/fa";

import "./WeatherApp.css";
const WeatherApp = () => {
  let api_key = "893169a65b1ad3b545cde77a39266025";
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    windSpeed: "24 km/h",
    temperature: "24°C",
    location: "London",
    weatherType: "50d",
  });
  const searching = async () => {
    const cityInput = document.querySelector(".cityInput");
    if (!cityInput || !cityInput.value) {
      console.log("Please enter a city name.");
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    const updatedtemprature = (data.main.temp - 273.15).toFixed(2);
    console.log(updatedtemprature);
    setWeatherData({
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed} km/h`,
      temperature: `${updatedtemprature}°C`,location: data.name,
      weatherType: data.weather[0].icon,
    });
  };

  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <BiSearchAlt2
            style={{
              color: "#ebfffc",
              width: "3vw",
              height: "6vh",
              cursor: "pointer",
            }}
            onClick={searching}
          />
        </div>
        <div className="weather-image">
          {weatherData.weatherType === "50d" && (
            <BsFillCloudFog2Fill
              style={{
                color: "Silver",
                width: "10vw",
                height: "10vh",
                cursor: "pointer",
              }}
            />
          )}
          {(weatherData.weatherType === "02d" ||
            weatherData.weatherType === "02n" ||
            weatherData.weatherType === "03d" ||
            weatherData.weatherType === "03n" ||
            weatherData.weatherType === "04d" ||
            weatherData.weatherType === "04n") && (
            <LuCloudy
              style={{
                color: "LightGray",
                width: "10vw",
                height: "10vh",
                cursor: "pointer",
              }}
            />
          )}
          {(weatherData.weatherType === "09d" ||
            weatherData.weatherType === "09n" ||
            weatherData.weatherType === "10d" ||
            weatherData.weatherType === "10n") && (
            <GiRaining
              style={{
                color: "Silver",
                width: "10vw",
                height: "10vh",
                cursor: "pointer",
              }}
            />
          )}
          {(weatherData.weatherType === "01d" ||
            weatherData.weatherType === "01n") && (
            <BsFillCloudSunFill
              style={{
                color: "Silver",
                width: "10vw",
                height: "10vh",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <div className="weather-temp">{weatherData.temperature}</div>
        <div className="weather-location">{weatherData.location}</div>
        <div className="data-container">
          <div className="element">
            <BsWater
              style={{
                color: "#ebfffc",
                width: "6vw",
                height: "7vh",
                cursor: "pointer",
              }}
            />
            <div className="data">
              <div className="humidity-percent">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <FaWind
              style={{
                color: "#ebfffc",
                width: "6vw",
                height: "7vh",
                cursor: "pointer",
              }}
            />
            <div className="data">
              <div className="humidity-percent">{weatherData.windSpeed}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
