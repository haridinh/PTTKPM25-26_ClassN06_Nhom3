"use client";
// import React, { useState } from "react";
import Image from "next/image";
import { BtnPrimary } from "./CustomModules";
import {
   UserFramOuter,
   // Usr1,
   // Usr10,
   // Usr11,
   // Usr12,
   // Usr13,
   // Usr2,
   // Usr3,
   // Usr4,
   // Usr5,
   // Usr6,
   // Usr7,
   // Usr8,
   // Usr9,
} from "./../../app/assets/all-images";

// media base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const Team = ({ cardData }) => {
   return (
      <section>
         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-6">
            {cardData?.data?.length > 0 &&
               cardData.data.map((item, index) => {
                  const { avatar, name, designation } = item;
                  return (
                     <div
                        key={index}
                        className="px-6 py-10 text-center border_style_six flex flex-col items-center gap-2 group cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                     >
                        <div className="flex justify-center items-center">
                           <Image
                              className="group-hover:hue-rotate-60  group-hover:rotate-[200deg] transition-all duration-300 ease-in-out"
                              src={UserFramOuter}
                              width={"auto"}
                              height={"auto"}
                              quality={100}
                              priority={true}
                              alt="User Fram"
                           />
                           <Image
                              className="absolute rounded-full"
                              src={`${imgBasePath}${avatar}`}
                              width={112}
                              height={112}
                              quality={100}
                              loading="lazy"
                              alt="User Fram"
                           />
                        </div>

                        <h2 className="section_heading_md">{name}</h2>
                        <p>{designation}</p>
                     </div>
                  );
               })}
         </div>
      </section>
   );
};

export default Team;
