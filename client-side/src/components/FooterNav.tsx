"use client";

import React, { useEffect, useRef } from "react";
import { PathName } from "@/routers/types";
import MenuBar from "@/shared/MenuBar";
import isInViewport from "@/utils/isInViewport";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon } from "@heroicons/react/24/outline";

let WIN_PREV_POSITION = 0;
if (typeof window !== "undefined") {
  WIN_PREV_POSITION = window.pageYOffset;
}

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: "",
    icon: MenuBar,
  },
];



const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEvent = () => {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(showHideHeaderMenu);
    }
  };

  const showHideHeaderMenu = () => {
    // if (typeof window === "undefined" || window?.innerWidth >= 768) {
    //   return null;
    // }

    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add("FooterNav--hide");
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove("FooterNav--hide");
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

    return item.link ? (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
      >
        <item.icon className={`w-14 h-15 ${isActive ? "text-red-600" : ""}`} />

        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? "text-red-600" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    ) : (
      <div
        key={index}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? "text-neutral-900 dark:text-neutral-100" : ""
        }`}
      >
        <item.icon iconClassName="w-14 h-15 " className={``} style={{marginTop: "1.5rem"}} />
        <span className="text-[11px] leading-none mt-1" style={{fontSize: "1.5rem"}}>{item.name}</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
      style={{paddingBottom: "1rem", paddingTop: "1rem"}}
    >
      <style jsx>{`
    .pulse {
      display: inline-block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 0 rgba(80,255,32, 1);
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0% {
        -moz-box-shadow: 0 0 0 0 rgba(80,255,32, 1);
        box-shadow: 0 0 0 0 rgba(80,255,32, 1);
        transform: rotate(45deg);
      }
      70% {
        -moz-box-shadow: 0 0 0 10px rgba(80,255,32, 0);
        box-shadow: 0 0 0 10px rgba(80,255,32, 0);
        transform: rotate(0);
      }
      100% {
        -moz-box-shadow: 0 0 0 0 rgba(80,255,32, 0);
        box-shadow: 0 0 0 0 rgba(80,255,32, 0);
        transform: rotate(45deg);
      }
    }
      `}</style>
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV.map(renderItem)}
        <div className="unit__body" style={{marginTop: "1rem", fontSize: "1.2rem"}}>
          <a className="text-middle" href="tel:+79890087999">+7 (989) 008-79-99</a>
          <a href="tel:+79890087999" style={{width: "60px", display: "inline-block", textAlign: "center"}}>
            <span className="pulse">
              <PhoneIcon className="w-full h-full text-green-600" />
            </span>
          </a>
        </div>
      </div>
    </div>

  );
};

export default FooterNav;
