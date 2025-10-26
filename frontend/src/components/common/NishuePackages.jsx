import {
   // BtnPrimary,
   // CustomCard,
   CustomCard60Deg,
} from "../common/CustomModules";
import Image from "next/image";
import {
   // SilverPro,
   // GoldBig,
   DiamontHunt,
   // TwoStar,
   // GreenBlur,
} from "../../app/assets/all-images";
import Link from "next/link";
import { useBaseUrl } from "../../libs/customHooks/getBaseUrl";

// image base url
const imgBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

// convert hours to days
const convertHoursToDays = (hours) => {
   if (hours) {
      return hours > 24 ? Math.floor(hours / 24) : hours;
   } else {
      return 0;
   }
};

const NishuePackages = ({ data }) => {
   const baseUrl = useBaseUrl();

   return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 z-50">
         {data?.length > 0 &&
            data.map((item) => {
               const {
                  commission,
                  capital_back,
                  repeat_time,
                  return_type,
                  interest,
                  interest_type,
                  max_price,
                  min_price,
                  invest_type,
                  package_name,
                  package_id,
                  hours,
                  image,
               } = item;

               return (
                  <div
                     key={package_id}
                     className="hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                     <CustomCard60Deg bodyClasses="px-10 py-6 text-center">
                        <div className="w-24 h-24 xl:w-32 xl:h-32 mx-auto">
                           <Image
                              className="w-full h-full object-contain"
                              src={
                                 image ? `${imgBaseUrl}${image}` : DiamontHunt
                              }
                              width={200}
                              height={200}
                              loading="lazy"
                              alt="package image"
                           />
                        </div>
                        <h2 className="section_heading_md my-4">
                           {package_name}
                        </h2>
                        <p className="section_heading_md font-medium py-3.5">
                           {invest_type === "1"
                              ? `$ ${min_price} - $ ${max_price}`
                              : `$ ${min_price}`}
                        </p>
                        <p className="py-3.5 relative before:border_gradient before:opacity-70 before:w-full before:h-[1px] before:absolute before:top-0 before:left-0">
                           Capital Back
                           <span className="ml-5">
                              {capital_back === "0" ? "No" : "Yes"}
                           </span>
                        </p>
                        <p className="py-3.5 relative before:border_gradient before:opacity-70 before:w-full before:h-[1px] before:absolute before:top-0 before:left-0">
                           Duration{" "}
                           <span className="ml-5">
                              {repeat_time
                                 ? `${convertHoursToDays(
                                      hours * repeat_time
                                   )} days`
                                 : "Lifetime"}
                           </span>
                        </p>
                        <p className="py-3.5 relative before:border_gradient before:opacity-70 before:w-full before:h-[1px] before:absolute before:top-0 before:left-0">
                           Interest <span className="ml-5">{interest}</span>
                        </p>
                        <Link
                           className="btn_primary mt-4"
                           href={`${baseUrl}/backend/customer/packages/${package_id}`}
                           target="_blank"
                        >
                           Invest Now
                        </Link>
                     </CustomCard60Deg>
                  </div>
               );
            })}
      </section>
   );
};

export default NishuePackages;
