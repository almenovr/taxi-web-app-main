import React, { FC } from "react";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Property in Tokyo"
        subHeading={
          <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            233 Property
            <span className="mx-2">·</span>
            Aug 12 - 18
          </span>
        }
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
