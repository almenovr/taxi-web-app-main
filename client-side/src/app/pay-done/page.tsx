"use client";
import React, { FC, Suspense } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import {useSearchParams} from "next/navigation";

export interface PayPageProps {}

const PayPageContent: FC<PayPageProps> = () => {
  const searchParams = useSearchParams();
  const cityOrigin = searchParams.get('cityOrigin');
  const cityWhen = searchParams.get('cityWhen');
  const price = searchParams.get('price');
  const classAuto = searchParams.get('classAuto');
  const date = searchParams.get('date');
  const countPassengers = searchParams.get('countPassengers');

  return (
    <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
      <h2 className="text-3xl lg:text-4xl font-semibold">
        Заказ оформлен 🎉
      </h2>

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* ------------------------ */}

      {/* ------------------------ */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Детали заказа</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Направление</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {cityOrigin} - {cityWhen}
            </span>
          </div>
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Дата</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {date}
            </span>
          </div>
          <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Класс авто</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {classAuto}
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Кол-во пассажиров</span>
            <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {countPassengers}
            </span>
          </div>
        </div>
      </div>
      <div>
        <ButtonPrimary href="/">На главную</ButtonPrimary>
      </div>
    </div>
  );
};

const PayPage: FC<PayPageProps> = () => {
  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <PayPageContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default PayPage;
