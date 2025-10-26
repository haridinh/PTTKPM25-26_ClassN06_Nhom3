import Image from "next/image";
import LoadingAnimation from "./LoadingAnimation";
import { BtnPrimary, BtnPrimaryOutline, CustomCard } from "./CustomModules";
import SpinnerLoader from "./../customLoader/SpinnerLoader";
import Link from "next/link";
import { useBaseUrl } from "../../libs/customHooks/getBaseUrl";

// media base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const AboutOurCompany = ({
   images,
   isMultiple,
   singleImg,
   subtitle,
   title,
   description,
   descriptionTwo,
   btnOutline,
   btnFill,
   isLoading,
   url,
   adminImg,
}) => {
   const baseURl = useBaseUrl();
   if (isLoading) return <SpinnerLoader />;

   return (
      <section className="container_section_sm my-12 2xl:my-20">
         <div className="grid md:grid-cols-2 items-center md:gap-8 xl:gap-16  space-y-6">
            {!isLoading && !adminImg && (
               <>
                  {isMultiple ? (
                     <CustomCard bodyClasses="px-6 py-8 2xl:py-16">
                        <div className="space-y-8 3xl:space-y-12">
                           <div className="flex justify-center">
                              <LoadingAnimation />
                           </div>

                           <div className="grid grid-cols-3 gap-4">
                              <Image
                                 src={images?.BitcoinPurple}
                                 priority={true}
                                 width={300}
                                 height={300}
                                 alt="card img"
                              />

                              <Image
                                 src={images?.BitcoinRed}
                                 priority={true}
                                 width={300}
                                 height={300}
                                 alt="card img"
                              />

                              <Image
                                 src={images?.BitcoinCyan}
                                 priority={true}
                                 width={300}
                                 height={300}
                                 alt="card img"
                              />
                           </div>
                        </div>
                     </CustomCard>
                  ) : (
                     <Image
                        className="rounded-5xl"
                        src={singleImg}
                        priority={true}
                        width={"auto"}
                        height={"auto"}
                        alt="card img"
                     />
                  )}
               </>
            )}

            {!isLoading && adminImg && (
               <Image
                  className="rounded-5xl w-full h-full object-cover"
                  src={`${imgBasePath}${adminImg}`}
                  priority={true}
                  width={500}
                  height={500}
                  alt="card img"
               />
            )}

            <div className="right_section space-y-4 2xl:space-y-8">
               {subtitle && <span>{subtitle}</span>}
               {title && <h1 className="section_heading_3xl">{title}</h1>}
               {description && <p>{description}</p>}
               {descriptionTwo && <p>{descriptionTwo}</p>}

               <div className="flex flex-col lg:flex-row gap-3">
                  <div>
                     {baseURl && btnFill && (
                        <Link
                           href={`${baseURl}/backend/customer/login`}
                           target="_blank"
                        >
                           <BtnPrimary>{btnFill}</BtnPrimary>
                        </Link>
                     )}
                  </div>
                  <div>
                     {btnOutline && (
                        <Link href="#btx_calculator">
                           <BtnPrimaryOutline classes={"px-6 py-3"}>
                              {btnOutline}
                           </BtnPrimaryOutline>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AboutOurCompany;
