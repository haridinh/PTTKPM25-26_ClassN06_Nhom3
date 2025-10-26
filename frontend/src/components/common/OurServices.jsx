"use client";

// import { BitBlackBlurR, BlueBgBlur } from "../../app/assets/all-images";
import Image from "next/image";
import { CustomCardSquare } from "./CustomModules";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { useContext } from "react";
import { BgImgContext } from "../../contexts/BgContextProvider";
// import { UserPlus } from "./../../app/assets/all-images";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const OurServices = () => {
   const { lightingBgImg } = useContext(BgImgContext);

   // get why choose us data
   const { data: ourServicesData } = useQuery({
      queryKey: ["our_services"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <div className="relative my-12 2xl:my-20 3xl:my-24">
         <Image
            className="hidden md:block absolute left-0 md:w-48 md:-top-28 xl:w-1/3 2xl:-top-1/3 2xl:w-1/3 -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image1}`}
            width={600}
            height={1200}
            priority={true}
            alt="Blue Bg Blur"
         />
         <Image
            className="w-auto h-auto opacity-10 xl:opacity-100 absolute bottom-16 right-0 -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image2}`}
            width={95}
            height={146}
            priority={true}
            alt="card img"
         />
         <div className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-10">
            <section className="w-full max-w-[550px] mx-auto text-center ">
               <h1 className="section_heading_3xl mb-5">
                  {ourServicesData?.our_service_header?.our_service_header_head}
               </h1>
               <p className="text-base">
                  {
                     ourServicesData?.our_service_header
                        ?.our_service_header_content
                  }
               </p>
            </section>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 mt-8 xl:mt-10 z-50">
               {ourServicesData?.our_service_content?.length > 0 &&
                  ourServicesData.our_service_content.map((item, idx) => {
                     const {
                        article_id,
                        image,
                        our_service_content,
                        our_service_header,
                     } = item;
                     return (
                        <div key={idx}>
                           <CustomCardSquare
                              key={article_id}
                              bodyClasses="group p-4 text-center hover:scale-105 transition-all duration-300 ease-in-out"
                           >
                              <div className="w-16 h-16 bg-blue-primary p-3.5 rounded-full group-hover:bg-blue-secondary transition-all duration-200 ease-in-out mx-auto">
                                 <Image
                                    className="w-full h-full object-contain"
                                    src={`${imgBasePath}${image}`}
                                    width={"42"}
                                    height={"42"}
                                    priority={true}
                                    alt="card icon"
                                 />
                              </div>

                              <h2 className="my-5 section_heading_md">
                                 {our_service_header}
                              </h2>
                              <p className="text-md">{our_service_content}</p>
                           </CustomCardSquare>
                        </div>
                     );
                  })}
            </section>
         </div>
      </div>
   );
};

export default OurServices;
/* hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out */
