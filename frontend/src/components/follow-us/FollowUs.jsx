"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import Link from "next/link";
import Image from "next/image";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const FollowUs = () => {
  // get social links
  const { data: socialLinks } = useQuery({
    queryKey: ["home/social_icon"],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  return (
    <div className="flex items-center gap-4">
      <span className="">Follow us :</span>
      {socialLinks?.length > 0 &&
        socialLinks.map((item, idx) => (
          <Link
            key={idx}
            aria-label={item?.name}
            href={item?.url}
            target="_blank"
            className="group"
          >
            {/* <svg
                     width="30"
                     height="30"
                     viewBox="0 0 30 30"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        className="group-hover:fill-social-facebook transition-all duration-300 ease-in-out"
                        d="M16.6107 25.2V16.4426H19.7936L20.2712 13.0287H16.6107V10.8494C16.6107 9.86131 16.9067 9.18793 18.4434 9.18793L20.4 9.18719V6.13366C20.0616 6.09307 18.9001 6 17.5482 6C14.7252 6 12.7926 7.59069 12.7926 10.5113V13.0287H9.60001V16.4426H12.7926V25.2H16.6107Z"
                        fill="white"
                     />
                     <circle
                        cx="15"
                        cy="15"
                        r="14.5"
                        stroke="white"
                        className="group-hover:stroke-social-facebook transition-all duration-300 ease-in-out"
                     />
                  </svg> */}
            <Image
              src={`${imgBasePath}${item?.image}`}
              width={30}
              height={30}
              loading="lazy"
              alt="socialLinks"
            />
          </Link>
        ))}
      {/* <Link
            aria-label="instagram"
            href={'/settings?.instagram_url'}
            target="_blank"
            className="group"
         >
            <svg
               width="30"
               height="30"
               viewBox="0 0 30 30"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  className="group-hover:fill-social-instragram transition-all duration-300 ease-in-out"
                  d="M23.1371 11.6292C23.0988 10.7597 22.9582 10.1619 22.7568 9.64398C22.549 9.09418 22.2293 8.60194 21.8105 8.19274C21.4013 7.77718 20.9058 7.45427 20.3624 7.24973C19.8414 7.04832 19.2468 6.90771 18.3773 6.86938C17.5014 6.8278 17.2233 6.81818 15.0016 6.81818C12.7799 6.81818 12.5019 6.8278 11.6291 6.86613C10.7597 6.90447 10.1619 7.04519 9.6441 7.24648C9.09417 7.45427 8.60194 7.77393 8.19274 8.19274C7.77717 8.60194 7.45439 9.09742 7.24972 9.64085C7.04831 10.1619 6.90771 10.7564 6.86937 11.6259C6.82779 12.5019 6.81818 12.7799 6.81818 15.0016C6.81818 17.2233 6.82779 17.5014 6.86613 18.3741C6.90446 19.2436 7.04519 19.8413 7.2466 20.3593C7.45439 20.9091 7.77717 21.4013 8.19274 21.8105C8.60194 22.2261 9.09742 22.549 9.64085 22.7535C10.1619 22.9549 10.7564 23.0955 11.626 23.1339C12.4986 23.1723 12.7768 23.1818 14.9985 23.1818C17.2202 23.1818 17.4983 23.1723 18.371 23.1339C19.2404 23.0955 19.8382 22.9549 20.356 22.7535C21.4557 22.3283 22.3252 21.4589 22.7504 20.3593C22.9517 19.8382 23.0924 19.2436 23.1307 18.3741C23.1691 17.5014 23.1787 17.2233 23.1787 15.0016C23.1787 12.7799 23.1754 12.5019 23.1371 11.6292ZM21.6635 18.3102C21.6283 19.1093 21.4941 19.5409 21.3822 19.8286C21.1072 20.5415 20.5415 21.1072 19.8286 21.3822C19.5409 21.4941 19.1062 21.6283 18.3102 21.6634C17.4471 21.7019 17.1882 21.7114 15.0049 21.7114C12.8215 21.7114 12.5594 21.7019 11.6994 21.6634C10.9003 21.6283 10.4687 21.4941 10.181 21.3822C9.82628 21.2511 9.50337 21.0433 9.24127 20.7716C8.96955 20.5062 8.76177 20.1866 8.63066 19.8318C8.51877 19.5441 8.38454 19.1093 8.34945 18.3134C8.31099 17.4503 8.3015 17.1913 8.3015 15.008C8.3015 12.8246 8.31099 12.5625 8.34945 11.7027C8.38454 10.9035 8.51877 10.472 8.63066 10.1843C8.76177 9.82941 8.96955 9.50662 9.24451 9.24439C9.50974 8.97268 9.8294 8.7649 10.1843 8.63391C10.472 8.52202 10.9068 8.38779 11.7027 8.35258C12.5658 8.31424 12.8248 8.30463 15.008 8.30463C17.1946 8.30463 17.4534 8.31424 18.3134 8.35258C19.1126 8.38779 19.5441 8.52202 19.8318 8.63391C20.1866 8.7649 20.5095 8.97268 20.7716 9.24439C21.0433 9.50974 21.2511 9.82941 21.3822 10.1843C21.4941 10.472 21.6283 10.9067 21.6635 11.7027C21.7019 12.5658 21.7115 12.8246 21.7115 15.008C21.7115 17.1913 21.7019 17.4471 21.6635 18.3102Z"
                  fill="white"
               />
               <path
                  className="group-hover:fill-social-instragram transition-all duration-300 ease-in-out"
                  d="M15.0017 10.798C12.681 10.798 10.7981 12.6808 10.7981 15.0016C10.7981 17.3224 12.681 19.2052 15.0017 19.2052C17.3225 19.2052 19.2053 17.3224 19.2053 15.0016C19.2053 12.6808 17.3225 10.798 15.0017 10.798ZM15.0017 17.7284C13.4961 17.7284 12.2749 16.5073 12.2749 15.0016C12.2749 13.4959 13.4961 12.2748 15.0017 12.2748C16.5073 12.2748 17.7284 13.4959 17.7284 15.0016C17.7284 16.5073 16.5073 17.7284 15.0017 17.7284Z"
                  fill="white"
               />
               <path
                  className="group-hover:fill-social-instragram transition-all duration-300 ease-in-out"
                  d="M20.3529 10.6318C20.3529 11.1737 19.9135 11.6132 19.3714 11.6132C18.8295 11.6132 18.39 11.1737 18.39 10.6318C18.39 10.0898 18.8295 9.65047 19.3714 9.65047C19.9135 9.65047 20.3529 10.0898 20.3529 10.6318Z"
                  fill="white"
               />
               <circle
                  cx="15"
                  cy="15"
                  r="14.5"
                  stroke="white"
                  className="group-hover:stroke-social-instragram transition-all duration-300 ease-in-out"
               />
            </svg>
         </Link> */}

      {/* <Link
            aria-label="linkedin"
            href={'/linkedin_url'}
            target="_blank"
            className="group"
         >
            <svg
               width="30"
               height="30"
               viewBox="0 0 30 30"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  className="group-hover:fill-social-linkedin transition-all duration-300 ease-in-out"
                  d="M23.1818 21.8182V16.3244C23.1818 13.6244 22.6006 11.5619 19.4506 11.5619C17.9318 11.5619 16.9193 12.3869 16.5068 13.1744H16.4693V11.8057H13.4881V21.8182H16.6006V16.8494C16.6006 15.5369 16.8443 14.2807 18.4568 14.2807C20.0506 14.2807 20.0693 15.7619 20.0693 16.9244V21.7994H23.1818V21.8182Z"
                  fill="white"
               />
               <path
                  className="group-hover:fill-social-linkedin transition-all duration-300 ease-in-out"
                  d="M8.42549 11.8057H11.538V21.8182H8.42549V11.8057Z"
                  fill="white"
               />
               <path
                  className="group-hover:fill-social-linkedin transition-all duration-300 ease-in-out"
                  d="M9.98181 6.81818C8.98806 6.81818 8.18181 7.62443 8.18181 8.61818C8.18181 9.61193 8.98806 10.4369 9.98181 10.4369C10.9756 10.4369 11.7818 9.61193 11.7818 8.61818C11.7818 7.62443 10.9756 6.81818 9.98181 6.81818Z"
                  fill="white"
               />
               <circle
                  cx="15"
                  cy="15"
                  r="14.5"
                  stroke="white"
                  className="group-hover:stroke-social-linkedin transition-all duration-300 ease-in-out"
               />
            </svg>
         </Link> */}
    </div>
  );
};

export default FollowUs;
