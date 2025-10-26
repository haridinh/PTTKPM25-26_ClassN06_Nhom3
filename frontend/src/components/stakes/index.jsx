"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import TopBanner from "./../banner/TopBanner";
import StakePricing from "./../common/StakePricing";
import { BtnPrimary } from "./../common/CustomModules";
import LightingComponentMedium from "./../common/LightingComponentMedium";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const PackagesStake = () => {
   // all states
   const [stakeBanner, setStakeBanner] = useState(null);
   const [stakeList, setStakeList] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalDataRows, setTotalDataRows] = useState(0);

   // get package data
   const { data: packageData, isLoading } = useQuery({
      queryKey: [`stakes?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   // handle pagination
   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   // fn to toggle isActive based on duration
   function toggleIsActive(duration, itemIdx) {
      const updatedList = [...stakeList];
      updatedList[itemIdx].rateInfo.forEach((rate, idx) => {
         if (rate.duration === duration) {
            updatedList[itemIdx].rateInfo[idx].isActive = true;
         } else {
            updatedList[itemIdx].rateInfo[idx].isActive = false;
         }
      });
      setStakeList(updatedList);
   }

   useEffect(() => {
      if (packageData) {
         setTotalDataRows(packageData.totalDataRows);
         const updatedData = packageData?.stake_content?.map((stake) => {
            const rateInfo_with_isActive = stake.rateInfo.map((rate, index) => {
               return { ...rate, isActive: index === 0 };
            });
            return { ...stake, rateInfo: rateInfo_with_isActive };
         });

         setStakeBanner(packageData?.stake_banner);
         setStakeList((prev) => [...prev, ...updatedData]);
      }
   }, [packageData]);

   if (isLoading && currentPage <= 1) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={stakeBanner?.stake_banner_title}
            routeLink="Stake"
            bannerSrc={`${imgBasePath}${stakeBanner?.image}`}
         />
         <div className="relative mt-8 xl:mt-12 isolate overflow-hidden">
            <LightingComponentMedium />
            <section className="container_section_sm mb-8">
               <StakePricing
                  stakeList={stakeList}
                  toggleIsActive={toggleIsActive}
               />
               {stakeList?.length !== totalDataRows && (
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
         </div>
      </>
   );
};

export default PackagesStake;
