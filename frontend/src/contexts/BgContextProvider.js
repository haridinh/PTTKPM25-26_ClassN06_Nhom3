"use client";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../libs/utils/api";

export const BgImgContext = createContext();

const BgContext = (props) => {
   const { data: lightingBgImg } = useQuery({
      queryKey: ["bg_image"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   return (
      <BgImgContext.Provider
         value={{
            lightingBgImg,
         }}
      >
         {props.children}
      </BgImgContext.Provider>
   );
};

export default BgContext;
