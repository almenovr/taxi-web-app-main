import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { MapPinIcon, ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface OriginCity {
  id: string;
  name: string;
  region: string;
  availableRoutes: number;
  popular: boolean;
  image: string;
  description: string;
}

const DirectionsPage: FC = () => {
  const originCities: OriginCity[] = [
    {
      id: "rostov",
      name: "Ростов-на-Дону",
      region: "Ростовская область",
      availableRoutes: 12,
      popular: true,
      image: "/placeholder-car.jpg",
      description: "Основной транспортный хаб для поездок в Крым"
    },
    {
      id: "krasnodar",
      name: "Краснодар",
      region: "Краснодарский край",
      availableRoutes: 8,
      popular: true,
      image: "/placeholder-car.jpg",
      description: "Удобный старт для путешествий по югу России"
    },
    {
      id: "voronezh",
      name: "Воронеж",
      region: "Воронежская область",
      availableRoutes: 6,
      popular: false,
      image: "/placeholder-car.jpg",
      description: "Центральный регион с хорошей транспортной развязкой"
    },
    {
      id: "volgograd",
      name: "Волгоград",
      region: "Волгоградская область",
      availableRoutes: 5,
      popular: false,
      image: "/placeholder-car.jpg",
      description: "Промышленный центр с развитой инфраструктурой"
    },
    {
      id: "stavropol",
      name: "Ставрополь",
      region: "Ставропольский край",
      availableRoutes: 7,
      popular: false,
      image: "/placeholder-car.jpg",
      description: "Ворота Кавказа с множеством туристических маршрутов"
    },
    {
      id: "moscow",
      name: "Москва",
      region: "Московская область",
      availableRoutes: 15,
      popular: true,
      image: "/placeholder-car.jpg",
      description: "Столица России с максимальным выбором направлений"
    }
  ];

  const renderHero = () => (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white bg-opacity-5 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-4 mr-4">
              <MapPinIcon className="w-10 h-10" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold">Направления</h1>
          </div>
          <p className="text-xl sm:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Выберите город отправления и найдите идеальный маршрут для вашего путешествия
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>50+ направлений</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <StarIcon className="w-4 h-4 mr-2" />
              <span>Проверенные маршруты</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
              <ArrowRightIcon className="w-4 h-4 mr-2" />
              <span>Фиксированные цены</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCityCard = (city: OriginCity) => (
    <div key={city.id} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-neutral-700 overflow-hidden group">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPinIcon className="w-16 h-16 mx-auto mb-3 text-white drop-shadow-lg" />
              <h3 className="text-2xl font-bold drop-shadow-lg">{city.name}</h3>
              <p className="text-sm opacity-90 drop-shadow">{city.region}</p>
            </div>
          </div>
        </div>
        {city.popular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Популярное
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
          {city.availableRoutes} маршрутов
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{city.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {city.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {city.availableRoutes} доступных направлений
          </div>
          <Link href={`/directions/${city.id}`}>
            <ButtonPrimary className="flex items-center group/btn">
              Выбрать
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );


  const renderPopularRoutes = () => (
    <div className="bg-white dark:bg-neutral-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Популярные маршруты
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Самые востребованные направления среди наших клиентов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { from: "Ростов-на-Дону", to: "Симферополь", price: "от 4500 ₽", distance: "320 км" },
            { from: "Москва", to: "Ялта", price: "от 8500 ₽", distance: "1500 км" },
            { from: "Краснодар", to: "Севастополь", price: "от 3800 ₽", distance: "280 км" },
            { from: "Воронеж", to: "Феодосия", price: "от 6200 ₽", distance: "650 км" },
            { from: "Ставрополь", to: "Евпатория", price: "от 4200 ₽", distance: "380 км" },
            { from: "Волгоград", to: "Керчь", price: "от 5500 ₽", distance: "480 км" }
          ].map((route, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {route.from} → {route.to}
                </div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {route.price}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Расстояние: {route.distance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {renderHero()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* SEO Text Block */}
        <div className="bg-white dark:bg-neutral-800 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Заказать такси из любого города России
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="text-lg leading-relaxed mb-6">
                  Наша компания предоставляет услуги трансфера и такси по всей территории России. Мы осуществляем пассажирские перевозки из Москвы, Санкт-Петербурга, Ростова-на-Дону, Краснодара, Воронежа, Волгограда и других городов в Крым, Кавказ и популярные курортные зоны.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Почему выбирают нас?</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Надежность и безопасность</h4>
                    <p className="text-blue-800 dark:text-blue-200">
                      Все наши водители проходят тщательную проверку, автомобили регулярно обслуживаются и соответствуют высоким стандартам безопасности.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">Фиксированные цены</h4>
                    <p className="text-green-800 dark:text-green-200">
                      Стоимость поездки фиксируется при заказе и не меняется в зависимости от пробок, времени суток или других факторов.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">Комфортные автомобили</h4>
                    <p className="text-purple-800 dark:text-purple-200">
                      В нашем автопарке только современные автомобили различных классов: от эконом до VIP с повышенным комфортом.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">Круглосуточная поддержка</h4>
                    <p className="text-orange-800 dark:text-orange-200">
                      Наша служба поддержки работает 24/7 и готова помочь вам в любое время суток с заказом или вопросами.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Популярные направления</h3>
                <p className="mb-6">
                  Мы осуществляем регулярные рейсы по самым востребованным маршрутам: Москва - Крым, Санкт-Петербург - Сочи, Ростов - Симферополь, Краснодар - Ялта и многие другие. Каждый маршрут тщательно спланирован для максимального комфорта пассажиров.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Как заказать такси?</h3>
                <ol className="list-decimal list-inside space-y-2 mb-6">
                  <li>Выберите город отправления на этой странице</li>
                  <li>Ознакомьтесь с доступными направлениями и ценами</li>
                  <li>Выберите подходящий маршрут и нажмите "Выбрать"</li>
                  <li>Заполните форму заказа с контактными данными</li>
                  <li>Оплатите поездку удобным способом</li>
                  <li>Получите подтверждение и информацию о трансфере</li>
                </ol>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 p-6 rounded-lg mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Гарантии и условия</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Мы гарантируем своевременную подачу автомобиля, вежливых и опытных водителей, чистые и исправные автомобили. В случае любых проблем наша служба поддержки решит вопрос в кратчайшие сроки.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    * Цены указаны за поездку в одну сторону. Для обратного трансфера предусмотрены специальные тарифы. Точную стоимость и условия можно уточнить при заказе.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Выберите город отправления
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Мы предлагаем трансфер из различных регионов России в Крым и другие популярные направления
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {originCities.map(renderCityCard)}
        </div>
      </div>

      {renderPopularRoutes()}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Не нашли свой город?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы организуем трансфер из любого города России
          </p>
          <ButtonPrimary href="tel:+79781099992" className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100">
            <MapPinIcon className="w-5 h-5 mr-2" />
            Узнать больше
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default DirectionsPage;