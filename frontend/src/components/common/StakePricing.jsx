"use client";

import Image from "next/image";
import {
   BtnPrimary,
   BtnPrimaryOutline,
   CustomCard60Deg,
} from "../common/CustomModules";
// import { CurrencyA } from "./../../app/assets/all-images";
import Link from "next/link";
import { useBaseUrl } from "../../libs/customHooks/getBaseUrl";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const activeStakeFinder = (stakeArr) => {
   const activeStake = stakeArr?.find((stake) => stake.isActive === true);
   return activeStake;
};

const StakePricing = ({ stakeList, toggleIsActive }) => {
   const baseURl = useBaseUrl();

   return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 z-50">
         {stakeList?.length > 0 &&
            stakeList.map((stake, index) => {
               return (
                  <CustomCard60Deg key={index} bodyClasses="p-4 text-center">
                     <div className="w-24 h-24 xl:w-32 xl:h-32 mx-auto">
                        <Image
                           className="w-full h-full object-contain"
                           src={`${imgBasePath}${stake?.image}`}
                           width={200}
                           height={200}
                           loading="lazy"
                           alt="Card Image"
                        />
                     </div>
                     <h2 className="section_heading_md my-4">
                        {stake?.stake_name}
                     </h2>
                     <p className="text-md font-medium">Duration</p>
                     <div className="h-32 space-x-3 space-y-3">
                        {stake?.rateInfo?.length > 0 &&
                           stake.rateInfo.map((item, idx) => (
                              <BtnPrimaryOutline
                                 key={idx}
                                 onClick={() =>
                                    toggleIsActive(item.duration, index)
                                 }
                                 classes={
                                    item.isActive
                                       ? "btn_primary_outline_active"
                                       : ""
                                 }
                              >
                                 {item.duration} Days
                              </BtnPrimaryOutline>
                           ))}
                     </div>

                     <p className="py-3.5 border_top">
                        Annual Rate{" "}
                        <span className="ml-5">
                           {activeStakeFinder(stake?.rateInfo).annual_rate} %
                        </span>
                     </p>
                     <p className="py-3.5 border_top">
                        Min Value{" "}
                        <span className="ml-5">
                           {activeStakeFinder(stake?.rateInfo).min_price} BTC
                        </span>
                     </p>
                     <p className="py-3.5 border_top border_bottom">
                        Max Value{" "}
                        <span className="ml-5">
                           {activeStakeFinder(stake?.rateInfo).max_price} BTC{" "}
                        </span>
                     </p>
                     <Link
                        href={`${baseURl}/backend/customer/stake/plan`}
                        target="_blank"
                     >
                        <BtnPrimary classes={"mt-4"}>Stake Now</BtnPrimary>
                     </Link>
                  </CustomCard60Deg>
               );
            })}
      </section>
   );
};

export default StakePricing;
