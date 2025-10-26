"use client";

import { useQuery } from "@tanstack/react-query";
// import {
//    AboutUs,
//    MerchantAccount,
//    SecurePayment,
//    IntegratedPayment,
//    PaymentVerifiedLink,
//    SeamlessFund,
//    CardImage1,
//    CardImage2,
//    CardImage3,
//    CardImage4,
//    CardImage5,
//    CardImage6,
//    CardImage7,
//    CardImage9,
// } from "../../app/assets/all-images";

import { fetchData } from "../../libs/utils/api";
import TopBanner from "../banner/TopBanner";
import LightingComponentLarge from "../common/LightingComponentLarge";
// import { BtnPrimary } from "../common/CustomModules";
import Link from "next/link";
import Image from "next/image";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { FaArrowCircleRight } from "react-icons/fa";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

function sliceMerchantDetails(details) {
   return details?.length > 750 ? `${details.slice(0, 750)}...` : details;
}

const MerchantPage = () => {
   // get merchant data
   const { data: merchantData, isLoading } = useQuery({
      queryKey: ["merchant"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={merchantData?.merchant_banner?.merchant_top_banner_title}
            routeLink={"Merchant"}
            bannerSrc={`${imgBasePath}${merchantData?.merchant_banner?.image}`}
         />

         <section className="relative py-8 2xl:mt-12 isolate overflow-hidden">
            <LightingComponentLarge />
            <section className="container_section_sm bg-transparent">
               {merchantData?.merchant_body?.length > 0 &&
                  merchantData.merchant_body.map((items, index) => {
                     const {
                        merchant_content_body,
                        merchant_content_header,
                        image,
                        article_id,
                     } = items;
                     return (
                        <div
                           className="grid gap-6 xl:gap-16 md:grid-cols-2 mb-8 lg:mb-14 items-center"
                           key={index}
                        >
                           <div
                              className={
                                 index % 2 === 0
                                    ? "md:order-none"
                                    : "md:order-1"
                              }
                           >
                              <Image
                                 className="rounded-5xl"
                                 src={`${imgBasePath}${image}`}
                                 alt="image"
                                 width={600}
                                 height={350}
                                 loading="lazy"
                              />
                           </div>
                           <div
                              className={
                                 index % 2 === 0
                                    ? "md:order-1 px-4 md:px-0"
                                    : "md:order-none px-4 md:px-0"
                              }
                           >
                              <h1 className="font-semibold section_heading_xl">
                                 {merchant_content_header}
                              </h1>
                              <p className="my-6 line-clamp-6 lg:line-clamp-none">
                                 {sliceMerchantDetails(merchant_content_body)}
                              </p>
                              <Link
                                 href={`/merchant/merchant-details?merchant_id=${article_id}`}
                                 className="btn_primary"
                              >
                                 <span className="flex items-center gap-1">
                                    Read more <FaArrowCircleRight size={18} />
                                 </span>
                              </Link>
                           </div>
                        </div>
                     );
                  })}
               {/* <div className="text-center">
                  <BtnPrimary classes={'group'}>
                     Load More
                     <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                        &#10230;
                     </span>
                  </BtnPrimary>
               </div> */}
            </section>
         </section>
      </>
   );
};

export default MerchantPage;
