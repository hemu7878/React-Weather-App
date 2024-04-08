import {
  faCloud,
  faCloudRain,
  faDroplet,
  faSearch,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../styles/weatherApp/container.module.css";
import {
  getFourDayData,
  getWeatherIcon,
  kelvinToCelcius,
} from "../../helpers/weatherHelpers";
import {
  getMultiDayWeatherData,
  getWeatherData,
} from "../../services/apiServices";

function WeatherCardMain(props) {
  const { weather, setMultiDayData, setWeather, setError, viewMore } = props;
  const [city, setCity] = useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleClick() {
    const chewk = getWeatherData(city)
      .then((data) => {
        const statusCode = Number(data.cod);
        if (statusCode >= 400) {
          throw new Error(data.message);
        }
        setWeather(data);
        getMultiDayWeatherData(data.id)
          .then((data) => {
            setMultiDayData(getFourDayData(data.list));
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    console.log("chewk", chewk);
  }
  console.log("weather", weather);

  function render() {
    if (!weather) {
      return (
        <div>
          <img src="/images/rain.png" alt="" style={{ width: "110%" }} />
          <h2
            style={{ textAlign: "center", fontSize: "1.5rem", color: "white" }}
          >
            <b>
              <i>Please search a city!</i>
            </b>
          </h2>
        </div>
      );
    }
    return (
      <>
        <div className={styles.tempInfo}>
          <img src={getWeatherIcon(weather)} alt="" />
          <div>
            <p className={styles.temperature}>
              {kelvinToCelcius(weather?.main?.temp)}
            </p>
            <p className={styles.weather}>{weather?.weather[0]?.main}</p>
          </div>
        </div>
        <div className={styles.extraInfo}>
          <div>
            <FontAwesomeIcon icon={faWind} />
            <p>{weather?.wind?.speed}km/h</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <p>{weather?.main?.humidity}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faCloud} />
            <p>{weather?.clouds?.all}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.containerAppInnerUpper}>
      {!viewMore && (
        <div className={styles.searchBar}>
          <input type="text" value={city} onChange={handleChange} />
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      )}

      {render()}
    </div>
  );
}

export default WeatherCardMain;
