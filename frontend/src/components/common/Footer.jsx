"use client";
import Image from "next/image";
import { BrandLogoSvg } from "../../app/assets/all-images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FollowUs from "../follow-us/FollowUs";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const Footer = () => {
  const currentPath = usePathname();

  const isActive = (path) => {
    return currentPath === path;
  };

  // get footer data
  const { data: footerNavData } = useQuery({
    queryKey: ["home/footer_menus"],
    queryFn: fetchData,
    select: (data) => {
      const updatedData = data.data.map((item, idx) => ({
        ...item,
        slug: `/${item.slug}`,
      }));

      return updatedData;
    },
  });

  const { data: logoAndSettings } = useQuery({
    queryKey: ["setting"],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  return (
    <footer className={`w-full py-4 bg-dark-blue `}>
      <nav className="container_section_sm  overflow-hidden flex items-center justify-between flex-col xl:flex-row gap-3">
        <Link className="flex items-center gap-3" href="/">
          <Image
            className="w-full"
            src={`${imgBasePath}${logoAndSettings?.logo}`}
            width={95}
            height={146}
            priority={true}
            alt="Brand Logo"
          />
          {/* <p className="text-lg font-semibold">Nishue Crypto</p> */}
        </Link>

        <ul className="flex items-center ">
          {footerNavData?.length > 0 &&
            footerNavData.map(({ slug, content, idx }) => (
              <li key={slug} className="nav_list group mx-1.5 md:mx-3">
                <Link
                  href={slug}
                  className={`${
                    isActive(slug)
                      ? "active_link"
                      : "nav_link  group-hover:after:w-2/3 group-hover:text-blue-primary group-hover:after:rounded-md"
                  }`}
                >
                  {content}
                </Link>
              </li>
            ))}
        </ul>
        {/* ======= social_section ===== */}
        <FollowUs />
      </nav>
    </footer>
  );
};

export default Footer;
