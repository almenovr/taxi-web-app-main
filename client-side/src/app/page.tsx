import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import {Metadata} from "next";


async function getHomePageDataWithRelations() {
  try {
    const response = await fetch('http://localhost:1337/api/global?populate[destinations][populate]=*', {
      headers: { 'Cache-Control': 'no-cache' } });
    if (!response.ok) {
      throw new Error('Failed to fetch home page data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return { data: { destinations: [], sliderTitle: '', sliderText: '', blockText: '', blockTitle: '', blockTextTwo: '', blockTitleTwo: '', blockTextThree: '', blockTitleThree: '', blockTextFour: '', blockTitleFour: '', blockTextFive: '', blockTitleFive: '' } };
  }
}

async function getHomePageData() {
  try {
    const response = await fetch('http://localhost:1337/api/global', {
      headers: { 'Cache-Control': 'no-cache' } });
    if (!response.ok) {
      throw new Error('Failed to fetch global data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching global data:', error);
    return { data: { siteName: 'Taxi App', siteDescription: 'Заказ такси' } };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getHomePageData();
  return {
    title: response.data.siteName,
    description: response.data.siteDescription,
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Такси Сервис",
  "url": "http://localhost:3000",
  "logo": "http://localhost:1337/uploads/logo.png",
  "description": "Быстрый и надежный заказ такси. Доступные цены, профессиональные водители.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-XXX-XXX-XX-XX",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.facebook.com/taxi-service",
    "https://www.instagram.com/taxi-service"
  ]
};


async function PageHome() {
  const data = await getHomePageDataWithRelations();
  const popularDestinations: TaxonomyType[] = [];
  for (const destination of data.data.destinations) {
      popularDestinations.push({
          id: destination.id,
          href: destination.slug,
          name: destination.cityWhen,
          taxonomy: "category",
          count: 1,
          thumbnail: 'http://localhost:1337' + destination.displayImage?.url,
      });
  }
  return (
      <>
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                  __html: JSON.stringify(structuredData),
              }}
          />
          <main className="nc-PageHome relative overflow-hidden">
              {/* GLASSMOPHIN */}
              <BgGlassmorphism/>

          <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
              {/* SECTION HERO */}
              <SectionHero className="pt-10 lg:pt-16 lg:pb-16" sliderTitle={data.data.sliderTitle}
                           sliderText={data.data.sliderText}/>

              {/* SECTION 1 */}
              <SectionSliderNewCategories categories={popularDestinations}/>

              <SectionOurFeatures blockText={data.data.blockText} blockTitle={data.data.blockTitle} heading="h2"/>

              <SectionGridFeaturePlaces blockText={data.data.blockTextTwo} blockTitle={data.data.blockTitleTwo} heading="h1"/>

              <SectionHowItWork/>

              <div className="relative py-16">
                  <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 "/>
                  <SectionGridAuthorBox blockText={data.data.blockTextThree} blockTitle={data.data.blockTitleThree} heading="h3"/>
              </div>
              <SectionGridFeaturePlaces blockText={data.data.blockTextFour} blockTitle={data.data.blockTitleFour} heading="h2"/>
              <div className="relative py-16">
                  <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 "/>
                  <SectionGridAuthorBox blockText={data.data.blockTextFive} blockTitle={data.data.blockTitleFive} heading="h2"/>
              </div>
              <div className="listingSection__wrap">
                  {/* HEADING */}
                  <h4 className="text-2xl font-semibold">Часто задаваемые вопросы (ЧАВО/FAQ):</h4>
                  <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                  {/* CONTENT */}
                  <div>
                      <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>Как лучше заказать такси предварительно или по прилету?</p>
                      <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        Мы рекомендуем заказывать предварительно, это гарантирует подачу авто вовремя и со всеми Вашими пожеланиями( Детское кресло, класс автомобиля и т.п.)
                      </span>
                      <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>Как происходит встреча в аэропорту?</p>
                      <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        По прилету водитель с Вами свяжется по телефону, который вы указали при оформлении заказа, сообщит Вам всю информацию о себе, автомобиле и где он будет Вас встречать.
                      </span>
                      <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>Как изменяется тариф при задержке рейса?</p>
                      <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        Ожидание при задержке рейса и получении багажа бесплатно!
                      </span>
                      <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>Такси довозит до адреса или до автовокзала?</p>
                      <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        Наша цель - это высококачественный сервис. Водитель доставить Вас по указанному вами адресу.
                      </span>
                      <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>Может ли как-то измениться тариф?</p>
                      <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        У нас цены фиксированные. Цена может измениться, только если вы измените маршрут или класс автомобиля.
                      </span>
                  </div>
                  <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

              </div>
              <div className="relative py-16">
                  <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3Acb98237bacdbcc430408827bec889c5219a2110da3c013cd3afc65cf67a5f861" width="100%" height="400px"></iframe>
              </div>


          </div>

      </main>
      </>
  );
}

export default PageHome;
