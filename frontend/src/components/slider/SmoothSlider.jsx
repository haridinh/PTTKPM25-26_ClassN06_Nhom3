import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Paypal } from "../../app/assets/all-images";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const SmoothSlider = ({ cardData }) => {
  return (
    <Marquee
      pauseOnHover={true}
      speed={80}
      gradient={true}
      gradientWidth={80}
      gradientColor="#01153a"
      autoFill={true}
    >
      {cardData?.length > 0 &&
        cardData.map((item, index) => {
          return (
            <div
              key={index}
              className="mx-4 w-[300px] h-[120px] bg-dark-blue2 text-white overflow-hidden rounded-md"
            >
              <Image
                className="w-full h-full object-cover"
                //  src={Paypal}
                src={`${imgBasePath}${item?.logo}`}
                width={200}
                height={100}
                alt={item?.name}
                loading="lazy"
              />
            </div>
          );
        })}
    </Marquee>
  );
};

export default SmoothSlider;
