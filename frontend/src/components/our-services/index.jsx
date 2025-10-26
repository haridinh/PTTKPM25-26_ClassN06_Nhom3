"use client";

import TopBanner from "../banner/TopBanner";
import OurServices from "../common/OurServices";
import OurPriorityCustomers from "../home/OurPriorityCustomers";
import FAQ from "../home/FAQ";
import PaymentWeAccept from "../home/PaymentWeAccept";
import JoinNishue from "../common/JoinNishue";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import LightingComponentMedium from "../common/LightingComponentMedium";
import SpinnerLoader from "../customLoader/SpinnerLoader";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const OurServicesPage = () => {
   // get our services data
   const { data: ServicesCardData, isLoading } = useQuery({
      queryKey: ["our_services"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={
               ServicesCardData?.our_service_banner?.service_top_banner_title
            }
            routeLink="Services"
            bannerSrc={`${imgBasePath}${ServicesCardData?.our_service_banner?.image}`}
         />
         <div className="relative isolate overflow-hidden">
            <LightingComponentMedium />
            <OurServices />
            <OurPriorityCustomers />
            <FAQ />
            <PaymentWeAccept />
            <JoinNishue />
         </div>
      </>
   );
};

export default OurServicesPage;
