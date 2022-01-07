import React, { useState, useEffect, SetStateAction } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./CSS/Map.css";

interface UpdateFunctions {
  updateLocation: (latitude: number, longitude: number) => void;
  updateLat: (latiture: number) => void;
  updateLon: (longitude: number) => void;
}

const ClickHandler: React.FC<UpdateFunctions> = ({
  updateLocation,
  updateLat,
  updateLon,
}) => {
  useMapEvents({
    click: (e) => {
      updateLat(e.latlng.lat);
      updateLon(e.latlng.lng);
      updateLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

interface Props {
  latitude: number;
  longitude: number;
  updateLocation: (latitude: number, longitude: number) => void;
}

const Map: React.FC<Props> = ({ latitude, longitude, updateLocation }) => {
  const [lat, setLat] = useState(latitude);
  const [lon, setLon] = useState(longitude);

  const updateLat = (latitude: number) => {
    setLat(latitude);
  };

  const updateLon = (longitude: number) => {
    setLon(longitude);
  };

  return (
    <>
      <div className="overlay">
        <p>Click on a location to see it's weather</p>
      </div>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={true}
        className="border"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>A pretty hard to read CSS3 popup.</Popup>
        </Marker>
        <ClickHandler
          updateLocation={updateLocation}
          updateLat={updateLat}
          updateLon={updateLon}
        />
      </MapContainer>
    </>
  );
};

export default Map;
