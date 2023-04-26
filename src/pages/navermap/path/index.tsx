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
          zoom: 10,
          center: new naver.maps.LatLng(37.3614483, 127.1114883),
        });
        // 기타 네이버 지도 관련 로직
        var polyline = new naver.maps.Polyline({
          map: map,
          path: [
            new naver.maps.LatLng(37.4526437, 126.49236),
            new naver.maps.LatLng(37.4768068, 126.4847975),
            new naver.maps.LatLng(37.4988237, 126.4960839),
            new naver.maps.LatLng(37.5176422, 126.5392841),
            new naver.maps.LatLng(37.5398154, 126.5708743),
            new naver.maps.LatLng(37.5457857, 126.5968815),
            new naver.maps.LatLng(37.5646413, 126.6502792),
            new naver.maps.LatLng(37.5708896, 126.7197823),
            new naver.maps.LatLng(37.5710499, 126.7444216),
            new naver.maps.LatLng(37.5770001, 126.7733532),
            new naver.maps.LatLng(37.5817724, 126.799401),
            new naver.maps.LatLng(37.5841817, 126.8167752),
            new naver.maps.LatLng(37.5808037, 126.8313027),
            new naver.maps.LatLng(37.5716637, 126.8473288),
            new naver.maps.LatLng(37.56136, 126.8619116),
            new naver.maps.LatLng(37.5487926, 126.8852035),
            new naver.maps.LatLng(37.540747, 126.8910651),
            new naver.maps.LatLng(37.5303713, 126.8925982),
            new naver.maps.LatLng(37.5164746, 126.8825719),
            new naver.maps.LatLng(37.5002697, 126.8725686),
            new naver.maps.LatLng(37.4933399, 126.8711786),
            new naver.maps.LatLng(37.4760577, 126.8756663),
            new naver.maps.LatLng(37.4634352, 126.8887979),
            new naver.maps.LatLng(37.448467, 126.8947082),
            new naver.maps.LatLng(37.4346374, 126.8977132),
            new naver.maps.LatLng(37.4242394, 126.8949032),
            new naver.maps.LatLng(37.4033979, 126.8806084),
            new naver.maps.LatLng(37.3848775, 126.8691937),
            new naver.maps.LatLng(37.371033, 126.8693097),
            new naver.maps.LatLng(37.3724101, 126.9126676),
            new naver.maps.LatLng(37.3830471, 126.9660813),
            new naver.maps.LatLng(37.3807849, 126.9762181),
            new naver.maps.LatLng(37.3971504, 127.0267188),
            new naver.maps.LatLng(37.3961676, 127.0715545),
            new naver.maps.LatLng(37.3730718, 127.0659032),
            new naver.maps.LatLng(37.35114, 127.063139),
            new naver.maps.LatLng(37.3268898, 127.0575003),
            new naver.maps.LatLng(37.3210994, 127.0517556),
            new naver.maps.LatLng(37.3084352, 127.0590529),
            new naver.maps.LatLng(37.2877049, 127.0692822),
            new naver.maps.LatLng(37.2762087, 127.0808982),
          ],
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 6,
        });
      };
    }
  }, []);

  return <div id='map' style={{ width: "100%", height: "700px" }}></div>;
};

export default NaverMap;
