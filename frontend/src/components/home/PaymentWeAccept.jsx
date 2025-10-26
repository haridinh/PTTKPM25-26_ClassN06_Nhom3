"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Alipay,
  Payeer,
  Paypal,
  Paystack,
  Stripe,
  Visa,
} from "../../app/assets/all-images";
import SmoothSlider from "../slider/SmoothSlider";
import { fetchData } from "../../libs/utils/api";

const PaymentWeAccept = () => {
  // get acceptable payment gateway data
  const { data: paymentWeAcceptData } = useQuery({
    queryKey: ["home/payment_accept"],
    queryFn: fetchData,
    select: (data) => data.data,
  });

  return (
    <div className="container_section_sm my-12 2xl:my-20 3xl:my-24">
      <section className="w-full max-w-lg mx-auto text-center px-2 mb-8 xl:mb-10">
        <h1 className="section_heading_3xl mb-5">
          {paymentWeAcceptData?.header?.payment_we_accept_header_title}
        </h1>
        <p className="text-base">
          {paymentWeAcceptData?.header?.payment_we_accept_header_content}
        </p>
      </section>
      <SmoothSlider cardData={paymentWeAcceptData?.list} />
    </div>
  );
};

export default PaymentWeAccept;
