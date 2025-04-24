"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, House, icons, MapPin, Search, User } from "lucide-react";
export default function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Ulaanbaatar");
  const [currentForecast, setCurrentForecast] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const countries = await response.json();
      const arr = [];
      countries.data.map((country) => {
        country.cities.map((city) => arr.push(`${city}, ${country.country}`));
      });
      setCountries(arr);
    };
    getData();
  }, []);

  useEffect(() => {
    const getCurrentTemp = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=64bff75e8c32478fbc631050251302&q=${selectedCountry}`
      );
      const currentTemp = await response.json();
      setCurrentForecast(currentTemp);
    };
    getCurrentTemp();
  }, [selectedCountry]);

  const onChangeSearchValue = (e) => {
    const data = countries
      .filter((country) => country.toLowerCase().startsWith(e.target.value))
      .slice(0, 4);
    setFilteredCountries(data);
  };

  const selectCountry = (index) => {
    setSelectedCountry(filteredCountries[index]);
    setFilteredCountries([]);
  };

  if (!currentForecast) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col h-screen sm:flex-row w-full">
        <div className="bg-[#f2f4f6] flex-1 h-screen w-screen relative flex justify-center">
          <div>
            <div className="flex items-center w-[567px] h-20 rounded-[48px] bg-white px-5 py-3 mt-10 relative z-30 gap-3">
              <Search />
              <input
                placeholder="Search"
                type="search"
                className="bg-transparent flex-1 text-[32px] outline-none"
                onChange={onChangeSearchValue}
              />
            </div>

            {filteredCountries.length ? (
              <div className="flex bg-white w-[567px] h-auto rounded-[16px] absolute z-50">
                <div className="flex bg-white w-[567px] h-auto rounded-[16px]  absolute ">
                  <div>
                    {filteredCountries.map((country, index) => (
                      <div
                        className="flex items-center text-[28px] p-2 font-bold gap-[10px]"
                        onClick={() => selectCountry(index)}
                        key={country + index}
                      >
                      
                        <MapPin />
                        {country}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <Image
            width={200}
            height={200}
            alt="sunlittle"
              className=" ml-2 mt-1"
              src="/sun-little.png"
            ></Image>
          </div>

          <div className="w-[430px] h-auto bg-white/30 backdrop-blur-md rounded-[48px] mt-36 absolute shadow-lg z-30 p-10 box-border">
            <div className="flex justify-between items-center">
              <div>
                <h6 className="text-xl text-gray-600 font-[Manrope] font-medium leading-5 pb-2">
                  {currentForecast.forecast.forecastday[0].date}
                </h6>
                <div>
                  <h1 className=" text-5xl text-cool-gray-900 font-[Manrope] font-bold">
                    {selectedCountry}
                  </h1>
                </div>
              </div>
              <MapPin />
            </div>

            <Image
              alt="sun"
              src="/sun.png"
              width={350}
              height={430}
              className="py-10"
            />
            <div>
              {currentForecast && (
                <h2 className="text-9xl font-[Manrope] font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-[#111827] to-[#6B7280]/60 ">
                  {currentForecast.forecast.forecastday[0].day.maxtemp_c}°
                </h2>
              )}
            </div>
            <p className="font-[Manrope] text-2xl font-extrabold text-[#FF8E27]">
              {currentForecast.forecast.forecastday[0].day.condition.text}
            </p>
            <div className="flex justify-between pt-7">
              <House />
              <MapPin />
              <Heart />
              <User />
            </div>
          </div>
        </div>

        <div className="bg-[#0F141E] flex-1 h-screen w-screen flex justify-center relative ">
          <div className="w-fit h-auto bg-[rgba(17, 24, 39, 0.75) ]/75 backdrop-blur-md rounded-[48px] mt-36 absolute z-30  box-border " >
            <div className="bg-gradient-to-b from-[#1F2937 0%] to-[rgba(17, 24, 39, 0.00)] bg-gradient-to-b from-[#1F2937] to-[#111827]/0 rounded-[48px] p-10">
              <div className="flex justify-between items-center">
                <div>
                  <h6 className="text-xl text-gray-400 font-[Manrope] font-medium leading-5 pb-2">
                    {currentForecast.forecast.forecastday[0].date}
                  </h6>
                  <h1 className="text-5xl text-white font-[Manrope] font-bold">
                    {selectedCountry}
                  </h1>
                </div>
                <MapPin className="text-gray-400" />
              </div>

              <div className="flex">
                <Image
                  alt="sun"
                  src="/moon.png"
                  width={350}
                  height={430}
                  className="pt-10 relative"
                />

                <Image
                  width={350}
                  height={430}
                  alt="moonshadow"
                  className="m-auto absolute "
                  src="/moonshadow.png"
                />
              </div>
            </div>
            <div className="px-10">
              <h2 className="text-9xl font-[Manrope] font-extrabold bg-gradient-to-b from-white to-gray-800 text-transparent bg-clip-text">
                {currentForecast.forecast.forecastday[0].day.mintemp_c}°
              </h2>
              <p className="font-[Manrope] text-2xl font-extrabold  text-[#777CCE]">
                {currentForecast.forecast.forecastday[0].day.condition.text}
              </p>
              <div className="flex justify-between pt-7 pb-10">
                <House className="text-white" />
                <MapPin className="text-white" />
                <Heart className="text-white" />
                <User className="text-white" />
              </div>
            </div>
          </div>
          <Image
            width={200}
            height={200}
            alt="littlemoon"
            className="ml-[390px] mt-[800px] absolute z-0"
            src="/moon-little.png"
          ></Image>
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[140px] h-[140px]">
          {" "}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[340px] h-[340px]">
          {" "}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[540px] h-[540px]">
          {" "}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-full w-[940px] h-[940px]">
          {" "}
        </div>

        <div className="flex items-center justify-center w-[140px] h-[140px] bg-[#F3F4F6] rounded-full gap-x-4">
          <div>
            <img src="l-logo.png" />
          </div>
          <div>
            <img src="r-logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
