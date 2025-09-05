"use client";

import { Poppins } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";
import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={poppins.className}>
      <head>
        <meta property="og:title" content="Такси Сервис - Заказ такси онлайн" />
        <meta property="og:description" content="Быстрый и надежный заказ такси. Доступные цены, профессиональные водители." />
        <meta property="og:image" content="https://strapi-production-5b34.up.railway.app/uploads/taxi_og_image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Такси Сервис - Заказ такси онлайн" />
        <meta name="twitter:description" content="Быстрый и надежный заказ такси. Доступные цены, профессиональные водители." />
        <meta name="twitter:image" content="https://strapi-production-5b34.up.railway.app/uploads/taxi_og_image.jpg" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104031676', 'ym');

              ym(104031676, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ErrorBoundary>
          <ClientCommons />
          <SiteHeader />
          {children}
          <Footer />
        </ErrorBoundary>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/104031676" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
