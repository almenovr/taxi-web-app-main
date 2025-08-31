"use client";

import React from "react";
import { FC } from "react";
import { Popover } from "@headlessui/react";
import ButtonSubmit from "../ButtonSubmit";

export interface RentalCarDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
}


const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  className = "",
  hasButtonSubmit = true,
}) => {
  return (
    <>
      <Popover
        className={`RentalCarDatesRangeInput relative flex ${className}`}
      >
        {({ open }) => (
          <>
            <div
              className={`flex-1 z-10 flex items-center focus:outline-none ${
                open ? "nc-hero-field-focused" : ""
              }`}
            >

              {/* BUTTON SUBMIT OF FORM */}
              {hasButtonSubmit && (
                <div className="pr-2 xl:pr-4">
                  <ButtonSubmit href="/listing-car-detail" />
                </div>
              )}
            </div>

            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
            )}
          </>
        )}
      </Popover>
    </>
  );
};

export default RentalCarDatesRangeInput;
