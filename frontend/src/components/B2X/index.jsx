"use client";
import { useQuery } from "@tanstack/react-query";
import AboutOurCompany from "../common/AboutOurCompany";
import { fetchData } from "../../libs/utils/api";

import { AboutUs } from "./../../app/assets/all-images";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import TopBanner from "../banner/TopBanner";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const AboutB2X = () => {
   // get about b2x data
   const { data: aboutB2X, isLoading } = useQuery({
      queryKey: ["b2x_loan"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={aboutB2X?.b2x_banner?.b2x_loan_banner_title}
            routeLink={"B2X (Loan)"}
            bannerSrc={`${imgBasePath}${aboutB2X?.b2x_banner?.image}`}
         />
         <AboutOurCompany
            isMultiple={false}
            // images={{ BitcoinCyan, BitcoinPurple, BitcoinRed }}
            singleImg={AboutUs}
            // subtitle={"About Our Company"}
            title={aboutB2X?.b2x_loan_content?.b2x_title}
            description={aboutB2X?.b2x_loan_content?.b2x_content}
            // descriptionTwo={`B2X is the simple, seamless way to grow your BTC holdings. This Ledn-exclusive product combines a Ledn Bitcoin-backed Loan with the purchase of an equal amount of Bitcoin. When the loan is repaid, both the collateral and the newly purchased BTC are returned to you.`}
            btnFill={aboutB2X?.b2x_loan_content?.b2x_button_one_text}
            btnOutline={aboutB2X?.b2x_loan_content?.b2x_button_two_text}
            url={
               "https://nishuelaravel.bdtask-demo.com/backend/customer/b2x-Loan"
            }
            adminImg={aboutB2X?.b2x_loan_content?.image}
         />
      </>
   );
};

export default AboutB2X;
