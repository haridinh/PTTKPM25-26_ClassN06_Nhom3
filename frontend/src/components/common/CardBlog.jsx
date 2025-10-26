import {
   CardImage1,
   CardImage2,
   CardImage3,
   CardImage4,
   CardImage5,
   CardImage6,
   CardImage7,
   CardImage9,
} from "../../app/assets/all-images";
import Image from "next/image";
import Link from "next/link";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const CardBlog = ({ data }) => {
   return (
      <section className="grid grid-co md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
         {data?.length > 0 &&
            data.map((items, index) => {
               const { blog_content, blog_title, image, article_id } = items;
               return (
                  <div
                     key={index}
                     className="bg-dark-blue2 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-min-blue"
                  >
                     <Image
                        className="w-full"
                        src={`${imgBasePath}${image}`}
                        width={600}
                        height={350}
                        loading="lazy"
                        alt="Two Star"
                     />
                     <div className="p-4 space-y-3 ">
                        <h2 className="section_heading_md">{blog_title}</h2>
                        <p className="line-clamp-2">{blog_content}</p>
                        <Link
                           href={`/blog/blog-details?article_id=${article_id}`}
                           className="group relative inline-flex items-center gap-1 pb-1 after:w-full after:h-0.5 after:absolute after:bottom-0 after:left-0 after:bg-white hover:after:bg-cyan-500"
                        >
                           <span className="group-hover:text-cyan-500">
                              {" "}
                              Details
                           </span>
                           <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 className="group-hover:fill-cyan-500"
                                 d="M12.1685 2.13245C12.2416 1.72475 11.9704 1.33495 11.5627 1.26182L4.91873 0.0701042C4.51102 -0.00302543 4.12123 0.268203 4.0481 0.67591C3.97497 1.08362 4.24619 1.47341 4.6539 1.54654L10.5596 2.60585L9.50034 8.5116C9.42721 8.9193 9.69844 9.3091 10.1061 9.38223C10.5139 9.45536 10.9037 9.18413 10.9768 8.77642L12.1685 2.13245ZM1.69351 9.68881L11.8587 2.61567L11.0019 1.38441L0.836768 8.45755L1.69351 9.68881Z"
                                 fill="white"
                              />
                           </svg>
                        </Link>
                     </div>
                  </div>
               );
            })}
      </section>
   );
};

export default CardBlog;
