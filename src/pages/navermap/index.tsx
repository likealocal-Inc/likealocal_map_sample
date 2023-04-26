import React, { useEffect } from "react";
const NaverMap = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.naver) {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=01gns67yau&submodules=geocoder";
      document.head.appendChild(script);

      script.onload = () => {
        // 네이버 지도 API 로드 완료 후에 실행되는 로직
        const map = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(37.498085, 127.02761), // 초기 중심 좌표
          zoom: 15, // 초기 줌 레벨
        });
        // 기타 네이버 지도 관련 로직
      };
    }
  }, []);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://openapi.map.naver.com/openapi/v3/maps.js?clientId=01gns67yau";
  //   script.async = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     var mapOptions = {
  //       center: new naver.maps.LatLng(37.3595704, 127.105399),
  //       zoom: 10,
  //     };

  //     var map = new naver.maps.Map("map", mapOptions);
  //   };
  // }, []);

  return <div id='map' style={{ width: "100%", height: "400px" }}></div>;
};

export default NaverMap;
