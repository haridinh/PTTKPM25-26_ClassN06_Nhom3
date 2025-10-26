import Image from "next/image";
import { Bit2, GlueLight } from "../../app/assets/all-images";

const LightingComponentLogin = () => {
  return (
    <>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2  w-full h-24 -z-10">
        <Image
          width={"auto"}
          height={"auto"}
          className=""
          src={GlueLight}
          alt="Logo"
        />
      </div>

      <svg
        className="absolute bottom-4 right-4 md:right-8"
        width="30"
        height="30"
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53 26.4811C42.6041 27.4255 36.6312 28.2944 32.9643 31.1654C28.6548 34.5274 27.6341 40.685 26.5 53C25.3281 40.2316 24.2696 34.1119 19.5442 30.8254C15.8773 28.2566 9.94223 27.4255 0 26.5189C10.3581 25.5745 16.3688 24.7056 19.9979 21.8724C24.3452 18.4726 25.3659 12.3528 26.5 0C27.5585 11.3706 28.5036 17.4526 32.0193 20.9658C35.535 24.479 41.6591 25.4612 53 26.4811Z"
          fill="white"
        />
      </svg>

      <svg
        className="absolute top-2 left-2"
        width="32"
        height="32"
        viewBox="0 0 38 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.4794 0C23.9762 8.5275 21.4881 12.78 18.9794 12.78C16.4708 12.78 13.9827 8.5275 9.5 0C13.9827 8.5275 16.1212 13.0275 14.8669 15.39C13.6126 17.7525 8.98593 18 0 18C9.31493 18 13.9416 18.2475 14.9903 20.8575C15.9773 23.2875 13.8387 27.765 9.5 36C14.0032 27.4725 16.4913 23.22 19 23.22C21.5087 23.22 23.9968 27.4725 28.5 36C23.7294 26.9325 21.632 22.4325 23.4004 20.1825C24.9632 18.2025 29.5693 18 38 18C28.5 18 23.8734 17.73 22.9481 14.9625C22.105 12.4875 24.2435 8.0325 28.4794 0Z"
          fill="white"
        />
      </svg>
      <Image
        width={100}
        height={100}
        className="absolute top-2 right-[10%]"
        src={Bit2}
        alt="Logo"
      />
    </>
  );
};

export default LightingComponentLogin;
