import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });
const apiKey = process.env.WEATHER_KEY;

async function getForecast() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();

  const { latitude, longitude } = data;

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Parse weather forecast data and check if it's going to rain in the next 2 weeks
      const forecastList = data.list;
      const twoWeeksForecast = forecastList.slice(0, 5);
      const isRainExpected = twoWeeksForecast.some((forecast) => {
        console.log(forecast.weather);
        return forecast.weather.some((weather) =>
          ["Rain", "Snow"].includes(weather.main)
        );
      });

      return isRainExpected;
    })
    .catch((error) => {
      console.error("Error getting weather forecast:", error);
      return undefined;
    });
}

export default async function Page() {
  const isRainExpected = await getForecast();

  return (
    <main className={styles.main}>
      {isRainExpected === undefined ? (
        <p>could not get weather</p>
      ) : (
        <p className={inter.className}>{isRainExpected ? "No" : "Yes"}</p>
      )}
    </main>
  );
}
