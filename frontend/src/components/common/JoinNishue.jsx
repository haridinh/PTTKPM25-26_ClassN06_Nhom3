"use client";

import Image from "next/image";
import { TwoStar } from "../../app/assets/all-images";
import { fetchData } from "../../libs/utils/api";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const JoinNishue = () => {
   const { data } = useQuery({
      queryKey: ["join_today"],
      queryFn: fetchData,
      select: (data) => data?.data,
   });

   return (
      <div className="container_section_sm  my-12 ">
         <div className="relative bg-dark-blue2 p-2 xl:px-6 my-8 lg:my-12">
            <Image
               className="w-8 lg:w-12 absolute z-40 top-1 left-0 xl:top-4 xl:left-8 "
               src={TwoStar}
               width={"auto"}
               height={"auto"}
               priority={true}
               alt="card img"
            />
            <Image
               className="w-8  absolute z-40 bottom-2 right-3 md:right-1 lg:right-5 2xl:right-6"
               src={TwoStar}
               width={"auto"}
               height={"auto"}
               priority={true}
               alt="card img"
            />
            <section className="border_style_one flex md:items-center md:justify-between flex-col md:flex-row gap-4 px-6 lg:px-20 2xl:px-24">
               <div>
                  <h1 className="section_heading_xl mb-3">
                     {data?.join_us_today_title}
                  </h1>
                  <p className="text-sm w-full md:max-w-sm lg:max-w-md">
                     {data?.join_us_today_content}
                  </p>
               </div>
               <div>
                  <button className="btn_primary">
                     <div className="flex items-center gap-2">
                        <Link href="/registration">Open an Account</Link>
                        <div>
                           <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M12.1685 2.13245C12.2416 1.72475 11.9704 1.33495 11.5627 1.26182L4.91873 0.0701042C4.51102 -0.00302543 4.12123 0.268203 4.0481 0.67591C3.97497 1.08362 4.24619 1.47341 4.6539 1.54654L10.5596 2.60585L9.50034 8.5116C9.42721 8.9193 9.69844 9.3091 10.1061 9.38223C10.5139 9.45536 10.9037 9.18413 10.9768 8.77642L12.1685 2.13245ZM1.69351 9.68881L11.8587 2.61567L11.0019 1.38441L0.836768 8.45755L1.69351 9.68881Z"
                                 fill="white"
                              />
                           </svg>
                        </div>
                     </div>
                  </button>
               </div>
            </section>
         </div>
      </div>
   );
};

export default JoinNishue;
