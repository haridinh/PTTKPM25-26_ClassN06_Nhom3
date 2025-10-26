"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import TopBanner from "../banner/TopBanner";
import LightingComponentLarge from "../common/LightingComponentLarge";
import AboutOurCompany from "../common/AboutOurCompany";
import Team2 from "../common/Team2";
import FAQ from "../home/FAQ";
import JoinNishue from "../common/JoinNishue";
import { AboutUs } from "../../app/assets/all-images";
import SpinnerLoader from "../customLoader/SpinnerLoader";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const AboutMain = () => {
   // get about page data
   const { data: aboutData, isLoading } = useQuery({
      queryKey: ["about"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={aboutData?.about_banner?.about_us_banner_title}
            routeLink="About Us"
            bannerSrc={`${imgBasePath}${aboutData?.about_banner?.image}`}
         />
         <div className="relative isolate overflow-hidden">
            <LightingComponentLarge />

            <AboutOurCompany
               isMultiple={false}
               // images={{ BitcoinCyan, BitcoinPurple, BitcoinRed }}
               singleImg={AboutUs}
               subtitle={aboutData?.about_content?.about_header}
               title={aboutData?.about_content?.about_title}
               description={aboutData?.about_content?.about_content}
               btnFill={aboutData?.about_content?.about_button_text}
               // btnOutline={"Try the loan calculator"}
               adminImg={aboutData?.about_content?.image}
            />

            <section className="container_section_sm my-8 lg:mt-16">
               <section className="w-full max-w-[500px] mx-auto text-center mb-8">
                  <h1 className="section_heading_xl mb-3">
                     {aboutData?.team_header?.team_header_title}
                  </h1>
                  <p className="text-sm">
                     {aboutData?.team_header?.team_header_content}
                  </p>
               </section>
               <Team2 cardData={aboutData?.team} />
            </section>
            <FAQ />

            <JoinNishue />
         </div>
      </>
   );
};

export default AboutMain;
