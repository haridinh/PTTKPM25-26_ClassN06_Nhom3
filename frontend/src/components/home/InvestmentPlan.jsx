"use client";
// import Image from "next/image";
import NishuePackages from "./../common/NishuePackages";
// import { TwoStar, GreenBlur } from "../../app/assets/all-images";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { BtnPrimary } from "../common/CustomModules";
import Link from "next/link";

const InvestmentPlan = () => {
   // get plan data
   const { data: planData } = useQuery({
      queryKey: ["home/package"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <div className="relative isolate my-12 2xl:my-16 3xl:my-20">
         {/* <Image
            className="hidden lg:block -z-10 opacity-10 md:opacity-100 absolute -top-8 left-0 xl:left-4 2xl:left-24 2xl:-top-0"
            src={TwoStar}
            width={95}
            height={146}
            priority={true}
            alt="Two Star"
         /> */}

         <div className="container_section_sm">
            <section className="w-full max-w-[500px] mx-auto text-center px-2 mb-8 lg:mb-14">
               <h1 className="section_heading_3xl mb-5">
                  {planData?.package_header?.package_header_title}
               </h1>
               <p className="text-base">
                  {planData?.package_header?.package_header_content}
               </p>
            </section>
            <NishuePackages data={planData?.package_body} />
         </div>
         <div className="text-center my-4 md:mt-12">
            <Link href="/packages">
               <BtnPrimary classes={"group"}>
                  Load More
                  <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                     &#10230;
                  </span>
               </BtnPrimary>
            </Link>
         </div>
      </div>
   );
};

export default InvestmentPlan;
