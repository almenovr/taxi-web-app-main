"use client";

import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, StarIcon, ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Showdown from "showdown";

interface Route {
  id: number;
  attributes: {
    destination: string;
    distance: string;
    duration: string;
    price: number;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    rating: number;
    popular?: boolean;
    slug: string;
  };
}

interface OriginPageProps {
  params: { origin: string };
}

interface CityData {
  id: number;
  title: string;
  text: string;
  city: {
      name: string;
    }
  attributes: {
    name: string;
  
    region: string;
    availableRoutes: number;
    popular: boolean;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    
    description: string;
    slug: string;
  };
}

const OriginPage: FC<OriginPageProps> = ({ params }) => {
  const origin = decodeURIComponent(params.origin);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentHTML, setContentHTML] = useState('');
  

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        // Получаем данные города по slug
        const cityResponse = await axios.get(`https://strapi-production-5b34.up.railway.app/api/main-cities?filters[slug][$eq]=${params.origin}&populate=*`);
        const fetchedCityData = cityResponse.data.data[0];
        
        const converter = new Showdown.Converter();
        
        try {
            setContentHTML(converter.makeHtml(typeof fetchedCityData.text === 'string' ? fetchedCityData.text : ""));
        } catch (error) {
            console.error('Error converting description:', error);
            setContentHTML("");
        }
        if (fetchedCityData) {
          // Сохраняем данные города для использования в компоненте
          setCityData(fetchedCityData);

          
          console.log('test', fetchedCityData);
        
          // Здесь можно получить маршруты для этого города
          // Пока используем моковые данные, но структура соответствует API
          const mockRoutes: Route[] = [
            {
              id: 1,
              attributes: {
                destination: "Симферополь",
                distance: "320 км",
                duration: "5-6 часов",
                price: 4500,
                description: "Популярный маршрут в столицу Крыма через Керченский мост",
                image: {
                  data: {
                    attributes: {
                      url: "/placeholder-car.jpg"
                    }
                  }
                },
                rating: 4.8,
                popular: true,
                slug: "simferopol"
              }
            },
            {
              id: 2,
              attributes: {
                destination: "Севастополь",
                distance: "380 км",
                duration: "6-7 часов",
                price: 5200,
                description: "Путешествие к Черному морю с остановками в живописных местах",
                image: {
                  data: {
                    attributes: {
                      url: "/placeholder-car.jpg"
                    }
                  }
                },
                rating: 4.7,
                popular: false,
                slug: "sevastopol"
              }
            },
            {
              id: 3,
              attributes: {
                destination: "Ялта",
                distance: "420 км",
                duration: "7-8 часов",
                price: 5800,
                description: "Маршрут к курортной жемчужине Крыма",
                image: {
                  data: {
                    attributes: {
                      url: "/placeholder-car.jpg"
                    }
                  }
                },
                rating: 4.9,
                popular: true,
                slug: "yalta"
              }
            }
          ];
          setRoutes(mockRoutes);
        } else {
          setError('Город не найден');
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError('Не удалось загрузить маршруты');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [params.origin]);

  const renderHero = () => (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <MapPinIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              {cityData?.title}
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Выберите направление и забронируйте комфортный трансфер
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>Круглосуточно</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <StarIcon className="w-4 h-4 mr-2" />
              <span>Высокий рейтинг</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <CurrencyDollarIcon className="w-4 h-4 mr-2" />
              <span>Фиксированные цены</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRouteCard = (route: Route) => (
    <div key={route.id} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-neutral-700 overflow-hidden">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPinIcon className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">{route.attributes.destination}</h3>
            </div>
          </div>
        </div>
        {route.attributes.popular && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Популярное
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{route.attributes.destination}</h3>
          <div className="flex items-center text-yellow-400">
            <StarIcon className="w-5 h-5 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{route.attributes.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {route.attributes.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
            <span>{route.attributes.distance}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>{route.attributes.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            от {route.attributes.price.toLocaleString()} ₽
          </div>
          <Link href={`/${origin.toLowerCase()}-${route.attributes.slug}`}>
            <ButtonPrimary className="flex items-center">
              Выбрать
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {renderHero()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO Text Block */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-900 py-12 mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Такси из {cityData?.city?.name} - надежный трансфер
            </h3>

            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <div
                        id="single-entry-content"
                        className="prose dark:prose-invert prose-base sm:prose-lg max-w-screen-lg mx-auto dark:prose-dark px-2 sm:px-0 text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: contentHTML }}
                    />

            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Доступные направления из {cityData ? cityData?.city?.name : origin}
          </h2>
         
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Загрузка маршрутов...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-lg mb-4">❌ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map(renderRouteCard)}
          </div>
        )}

        <div className="text-center">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Не нашли подходящее направление?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Свяжитесь с нами, и мы организуем трансфер в любую точку Крыма
            </p>
            <ButtonPrimary href="tel:+79781099992" className="inline-flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              Позвонить
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginPage;
