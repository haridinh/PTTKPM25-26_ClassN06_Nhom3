import { useMemo } from "react";

export function useBaseUrl() {
   const baseUrl = useMemo(() => {
      if (typeof window !== "undefined") {
         const origin = window.location.origin;

         return origin;
      }
   }, []);

   return baseUrl;
}
