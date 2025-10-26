import Image from "next/image";
import Link from "next/link";

const SliderContent = (props) => {
   const {
      title,
      description,
      imgLg,
      imgMd,
      imgSm,
      alt,
      percentContent,
      percentage,
      btnText,
      url,
   } = props;
   return (
      <>
         <div className="inner_content w-screen h-[100dvh]">
            <Image
               src={imgLg}
               alt={alt}
               width={1920}
               height={1080}
               priority={true}
               className="w-full h-full object-cover hidden lg:block"
            />
            <Image
               src={imgMd}
               alt={alt}
               width={1024}
               height={768}
               priority={true}
               className="w-full h-full object-cover hidden md:block lg:hidden"
            />
            <Image
               src={imgSm}
               alt={alt}
               width={1024}
               height={768}
               priority={true}
               className="w-full h-full object-cover md:hidden"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-5 md:max-w-md lg:max-w-3xl">
               <div
                  className={`bg-white/10 px-2 py-1 rounded-full text-white max-w-xs md:max-w-sm flex items-center ${
                     percentage === "0%" && "justify-center"
                  } gap-1.5 md:gap-3 mx-auto mb-3 2xl:mb-5`}
               >
                  {percentage !== "0%" && (
                     <span className="uppercase bg-blue-secondary px-4 py-2 rounded-full">
                        {percentage}
                     </span>
                  )}
                  <span className="text-sm md:text-lg">{percentContent}</span>
               </div>
               <h1 className="text-white text-2xl md:text-2xl lg:text-3xl 2xl:text-5xl font-semibold normal-case mb-3 2xl:mb-5">
                  {title}
               </h1>

               <p className="text-white lg:text-lg max-w-xl mx-auto mb-4">
                  {description}
               </p>

               <Link
                  className="btn_custom px-6 py-3 rounded-full text-white inline-flex items-center gap-3 mx-auto bg-blue-secondary hover:bg-blue-secondary/50 transition-all duration-300 ease-in-out"
                  href={url}
                  target="_blank"
               >
                  <span>{btnText}</span>

                  <span className="bg-white w-8 h-8  rounded-full inline-flex justify-center items-center">
                     <span className="btn_arrow w-2.5 h-2.5 rotate-45"></span>
                  </span>
               </Link>

               <div className="relative mt-6"></div>
            </div>
         </div>
      </>
   );
};

export default SliderContent;
