"use client";

import { useSearchParams } from "next/navigation";
import TopBanner from "../../../../components/banner/TopBanner";
import LightingComponentLarge from "../../../../components/common/LightingComponentLarge";
import Image from "next/image";
// import FollowUs from "../../../../components/follow-us/FollowUs";
// import { BtnPrimary } from "../../../../components/common/CustomModules";
import CardBlog from "../../../../components/common/CardBlog";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../../libs/utils/api";
// import {
//    RightReseller,
//    Usr1,
//    BlogDetails as BlogDetailsImg,
// } from "../../../assets/all-images";
import SpinnerLoader from "../../../../components/customLoader/SpinnerLoader";
import Link from "next/link";
// import { convertGMTDate } from "../../../../libs/utils/dateConverter";
// import { convertGMTDate } from "../../../../libs/utils/dateConverter";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const BlogDetails = async () => {
   const searchParams = useSearchParams();
   const articleId = searchParams.get("article_id");

   const { data: blogDetailsData, isLoading } = useQuery({
      queryKey: [`blog_details?id=${articleId}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={
               blogDetailsData?.blog_details_banner
                  ?.blog_details_top_banner_title
            }
            routeLink={"Blog Details"}
            bannerSrc={`${imgBasePath}${blogDetailsData?.blog_details_banner?.image}`}
         />
         <div className="relative my-8 xl:my-16 isolate">
            <LightingComponentLarge />

            <section className="container_section_sm  my-8 lg:my-16">
               <Image
                  className="rounded-lg shadow-sm shadow-purple-400 w-full h-[500px]"
                  src={`${imgBasePath}${blogDetailsData?.blogDetails?.image}`}
                  alt="Merchant Account Image"
                  width={1080}
                  height={400}
                  loading="lazy"
               />
               <h1 className="section_heading_xl mt-8">
                  {blogDetailsData?.blogDetails?.blog_title}
               </h1>
               {/* <section className="my-6 px-6 py-8 border_bottom_purple flex md:items-center justify-between flex-col md:flex-row gap-3"> */}
               {/* <div className="flex items-center gap-4">
                     <div className="w-14 h-14 ring p-1 rounded-full overflow-hidden">
                        <Image
                           className="w-full h-full object-cover"
                           src={`${imgBasePath}${blogDetailsData?.blogDetails?.creator_info?.image}`}
                           width={200}
                           height={200}
                           loading="lazy"
                           alt="Card Image"
                        />
                     </div>
                     <div>
                        <h2 className="text-lg font-medium">
                           {blogDetailsData?.blogDetails?.creator_info
                              ?.first_name +
                              " " +
                              blogDetailsData?.blogDetails?.creator_info
                                 ?.last_name}
                        </h2>
                        <p className="text-sm">
                           {
                              blogDetailsData?.blogDetails?.creator_info
                                 ?.designation
                           }
                        </p>
                     </div>
                  </div> */}
               {/* <h2>
                     <strong>Post: </strong>{" "}
                     {convertGMTDate(blogDetailsData?.blogDetails?.date)}
                  </h2> */}
               {/* ======= social_section ===== */}
               {/* <FollowUs /> */}
               {/* </section> */}

               <section className="flex flex-col md:flex-row gap-6 lg:gap-10 my-12">
                  <div className="w-full md:w-2/3">
                     {/* <h2 className="section_heading_md mb-4">
                        What is a Merchant Account?
                     </h2> */}
                     <p>{blogDetailsData?.blogDetails?.blog_content}</p>

                     {/* <ul className="list-decimal list-inside space-y-4 mt-6 ">
                        <li>
                           Research Providers. Banks, independent sales
                           organizations (ISOs), and software providers are a
                           good place to start. Compare their fees, services,
                           customer support, and any hardware or software
                           requirements. Consider your business model,
                           transaction volume, and the types of payments you
                           want to accept.
                        </li>
                        <li>
                           Gather the Required Documents. These may vary by
                           merchant account provider, but typically include
                           business and personal identification documents,
                           business license, proof of bank account, financial
                           statements, and, for online businesses, details of
                           your website and how you plan to accept payments
                           online.
                        </li>
                     </ul> */}
                  </div>
                  <div className="w-full md:w-1/3">
                     {/* <Image
                        className="rounded-lg"
                        src={RightReseller}
                        alt="Merchant Account Image"
                        width={"auto"}
                        height={"auto"}
                     /> */}
                  </div>
               </section>
               {/* <section className="max-w-2xl mx-auto rounded-2xl flex overflow-hidden">
                  <div className=" bg-[#5236FF] w-3/5 flex justify-center items-center p-4">
                     <svg
                        width="50"
                        viewBox="0 0 68 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M11.8522 4.792C13.4949 2.56266 15.3135 1.33066 17.3082 1.09599C19.3029 0.861327 21.0042 1.27199 22.4122 2.328C23.9375 3.26666 24.7589 4.73333 24.8762 6.72799C25.1109 8.72266 24.2895 10.8347 22.4122 13.064C19.7135 16.232 17.8949 19.4 16.9562 22.568C16.0175 25.736 15.5482 28.552 15.5482 31.016L14.8442 23.976C19.5375 23.976 23.3509 25.3253 26.2842 28.024C29.2175 30.7227 30.6842 34.36 30.6842 38.936C30.6842 43.2773 29.3349 46.856 26.6362 49.672C23.9375 52.3707 20.2415 53.72 15.5482 53.72C10.7375 53.72 6.98285 52.136 4.28419 48.968C1.58552 45.6827 0.236188 41.1653 0.236188 35.416C0.236188 32.3653 0.529521 29.256 1.11619 26.088C1.70285 22.8027 2.81752 19.4587 4.46019 16.056C6.22019 12.536 8.68419 8.78133 11.8522 4.792ZM49.1642 4.792C50.8069 2.56266 52.6255 1.33066 54.6202 1.09599C56.6149 0.861327 58.3162 1.27199 59.7242 2.328C61.2495 3.26666 62.0709 4.73333 62.1882 6.72799C62.4229 8.72266 61.6015 10.8347 59.7242 13.064C57.0255 16.232 55.2069 19.4 54.2682 22.568C53.3295 25.736 52.8602 28.552 52.8602 31.016L52.1562 23.976C56.8495 23.976 60.6629 25.3253 63.5962 28.024C66.5295 30.7227 67.9962 34.36 67.9962 38.936C67.9962 43.2773 66.6469 46.856 63.9482 49.672C61.2495 52.3707 57.5535 53.72 52.8602 53.72C48.0495 53.72 44.2949 52.136 41.5962 48.968C38.8975 45.6827 37.5482 41.1653 37.5482 35.416C37.5482 32.3653 37.8415 29.256 38.4282 26.088C39.0149 22.8027 40.1295 19.4587 41.7722 16.056C43.5322 12.536 45.9962 8.78133 49.1642 4.792Z"
                           fill="white"
                        />
                     </svg>
                  </div>
                  <div className="bg-white px-4 py-8 md:px-8 md:py-12">
                     <p className="text-black">
                        There are many variations of passages of Lorem Ipsum
                        available but the majority have sufferg alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage.
                     </p>
                  </div>
               </section> */}
               {/* <section className="mt-12 border_bottom pb-4">
                  <h2 className="section_heading_md mb-4">
                     What is your favorite productivity Saas?
                  </h2>
                  <p>
                     you are going to use a passage of Lorem Ipsum, you need to
                     be sure there isn't embarrassing hidden in the middle of
                     text. All the Lorem Ipsum generators on the Internet tend
                     to repeat predefined chunks as necessary, making this the
                     first true generator on the Internet. you are going to use
                     a passage of Lorem Ipsum, you need to be sure there isn't
                     embarrassing hidden in the middle of text. All the Lorem
                     Ipsum generators on the Internet tend to repeat predefined
                     chunks as necessary, making this the first true generator
                     on the Internet.{" "}
                  </p>
               </section> */}
               <section>
                  <div className=" my-12 flex justify-between items-center">
                     <h2 className="section_heading_md">Related Blog</h2>

                     <Link href="/blog" className="group btn_primary">
                        Browse All Post
                        <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                           &#10230;
                        </span>
                     </Link>
                  </div>
                  {blogDetailsData?.relatedBlogs.length > 0 && (
                     <section className="container_section_lg">
                        <CardBlog data={blogDetailsData.relatedBlogs} />
                        {/* {blogData?.blog_body.length !==
                           blogData?.totalDataRows && (
                           <div className="text-center my-6 md:my-12">
                              <BtnPrimary
                                 onClick={handlePagination}
                                 classes={"group"}
                              >
                                 {isLoading ? "Loading..." : "Load More"}
                                 {!isLoading && (
                                    <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                                       &#10230;
                                    </span>
                                 )}
                              </BtnPrimary>
                           </div>
                        )} */}
                     </section>
                  )}
               </section>
            </section>
         </div>
      </>
   );
};

export default BlogDetails;
