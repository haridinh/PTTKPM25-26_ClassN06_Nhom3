"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {
   EffectCreative,
   Autoplay,
   Pagination,
   Navigation,
} from "swiper/modules";
import SliderContent from "./SliderContent";
import {
   SliderOne,
   SliderTwo,
   SliderThree,
   SliderFour,
   SliderMd1,
   SliderMd2,
   SliderMd3,
   SliderSm1,
   SliderSm2,
   SliderSm3,
} from "../../app/assets/all-images";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const HomeTopSlider = () => {
   // get slider data
   const {
      data: sliderItems,
      isLoading,
      isError,
      error,
   } = useQuery({
      queryKey: ["home/slider"],
      queryFn: fetchData,
      select: (data) => {
         const updatedData = data?.data?.map((item) => {
            const splittedTitle =
               item?.home_slider_title?.split("%") || item.home_slider_title;
            const percentValue =
               splittedTitle.length === 2 ? `${splittedTitle[0]}%` : "0%";
            const updated_home_slider_title =
               splittedTitle.length > 1
                  ? splittedTitle[1].trim()
                  : splittedTitle[0].trim();
            return {
               ...item,
               home_slider_title: updated_home_slider_title,
               home_slider_percent: percentValue,
            };
         });

         return updatedData;
      },
   });

   return (
      <>
         <div
            id="home_top_slider"
            className="full_width_slider relative overflow-hidden"
         >
            <Swiper
               grabCursor={true}
               effect={"creative"}
               creativeEffect={{
                  prev: {
                     /* ======== Style One ======= */
                     shadow: true,
                     translate: [0, 0, -400],
                     /* ======== Style Two ======= */
                     // translate: ["-125%", 0, -800],
                     // rotate: [0, 0, -90],
                  },
                  next: {
                     /* ======== Style One ======= */
                     translate: ["100%", 0, 0],
                     /* ======== Style Two ======= */
                     // shadow: true,
                     // translate: ["125%", 0, -800],
                     // rotate: [0, 0, 90],
                  },
               }}
               autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               navigation={{
                  prevEl: ".swiper_button_prev",
                  nextEl: ".swiper_button_next",
                  clickable: true,
               }}
               modules={[EffectCreative, Autoplay, Pagination, Navigation]}
               className={"relative isolate"}
            >
               <button
                  aria-label="slider"
                  type="button"
                  className="swiper_button_prev disabled:opacity-30 rounded-full absolute z-10 border border-whiten top-1/2 -translate-y-1/2 left-2 lg:left-auto lg:right-16 lg:top-auto lg:bottom-5 xl:right-20 hidden md:block"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="40"
                     height="40"
                     viewBox="0 0 20 20"
                     fill="none"
                  >
                     <path
                        d="M13.1,13.9L9.2,10l3.9-3.8L11.9,5l-5,5l5,5L13.1,13.9z"
                        fill="#ddd"
                     />
                  </svg>
               </button>
               <button
                  aria-label="slider"
                  type="button"
                  className="swiper_button_next disabled:opacity-30 rounded-full absolute z-10 border border-whiten lg:bottom-5 right-2 lg:top-auto top-1/2 -translate-y-1/2 xl:right-6 hidden md:block"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="40"
                     height="40"
                     viewBox="0 0 20 20"
                     fill="none"
                  >
                     <path
                        d="M6.7168 13.55L10.5501 9.71667L6.7168 5.88334L7.88346 4.71667L12.8835 9.71667L7.88346 14.7167L6.7168 13.55Z"
                        fill="#ddd"
                     />
                  </svg>
               </button>
               {sliderItems?.length > 0 &&
                  sliderItems.map((item) => {
                     return (
                        <SwiperSlide key={item?.article_id}>
                           <SliderContent
                              key={item?.article_id}
                              imgLg={`${imgBasePath}${item?.image}`}
                              imgMd={`${imgBasePath}${item?.image}`}
                              imgSm={`${imgBasePath}${item?.image}`}
                              alt={"Slider Image"}
                              percentage={item?.home_slider_percent}
                              percentContent={item?.home_slider_title}
                              title={item?.home_slider_header}
                              description={item?.home_slider_para}
                              btnText={item?.home_slider_button_text}
                              url={item?.url}
                           />
                        </SwiperSlide>
                     );
                  })}
            </Swiper>
         </div>
         {/* Scroll Down */}
         <section className="scroll_down_wrapper absolute left-1/2 -translate-x-1/2 bottom-24 z-10 text-center">
            <button
               onClick={() => {
                  const element = document.getElementById("home_top_slider");

                  element &&
                     window.scrollTo({
                        top: element.scrollHeight - 60,
                        left: 0,
                        behavior: "smooth",
                     });
               }}
               type="button"
               aria-label="Scroll Down"
               className="scroll_down_button flex justify-center flex-col items-center gap-1 mx-auto"
            >
               <span className="m_scroll_arrows arrow_top"></span>
               <span className="m_scroll_arrows arrow_middle"></span>
               <span className="m_scroll_arrows arrow_botttom"></span>
            </button>
            {/* <p className="text tracking-[6px] text-dark-light text-center">
          Scroll
        </p> */}
         </section>
      </>
   );
};

export default HomeTopSlider;
/* 



*/
