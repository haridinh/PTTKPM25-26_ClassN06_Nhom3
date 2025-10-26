// dependencies
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import AboutOurCompany from "../common/AboutOurCompany";
import {
  BitcoinCyan,
  BitcoinPurple,
  BitcoinRed,
} from "./../../app/assets/all-images";

const AboutCompanyHome = () => {
  // get about our company data
  const { data: aboutCompanyData, isLoading } = useQuery({
    queryKey: ["home/about"],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  return (
    <>
      <AboutOurCompany
        isMultiple={true}
        images={{ BitcoinCyan, BitcoinPurple, BitcoinRed }}
        adminImg={aboutCompanyData?.image}
        subtitle={aboutCompanyData?.about_header}
        title={aboutCompanyData?.about_title}
        description={aboutCompanyData?.about_content}
        btnFill={aboutCompanyData?.about_button_text}
        isLoading={isLoading}
        url={aboutCompanyData?.url}
      />
    </>
  );
};

export default AboutCompanyHome;
