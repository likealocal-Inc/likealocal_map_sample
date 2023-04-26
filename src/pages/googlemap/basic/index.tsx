import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { NextPage } from "next";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import axios from "axios";

class MapLocation {
  lat;
  lng;
  constructor(lat = 37.51054, lng = 127.069806) {
    this.lat = lat;
    this.lng = lng;
  }
  get() {
    return { lat: this.lat, lng: this.lng };
  }
}

const GoogleMapBasic: NextPage = () => {
  const [libraries, setlibraries] = useState<string[]>(["places"]);
  const [mapCenter, setMapCenter] = useState<MapLocation>(new MapLocation());

  const [pathInfo, setPathInfo] = useState({
    distance: 0,
    duration: 0,
    fuelPrice: 0,
    taxiPrice: 0,
    tollFare: 0,
  });
  const [startLoction, setStartLoction] = useState<MapLocation>(
    new MapLocation()
  );
  const [endLoction, setEndLoction] = useState<MapLocation>(new MapLocation());

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w", //process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
    language: "en",
    region: "kr",
  });

  const mapRef = useRef(null);

  const handleMapLoad = (map: any) => {
    mapRef.current = map;
  };

  // 검색
  const search = (e: any) => {
    axios
      .get(
        "/api/map.path?start=" +
          startLoction.lng +
          "," +
          startLoction.lat +
          "&goal=" +
          endLoction.lng +
          "," +
          endLoction.lat
      )
      .then((res) => {
        const data = res.data.route.traoptimal[0];
        const path = data.path;
        const summary = data.summary;
        console.log(summary);
        const distance = summary.distance;
        const duration = summary.duration;
        const fuelPrice = summary.fuelPrice;
        const taxiPrice = summary.taxiFare;
        const tollFare = summary.tollFare;

        setPathInfo({ distance, duration, fuelPrice, taxiPrice, tollFare });
        drawPath(path);
      });
  };

  const drawPath = (pathDatas: any[]) => {
    // if (typeof window !== "undefined" && !window.naver) {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=01gns67yau&submodules=geocoder";
    document.head.appendChild(script);

    script.onload = () => {
      let paths = [];
      for (let index = 0; index < pathDatas.length; index++) {
        const element = pathDatas[index];
        paths.push(new naver.maps.LatLng(element[1], element[0]));
      }

      const div = document.getElementById("googleMap");
      if (div) {
        div.style.display = "none";
      }

      // 네이버 지도 API 로드 완료 후에 실행되는 로직
      const map = new window.naver.maps.Map("map", {
        zoom: 10,
        center: new naver.maps.LatLng(37.3614483, 127.1114883),
      });

      const bounds = new window.naver.maps.LatLngBounds();
      paths.forEach((path) => {
        bounds.extend(path);
      });
      map.fitBounds(bounds);

      const startMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(startLoction.lat, startLoction.lng),
        map: map,
      });
      const endMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(endLoction.lat, endLoction.lng),
        map: map,
      });

      // 기타 네이버 지도 관련 로직
      var polyline = new naver.maps.Polyline({
        map: map,
        path: paths,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 6,
      });
    };
    // }
  };
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(mapCenter.get());
      bounds.extend(startLoction.get());
      bounds.extend(endLoction.get());
      mapRef.current.fitBounds(bounds);
    }
  }, [
    isLoaded,
    mapCenter,
    startLoction,
    endLoction,
    setStartLoction,
    setEndLoction,
  ]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className=''>
      <div className=''>
        {/* render Places Auto Complete and pass custom handler which updates the state */}
        <div className='flex'>
          <div className='px-4 py-2 mb-4'>
            <label>출발지:</label>
          </div>
          <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setStartLoction(new MapLocation(lat, lng));
              });
            }}
          />
        </div>
        <div className='flex'>
          <div className='px-4 py-2 mb-4'>
            <label>도착지:</label>
          </div>
          <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setEndLoction(new MapLocation(lat, lng));
              });
            }}
          />
        </div>
        <div className='flex'>
          <button
            className='py-2 ml-20 font-semibold text-white bg-blue-500 rounded w-96 hover:bg-blue-600'
            onClick={search}
          >
            검색
          </button>
        </div>
      </div>
      <div id='googleMap' className=''>
        <GoogleMap
          onLoad={handleMapLoad}
          options={mapOptions}
          zoom={15}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "500px", height: "500px" }}
        >
          <MarkerF
            position={mapCenter.get()}
            onLoad={() => console.log("Marker Loaded")}
          />
          <MarkerF
            position={startLoction.get()}
            onLoad={() => console.log("Marker Loaded")}
          />
          <MarkerF
            position={endLoction.get()}
            onLoad={() => console.log("Marker Loaded")}
          />
        </GoogleMap>
      </div>
      <div id='naverMap' className=''>
        <div id='map' style={{ width: "500px", height: "500px" }}></div>
        <div className='p-4 bg-white rounded-lg shadow-lg w-96'>
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-between'>
              <span className='font-semibold'>거리</span>
              <span className='text-gray-500'>{pathInfo.distance}km</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>기간</span>
              <span className='text-gray-500'>{pathInfo.duration}s</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>연료비</span>
              <span className='text-gray-500'>{pathInfo.fuelPrice}원</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>택시비</span>
              <span className='text-gray-500'>{pathInfo.taxiPrice}원</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>톨비</span>
              <span className='text-gray-500'>{pathInfo.tollFare}원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: { componentRestrictions: { country: "ko" } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
            document.getElementById("googleMap").style.display = "block";
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className=''>
      <input
        value={value}
        className='px-4 py-2 mb-4 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100'
        disabled={!ready}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder='123 Stariway To Heaven'
      />

      {status === "OK" && <ul className=''>{renderSuggestions()}</ul>}
    </div>
  );
};

export default GoogleMapBasic;
