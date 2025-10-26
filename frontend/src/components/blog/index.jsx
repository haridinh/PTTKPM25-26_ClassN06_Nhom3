"use client";

import TopBanner from "../banner/TopBanner";
import LightingComponentMedium from "../common/LightingComponentMedium";
import CardBlog from "./../common/CardBlog";
import { BtnPrimary } from "../common/CustomModules";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import toast from "react-hot-toast";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const BlogMain = () => {
   // all states
   const [currentPage, setCurrentPage] = useState(1);
   const [blogData, setBlogData] = useState(null);

   // handle pagination
   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   // get blog data
   const { data, isLoading } = useQuery({
      queryKey: [`blog?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   // set blog data
   useEffect(() => {
      if (data) {
         if (data.blog_body.length <= 0) {
            toast.error("No more blogs available!");
            return;
         } else {
            setBlogData((prev) => ({
               ...prev,
               blog_body: [...(prev?.blog_body || []), ...data.blog_body],
               totalDataRows: data.totalDataRows,
            }));
         }
      }
   }, [data]);

   if (isLoading && currentPage <= 1) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={data?.blog_banner?.blog_top_banner_title}
            routeLink={"Blog"}
            bannerSrc={`${imgBasePath}${data?.blog_banner?.image}`}
         />

         <div className="relative my-8 xl:mt-12 isolate overflow-hidden">
            <LightingComponentMedium />
            <section className="container_section_sm">
               <CardBlog data={blogData?.blog_body} />
               {blogData?.blog_body.length !== blogData?.totalDataRows && (
                  <div className="text-center my-6 md:my-12">
                     <BtnPrimary onClick={handlePagination} classes={"group"}>
                        {isLoading ? "Loading..." : "Load More"}
                        {!isLoading && (
                           <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                              &#10230;
                           </span>
                        )}
                     </BtnPrimary>
                  </div>
               )}
            </section>
         </div>
      </>
   );
};

export default BlogMain;
