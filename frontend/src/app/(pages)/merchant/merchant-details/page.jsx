"use client";
import Image from "next/image";
import TopBanner from "../../../../components/banner/TopBanner";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../../libs/utils/api";
import SpinnerLoader from "../../../../components/customLoader/SpinnerLoader";
// import { MerchantAccountDetails } from "../../../assets/all-images";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const MerchantDetailsPage = () => {
   const searchParams = useSearchParams();
   const merchantId = searchParams.get("merchant_id");

   const { data: merchantData, isLoading } = useQuery({
      queryKey: [`merchant/details?id=${merchantId}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={merchantData?.merchant_content_header}
            routeLink={"Merchant Account"}
            bannerSrc={`${imgBasePath}${merchantData?.image}`}
         />
         <section className="container_section_sm space-y-4 my-8 lg:my-16">
            <Image
               src={`${imgBasePath}${merchantData?.image}`}
               alt="Merchant Account Image"
               width={1800}
               height={200}
               loading="lazy"
            />

            <h1 className="section_heading_md">
               {merchantData?.merchant_content_header}
            </h1>
            <p>{merchantData?.merchant_content_body}</p>
         </section>
      </>
   );
};

export default MerchantDetailsPage;
