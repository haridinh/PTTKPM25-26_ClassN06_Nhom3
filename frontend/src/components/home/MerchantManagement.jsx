"use client";

import { CustomCardSquare } from "../common/CustomModules";
import Image from "next/image";
// import {
//    // UserPlus,
//    // Payment,
//    // PaymentVerified,
//    // IntegratedPpayment,
//    // Enjoy,
//    // FundWithdrawals,
//    BlueBgBlur,
//    GreenBlur,
// } from "../../app/assets/all-images";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useContext } from "react";
import { BgImgContext } from "../../contexts/BgContextProvider";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

function sliceMerchantDetails(details) {
  return details?.length > 90 ? `${details.slice(0, 90)}...` : details;
}

const MerchantManagement = () => {
  const { lightingBgImg } = useContext(BgImgContext);

  // get merchant data
  const { data: merchantData } = useQuery({
    queryKey: ["home/merchant"],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  return (
    <div className="relative isolate">
      <Image
        className="hidden md:block absolute left-0 md:w-48 md:top-32 xl:w-1/3  2xl:w-1/2 -z-10"
        src={`${imgBasePath}${lightingBgImg?.bg_image1}`}
        width={600}
        height={1200}
        priority={true}
        alt="Blue Bg Blur"
      />
      <Image
        className="hidden lg:block absolute right-0 -top-16 -z-10 "
        src={`${imgBasePath}${lightingBgImg?.bg_image2}`}
        width={600}
        height={600}
        priority={true}
        alt="Green Blur"
      />

      <div className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-16 z-[100]">
        <section className="w-full max-w-[600px] mx-auto text-center">
          <h1 className="section_heading_3xl mb-5">
            {merchantData?.merchant_header?.merchant_title_header}
          </h1>
          <p className="text-base">
            {merchantData?.merchant_header?.merchant_title_content}
          </p>
        </section>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 mt-8 xl:mt-10">
          {merchantData?.merchant_body?.length > 0 &&
            merchantData.merchant_body.map((item, index) => {
              const {
                article_id,
                image,
                merchant_content_body,
                merchant_content_header,
              } = item;
              return (
                <CustomCardSquare key={index} bodyClasses="px-4 pt-3 pb-4">
                  <div className="flex justify-end">
                    <small className="btn_primary px-2.5 py-1.5 rounded-md text-sm z-10">
                      Step-0{index + 1}
                    </small>
                  </div>
                  <div className="w-12 h-12">
                    <Image
                      className="w-full h-full object-cover rounded-full"
                      src={`${imgBasePath}${image}`}
                      width={42}
                      height={42}
                      priority={true}
                      alt="card icon"
                    />
                  </div>
                  <h2 className="my-5 text-lg 2xl:text-[22px] leading-6 2xl:leading-7 font-bold">
                    {merchant_content_header}
                  </h2>
                  <p className="text-md line-clamp-2">
                    {sliceMerchantDetails(merchant_content_body)}
                  </p>

                  <Link
                    className="text-end mt-2 text-blue-500 flex items-center justify-end gap-1 z-50"
                    href={`merchant/merchant-details?merchant_id=${article_id}`}
                  >
                    Read more <FaLongArrowAltRight size={15} />
                  </Link>
                </CustomCardSquare>
              );
            })}
        </section>
      </div>
    </div>
  );
};

export default MerchantManagement;
