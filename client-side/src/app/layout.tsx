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
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="ru" className={poppins.className}>
      <head>
        <meta property="og:title" content="Такси Сервис - Заказ такси онлайн" />
        <meta property="og:description" content="Быстрый и надежный заказ такси. Доступные цены, профессиональные водители." />
        <meta property="og:image" content="http://localhost:1337/uploads/taxi_og_image.jpg" />
        <meta property="og:url" content="http://localhost:3000" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Такси Сервис - Заказ такси онлайн" />
        <meta name="twitter:description" content="Быстрый и надежный заказ такси. Доступные цены, профессиональные водители." />
        <meta name="twitter:image" content="http://localhost:1337/uploads/taxi_og_image.jpg" />
        <link rel="canonical" href="http://localhost:3000" />
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ErrorBoundary>
          <ClientCommons />
          <SiteHeader />
          <MobileFooterSticky />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
