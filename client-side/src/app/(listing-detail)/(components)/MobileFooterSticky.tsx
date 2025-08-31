import React, { useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";

const MobileFooterSticky = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
        </div>
          <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              className={"bottom-button-call"}
              href={"tel:+79780109992"}
          >
              Позвонить
          </ButtonPrimary>

        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Заказать онлайн
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
