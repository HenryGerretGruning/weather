import React, { useEffect, useState, useRef } from "react";
import "./CSS/Forecast.css";

interface Props {
  weatherData: Timestamp[];
}

type Timestamp = {
  clouds: { all: 90 };
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: IWeather[];
  wind: { speed: number; deg: number; gust: number };
};

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

const Forecast: React.FC<Props> = ({ weatherData }) => {
  const forecastRef = useRef<HTMLDivElement>(null);

  const onScroll = (e: any) => {
    console.log(e.target.scrollLeft);
  };

  return (
    <div className="forecast" ref={forecastRef} onScroll={onScroll}>
      {weatherData.map((timestamp, index) => {
        return (
          <div
            className={
              "timestamp border " +
              (index === 0 ? " current-day " : " timestamp ") +
              (timestamp.main.temp > 0 ? " warm " : " cold ")
            }
            key={timestamp.dt}
          >
            <div className="temperature">
              <h2 className="temp">{timestamp.main.temp}C</h2>
              <p className="temp-range">
                {timestamp.main.temp_min} .. {timestamp.main.temp_max}
              </p>
            </div>
            <p className="wind-speed">{timestamp.wind.speed} m/s</p>
            <p className="time-of-day">
              {timestamp.dt_txt.substring(
                timestamp.dt_txt.length - 8,
                timestamp.dt_txt.length - 3
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
