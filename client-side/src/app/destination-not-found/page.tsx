import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";

export interface PageContactProps {}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <span className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        </span>
        <center>
          <Image
              src="https://cdn-icons-png.flaticon.com/512/4709/4709383.png"
              alt="photo 0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              width="250"
              height="250"
          />

        </center>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div>

            </div>
          </div>
        </div>
      </div>
      <div className="relative py-16">
        <center><BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " /></center>
        <center><SectionGridAuthorBox blockText="Чтобы получить более подробную информацию, свяжитесь с нами" blockTitle="Направление не найдено" /></center>
      </div>
      {/* OTHER SECTIONS */}
      <div className="container" style={{paddingBottom: "1rem", paddingTop: "1rem"}}>
        <center><ButtonPrimary href="tel:+79780109992" sizeClass="px-5 py-4 sm:px-7">
          Позвонить
        </ButtonPrimary></center>

      </div>

    </div>

  );
};

export default PageContact;
