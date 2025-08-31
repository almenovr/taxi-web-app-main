"use client";
import React, { useState } from "react";
import LocationInput from "../LocationInput";

const CarsSearchForm = () => {
  //
  const [fieldNameShow, setFieldNameShow] = useState<
    "locationPickup" | "locationDropoff" | "dates"
  >("locationPickup");
  //
  const [locationInputPickUp, setLocationInputPickUp] = useState("");

  const renderRadioBtn = () => {
    return (
      <div className="flex justify-center items-center space-x-3">
      </div>
    );
  };

  return (

    <div>
      <div className="w-full space-y-5">
        {renderRadioBtn()}

          <div
              className={`w-full bg-white dark:bg-neutral-800 "rounded-2xl shadow-lg"
              }`}
          >

                  <button
                      className={`w-full flex justify-between text-sm font-medium p-4`}
                      onClick={() => setFieldNameShow("locationPickup")}
                  >
                      <span className="text-neutral-400">Откуда?</span>
                      <span>{locationInputPickUp || "Город или место"}</span>
                  </button>
                  <LocationInput
                      headingText="Откуда?"
                      defaultValue={locationInputPickUp}
                      onChange={(value) => {
                          setLocationInputPickUp(value);
                      }}
                  />
          </div>
          <div
              className={`w-full bg-white dark:bg-neutral-800 "rounded-2xl shadow-lg"`}
          >
                  <button
                      className={`w-full flex justify-between text-sm font-medium p-4`}
                      onClick={() => setFieldNameShow("locationPickup")}
                  >
                      <span className="text-neutral-400">Откуда?</span>
                      <span>{locationInputPickUp || "Город или место"}</span>
                  </button>
                  <LocationInput
                      headingText="Куда?"
                      defaultValue={locationInputPickUp}
                      onChange={(value) => {
                          setLocationInputPickUp(value);
                      }}
                  />

          </div>
      </div>
    </div>
  );
};

export default CarsSearchForm;
