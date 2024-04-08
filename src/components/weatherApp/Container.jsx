import React, { useState } from "react";
import styles from "../../styles/weatherApp/container.module.css";
import ThumbnailsList from "./ThumbnailsList";
import WeatherCardMain from "./WeatherCardMain";
import WeatherList from "./weatherList/WeatherList";

// function kelvinToCelcius(temperature){
//     if(!temperature) return 0;
//     return Math.round(temperature - 273.15);
// }

function Container() {
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [multiDayData, setMultiDayData] = useState(null);
  const [viewMore, setViewMore] = useState(false);

  function toggleViewMore() {
    setViewMore(!viewMore);
  }

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerApp}>
        <WeatherCardMain
          setMultiDayData={setMultiDayData}
          weather={weather}
          setWeather={setWeather}
          setError={setError}
          viewMore={viewMore}
        />
        {weather && (
          <div className={styles.viewMoreBtnContainer}>
            <button className={styles.viewMoreBtn} onClick={toggleViewMore}>
              {viewMore ? "View Less" : "View More"}
            </button>
          </div>
        )}
        {viewMore ? (
          <WeatherList multiDayData={multiDayData} setWeather={setWeather} />
        ) : (
          <ThumbnailsList multiDayData={multiDayData} setWeather={setWeather} />
        )}
      </div>
    </div>
  );
}

export default Container;
