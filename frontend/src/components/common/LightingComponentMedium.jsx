import Image from "next/image";

// import {
//    BlueBgBlur,
//    PurpleBlur,
//    Star,
//    TwoStar,
// } from "../../app/assets/all-images";
import { BgImgContext } from "../../contexts/BgContextProvider";
import { useContext } from "react";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const LightingComponentMedium = () => {
   const { lightingBgImg } = useContext(BgImgContext);

   return (
      <>
         {/* <Image
        className="hidden xl:block absolute right-0 2xl:right-8 3xl:right-12 top-[5%] -z-10"
        src={Star}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Star"
      />
      <Image
        className="hidden xl:block xl:w-[80px] absolute left-16 xl:left-1 top-[10%] -z-10"
        src={TwoStar}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      /> */}

         {/* <Image
            className="hidden xl:block xl:w-[80px] absolute left-16 xl:left-1 bottom-[10%] -z-10"
            src={TwoStar}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="Two Star"
         /> */}
         <Image
            className="hidden xl:block absolute left-0 bottom-[10%]  -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image1}`}
            width={500}
            height={1000}
            priority={true}
            alt="Blue Bg Blur"
         />
         <Image
            className="hidden xl:block absolute right-0 bottom-[3%] -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image3}`}
            width={500}
            height={1000}
            priority={true}
            alt="Purple Blur"
         />
      </>
   );
};

export default LightingComponentMedium;
