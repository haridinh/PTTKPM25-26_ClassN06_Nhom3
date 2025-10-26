"use client";

import { useQuery } from "@tanstack/react-query";
import TopBanner from "../banner/TopBanner";
import { BtnPrimary } from "../common/CustomModules";
import JoinNishue from "../common/JoinNishue";
import LightingComponentSm from "../common/LightingComponentSm";
import NishuePackages from "../common/NishuePackages";
import { fetchData } from "../../libs/utils/api";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const AllPackages = () => {
   // all states
   const [packageData, setPackageData] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   // get package data
   const { data, isLoading } = useQuery({
      queryKey: [`package?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   // set packages
   useEffect(() => {
      if (data) {
         if (data.packages.length <= 0) {
            toast.error("No more packages available!");
            return;
         } else {
            setPackageData((prev) => ({
               ...prev,
               packages: [...(prev?.packages || []), ...data.packages],
               totalDataRows: data.totalDataRows,
            }));
         }
      }
   }, [data]);

   if (isLoading && currentPage <= 1) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={data?.package_banner?.package_banner_title}
            routeLink="Packages"
            bannerSrc={`${imgBasePath}${data?.package_banner?.image}`}
         />
         <div className="relative pt-8 xl:pt-12 isolate overflow-hidden">
            <LightingComponentSm />
            <section className="container_section_sm">
               <NishuePackages data={packageData?.packages} />
               {packageData?.packages.length !== packageData?.totalDataRows && (
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

export default AllPackages;
