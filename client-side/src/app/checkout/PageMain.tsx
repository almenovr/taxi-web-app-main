
"use client"

import { Tab } from "@headlessui/react";
import React, {FC, Fragment, useState} from "react";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Select from "@/shared/Select";

import axios from 'axios';

export interface CheckOutPagePageMainProps {
  className?: string;
}

export async function sendMessage(
    name: string,
    phone: string,
    cityOrigin: string | null,
    cityWhen: string | null,
    classAuto: string | null,
    count: string,
    time: string | null,
    number: string | null,
    wishes: string | null,
    date: string | null) {
  if (!name) {
    alert("Вы не заполнили поле имя");
  }
  const botToken = "7630743759:AAFgVdg_oW-EYeftynPk48HNH0hYKCvvFxQ";
  const chatId = "-1002295570190";
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const text = "Имя: " + name + '\n'
      + "Телефон: " + phone + '\n'
      + "Откуда: " + cityOrigin + '\n'
      + "Куда: " + cityWhen + '\n'
      + "Класс авто: " + classAuto + '\n'
      + "Количество пассажиров: " + count + '\n'
      + "Дата: " + date + '\n'
      + "Время: " + time + '\n'
      + "Номер рейса или поезда: " + number + '\n'
      + "Доп. пожелания: " + wishes + '\n';
  await axios.post(telegramUrl, {
    chat_id: chatId,
    text: text,
  });
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const searchParams = useSearchParams();
  const cityOrigin = searchParams.get('cityOrigin');
  const cityWhen = searchParams.get('cityWhen');
  const price = searchParams.get('price');
  const classAuto = searchParams.get('classAuto');
  const imgSrc = searchParams.get('imgSrc');

  const [name, setName] = useState("");
  const [cityOriginForm, setCityOrigin] = useState("");
  const [cityWhenForm, setCityWhen] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  let [classAutoV2, setClassAutoV2] = useState("Стандарт");
  const [wishes, setWishes] = useState("");

  if (classAuto) {
    classAutoV2 = classAuto;
  }




  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden" style={{width: "15rem", height: "10rem"}}>
              <Image
                alt=""
                fill
                src={imgSrc || "https://www.uber-assets.com/image/upload/v1699622775/assets/36/0a5f0e-b735-46d8-8db8-d9224b8da6e0/original/SF-Taxi-White.png"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">{cityOrigin} - {cityWhen}</h3>
          {price ? <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Ориентировочная цена</span>
            <span>{price} руб.</span>
          </div>  : ""
            }
          {classAuto ? <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Класс авто</span>
            <span>{classAuto}</span>
          </div> : ""}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Оформление заказа
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <h3 className="text-2xl font-semibold">Оплата</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Наличными
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Ваше имя </Label>
                      <Input value={name} onChange={(e) => {
                        setName(e.currentTarget.value);
                      }} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Номер телефона </Label>
                      <Input value={phone} onChange={(e) => {
                        setPhone(e.currentTarget.value);
                      }} />
                    </div>
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Дата </Label>
                      <Input value={date} type="date" onChange={(e) => {
                        setDate(e.currentTarget.value);
                      }} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Время </Label>
                      <Input type="time" value={time} onChange={(e) => {
                        setTime(e.currentTarget.value);
                      }} />
                    </div>

                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Номер рейса </Label>
                      <Input value={number} onChange={(e) => {
                        setNumber(e.currentTarget.value);
                      }} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Кол-во пассажиров </Label>
                      <Input value={count} onChange={(e) => {
                        setCount(e.currentTarget.value);
                      }} />
                    </div>
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Откуда?</Label>
                      <Input value={cityOriginForm} onChange={(e) => {
                        setCityOrigin(e.currentTarget.value);
                      }} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Куда?</Label>
                      <Input value={cityWhenForm} onChange={(e) => {
                        setCityWhen(e.currentTarget.value);
                      }} />
                    </div>
                  </div>
                  <div className="flex space-x-5  ">
                    {classAuto ? "" : <div className="flex-1 space-y-1">
                      <Label>Класс авто</Label>
                      <Select value={classAutoV2}
                              onChange={(e) => {
                                setClassAutoV2(e.target.value);
                              }} >
                        <option value="Эконом">Эконом</option>
                        <option value="Стандарт">Стандарт</option>
                        <option value="Комфорт">Комфорт</option>
                        <option value="Минивен">Минивен</option>
                        <option value="Бизнес">Бизнес</option>
                        <option value="VIP">VIP</option>
                      </Select>
                    </div>}

                  </div>
                  <div className="space-y-1">
                    <Label>Дополнительные пожелания </Label>
                    <Textarea placeholder="..."  value={wishes} onChange={(e) => {
                      setWishes(e.currentTarget.value);
                    }} />
                    <span className="text-sm text-neutral-500 block">

                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary onClick={() => sendMessage(
                  name,
                  phone,
                  cityOriginForm,
                  cityWhenForm,
                  classAutoV2,
                  count,
                  time,
                  number,
                  wishes,
                  date)}  href={`/pay-done?name=${name}&cityOrigin=${cityOriginForm}&cityWhen=${cityWhenForm}&classAuto=${classAutoV2}&date={date}`}>Заказать</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
