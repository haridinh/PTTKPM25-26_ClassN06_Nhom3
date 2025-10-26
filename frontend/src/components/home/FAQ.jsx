"use client";

import { useQuery } from "@tanstack/react-query";
import AccordingStyle from "./../common/AccordingStyle";
import { fetchData } from "../../libs/utils/api";
const FAQ = () => {
   // get faq data
   const { data: faqData } = useQuery({
      queryKey: ["home/faq"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <div className="container_section_sm my-12 2xl:my-20 3xl:my-24 z-[100]">
         <section className="w-full max-w-3xl mx-auto text-center px-2">
            <h1 className="section_heading_3xl mb-5">
               {faqData?.faq_header?.faq_header_title}
            </h1>
            <p className="text-base max-w-xl mx-auto">
               {faqData?.faq_header?.faq_header_content}
            </p>
         </section>
         <AccordingStyle data={faqData?.faq_body} />
      </div>
   );
};

export default FAQ;
