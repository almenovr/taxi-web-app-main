"use client";

import React, {FC, useRef, useState, useEffect, useCallback} from "react";
import {MapPinIcon} from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import {useRouter} from "next/navigation";
import axios from "axios";

export interface RentalCarSearchFormProps {}

const popularCities = [
  "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону"
];

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cityOrigin, setCityOrigin] = useState("");
  const [cityWhen, setCityWhen] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Новые состояния для работы с API
  const [allCities, setAllCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<"origin" | "destination" | null>(null);

  // Загрузка всех городов при монтировании компонента
  useEffect(() => {
    const loadAllCities = async () => {
      try {
        setCitiesLoading(true);
        setCitiesError(null);
        const response = await axios.get('https://strapi-production-5b34.up.railway.app/api/cities');
        const cities = response.data.data.map((city: any) => city.name);
        setAllCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
        setCitiesError('Не удалось загрузить список городов');
        // Fallback to static list
        setAllCities(popularCities);
      } finally {
        setCitiesLoading(false);
      }
    };

    loadAllCities();
  }, []);

  // Функция для фильтрации городов с дебаунсингом
  const filterCities = useCallback((query: string, field: "origin" | "destination") => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (query.length > 0) {
        const filtered = allCities.filter(city =>
          city.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCities(filtered);
        setActiveField(field);
      } else {
        setFilteredCities([]);
        setActiveField(null);
      }
    }, 300);
  }, [allCities]);

  useEffect(() => {
    filterCities(cityOrigin, "origin");
  }, [cityOrigin, filterCities]);

  useEffect(() => {
    filterCities(cityWhen, "destination");
  }, [cityWhen, filterCities]);

  const handleCitySelect = (city: string, isOrigin: boolean) => {
    if (isOrigin) {
      setCityOrigin(city);
    } else {
      setCityWhen(city);
    }
    setFilteredCities([]);
  };

  const handleClick = async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.get(`https://strapi-production-5b34.up.railway.app/api/destinations?filters[$and][0][cityOrigin][$eq]=${cityOrigin}&filters[$and][1][cityWhen][$eq]=${cityWhen}`);
        const data = response.data;
        if(data.data.length > 0)
          router.push(data.data[0].slug);
        else {
          router.push('/destination-not-found');
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        router.push('/destination-not-found');
      }
  }

  return (

    <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      <div className={`relative flex flex-row`} style={{width: '98rem'}}>
          <div className={`relative flex flex-1`} ref={containerRef}>
              <div
                  onClick={() => setShowPopover(true)}
                  className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                      showPopover ? "nc-hero-field-focused" : ""
                  }`}
              >
                  <div className="text-neutral-300 dark:text-neutral-400">
                      <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <div className="flex-grow">
                      <input
                          className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                          placeholder="Город или место"
                          value={cityOrigin}
                          autoFocus={showPopover}
                          onChange={(e) => {
                              setCityOrigin(e.currentTarget.value);
                          }}
                          ref={inputRef}
                      />
                      <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!cityOrigin ? "Город или место" : "Откуда забрать?"}</span>
          </span>
                      {cityOrigin && showPopover && (
                          <ClearDataButton
                              onClick={() => {
                                  setCityOrigin("");
                              }}
                          />
                      )}
                      {filteredCities.length > 0 && showPopover && activeField === "origin" && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-50 mt-1">
                              {filteredCities.slice(0, 5).map((city, index) => (
                                  <div
                                      key={index}
                                      className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                                      onClick={() => handleCitySelect(city, true)}
                                  >
                                      {city}
                                  </div>
                              ))}
                          </div>
                      )}
                      {citiesLoading && activeField === "origin" && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-50 mt-1">
                              <div className="px-4 py-2 text-gray-500 text-sm">Загрузка городов...</div>
                          </div>
                      )}
                  </div>
              </div>

              {showPopover && (
                  <div
                      className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 left-10 -right-0.5`}
                  ></div>
              )}
          </div>
          <div className={`relative flex flex-1`} ref={containerRef}>
              <div
                  onClick={() => setShowPopover(true)}
                  className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                      showPopover ? "nc-hero-field-focused" : ""
                  }`}
              >
                  <div className="text-neutral-300 dark:text-neutral-400">
                      <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <div className="flex-grow">
                      <input
                          className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                          placeholder="Город или место"
                          value={cityWhen}
                          autoFocus={showPopover}
                          onChange={(e) => {
                              setCityWhen(e.currentTarget.value);
                          }}
                          ref={inputRef}
                      />
                      <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!cityWhen ? "Город или место" : "Куда отвезти?"}</span>
          </span>
                      {cityWhen && showPopover && (
                          <ClearDataButton
                              onClick={() => {
                                  setCityWhen("");
                              }}
                          />
                      )}
                      {filteredCities.length > 0 && showPopover && activeField === "destination" && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-50 mt-1">
                              {filteredCities.slice(0, 5).map((city, index) => (
                                  <div
                                      key={index}
                                      className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                                      onClick={() => handleCitySelect(city, false)}
                                  >
                                      {city}
                                  </div>
                              ))}
                          </div>
                      )}
                      {citiesLoading && activeField === "destination" && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-lg z-50 mt-1">
                              <div className="px-4 py-2 text-gray-500 text-sm">Загрузка городов...</div>
                          </div>
                      )}
                  </div>
              </div>

              {showPopover && (
                  <div
                      className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 -inset-x-0.5`}
                  ></div>
              )}
          </div>
          <div className={`RentalCarDatesRangeInput relative flex flex-1`}>
              <div className={`flex-1 z-10 flex items-center focus:outline-none`}>
                  <div className="pr-2 xl:pr-4">
                      <button
                          onClick={handleClick}
                          type="button"
                          className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                      >
                          <span className="mr-3 md:hidden">Search</span>
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                          </svg>
                      </button>
                  </div>
              </div>
              {showPopover && (
                  <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
              )}
          </div>
      </div>
    </form>
  );
};

export default RentalCarSearchForm;
