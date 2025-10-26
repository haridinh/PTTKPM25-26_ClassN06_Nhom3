import Image from "next/image";

// import {
//    BlueBgBlur2,
//    PurpleBlur,
//    Star,
//    TwoStar,
// } from "../../app/assets/all-images";
import { BgImgContext } from "../../contexts/BgContextProvider";
import { useContext } from "react";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const LightingComponentSm = () => {
   const { lightingBgImg } = useContext(BgImgContext);

   return (
      <>
         {/* <Image
        className="hidden xl:block absolute right-0 2xl:right-8 3xl:right-12 top-[15%]"
        src={Star}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      />
      <Image
        className="hidden w-auto h-auto xl:block -z-10 absolute top-8 left-0 2xl:left-8"
        src={TwoStar}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      /> */}

         <Image
            className="hidden xl:block absolute left-0 top-[10%] -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image1}`}
            width={500}
            height={1000}
            priority={true}
            alt="Green Blur"
         />

         <Image
            className="hidden xl:block absolute right-0 -bottom-32 -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image3}`}
            width={500}
            height={1000}
            priority={true}
            alt="Green Blur"
         />
      </>
   );
};

export default LightingComponentSm;
