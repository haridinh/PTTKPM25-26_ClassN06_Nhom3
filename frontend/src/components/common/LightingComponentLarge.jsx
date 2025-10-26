import Image from "next/image";

// import {
//    BlueBgBlur,
//    GreenBlur,
//    PurpleBlur,
//    // Star,
//    // TwoStar,
// } from "../../app/assets/all-images";
import { useContext } from "react";
import { BgImgContext } from "../../contexts/BgContextProvider";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const LightingComponentLarge = () => {
   const { lightingBgImg } = useContext(BgImgContext);

   return (
      <>
         {/* <Image
        className="hidden xl:block absolute right-0 2xl:right-8 3xl:right-12 top-[8%]"
        src={Star}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      />
      <Image
        className="hidden xl:block xl:w-[80px] absolute right-0 2xl:right-8 3xl:right-12 top-[52%]"
        src={TwoStar}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      />
      <Image
        className="hidden xl:block xl:w-[80px] absolute left-16 xl:left-1 top-[17%]"
        src={TwoStar}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      /> */}
         <Image
            className="hidden xl:block absolute right-0 bottom-[5%] -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image3}`}
            width={500}
            height={1000}
            priority={true}
            alt="Two Star"
         />
         {/* <Image
        className="hidden xl:block xl:w-[80px] absolute left-16 xl:left-1 bottom-[10%]"
        src={TwoStar}
        width={"auto"}
        height={"auto"}
        priority={true}
        alt="Two Star"
      /> */}
         <Image
            className="hidden xl:block absolute left-0 bottom-[10%] -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image1}`}
            width={500}
            height={1000}
            priority={true}
            alt="Green Blur"
         />
         <Image
            className="hidden xl:block absolute right-0 top-0 -z-10"
            src={`${imgBasePath}${lightingBgImg?.bg_image2}`}
            width={500}
            height={1000}
            priority={true}
            alt="Green Blur"
         />
      </>
   );
};

export default LightingComponentLarge;
