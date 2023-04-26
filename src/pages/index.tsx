import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";

export default function Home() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
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

  return (
    <>
      <div className=''>
        <div className='flex justify-center w-screen bg-gray-100'>
          <div className='p-16 bg-white rounded-md shadow-md'>
            <h1 className='mb-6 text-2xl font-semibold text-center'>
              지도 서비스
            </h1>
            <Autocomplete placeHolder='출발지 검색' />

            <button className='w-full py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600'>
              검색
            </button>
            <div
              id='map'
              className='mt-5'
              style={{ width: "500px", height: "400px" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

const Autocomplete = ({ placeHolder }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [seachDatas, setSeachDatas] = useState([]);

  const [suggestions, setsuggestions] = useState([]);
  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    searching(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const searching = async (word: string) => {
    try {
      const response = await axios.get(
        `https://map.naver.com/v5/api/instantSearch?lang=ko&caller=pcweb&types=place,address,bus&coords=37.5559846000006,126.92179349999259&query=${word}`,
        {
          headers: {
            Origin: null,
            Referer: null,
          },
        }
      );
      setSeachDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type='text'
        className='w-full px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeHolder}
      />
      <ul>
        {seachDatas.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};
