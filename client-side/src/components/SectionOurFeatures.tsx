"use client";

import React, {FC, useState} from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
  blockTitle: string;
  blockText: string;
  heading: string;
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
  blockTitle = "",
  blockText = "",
  heading = "h1",
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {setIsReadMore(!isReadMore)};
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image
          src={rightImg}
          alt="Особенности наших услуг"
          className="w-full h-auto"
          width={500}
          height={400}
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-features.jpg"; // Fallback image
          }}
        />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        {heading === "h1" ? <h1 className="font-semibold text-4xl mt-5">{blockTitle || ""}</h1> : null}
        {heading === "h2" ? <h2 className="font-semibold text-4xl mt-5">{blockTitle || ""}</h2> : null}
        {heading === "h3" ? <h3 className="font-semibold text-4xl mt-5">{blockTitle || ""}</h3> : null}
        {heading === "h4" ? <h4 className="font-semibold text-4xl mt-5">{blockTitle || ""}</h4> : null}
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          {blockText && isReadMore ? blockText.slice(0, 250) : blockText}
          {blockText && blockText.length > 250 && (
              <span onClick={toggleReadMore} className="cursor-pointer text-blue-600 hover:text-blue-800">
              {isReadMore ? <b>...читать далее</b> : <b>...показать меньше</b>}
                </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
