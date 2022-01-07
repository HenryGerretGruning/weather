import React, { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import Map from "./components/Map";
import Loading from "./components/Loading";
import Popup from "./components/Popup";
import "./App.css";

interface ILocation {
  latitude: number;
  longitude: number;
}

interface IWeatherData {
  list: [];
}

function App() {
  // User coords
  const [location, setLocation] = useState<ILocation>();

  // API result
  const [weatherData, setWeatherData] = useState<IWeatherData>();

  // Popup
  const [showPopup, setShowPopup] = useState(false);

  const getLocation = () => {
    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          updatePopup(true);
        }
      );
    }
  };

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      });
  };

  // Runs when component is rendered
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    location?.latitude !== undefined &&
      location?.longitude !== undefined &&
      getWeather();
  }, [location]);

  const updateLocation = (lat: number, lon: number) => {
    setLocation({ latitude: lat, longitude: lon });
  };

  const updatePopup = (value: boolean) => {
    setShowPopup(value);
    return null;
  };

  return (
    <div className="container">
      {showPopup ? <Popup updatePopup={updatePopup} /> : <></>}
      {location ? (
        <>
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            updateLocation={updateLocation}
          />
        </>
      ) : (
        <Loading txt="Map" />
      )}

      {weatherData ? (
        <Forecast weatherData={weatherData.list} />
      ) : (
        <Loading txt="Forecast" />
      )}
    </div>
  );
}

export default App;
