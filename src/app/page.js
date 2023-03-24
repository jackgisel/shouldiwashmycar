"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const apiKey = process.env.WEATHER_KEY;

export default function Home() {
  const [willRain, setWillRain] = useState(false);

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Make API request to get weather forecast for current location

      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Parse weather forecast data and check if it's going to rain in the next 2 weeks
          const forecastList = data.list;
          const twoWeeksForecast = forecastList.slice(0, 14);
          const isRainExpected = twoWeeksForecast.some((forecast) => {
            return forecast.weather.some((weather) => weather.main === "Rain");
          });

          if (isRainExpected) {
            console.log("It is going to rain in the next 2 weeks!");
            setWillRain(true);
          } else {
            console.log("No rain is expected in the next 2 weeks.");
            setWillRain(false);
          }
        })
        .catch((error) => {
          console.error("Error getting weather forecast:", error);
        });
    });
  }, []);

  return (
    <main className={styles.main}>
      <p className={inter.className}>{willRain ? "No" : "Yes"}</p>
    </main>
  );
}
