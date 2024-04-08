import React from "react";
import styles from "../../styles/weatherApp/container.module.css";
import Thumbnail from "./Thumbnail";

function ThumbnailsList(props) {
  const { multiDayData, setWeather } = props;

  return (
    <div className={styles.containerAppInnerLower}>
      {multiDayData &&
        multiDayData.slice(0, 4).map((value, index) => {
          return (
            <Thumbnail key={index} weather={value} setWeather={setWeather} />
          );
        })}
    </div>
  );
}

export default ThumbnailsList;
