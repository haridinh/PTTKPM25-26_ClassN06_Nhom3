"use client";
import { useQuery } from "@tanstack/react-query";
import TopBanner from "../banner/TopBanner";
import { BtnPrimary } from "../common/CustomModules";
import JoinNishue from "../common/JoinNishue";
import LightingComponentSm from "../common/LightingComponentSm";
import { fetchData } from "../../libs/utils/api";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { Usr1 } from "../../app/assets/all-images";
import Image from "next/image";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const TopInvestors = () => {
   // all states
   const [topInvestors, setTopInvestors] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   // get package data
   const { data, isLoading } = useQuery({
      queryKey: [`top_investors?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   // set packages
   useEffect(() => {
      if (data) {
         if (data.investors.length <= 0) {
            toast.error("No more packages available!");
            return;
         } else {
            setTopInvestors((prev) => ({
               ...prev,
               investors: [...(prev?.investors || []), ...data.investors],
               totalDataRows: data.totalDataRows,
            }));
         }
      }
   }, [data]);

   if (isLoading && currentPage <= 1) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={data?.banner?.top_investor_banner_title}
            routeLink="Top Investors"
            bannerSrc={`${imgBasePath}${data?.banner?.image}`}
         />
         <div className="relative pt-8 xl:pt-12 isolate overflow-hidden">
            <LightingComponentSm />
            <section className="container_section_sm">
               <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 my-8 xl:my-10">
                  {topInvestors?.investors?.length > 0 &&
                     topInvestors.investors.map((investor, index) => (
                        <div
                           key={index}
                           className="p-2 bg-dark-blue2 rounded-lg shadow-blue-700 ring-0 hover:ring-1"
                        >
                           <div className="flex justify-end">
                              <small className="text-base z-10 text-blue-800">
                                 {`0${index + 1}`}
                              </small>
                           </div>
                           <div className="flex flex-col justify-center items-center gap-2">
                              <div className="w-16 h-16 ring-1 ring-blue-primary rounded-full relative mb-2 p-1">
                                 <svg
                                    className="absolute -right-2 top-1/2 "
                                    width="24"
                                    height="35"
                                    viewBox="0 0 24 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M7 22V35L12 30.6672L17 35V22H7Z"
                                       fill="#CCCCCC"
                                    />
                                    <path
                                       fillRule="evenodd"
                                       clipRule="evenodd"
                                       d="M12 30.3339L14 32V22H10V32L12 30.3339Z"
                                       fill="#1549FF"
                                    />
                                    <path
                                       d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                                       fill="#1549FF"
                                    />
                                    <path
                                       d="M18.9622 10.5338C18.8755 10.2873 18.6467 10.1045 18.3674 10.0565L14.553 9.40091L12.6785 6.36164C12.5417 6.13855 12.2815 6 11.9999 6C11.7188 6 11.458 6.13855 11.3213 6.36164L9.44726 9.40091L5.6329 10.0565C5.35355 10.1045 5.12483 10.2873 5.03753 10.5338C4.95023 10.7793 5.01774 11.0493 5.21387 11.2364L7.86367 13.7667L7.38294 17.2053C7.34686 17.46 7.46733 17.7125 7.69489 17.8636C7.83049 17.9542 7.99229 18 8.15466 18C8.26524 18 8.37698 17.9787 8.48116 17.9345L12.0004 16.458L15.5191 17.9345C15.6239 17.9787 15.7351 18 15.8462 18C16.0086 18 16.1698 17.9542 16.3054 17.8636C16.5341 17.7125 16.6534 17.46 16.6179 17.2053L16.1372 13.7667L18.787 11.2364C18.982 11.0493 19.0501 10.7793 18.9622 10.5338Z"
                                       fill="white"
                                    />
                                 </svg>

                                 <Image
                                    className="w-full h-full object-contain rounded-full"
                                    src={
                                       investor?.customerInfo?.avatar
                                          ? `${imgBasePath}${investor?.customerInfo?.avatar}`
                                          : Usr1
                                    }
                                    width={200}
                                    height={200}
                                    loading="lazy"
                                    alt="Card Image"
                                 />
                              </div>
                              <h2 className="text-lg font-medium">
                                 {investor?.customerInfo?.first_name +
                                    " " +
                                    investor?.customerInfo?.last_name}
                              </h2>
                              <p className="font-light">
                                 {investor?.customerInfo?.username}
                              </p>
                              <p className="text-sm text-center bg-blue-800 px-3 py-2 rounded-full">
                                 Investment - $ {investor?.investment}
                              </p>
                           </div>
                        </div>
                     ))}
               </section>
               {topInvestors?.investors.length !==
                  topInvestors?.totalDataRows && (
                  <div className="text-center my-4 md:mt-12">
                     <BtnPrimary onClick={handlePagination} classes={"group"}>
                        {isLoading ? "Loading..." : "Load More"}
                        {!isLoading && (
                           <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                              &#10230;
                           </span>
                        )}
                     </BtnPrimary>
                  </div>
               )}
            </section>
            <JoinNishue />
         </div>
      </>
   );
};

export default TopInvestors;
