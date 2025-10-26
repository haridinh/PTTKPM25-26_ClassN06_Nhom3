"use client";

import { useMemo, useRef, useState } from "react";
import { BtnPrimary } from "../common/CustomModules";
import countryList from "react-select-country-list";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../libs/utils/api";
import toast from "react-hot-toast";
import { RxCross2, RxCheck } from "react-icons/rx";
import { useRouter, useSearchParams } from "next/navigation";

const RegistrationForm = () => {
   const countryOptions = useMemo(() => countryList().getData(), []);
   const formRef = useRef(null);
   const router = useRouter();
   const searchParams = useSearchParams();
   const referralCode = searchParams.get("referral");

   // states
   const [validations, setValidations] = useState({
      lowercase: false,
      uppercase: false,
      specialChar: false,
      number: false,
      minLength: false,
   });
   const [password, setPassword] = useState("");

   const handleChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);

      // Validate password
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;

      setValidations({
         lowercase: lowercaseRegex.test(newPassword),
         uppercase: uppercaseRegex.test(newPassword),
         specialChar: specialCharRegex.test(newPassword),
         number: numberRegex.test(newPassword),
         minLength: newPassword.length >= 8,
      });
   };

   // submit form data
   const { mutate, isPending, error } = useMutation({
      mutationFn: (data) => postData("home/registration", data),
      onSuccess: (data) => {
         if (data.status === "success") {
            toast.success(data.message);

            localStorage.setItem("welcomemsg", data.message);

            // clear the form
            formRef.current.reset();

            // redirect to the welcome page
            router.push("/welcome");
         }
      },
      onError: (error) => {
         setPassword("");
         toast.error("Registration Failed!");
      },
   });

   const handleFormSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {
         first_name: formData.get("first-name"),
         last_name: formData.get("last-name"),
         username: formData.get("username"),
         email: formData.get("email"),
         phone: formData.get("phone"),
         password: formData.get("password"),
         country: formData.get("country"),
         password_confirmation: formData.get("password-confirmation"),
         referral: referralCode ? referralCode : null,
      };

      // return if password validations are not met
      if (
         !validations.lowercase ||
         !validations.uppercase ||
         !validations.specialChar ||
         !validations.number ||
         !validations.minLength
      ) {
         return;
      }

      if (data) {
         mutate(data);
      } else {
         toast.error("Please fill all the required fields!");
      }
   };

   return (
      <form ref={formRef} onSubmit={handleFormSubmit} className={`space-y-3`}>
         <div className="grid md:grid-cols-2 gap-4">
            <div className="">
               <label
                  htmlFor="first-name"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  First Name *
               </label>
               <input
                  className="dark_input_style"
                  required
                  type="text"
                  placeholder="First Name"
                  name="first-name"
               />
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.first_name?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
            <div className="">
               <label
                  htmlFor="last-name"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  Last Name *
               </label>
               <input
                  className="dark_input_style"
                  required
                  type="text"
                  placeholder="Last Name"
                  name="last-name"
               />
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.last_name?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
         </div>
         <div className="">
            <label
               htmlFor="user-name"
               className="block text-slate-300 font-normal text-md  mb-2"
            >
               User Name *
            </label>
            <input
               className="dark_input_style"
               required
               type="text"
               placeholder="User Name"
               name="username"
            />
            <span className="text-red-500 text-sm">
               {error?.response?.data?.message?.username?.map(
                  (error) => error + " "
               )}
            </span>
         </div>

         <div className="grid md:grid-cols-2 gap-4">
            <div className="">
               <label
                  htmlFor="first-name"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  Select Country *
               </label>

               <select
                  required
                  name="country"
                  id=""
                  className="dark_input_style"
               >
                  <option disabled selected>
                     Select Country
                  </option>
                  {countryOptions?.map((option) => (
                     <option key={option.value} value={option.value}>
                        {option.label}
                     </option>
                  ))}
               </select>
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.country?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
            <div className="">
               <label
                  htmlFor="last-name"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  Phone *
               </label>
               <input
                  className="dark_input_style"
                  required
                  type="number"
                  placeholder="Phone"
                  name="phone"
               />
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.phone?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
         </div>
         <div className="">
            <label
               htmlFor="email"
               className="block text-slate-300 font-normal text-md  mb-2"
            >
               Email *
            </label>
            <input
               className="dark_input_style"
               type="email"
               required
               placeholder="Email"
               name="email"
            />
            <span className="text-red-500 text-sm">
               {error?.response?.data?.message?.email?.map(
                  (error) => error + " "
               )}
            </span>
         </div>
         <div className="grid md:grid-cols-2 gap-4">
            <div className="">
               <label
                  htmlFor="password"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  Password *
               </label>
               <input
                  className="dark_input_style"
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
               />
               <span className="text-red-500 text-sm">
                  <ul className="mt-1">
                     {error?.response?.data?.message?.password?.map(
                        (error, idx) => (
                           <li key={idx}>* {error}</li>
                        )
                     )}
                  </ul>
               </span>
               {password.length > 0 && (
                  <div className="text-sm mt-1">
                     <ul>
                        <li
                           className={`flex gap-1 ${
                              validations?.lowercase
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {validations?.lowercase ? (
                              <RxCheck size={18} />
                           ) : (
                              <RxCross2 size={18} />
                           )}
                           A lowercase letter
                        </li>

                        <li
                           className={`flex gap-1 ${
                              validations?.uppercase
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {validations?.uppercase ? (
                              <RxCheck size={18} />
                           ) : (
                              <RxCross2 size={18} />
                           )}{" "}
                           A uppercase letter
                        </li>

                        <li
                           className={`flex gap-1 ${
                              validations?.number
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {validations?.number ? (
                              <RxCheck size={18} />
                           ) : (
                              <RxCross2 size={18} />
                           )}{" "}
                           A number
                        </li>

                        <li
                           className={`flex gap-1 ${
                              validations?.specialChar
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {validations?.specialChar ? (
                              <RxCheck size={18} />
                           ) : (
                              <RxCross2 size={18} />
                           )}{" "}
                           A special character
                        </li>

                        <li
                           className={`flex gap-1 ${
                              validations?.minLength
                                 ? "text-green-500"
                                 : "text-red-500"
                           }`}
                        >
                           {validations?.minLength ? (
                              <RxCheck size={18} />
                           ) : (
                              <RxCross2 size={18} />
                           )}{" "}
                           Minimum 8 characters
                        </li>
                     </ul>
                  </div>
               )}
            </div>
            <div className="">
               <label
                  htmlFor="confirm-password"
                  className="block text-slate-300 font-normal text-md  mb-2"
               >
                  Confirm Password *
               </label>
               <input
                  className="dark_input_style"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  name="password-confirmation"
               />
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.password_confirmation?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
         </div>

         <div className="mt-6 flex justify-center items-center">
            <BtnPrimary disabled={isPending}>
               {isPending ? "Registering..." : "Register"}
            </BtnPrimary>
         </div>
      </form>
   );
};

export default RegistrationForm;
