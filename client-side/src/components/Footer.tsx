"use client";

import React from "react";


const Footer: React.FC = () => {
  return (
    <>

      <center><div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700" style={{paddingBottom: "3rem", paddingTop: "3rem"}}>
        <span>Междугороднее такси Встреча. Такси ЖД вокзал Симферополь, Такси аэропорт Симферополь (SIP). График работы 24/7, © 2009 Taxi Vstrecha</span>

      </div></center>
      <center><span style={{paddingBottom: "5rem", color: "blue"}}><a href="tel:+79890087999">Заказать такси сейчас +7 (989) 008-79-99</a></span></center>
    </>
  );
};

export default Footer;
