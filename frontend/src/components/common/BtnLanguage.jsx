"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import {
//    SaudiArabia,
//    Bangladesh,
//    UnitedArabEmirates,
//    India,
//    Canada,
//    USA,
// } from "../../app/assets/all-images";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { getImageBasePath } from "../../libs/utils/getImageBasePath";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function BtnLanguage({ width }) {
   const [langList, setLangList] = useState([]);
   const [selectedLang, setSelectedLang] = useState(null);

   const handleLangChange = (lang) => {
      const langName = lang?.name;
      setSelectedLang((prevLang) =>
         prevLang && prevLang.name === langName
            ? prevLang
            : langList.find((item) => item.name === langName)
      );
      localStorage.setItem("lang", langName);
      window.location.reload();
   };

   // get language list
   const { data: languageList } = useQuery({
      queryKey: ["language"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   useEffect(() => {
      if (languageList) {
         const newLangList = languageList.map((item) => ({
            name: item.symbol,
            flag: item?.logo || "",
         }));
         setLangList(newLangList);

         const lang = localStorage.getItem("lang") || newLangList[0].name;
         const findLang = newLangList.find(({ name }) => name === lang);
         setSelectedLang(findLang);
      }
   }, [languageList]);

   return (
      <div className={`${width}`}>
         <Listbox value={selectedLang} onChange={handleLangChange}>
            <div className="relative">
               <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-whiten text-dark-bl ue p-2 text-left focus:outline-none text-sm font-medium  flex items-center justify-between gap-1">
                  <span className="block text-black">
                     {selectedLang?.name.toUpperCase()}
                  </span>
                  <span className="block">
                     {selectedLang?.name && (
                        <Image
                           className="w-5"
                           src={`${getImageBasePath(
                              imgBasePath
                           )}assets/img/flags/${selectedLang?.name}.png`}
                           alt="flag img"
                           width={20}
                           height={10}
                        />
                     )}
                  </span>
               </Listbox.Button>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Listbox.Options className="absolute z-[999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                     {langList?.length > 0 &&
                        langList.map((item, personIdx) => (
                           <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                 `relative cursor-pointer select-none py-2 px-2 ${
                                    active
                                       ? "bg-amber-100 text-amber-900"
                                       : "text-gray-900"
                                 }`
                              }
                              value={item}
                           >
                              {({ selected }) => (
                                 <div className="flex gap-2">
                                    <span
                                       className={`block ${
                                          selected
                                             ? "font-medium"
                                             : "font-normal"
                                       }`}
                                    >
                                       {item?.name.toUpperCase()}
                                    </span>
                                    <Image
                                       src={`${getImageBasePath(
                                          imgBasePath
                                       )}assets/img/flags/${item?.name}.png`}
                                       alt="flag img"
                                       width={20}
                                       height={20}
                                    />
                                 </div>
                              )}
                           </Listbox.Option>
                        ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   );
}
