"use client";

import { useEffect, useState } from "react";
import HeadlessSlideOver from "./HeadlessSlideOver";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BtnLanguage from "./BtnLanguage";
import DialogModal from "./DialogModal";
import Login from "../auth/Login";
import { BtnPrimaryOutline } from "./CustomModules";
import ForgotPassword from "./../auth/ForgotPassword";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { getImageBasePath } from "../../libs/utils/getImageBasePath";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

function getBaseUrl() {
   return apiBase.split("api")[0];
}

const TopHeader = () => {
   const [isLogin, setIsLogin] = useState(true);

   const [openModal, setOpenModal] = useState(false);

   const [isModalOpen, setIsModalOpen] = useState(false);

   const [isHeadlessOpen, setIsHeadlessOpen] = useState(false);

   const [isOpen, setIsOpen] = useState(false);
   const toggleNav = () => {
      setIsOpen(!isOpen);
      setIsHeadlessOpen(!isHeadlessOpen);
   };

   const [fix, setFix] = useState(false);

   const { data: menuItems, error } = useQuery({
      queryKey: ["home/menus"],
      queryFn: fetchData,
   });

   const { data: logoAndSettings } = useQuery({
      queryKey: ["setting"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   function setTopFixed() {
      if (window.scrollY > 0) {
         setFix(true);
      } else {
         setFix(false);
      }
   }

   useEffect(() => {
      window.addEventListener("scroll", setTopFixed);
   });

   const currentPath = usePathname();

   const isActive = (path) => {
      return currentPath === `/${path}`;
   };

   const modalOpen = () => {
      setOpenModal(!openModal);
      setIsModalOpen(!isModalOpen);
   };

   return (
      <>
         <header
            className={`mx-auto w-full h-16 xl:h-20 fixed top-0 z-50  backdrop-blur-sm flex items-center ${
               fix
                  ? "bg-dark-primary/70 shadow-md shadow-blue-600/40"
                  : "absolute bg-dark-primary/30"
            } `}
         >
            <nav className="container_section_sm px-4 md:px-8 xl:px-0 py-2 flex justify-between items-center ">
               <Link className="flex items-center gap-3" href="/">
                  {logoAndSettings?.logo && (
                     <Image
                        className="w-full h-full object-cover"
                        src={`${imgBasePath}${logoAndSettings.logo}`}
                        width={150}
                        height={150}
                        priority={true}
                        alt="Brand Logo"
                     />
                  )}
               </Link>

               <ul className="hidden xl:flex md:items-center gap-4 2xl:gap-5">
                  {menuItems?.data?.length > 0 &&
                     menuItems.data.map((item, index) => {
                        const { content, slug } = item;
                        return (
                           <li key={index} className="group inline-block">
                              <Link
                                 href={`/${slug}`}
                                 className={`${
                                    isActive(slug)
                                       ? "active_link"
                                       : "nav_link  group-hover:after:w-2/3 group-hover:text-blue-primary group-hover:after:rounded-md"
                                 }`}
                              >
                                 {content}
                              </Link>
                           </li>
                        );
                     })}
                  <li>
                     {/* <BtnPrimaryOutline onClick={modalOpen}>
                        Login
                     </BtnPrimaryOutline> */}
                     <Link
                        href={`${getImageBasePath(imgBasePath)}customer/login`}
                     >
                        <BtnPrimaryOutline>Login</BtnPrimaryOutline>
                     </Link>
                  </li>
                  <li>
                     <Link
                        href={`${getBaseUrl()}registration`}
                        className={`px-4 py-2.5 ${
                           isActive("/registration")
                              ? "btn_primary_active"
                              : "btn_primary"
                        }`}
                     >
                        Registration
                     </Link>
                  </li>
                  <li>
                     <BtnLanguage width={"w-16"} />
                  </li>

                  {/* <li>
              <label className="flex items-center cursor-pointer ">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-16 h-8 bg-blue-600 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">
                    LTR
                  </span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                    RTL
                  </span>
                </div>
              </label>
            </li> */}
               </ul>
               <button
                  type="button"
                  onClick={toggleNav}
                  className="relative group xl:hidden"
               >
                  <div className="relative flex items-center justify-center rounded-full w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] transform transition-all bg-dark-primary2  ring-gray-300 ring-[2px] md:ring-[3px] ring-opacity-50 duration-200 shadow-md  md:active:ring-[3px]">
                     <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center">
                        <div className="h-[2px] w-1/2 rounded transform transition-all duration-300 origin-right delay-75 bg-white"></div>

                        <div className="h-[2px] rounded bg-white"></div>

                        <div className="h-[2px] w-1/2 rounded self-end transform transition-all duration-300 origin-left delay-75 bg-white"></div>
                     </div>
                  </div>
               </button>
            </nav>
         </header>
         <HeadlessSlideOver open={isHeadlessOpen} setOpen={setIsHeadlessOpen}>
            <ul className="w-full flex flex-col space-y-4">
               {menuItems?.data.length > 0 &&
                  menuItems.data.map((item, index) => {
                     const { content, slug } = item;
                     return (
                        <li key={index} className="nav_list group m-0">
                           <Link
                              onClick={toggleNav}
                              href={slug}
                              className={`${
                                 isActive(slug)
                                    ? "active_link"
                                    : "nav_link  group-hover:after:w-2/3 group-hover:text-blue-primary group-hover:after:rounded-md"
                              }`}
                           >
                              {content}
                           </Link>
                        </li>
                     );
                  })}
               <li>
                  <Link href={`${getImageBasePath(imgBasePath)}customer/login`}>
                     <BtnPrimaryOutline>Login</BtnPrimaryOutline>
                  </Link>
                  {/* <BtnPrimaryOutline onClick={modalOpen}>
                     Login
                  </BtnPrimaryOutline> */}
               </li>

               <li>
                  <Link
                     onClick={toggleNav}
                     href={`${getBaseUrl()}registration`}
                     className={`px-4 py-2.5 ${
                        isActive("/registration")
                           ? "btn_primary_active"
                           : "btn_primary"
                     }`}
                  >
                     Registration
                  </Link>
               </li>

               <li>
                  <BtnLanguage width={"w-16"} />
               </li>

               {/* <li>
            <label className="flex items-center cursor-pointer ">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-16 h-8 bg-blue-600 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs">
                  LTR
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                  RTL
                </span>
              </div>
            </label>
          </li> */}
            </ul>
         </HeadlessSlideOver>
         <DialogModal open={isModalOpen} setOpen={setIsModalOpen}>
            {isLogin ? (
               <Login
                  onClick={modalOpen}
                  forgotPasswork={() => setIsLogin(false)}
               />
            ) : (
               <ForgotPassword />
            )}
         </DialogModal>
      </>
   );
};

export default TopHeader;
