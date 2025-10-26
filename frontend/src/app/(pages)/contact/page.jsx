"use client";
import TopBanner from "../../../components/banner/TopBanner";
// import { BtnPrimary } from "../../../components/common/CustomModules";
import JoinNishue from "../../../components/common/JoinNishue";
import Image from "next/image";
import {
   // LocationPink,
   // LocationYellow,
   LocationGreen,
} from "../../assets/all-images";
import ContactForm from "../../../components/contact/contact-form";

import LightingComponentMedium from "./../../../components/common/LightingComponentMedium";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../libs/utils/api";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const Contact = () => {
   const { data: contactData } = useQuery({
      queryKey: ["contact_us"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   const { data: settingData } = useQuery({
      queryKey: ["setting"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <>
         <TopBanner
            title={
               contactData?.contact_us_banner?.[0]?.contact_us_top_banner_title
            }
            routeLink={"Contact Us"}
            bannerSrc={`${imgBasePath}${contactData?.contact_us_banner?.[0]?.image}`}
         />
         <div className="relative overflow-hidden">
            <LightingComponentMedium />

            <section className="container_section_sm">
               {/* Get in touch */}
               <section className="my-8 lg:my-12">
                  <h1 className="section_heading_xl max-w-sm mx-auto text-center">
                     {
                        contactData?.contact_us_banner?.[0]
                           ?.contact_us_top_banner_title
                     }
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 lg:px-16">
                     <div className="flex justify-between items-center bg-dark-blue2 p-4 xl:p-5 rounded-3xl">
                        <div className="flex items-center gap-3">
                           <div className="bg-blue-500 rounded-2xl w-16 h-16 flex justify-center items-center">
                              <svg
                                 width="45"
                                 height="38"
                                 viewBox="0 0 45 38"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M0 13L22.5 21.6207L45 13V28C45 33.5228 40.5228 38 35 38H10C4.47715 38 0 33.5228 0 28V13Z"
                                    fill="#75C5FF"
                                 />
                                 <path
                                    d="M0 10C0 4.47715 4.47715 0 10 0H35C40.5228 0 45 4.47715 45 10V10.3636L22.5 19L0 10.3636V10Z"
                                    fill="white"
                                 />
                              </svg>
                           </div>
                           <span>Mail Us</span>
                        </div>
                        <p>{settingData?.email}</p>
                     </div>
                     <div className="flex justify-between items-center bg-dark-blue2 p-4 xl:p-5 rounded-3xl">
                        <div className="flex items-center gap-3">
                           <div className="bg-blue-700 rounded-2xl w-16 h-16 flex justify-center items-center">
                              <svg
                                 width="41"
                                 height="39"
                                 viewBox="0 0 41 39"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M0.0698572 9.01582C0.083863 9.09442 0.0952011 9.17302 0.0998697 9.25227C0.159228 10.2695 0.928214 18.3854 10.5962 28.2673C10.5962 28.2673 18.9477 36.7782 27.7374 38.5676C27.7754 38.5755 27.8128 38.584 27.8508 38.5945C28.383 38.7392 32.9075 39.8828 35.2398 37.5439L38.5626 34.2807C38.5926 34.2512 38.6239 34.2224 38.6559 34.1949C38.9874 33.91 41.295 31.778 38.9867 29.5111C36.6504 27.2167 33.7052 24.4192 33.3717 24.1022C33.3557 24.0871 33.3404 24.0721 33.3251 24.0563C33.1443 23.8716 31.4276 22.2106 29.4168 23.7282C29.3587 23.7721 29.304 23.8212 29.252 23.8723L25.9987 27.0758C25.2697 27.7668 24.1119 27.7577 23.3936 27.0555L12.2789 16.1821C11.5326 15.4517 11.552 14.259 12.3216 13.5523L14.9227 11.1655C14.9227 11.1655 17.7726 8.57436 14.712 5.77559L10.1687 1.31381C10.1407 1.2863 10.114 1.25813 10.0874 1.22866C9.79391 0.903783 7.61634 -1.32056 5.06127 1.1553C4.98324 1.23062 4.89854 1.29874 4.8085 1.359C3.94147 1.94325 -0.615095 5.20772 0.0698572 9.01582Z"
                                    fill="white"
                                 />
                                 <path
                                    d="M30.6918 16.9644C31.3955 16.9641 31.9749 16.3905 31.8752 15.6939C31.7522 14.8338 31.5049 13.9938 31.1392 13.2006C30.5953 12.0206 29.8022 10.9724 28.8146 10.128C27.827 9.28358 26.6683 8.66304 25.4181 8.309C24.5778 8.07103 23.7096 7.95726 22.8407 7.96935C22.1371 7.97913 21.6606 8.6406 21.7695 9.3358C21.8785 10.031 22.5338 10.4929 23.2369 10.5224C23.7387 10.5435 24.2378 10.6232 24.7238 10.7608C25.62 11.0146 26.4507 11.4595 27.1586 12.0648C27.8666 12.6701 28.4351 13.4215 28.825 14.2674C29.0365 14.7262 29.1928 15.2069 29.2916 15.6993C29.43 16.3892 29.9881 16.9648 30.6918 16.9644Z"
                                    fill="#F9A1E5"
                                 />
                                 <path
                                    d="M35.9551 17.109C36.8027 17.1753 37.553 16.5404 37.5213 15.6908C37.4636 14.1455 37.1377 12.618 36.5541 11.1776C35.7772 9.26025 34.5652 7.5498 33.0137 6.18137C31.4623 4.81293 29.6139 3.82398 27.6146 3.29264C26.1125 2.89347 24.5563 2.76079 23.0159 2.89657C22.169 2.97122 21.6327 3.79483 21.8044 4.62752C21.9761 5.4602 22.7916 5.98373 23.6405 5.93843C24.7092 5.8814 25.7834 5.99169 26.8238 6.26817C28.3618 6.67691 29.7837 7.43766 30.9772 8.49034C32.1706 9.54302 33.103 10.8588 33.7006 12.3337C34.1048 13.3314 34.3484 14.3835 34.4252 15.4509C34.4863 16.2989 35.1075 17.0426 35.9551 17.109Z"
                                    fill="#F9A1E5"
                                 />
                              </svg>
                           </div>
                           <span>Call Us</span>
                        </div>
                        <p> {settingData?.phone} </p>
                     </div>
                  </div>
               </section>
               {/* Contact Form */}
               <ContactForm />
               {/* Location & Address */}
               <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 mt-8 xl:mt-10 z-50">
                  {contactData?.contact_address.length > 0 &&
                     contactData.contact_address.map(
                        ({
                           contact_address_contact,
                           contact_address_location,
                           contact_address_place,
                           index,
                        }) => {
                           return (
                              <div
                                 key={index}
                                 className="bg-dark-blue px-4 py-10 rounded-2xl hover:shadow-lg hover:shadow-cyan-700 text-center space-y-3 transition-all duration-300 ease-in-out"
                              >
                                 <div className="flex justify-center items-center">
                                    <Image
                                       src={LocationGreen}
                                       width={"auto"}
                                       height={"auto"}
                                       priority={true}
                                       alt="card icon"
                                    />
                                 </div>

                                 <h2 className="my-3 section_heading_md capitalize">
                                    {contact_address_place}
                                 </h2>
                                 <p className="text-md ">
                                    {contact_address_location}
                                 </p>
                                 <p
                                    className={
                                       (location === "Paris" &&
                                          `bg-pink-200 text-pink-700 px-6 py-3 rounded-full inline-block`) ||
                                       (location === "New York" &&
                                          `bg-yellow-200 text-yellow-700 px-6 py-3 rounded-full inline-block`) ||
                                       (location === "Hanoi" &&
                                          `bg-green-200 text-green-700 px-6 py-3 rounded-full inline-block`)
                                    }
                                 >
                                    {contact_address_contact}
                                 </p>
                              </div>
                           );
                        }
                     )}
               </section>
            </section>
            <JoinNishue />
         </div>
      </>
   );
};

export default Contact;
