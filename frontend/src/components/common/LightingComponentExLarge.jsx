import Image from "next/image";

import {
   BitBlackBlurL,
   BitBlackBlurR,
   BlueBgBlur,
   PurpleBlur,
   TwoStar,
} from "../../app/assets/all-images";
// import { useQuery } from "@tanstack/react-query";
// import { fetchData } from "../../libs/utils/api";

const LightingComponentExLarge = () => {
   return (
      <>
         <Image
            className="hidden xl:block w-auto h-auto -z-10 opacity-10 xl:opacity-100 absolute top-1 right-0 xl:right-10 2xl:right-20"
            src={TwoStar}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="card img"
         />
         <Image
            className="hidden xl:block w-auto h-auto -z-10 opacity-10 xl:opacity-100 absolute top-[10%] left-0 xl:left-4 2xl:left-12"
            src={TwoStar}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="card img"
         />
         <Image
            className="hidden xl:block w-auto h-auto opacity-10 xl:opacity-100 absolute top-16 left-0 "
            src={BitBlackBlurL}
            width={95}
            height={146}
            priority={true}
            alt="card img"
         />
         <Image
            className="hidden xl:block w-auto h-auto opacity-10 xl:opacity-100 absolute top-[8%] right-0 "
            src={BitBlackBlurR}
            width={80}
            height={146}
            priority={true}
            alt="card img"
         />

         <Image
            className="hidden xl:block absolute left-0 bottom-[5%] -z-10"
            src={BlueBgBlur}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="Green Blur"
         />

         <Image
            className="hidden xl:block absolute right-0 -bottom-32 -z-10"
            src={PurpleBlur}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="Green Blur"
         />
         <Image
            className="hidden xl:block w-auto h-auto -z-10 opacity-10 xl:opacity-100 absolute bottom-[2%] left-0 xl:left-4 2xl:left-12"
            src={TwoStar}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="card img"
         />
         <Image
            className="hidden xl:block w-auto h-auto -z-10 opacity-10 xl:opacity-100 absolute bottom-[18%] right-0 xl:right-10 2xl:right-20"
            src={TwoStar}
            width={"auto"}
            height={"auto"}
            priority={true}
            alt="card img"
         />
      </>
   );
};

export default LightingComponentExLarge;
