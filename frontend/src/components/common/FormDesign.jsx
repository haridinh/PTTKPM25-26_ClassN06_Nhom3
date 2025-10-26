"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { BtnPrimary } from "../../components/common/CustomModules";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../libs/utils/api";
import toast from "react-hot-toast";

function removeEqualsAtEnd(str) {
   if (str.endsWith("=")) {
      return str.slice(0, -1);
   }
   return str;
}

const FormDesign = () => {
   const router = useRouter();
   const formRef = useRef(null);

   const data = JSON.parse(removeEqualsAtEnd(useSearchParams().get("data")));

   const [document, setDocument] = useState("");
   const [errors, setErrors] = useState(null);

   const handleUploadDocument = (e) => {
      setDocument(e.target.files[0]);
   };

   //  submit form data
   const { mutate, isPending, error } = useMutation({
      mutationFn: (data) => postData("quick_exchange/confirm", data),
      onSuccess: (data) => {
         if (data.status === "success") {
            localStorage.setItem("transaction_quickexchange", data.message);
            toast.success(data.message);
            // redirect to the quick exchange page
            router.push("/quick-exchange");
         }

         // clear the form
         formRef.current.reset();
      },
      onError: (res) => {
         toast.error("Confirmation Failed!");
         setErrors(res.response.data.message);
      },
   });

   const handleConfirmation = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      if (!document) return toast.error("Please upload a document");

      const newData = {
         sell_coin: data?.sell_coin,
         buy_coin: data?.buy_coin,
         sell_amount: data?.sell_amount,
         buy_amount: data?.buy_amount,
         transaction: formData.get("transaction"),
         receiver_account: formData.get("receiver_wallet"),
         identification_info: formData.get("identification_info"),
         tx_image: document,
      };

      if (newData) {
         mutate(newData);
      }
   };

   return (
      <section className="container_section_sm my-8 lg:my-12 bg-dark-secondary p-4 lg:p-10 rounded-2xl text-blue-500">
         <form ref={formRef} onSubmit={handleConfirmation}>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
               {data &&
                  typeof data?.admin_wallet !== "string" &&
                  data.admin_wallet.map((item) => (
                     <div className="">
                        <label
                           htmlFor=""
                           className="block text-slate-300 font-semibold mb-2"
                        >
                           {item?.label}
                        </label>
                        <input
                           className="dark_input_style"
                           type="number"
                           required
                           placeholder={item?.value}
                           name="ibn"
                           disabled
                           value={item?.value}
                        />
                     </div>
                  ))}

               {data && typeof data?.admin_wallet === "string" && (
                  <div className="">
                     <label
                        htmlFor=""
                        className="block text-slate-300 font-semibold mb-2"
                     >
                        Payment Wallet
                     </label>
                     <div className="relative">
                        <input
                           className="dark_input_style pr-24"
                           required
                           type="text"
                           placeholder="Payment Wallet"
                           disabled
                           value={data?.admin_wallet}
                           name="admin_wallet"
                        />
                        <button
                           type="button"
                           className="w-20 text-center  bg-dark-tertiary rounded-r-lg  absolute top-0 right-0 py-3.5"
                           onClick={() => {
                              navigator.clipboard.writeText(data?.admin_wallet);
                              toast.success("Copied to clipboard!");
                           }}
                        >
                           Copy
                        </button>

                        {/* show error msg */}
                        <span
                           className={`text-yellow-600 text-xs opacity-${
                              errors?.admin_wallet ? 1 : 0
                           }`}
                        >
                           <ul className="mt-1">
                              {errors?.admin_wallet?.map((error, idx) => (
                                 <li key={idx}>* {error}</li>
                              ))}
                           </ul>
                        </span>
                     </div>
                  </div>
               )}

               <div className="">
                  <label
                     htmlFor=""
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Payment Amount
                  </label>
                  <div className="relative">
                     <input
                        className="dark_input_style pr-24"
                        type="number"
                        placeholder="Amount"
                        disabled
                        value={data?.sell_amount}
                        name="payment_amount"
                        required
                     />
                     <button
                        type="button"
                        className="w-20 text-center rounded-r-lg  absolute top-0 right-0 py-3.5"
                     >
                        {data?.admin_wallet === "string"
                           ? data?.sell_coin
                           : data?.sell_coin}
                     </button>

                     {/* show error msg */}
                     <span
                        className={`text-yellow-600 text-xs opacity-${
                           errors?.payment_amount ? 1 : 0
                        }`}
                     >
                        <ul className="mt-1">
                           {errors?.payment_amount?.map((error, idx) => (
                              <li key={idx}>* {error}</li>
                           ))}
                        </ul>
                     </span>
                  </div>
               </div>

               <div className="">
                  <label
                     htmlFor=""
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Receiver Wallet
                  </label>
                  <input
                     className="dark_input_style"
                     type="text"
                     placeholder="Receive Wallet"
                     name="receiver_wallet"
                     required
                  />

                  {/* show error msg */}
                  <span
                     className={`text-yellow-600 text-xs opacity-${
                        errors?.receiver_account ? 1 : 0
                     }`}
                  >
                     <ul className="mt-1">
                        {errors?.receiver_account?.map((error, idx) => (
                           <li key={idx}>* {error}</li>
                        ))}
                     </ul>
                  </span>
               </div>

               <div>
                  <label
                     htmlFor="transaction"
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Transaction ID
                  </label>
                  <input
                     className="dark_input_style"
                     type="text"
                     placeholder="Transaction ID"
                     name="transaction"
                     required
                  />

                  {/* show error msg */}
                  <span
                     className={`text-yellow-600 text-xs opacity-${
                        errors?.transaction ? 1 : 0
                     }`}
                  >
                     <ul className="mt-1">
                        {errors?.transaction?.map((error, idx) => (
                           <li key={idx}>* {error}</li>
                        ))}
                     </ul>
                  </span>
               </div>

               {/* {data && typeof data?.admin_wallet === 'string' && (
                  <div className="">
                     <label
                        htmlFor=""
                        className="block text-slate-300 font-semibold mb-2"
                     >
                        Transaction Hash
                     </label>
                     <input
                        className="dark_input_style"
                        required
                        type="text"
                        placeholder="Transaction Hash"
                        name="transaction_hash"
                     />
                  </div>
               )} */}

               <div>
                  <label
                     htmlFor=""
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Document
                  </label>
                  <div>
                     <input
                        type="file"
                        name="file-input"
                        id="file-input"
                        accept="image/*"
                        className="file-input__input hidden"
                        onChange={handleUploadDocument}
                     />
                     <label
                        className="file-input__label flex  items-center cursor-pointer dark_input_style"
                        for="file-input"
                     >
                        <svg
                           width={18}
                           height={18}
                           aria-hidden="true"
                           focusable="false"
                           data-prefix="fas"
                           data-icon="upload"
                           className=" mr-1"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512"
                        >
                           <path
                              fill="currentColor"
                              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                           ></path>
                        </svg>
                        <span>
                           {document ? document?.name : "Upload Document"}
                        </span>
                     </label>

                     {/* show error msg */}
                     <span
                        className={`text-yellow-600 text-xs opacity-${
                           errors?.tx_image ? 1 : 0
                        }`}
                     >
                        <ul className="mt-1">
                           {errors?.tx_image?.map((error, idx) => (
                              <li key={idx}>* {error}</li>
                           ))}
                        </ul>
                     </span>
                  </div>
               </div>
            </div>

            <div className="mt-8 flex justify-center items-center">
               <BtnPrimary disabled={isPending} type={"submit"}>
                  {isPending ? "Submitting..." : "Confirm"}
               </BtnPrimary>
            </div>
         </form>
      </section>
   );
};

export default FormDesign;
