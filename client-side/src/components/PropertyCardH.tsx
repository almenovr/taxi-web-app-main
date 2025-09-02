"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export interface PropertyCardHProps {
  className?: string;
  imgSrc: string,
  title?: string,
  price?: number,
  cityOrigin: string,
  cityWhen: string,
  classAuto?: string
  isBusiness: boolean;
  pricePerKm?: number;
  text?: string;
}

const PropertyCardH: FC<PropertyCardHProps> = ({
   className = "",
   imgSrc = "",
   title = "",
   cityOrigin = "",
   cityWhen = "",
   price = 0,
   classAuto = "",
   isBusiness = false,
   pricePerKm = 0,
   text = "",
}) => {

  const renderSliderGallery = () => {
    return (
        <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
            {imgSrc ? (
                <Image
                    src={imgSrc}
                    width={500}
                    height={500}
                    alt={title || "Изображение автомобиля"}
                    className="w-full h-auto rounded-lg object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-car.jpg"; // Fallback image
                    }}
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Изображение недоступно</span>
                </div>
            )}
        </div>
    );
  };


  const renderContent = (isBusiness: boolean) => {
    if (!isBusiness) {
        return (
            <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
              <div className="space-y-4 w-full">
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium capitalize">
                    <span className="line-clamp-2">{title}</span>
                  </p>
                </div>
                <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
                <div className="flex w-full justify-between items-end">
                    {price ?
                <Link href={`/checkout?cityOrigin=${cityOrigin}&cityWhen=${cityWhen}&price=${price}&classAuto=${classAuto}&imgSrc=${imgSrc}`}
                      className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-secondary-500 rounded-lg leading-none text-sm sm:text-base font-medium text-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-200 w-full sm:w-auto text-center">
                    от {`${price} руб`}
                </Link> : pricePerKm ?
                <Link href={`/checkout?cityOrigin=${cityOrigin}&cityWhen=${cityWhen}&price=${price}&classAuto=${classAuto}&imgSrc=${imgSrc}`}
                      className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-secondary-500 rounded-lg leading-none text-sm sm:text-base font-medium text-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-200 w-full sm:w-auto text-center">
                    от {`${pricePerKm} р/км`}
                </Link> : ""}
                </div>
                {text && (
                    <div
                        id="single-entry-content"
                        className="prose dark:prose-invert prose-sm max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                )}
              </div>
            </div>
        );
    } else if (isBusiness) {
        const prices = title?.split('руб.') || [];
          return (
              <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
                  <div className="space-y-4 w-full">
                    {prices.map((businessPrice) => {
                        if(!businessPrice.includes("Симферополь")) {
                            return (<div className="flex items-center space-x-2">
                              <p className="text-lg font-medium capitalize">
                                  <span className="line-clamp-2">{businessPrice}</span>
                              </p>
                          </div>);
                        } else {
                            return (<div className="flex items-center space-x-2">
                              <p className="text-lg font-medium capitalize">
                                  <span className="line-clamp-2">{businessPrice} руб.</span>
                              </p>
                          </div>);
                        }
                    })}
                  </div>
              </div>
          );
      }
  };

  return (
      <div
          className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
      >
          <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
              {renderSliderGallery()}
              {renderContent(isBusiness)}
          </div>
      </div>
  );
};

export default PropertyCardH;
