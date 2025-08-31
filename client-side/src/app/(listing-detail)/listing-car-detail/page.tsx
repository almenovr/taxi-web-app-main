"use client";

import React, { FC } from "react";
import StartRating from "@/components/StartRating";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { PHOTOS } from "./constant";
import { usePathname, useRouter } from "next/navigation";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import { Route } from "next";

export interface ListingCarDetailPageProps {}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({}) => {


  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Название страницы
        </h2>

        {/* 2 */}
        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">Название города</span>
          </span>
        </div>

              <Image
                  src="https://www.uber-assets.com/image/upload/v1699622775/assets/36/0a5f0e-b735-46d8-8db8-d9224b8da6e0/original/SF-Taxi-White.png"
                  alt="photo 0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  width="250"
                  height="250"
              />


              {/*  */}



        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      </div>
    );
  };

  //

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Car descriptions</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>
            Until the all-new TUCSON hits the dealer showrooms you can check it
            out in our Showroom Walkaround video. Watch the video and join our
            product specialist as he gives you an up-close look of our latest
            SUV
            <br />
            <br />
            Questions are at the heart of making things great. Watch our
            celebrity-filled TV ad and you’ll see that when we say “everything,”
            we mean everything.
          </p>
        </div>
      </div>
    );
  };


  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Lock in this fantastic price today, cancel free of charge anytime.
            Reserve now and pay at pick-up.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            We asked ourselves, “How can we make the dash not only look better,
            but also give the driver a better look outside?” The unexpected
            answer is having no hood above the available 10.25-inch digital
            instrument cluster...
          </span>
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            $19
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /day
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className="border border-neutral-200 dark:border-neutral-700 rounded-2xl">
          <RentalCarDatesRangeInput />
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
      </div>
    );
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">
          Pick up and drop off
        </span>
        <div className="mt-8 flex">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-14 text-sm">
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 12 · 10:00
              </span>
              <span className=" font-semibold">
                Saint Petersburg City Center
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 16 · 10:00
              </span>
              <span className=" font-semibold">
                Saint Petersburg City Center
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <Image
              fill
              src={PHOTOS[0]}
              alt="photo 0"
              className="object-cover rounded-md sm:rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>

          {/*  */}

        </div>
      </header>

      {/* MAIn */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
          {renderSection2()}

          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          {renderSidebarDetail()}
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;
