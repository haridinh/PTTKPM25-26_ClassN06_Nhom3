import Image from "next/image";
// import { BannerLg, BannerTab, BannerSm } from "../../app/assets/all-images";
import Link from "next/link";

const TopBanner = ({ title, routeLink, bannerSrc }) => {
   return (
      <section className="w-auto h-auto relative overflow-hidden">
         <Image
            quality={100}
            className="hidden lg:block w-full h-[300px] object-cover"
            src={bannerSrc}
            alt="Top Banner Img"
            width={1200}
            height={350}
            loading="lazy"
         />
         <Image
            quality={100}
            className="hidden md:block lg:hidden w-full h-[300px] object-cover"
            src={bannerSrc}
            alt="Top Banner Img"
            width={1200}
            height={350}
            loading="lazy"
         />
         <Image
            quality={100}
            className="block md:hidden w-full h-[300px] object-cover"
            src={bannerSrc}
            alt="Top Banner Img"
            width={1200}
            height={350}
            loading="lazy"
         />

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-6 mt-6">
            <div className="text-white text-center">
               <h2 className="section_heading_3xl mb-6">{title}</h2>
               <span className="bg-dark-blue2 p-3 rounded-md ring-1 capitalize">
                  <Link href={"/"}>Home - </Link>

                  <span className="text-blue-500">{routeLink}</span>
               </span>
            </div>
         </div>
      </section>
   );
};

export default TopBanner;
