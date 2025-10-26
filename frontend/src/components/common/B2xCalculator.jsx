"use client";

import { BtnPrimary } from "./CustomModules";
// import ComboDropdownList from './ComboDropdownList';
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, postData } from "../../libs/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { useBaseUrl } from "../../libs/customHooks/getBaseUrl";
import Link from "next/link";

const B2xCalculator = () => {
   const baseURL = useBaseUrl();

   // states
   const [holdingAmount, setHoldingAmount] = useState({
      amount: 1,
      result: 1.5,
   });
   const [loanMonths, setLoanMonths] = useState({
      monthsList: [],
      selectedMonth: 0,
   });
   const [loanDetails, setLoanDetails] = useState([]);

   const [error, setError] = useState(null);

   // get b2x loan details
   const { mutate, isPending } = useMutation({
      mutationFn: (data) => postData("b2x_calculator", data),
      onSuccess: (data) => {
         setError(null);
         setLoanDetails(data.data.loan_data);
         return data;
      },
      onError: (error) => {
         const errMessage = error.response.data.message;
         setError(errMessage);
         toast.error("Could Not Get Loan Details!");
      },
   });

   // get b2x calculator data
   const {
      data: b2xPackageData,
      isSuccess,
      status,
   } = useQuery({
      queryKey: ["b2x_packages"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   //  handle holding amount
   const handleHoldingValueUpdate = debounce((e) => {
      const { value } = e.target;
      const regex = /^\d+$/;

      if (regex.test(value)) {
         const amount = Number(value);
         const result = amount + amount * 0.5;

         setHoldingAmount((prev) => ({
            ...prev,
            amount,
            result,
         }));
      } else {
         setHoldingAmount((prev) => ({ ...prev, amount: 0, result: 0 }));
      }
   }, 300);

   // handle holding month
   const handleLoanMonthSelect = debounce((e) => {
      const { value } = e.target;
      setLoanMonths((prev) => ({
         ...prev,
         selectedMonth: value,
      }));
   }, 300);

   useEffect(() => {
      if (isSuccess && status === "success") {
         setLoanMonths((prev) => ({
            ...prev,
            monthsList: b2xPackageData?.packages?.map(
               (item) => item?.no_of_month
            ),
            selectedMonth: b2xPackageData?.packages[0]?.no_of_month,
         }));
      }
   }, [b2xPackageData]);

   // call loan details
   useEffect(() => {
      if (loanMonths?.selectedMonth > 0 && holdingAmount?.amount > 0) {
         const data = {
            holding_amount: holdingAmount?.amount,
            package_month: loanMonths?.selectedMonth,
         };
         mutate(data);
      }
   }, [loanMonths, holdingAmount]);

   return (
      <div
         id="btx_calculator"
         className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-12  my-12 2xl:my-20 3xl:my-24"
      >
         <section className="w-full max-w-[450px] mx-auto text-center mb-12">
            <h1 className="section_heading_xl mb-3">
               {b2xPackageData?.b2xpackage_header?.b2x_calculator_header_title}
            </h1>
            <p className="text-sm">
               {
                  b2xPackageData?.b2xpackage_header
                     ?.b2x_calculator_header_content
               }
            </p>
         </section>
         <section className="grid grid-cols-1 md:grid-cols-3 gap-3 z-50">
            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Your Holding Amount
               </label>
               <div className="relative">
                  <input
                     className="bg-dark-blue2 rounded-lg pl-3 pr-16 py-3.5 focus:outline-none w-full"
                     required
                     type="number"
                     placeholder="Enter Amount"
                     defaultValue={"1"}
                     onChange={handleHoldingValueUpdate}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
                     BTC
                  </span>
               </div>
               <span className="text-yellow-600 text-xs opacity-1">
                  <ul className="mt-1">
                     {error?.holding_amount?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>
               </span>
            </div>

            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Select Loan Month
               </label>
               {/* <ComboDropdownList dropdownData={b2xPackageData?.packages} /> */}
               <select
                  required
                  name="loan_month"
                  className="dark_input_style bg-dark-blue2"
                  onChange={handleLoanMonthSelect}
               >
                  {b2xPackageData?.packages?.map((item) => (
                     <option key={item.id} value={item.no_of_month}>
                        {item.no_of_month}{" "}
                        {item.no_of_month > 1 ? "Months" : "Month"}
                     </option>
                  ))}
               </select>

               <span className="text-yellow-600 text-xs opacity-1">
                  <ul className="mt-1">
                     {error?.package_month?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>
               </span>
            </div>

            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Final Wallet Balance
               </label>
               <div className="bg-dark-blue2 rounded-lg p-3.5 text-center">
                  {holdingAmount?.result}
               </div>
            </div>
         </section>

         <section className="mt-8 xl:mt-12">
            <h1 className="section_heading_md mb-3 text-center">
               {
                  b2xPackageData?.b2xpackage_header
                     ?.b2x_loan_details_header_title
               }
            </h1>
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
               {!error &&
                  !isPending &&
                  loanDetails &&
                  loanDetails.map((item, index) => {
                     const { label, value } = item;
                     if (label !== undefined) {
                        return (
                           <div
                              key={index}
                              className="px-4 py-8 text-center border_style_five flex justify-center items-center flex-col gap-1"
                           >
                              <p className="text-sm">{label}</p>
                              <h2 className="text-lg">
                                 {label !== "Loan Interest Rate " ? "$" : ""}
                                 {label.trim() === "Loan Interest Rate"
                                    ? `${value}%`
                                    : `${value}`}
                              </h2>
                           </div>
                        );
                     }
                  })}
            </section>
            {!loanDetails && !isPending && (
               <p className="text-center text-lg">No Package Available</p>
            )}
            {isPending && (
               <div className="flex justify-center items-center w-full h-8 z-[99999]">
                  <span className="spinnerLoader"></span>
               </div>
            )}
            <div className="text-center mt-6 md:mt-12">
               {baseURL && (
                  <Link
                     target="_blank"
                     href={`${baseURL}/backend/customer/b2x-Loan`}
                  >
                     <BtnPrimary classes={"group"}>
                        {
                           b2xPackageData?.b2xpackage_header
                              ?.b2x_loan_button_text
                        }
                        <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                           &#10230;
                        </span>
                     </BtnPrimary>
                  </Link>
               )}
            </div>
         </section>
      </div>
   );
};

export default B2xCalculator;
