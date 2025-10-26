"use client";

import TopBanner from "../banner/TopBanner";
import JoinNishue from "../common/JoinNishue";
import LightingComponentMedium from "../common/LightingComponentMedium";
import Team from "../common/Team";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { debounce } from "lodash";
import { BtnPrimary } from "../common/CustomModules";
import SpinnerLoader from "../customLoader/SpinnerLoader";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const TeamMembers = () => {
   // all states
   const [teamData, setTeamData] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);

   // get team data
   const { data, isLoading } = useQuery({
      queryKey: [`team_member?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   // set team members
   useEffect(() => {
      if (data) {
         if (data.team.length <= 0) {
            toast.error("No more team members available!");
            return;
         } else {
            setTeamData((prev) => ({
               ...prev,
               team: [...(prev?.team || []), ...data.team],
               totalDataRows: data.totalDataRows,
            }));
         }
      }
   }, [data]);

   if (isLoading && currentPage <= 1) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={data?.banner?.team_member_banner_title}
            routeLink="Team Member"
            bannerSrc={`${imgBasePath}${data?.banner?.image}`}
         />
         <div className="relative isolate overflow-hidden pt-8 lg:pt-12 ">
            <LightingComponentMedium />

            <div className="container_section_sm">
               <Team cardData={{ data: teamData?.team }} />
               {teamData?.team.length !== teamData?.totalDataRows && (
                  <div className="text-center my-4 md:mt-12">
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
            </div>

            <JoinNishue />
         </div>
      </>
   );
};

export default TeamMembers;
