'use client';
import Image from 'next/image';
import { CustomCardSquare } from './CustomModules';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../libs/utils/api';
import {
   AboutUs,
   UserPlus,
   SecurityProtected,
   Support,
} from './../../app/assets/all-images';

const OurRates = () => {
   // get our rates
   const { data: ourRates } = useQuery({
      queryKey: ['our_rates'],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <div className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-10">
         <section className="w-full max-w-[470px] mx-auto text-center ">
            <h1 className="section_heading_xl mb-3">
               {ourRates?.our_rate_header?.our_rates_header_title}
            </h1>
            <p className="text-sm">
               {ourRates?.our_rate_header?.our_rates_header_content}
            </p>
         </section>
         <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 mt-8 xl:mt-10 z-50">
            {ourRates?.our_rate_content?.length > 0 &&
               ourRates.our_rate_content.map((item, index) => {
                  const {
                     our_rate_content_body,
                     our_rate_content_title,
                     article_id,
                  } = item;
                  return (
                     <CustomCardSquare
                        key={index}
                        bodyClasses="px-4 py-12 text-center"
                     >
                        {item.img && (
                           <div className="w-16 h-16 bg-blue-primary p-3.5 rounded-full hover:bg-blue-secondary transition-all duration-200 ease-in-out mx-auto">
                              <Image
                                 className="w-full h-full object-contain"
                                 src={img}
                                 width={'42'}
                                 height={'42'}
                                 priority={true}
                                 alt="card icon"
                              />
                           </div>
                        )}

                        <h2 className="my-3 section_heading_md">
                           {our_rate_content_title}
                        </h2>
                        <p className="text-md">{our_rate_content_body}</p>
                     </CustomCardSquare>
                  );
               })}
         </section>
      </div>
   );
};

export default OurRates;
