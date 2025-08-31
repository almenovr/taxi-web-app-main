import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";
import Showdown from "showdown";
import {Metadata} from "next";
import Image from "next/image";
import { MapPinIcon, ClockIcon, PhoneIcon, StarIcon } from "@heroicons/react/24/outline";

interface Car {
    id: number;
    className: string;
    carImg: { url: string };
    listCars: string;
    price: number;
    description: string;
    isBusiness: boolean;
    pricePerKm: number;
}

interface Destination {
    title: string;
    description: string;
    cityOrigin: string;
    cityWhen: string;
    cars: Car[];
    faqs: { id: string; faqTitle: string; faqDescription: string }[];
    textBlock: { body: string }[];
    mapLink?: string;
    siteTitle: string;
    siteDescription: string;
}

interface ListingCarDetailPageProps {
    params: { slug: string };
}

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getData(params.slug);
    const data = post.data[0] || null;

    return {
        title: data?.siteTitle,
        description: data?.siteDescription,
    };
}

async function getData(slug: string): Promise<{ data: Destination[] }> {
    const response = await fetch(
        `http://localhost:1337/api/destinations?filters[slug][$eq]=${slug}&populate[cars][populate]=*&populate[faqs][populate]=*&populate[textBlock][populate]=*`,
        { cache: "no-store" } // Отключаем кэширование для SSR
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    return await response.json();
}

const ListingCarDetailPage: ({params}: { params: any }) => Promise<React.JSX.Element> = async ({ params }) => {
    let data: Destination | null = null;
    let error: string | null = null;

    try {
        const response = await getData(params.slug);
        data = response.data[0] || null;
        console.log('Loaded data:', data); // Отладка
        console.log('Cars data:', data?.cars); // Отладка автомобилей
    } catch (err) {
        console.error('Error loading data:', err);
        error = "Ошибка при загрузке данных";
    }

    if (error) return <div>{error}</div>;
    if (!data) return <div>Данные не найдены</div>;

    const converter = new Showdown.Converter();
    const contentHTML = converter.makeHtml(data.description);
    const cars = data.cars;
    const blocks = data.textBlock;
    const htmlBlock = blocks?.map((block) => converter.makeHtml(block.body));

    const renderSection1 = () => (
        <div className="listingSection__wrap space-y-8">
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 dark:bg-neutral-800 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-neutral-800 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                        <div className="bg-gray-100 dark:bg-neutral-800 rounded-full p-2 sm:p-3 mr-3 sm:mr-4">
                            <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full">Маршрут</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 sm:mb-8 leading-tight text-gray-900 dark:text-white px-2">{data?.title}</h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-base sm:text-lg">
                        <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center">
                            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600 dark:text-gray-300" />
                            <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">От: {data?.cityOrigin}</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="bg-gray-200 dark:bg-neutral-700 rounded-full p-2 sm:p-3">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center">
                            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-600 dark:text-gray-300" />
                            <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">До: {data?.cityWhen}</span>
                        </div>
                    </div>
                    <div className="text-center mt-6 sm:mt-8">
                        <div className="inline-flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 sm:px-6 text-xs sm:text-sm">
                            <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-600 dark:text-gray-300" />
                            <span className="text-gray-700 dark:text-gray-300">Примерное время в пути: 2-3 часа</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Время в пути</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">2-3 часа</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Расстояние</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">85-100 км</p>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2">Поддержка</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">24/7</p>
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">О маршруте</h2>
                    <div className="w-16 sm:w-24 border-b-2 border-blue-500 mx-auto" />
                </div>
                <div
                    id="single-entry-content"
                    className="prose dark:prose-invert prose-base sm:prose-lg max-w-screen-lg mx-auto dark:prose-dark px-2 sm:px-0"
                    dangerouslySetInnerHTML={{ __html: contentHTML }}
                />
            </div>
        </div>
    );

    const renderSection2 = (car: Car, cityOrigin: string, cityWhen: string) => {
        const { className, carImg, listCars, price, description, isBusiness, pricePerKm } = car;
        const text = converter.makeHtml(description);

        if (!className) return null;

        return (
            <div className="listingSection__wrap group" key={car.id}>
                {/* Header Card */}
                <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-4 sm:mb-6 px-4">
                            {isBusiness ? (
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                                    <StarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full"></div>
                                </div>
                            )}
                            <div className="text-center">
                                <h3 className="text-2xl sm:text-3xl font-bold">{className}</h3>
                                {isBusiness && (
                                    <span className="text-xs sm:text-sm bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full font-medium mt-1 inline-block">
                                        Премиум класс
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-4">
                            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 sm:px-4 py-2">
                                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                <span>~2-3 часа в пути</span>
                            </div>
                            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 sm:px-4 py-2">
                                <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                <span>Круглосуточная поддержка</span>
                            </div>
                            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 sm:px-4 py-2">
                                <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                <span>Трансфер до двери</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Car Card */}
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full">
                    <PropertyCardH
                        imgSrc={carImg?.url ? `http://localhost:1337${carImg.url}` : ""}
                        title={listCars}
                        price={price}
                        cityOrigin={cityOrigin}
                        cityWhen={cityWhen}
                        classAuto={className}
                        isBusiness={isBusiness}
                        pricePerKm={pricePerKm}
                        text={text}
                    />
                </div>

                {/* Additional Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 sm:p-4 shadow-md">
                        <h4 className="font-semibold mb-2 flex items-center text-sm sm:text-base">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                            Включено в стоимость
                        </h4>
                        <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>• Профессиональный водитель</li>
                            <li>• Кондиционер</li>
                            <li>• Аудиосистема</li>
                            <li>• Бесплатная вода</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 sm:p-4 shadow-md">
                        <h4 className="font-semibold mb-2 flex items-center text-sm sm:text-base">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                            Дополнительные услуги
                        </h4>
                        <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>• Детское кресло</li>
                            <li>• Дополнительный багаж</li>
                            <li>• Остановка по пути</li>
                            <li>• Встреча с табличкой</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection9 = (faqs: Destination["faqs"]) => (
        <div className="listingSection__wrap">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 dark:bg-neutral-800 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-neutral-800 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
                <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="bg-gray-100 dark:bg-neutral-800 rounded-full p-3 sm:p-4 mr-3 sm:mr-4">
                            <span className="text-gray-600 dark:text-gray-300 font-bold text-xl sm:text-2xl">?</span>
                        </div>
                        <div>
                            <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Часто задаваемые вопросы</h4>
                            <div className="w-16 sm:w-24 border-b-2 border-gray-300 dark:border-gray-600 mx-auto mt-2"></div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg px-2">Ответы на популярные вопросы о поездке</p>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {faqs?.map((faq, index) => (
                    <div key={faq.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border-l-4 border-gray-300 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mr-4 sm:mr-6 mt-1">
                                <span className="text-gray-600 dark:text-gray-300 font-bold text-base sm:text-lg">{index + 1}</span>
                            </div>
                            <div className="flex-grow">
                                <h5 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                                    {faq.faqTitle}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                                    {faq.faqDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 text-center mt-6 sm:mt-8">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className="bg-gray-100 dark:bg-neutral-800 rounded-full p-3 sm:p-4 mr-3 sm:mr-4">
                        <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Остались вопросы?</h3>
                        <div className="w-16 sm:w-24 border-b-2 border-gray-300 dark:border-gray-600 mx-auto mt-2"></div>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 px-2">Наша служба поддержки готова помочь вам 24/7</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <a href="tel:+79781099992"
                       className="flex items-center bg-green-100 dark:bg-green-800 rounded-full px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center hover:bg-green-200 dark:hover:bg-green-700 transition-colors duration-200">
                        <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 dark:text-green-300" />
                        <span className="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">+7 (978) 109-99-92</span>
                    </a>
                    <div className="flex items-center bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center">
                        <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-900 dark:text-white text-sm sm:text-base">Круглосуточно</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSection10 = (link: string) => (
        <div className="listingSection__wrap">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 dark:bg-neutral-800 rounded-full -translate-x-10 -translate-y-10 sm:-translate-x-16 sm:-translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-neutral-800 rounded-full translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12"></div>
                <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="bg-gray-100 dark:bg-neutral-800 rounded-full p-3 sm:p-4 mr-3 sm:mr-4">
                            <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Маршрут на карте</h4>
                            <div className="w-16 sm:w-24 border-b-2 border-gray-300 dark:border-gray-600 mx-auto mt-2"></div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg px-2">
                        Следите за маршрутом следования и ориентирами по пути
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                <iframe
                    src={link}
                    width="100%"
                    height="250"
                    title="Интерактивная карта маршрута"
                    className="border-0"
                    loading="lazy"
                />
                <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 dark:bg-neutral-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Интерактивная карта маршрута</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                            <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                                <span>Обновляется в реальном времени</span>
                            </div>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
                                Открыть в новой вкладке
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Section */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
                <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">Поделитесь маршрутом</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Расскажите друзьям о своем путешествии</p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-base gap-1 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                        <span>Twitter</span>
                    </button>

                    <button className="bg-blue-800 hover:bg-blue-900 text-white p-3 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-base gap-1 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                        <span>Facebook</span>
                    </button>

                    <button className="bg-green-600 hover:bg-green-700 text-white p-3 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-base gap-1 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-4.4869 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                        </svg>
                        <span>Telegram</span>
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white p-3 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-base gap-1 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                        </svg>
                        <span>Pinterest</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderSection11 = (block: string) => (
        <div className="listingSection__wrap">
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div
                id="single-entry-content"
                className="prose dark:prose-invert prose-sm max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                dangerouslySetInnerHTML={{ __html: block }}
            />
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        </div>
    );

    const renderSidebarPrice = () => {
        if (!cars || cars.length === 0) return null;

        const minPrice = Math.min(...cars.map(car => car.price));
        const maxPrice = Math.max(...cars.map(car => car.price));

        return (
            <div className="listingSectionSidebar__wrap shadow-2xl bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-green-100 bg-opacity-50 rounded-full -translate-y-10 translate-x-10 sm:-translate-y-16 sm:translate-x-16"></div>
                <div className="relative z-10">
                    <div className="mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Цены на поездку</h3>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                                от {minPrice.toLocaleString()} ₽
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                                до {maxPrice.toLocaleString()} ₽
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        <div className="flex items-center text-xs sm:text-sm bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-2 sm:p-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            <span>Фиксированная цена</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-2 sm:p-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            <span>Профессиональные водители</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg p-2 sm:p-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            <span>Комфортные автомобили</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-lg p-2 sm:p-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                            <span>Круглосуточная поддержка</span>
                        </div>
                    </div>

                    <ButtonPrimary
                        href={`/checkout?cityOrigin=${data?.cityOrigin}&cityWhen=${data?.cityWhen}`}
                        className="w-full mb-4 text-sm sm:text-base py-3 sm:py-4"
                    >
                        <div className="flex items-center justify-center">
                            <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Заказать такси
                        </div>
                    </ButtonPrimary>

                    <div className="text-center space-y-2">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Бесплатная отмена за 24 часа
                        </p>
                        <div className="flex items-center justify-center space-x-1">
                            <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm text-gray-500">4.9 из 5 звезд</span>
                        </div>
                    </div>

                    {/* Quick Contact */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-neutral-700">
                        <h4 className="font-semibold mb-3 text-center text-sm sm:text-base">Нужна помощь?</h4>
                        <div className="space-y-2">
                            <a href="tel:+79781099992"
                               className="flex items-center justify-center bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-2 sm:p-3 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                                <PhoneIcon className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium text-green-800 dark:text-green-300">+7 (978) 109-99-92</span>
                            </a>
                            <div className="text-center">
                                <span className="text-xs text-gray-500">Работаем круглосуточно</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="nc-ListingCarDetailPage">
            <main className="relative z-10 mt-11 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
                {/* Mobile Layout - Stack vertically */}
                <div className="block lg:hidden space-y-6 sm:space-y-8">
                    {/* Main Content */}
                    <div className="w-full space-y-6 sm:space-y-8">
                        {renderSection1()}
                        {cars?.map((car) => renderSection2(car, data?.cityOrigin as string, data?.cityWhen as string))}
                        {htmlBlock?.map((block, index) => (
                            <div key={index}>{renderSection11(block)}</div>
                        ))}
                        {data.faqs.length ? renderSection9(data.faqs) : null}
                        {data.mapLink ? renderSection10(data.mapLink) : null}
                    </div>

                    {/* Mobile Sidebar */}
                    <div className="w-full space-y-6">
                        {renderSidebarPrice()}

                        {/* Contact Info */}
                        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
                            <h4 className="font-bold mb-4 text-center sm:text-left">Нужна помощь?</h4>
                            <div className="space-y-4">
                                <a href="tel:+79781099992"
                                   className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                                    <div className="flex items-center">
                                        <PhoneIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                        <div className="text-center sm:text-left">
                                            <div className="font-medium text-green-800 dark:text-green-300">+7 (978) 109-99-92</div>
                                            <div className="text-sm text-green-600 dark:text-green-400">Круглосуточно</div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium sm:hidden">Нажмите для звонка</div>
                                </a>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <div className="text-center sm:text-left">
                                            <div className="font-medium text-blue-800 dark:text-blue-300">г. Симферополь</div>
                                            <div className="text-sm text-blue-600 dark:text-blue-400">ул. Ленина, 1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - Side by side */}
                <div className="hidden lg:flex lg:flex-row">
                    <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
                        {renderSection1()}
                        {cars?.map((car) => renderSection2(car, data?.cityOrigin as string, data?.cityWhen as string))}
                        {htmlBlock?.map((block, index) => (
                            <div key={index}>{renderSection11(block)}</div>
                        ))}
                        {data.faqs.length ? renderSection9(data.faqs) : null}
                        {data.mapLink ? renderSection10(data.mapLink) : null}
                    </div>
                    <div className="flex-grow mt-10">
                        <div className="sticky top-28">
                            {renderSidebarPrice()}

                            {/* Contact Info */}
                            <div className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                                <h4 className="font-bold mb-4">Нужна помощь?</h4>
                                <div className="space-y-3">
                                    <a href="tel:+79781099992"
                                       className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                                        <PhoneIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-green-800 dark:text-green-300">+7 (978) 109-99-92</div>
                                            <div className="text-sm text-green-600 dark:text-green-400">Круглосуточно</div>
                                        </div>
                                    </a>
                                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <MapPinIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="font-medium text-blue-800 dark:text-blue-300">г. Симферополь</div>
                                            <div className="text-sm text-blue-600 dark:text-blue-400">ул. Ленина, 1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ListingCarDetailPage;
