// pages/index.js

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

// const center = {
//   lat: 37.7749, // 출발지 위도
//   lng: -122.4194, // 출발지 경도
// };

// const destination = {
//   lat: 34.0522, // 도착지 위도
//   lng: -118.2437, // 도착지 경도
// };

const center = {
  lat: 37.5515822, // 출발지 위도
  lng: 126.9249764, // 출발지 경도
};

const destination = {
  lat: 37.51054, // 도착지 위도
  lng: 127.069806, // 도착지 경도
};
const Path = () => {
  const [directions, setDirections] = React.useState(null);
  const directionsCallback = React.useCallback((result: any) => {
    if (result !== null) {
      setDirections(result);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey='AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <DirectionsService
          options={{
            destination,
            origin: center,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Path;
