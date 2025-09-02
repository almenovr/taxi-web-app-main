import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, StarIcon, ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Route {
  id: string;
  destination: string;
  distance: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  popular?: boolean;
}

interface OriginPageProps {
  params: { origin: string };
}

const OriginPage: FC<OriginPageProps> = ({ params }) => {
  const origin = decodeURIComponent(params.origin);

  // Моковые данные маршрутов из Ростова
  const routes: Route[] = [
    {
      id: "rostov-simferopol",
      destination: "Симферополь",
      distance: "320 км",
      duration: "5-6 часов",
      price: 4500,
      description: "Популярный маршрут в столицу Крыма через Керченский мост",
      image: "/placeholder-car.jpg",
      rating: 4.8,
      popular: true
    },
    {
      id: "rostov-sevastopol",
      destination: "Севастополь",
      distance: "380 км",
      duration: "6-7 часов",
      price: 5200,
      description: "Путешествие к Черному морю с остановками в живописных местах",
      image: "/placeholder-car.jpg",
      rating: 4.7
    },
    {
      id: "rostov-yalta",
      destination: "Ялта",
      distance: "420 км",
      duration: "7-8 часов",
      price: 5800,
      description: "Маршрут к курортной жемчужине Крыма",
      image: "/placeholder-car.jpg",
      rating: 4.9,
      popular: true
    },
    {
      id: "rostov-feodosia",
      destination: "Феодосия",
      distance: "350 км",
      duration: "6 часов",
      price: 4800,
      description: "Путь к древнему городу с богатой историей",
      image: "/placeholder-car.jpg",
      rating: 4.6
    },
    {
      id: "rostov-kerch",
      destination: "Керчь",
      distance: "280 км",
      duration: "4-5 часов",
      price: 3800,
      description: "Маршрут к восточным воротам Крыма",
      image: "/placeholder-car.jpg",
      rating: 4.5
    },
    {
      id: "rostov-evpatoria",
      destination: "Евпатория",
      distance: "360 км",
      duration: "6-7 часов",
      price: 4900,
      description: "Путешествие к детской здравнице Крыма",
      image: "/placeholder-car.jpg",
      rating: 4.7
    }
  ];

  const renderHero = () => (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <MapPinIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Из {origin}</h1>
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
              <h3 className="text-xl font-bold">{route.destination}</h3>
            </div>
          </div>
        </div>
        {route.popular && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Популярное
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{route.destination}</h3>
          <div className="flex items-center text-yellow-400">
            <StarIcon className="w-5 h-5 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{route.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {route.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
            <span>{route.distance}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
            <span>{route.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            от {route.price.toLocaleString()} ₽
          </div>
          <Link href={`/${origin.toLowerCase()}-${route.destination.toLowerCase().replace(/\s+/g, '-')}`}>
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
              Такси из {origin} - надежный трансфер по Крыму
            </h3>

            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed mb-6">
                Заказать такси из {origin} в Крым - это удобно и безопасно с нашей компанией. Мы предоставляем качественные услуги пассажирских перевозок по маршрутам {origin} - Симферополь, {origin} - Ялта, {origin} - Севастополь и другие популярные направления.
              </p>

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Преимущества заказа у нас:</h4>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Опытные водители:</strong> Все наши водители имеют большой опыт работы и отлично знают дороги Крыма</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Современный автопарк:</strong> Комфортные автомобили различных классов с кондиционером и Wi-Fi</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Фиксированные цены:</strong> Стоимость поездки не изменится в пути, оплата только по факту</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Круглосуточная поддержка:</strong> Наша служба работает 24/7 для решения любых вопросов</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Безопасность:</strong> Регулярный осмотр автомобилей и проверка водителей</span>
                </li>
              </ul>

              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Как добраться из {origin} в Крым:</h4>

              <p className="mb-4">
                Самый удобный способ путешествия из {origin} в Крым - это заказать трансфер с нашей компанией. Мы встречаем вас в аэропорту или на вокзале {origin}, обеспечиваем комфортную поездку через Керченский мост и доставляем прямо к месту назначения.
              </p>

              <p className="mb-6">
                Время в пути из {origin} до основных городов Крыма составляет от 4 до 8 часов в зависимости от выбранного маршрута и условий движения. Мы учитываем все особенности трассы и выбираем оптимальное время отправления.
              </p>

              <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Полезная информация:</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Документы: Паспорт или водительское удостоверение</li>
                  <li>• Оплата: Наличными или банковской картой</li>
                  <li>• Багаж: До 2-х мест багажа бесплатно</li>
                  <li>• Дети: Предоставляем детские кресла по запросу</li>
                  <li>• Животные: Перевозка домашних животных по согласованию</li>
                </ul>
              </div>

              <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                <strong>Заказать такси из {origin}</strong> - это гарантия комфортного и безопасного путешествия в Крым!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Доступные направления из {origin}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Выберите удобное направление и мы организуем комфортный трансфер
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map(renderRouteCard)}
        </div>

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