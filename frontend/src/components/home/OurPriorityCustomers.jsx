"use client";
// import { CustomCard45Deg } from "../common/CustomModules";
import Image from "next/image";
import {
   // TwoStar,
   GreenBlur,
   //  Usr1,
   //  Usr2,
   //  Usr3,
} from "../../app/assets/all-images";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import Link from "next/link";
import { BgImgContext } from "../../contexts/BgContextProvider";
import { useContext } from "react";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const OurPriorityCustomers = () => {
   const { lightingBgImg } = useContext(BgImgContext);

   // get priority customer data
   const { data: priorityCustomerData } = useQuery({
      queryKey: ["home/satisfy_customer"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <div className="relative my-8 lg:mt-16 ">
         {/* <Image
            className="hidden lg:block -z-10 opacity-10 md:opacity-100 absolute -top-8 left-0 xl:left-4 2xl:left-24 2xl:-top-0"
            src={TwoStar}
            width={95}
            height={146}
            priority={true}
            alt="Two Star"
         /> */}
         <Image
            className="hidden md:block absolute right-0 md:w-48 md:-top-64 xl:w-1/4 xl:-top-3/4 2xl:-top-[140%] 2xl:w-[35%] 3xl:-top-[150%] -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image2}`}
            width={500}
            height={1200}
            priority={true}
            alt="Green Blur"
         />

         <div className="container_section_sm">
            <section className="w-full md:max-w-xl lg:max-w-3xl 2xl:max-w-4xl mx-auto text-center px-4 lg:px-12 2xl:px-0">
               <h1 className="section_heading_3xl mb-5">
                  {
                     priorityCustomerData?.satisfied_customer_header
                        ?.satisfied_customer_header_title
                  }
               </h1>
               <p className="text-base mx-auto max-w-lg">
                  {
                     priorityCustomerData?.satisfied_customer_header
                        ?.satisfied_customer_header_content
                  }
               </p>
            </section>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 mt-8 xl:mt-10 z-50">
               {priorityCustomerData?.customer_satisfy_body?.length > 0 &&
                  priorityCustomerData.customer_satisfy_body.map((item) => {
                     const {
                        article_id,
                        name,
                        company_name,
                        url,
                        satisfy_customer_message,
                        image,
                        designation,
                     } = item;
                     return (
                        <div
                           key={article_id}
                           className="px-6 py-10 rounded-md bg-dark-blue2"
                        >
                           <p className="text-base text-center line-clamp-5">
                              {satisfy_customer_message}
                           </p>
                           <div className="flex items-center gap-4 my-8">
                              <div className="w-14 h-14 ring rounded-full">
                                 <Image
                                    className="w-full h-full object-cover rounded-full overflow-hidden"
                                    src={`${imgBasePath}${image}`}
                                    width={200}
                                    height={200}
                                    loading="lazy"
                                    alt="Card Image"
                                 />
                              </div>
                              <div>
                                 <h2 className="text-lg mb-1 font-medium">
                                    {name}
                                 </h2>
                                 <p className="text-sm">{designation}</p>
                              </div>
                           </div>

                           <div className="flex justify-end items-center">
                              <Link
                                 href={url}
                                 className="group transition-all duration-300 ease-in-out text-orange-400 hover:text-cyan-500 text-nowrap"
                              >
                                 {company_name}
                                 <span className="ml-[5%] transition-all duration-200 group-hover:ml-[10%] ">
                                    &#10230;
                                 </span>
                              </Link>
                           </div>
                        </div>
                     );
                  })}
            </section>
         </div>
      </div>
   );
};

export default OurPriorityCustomers;
