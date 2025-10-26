"use client";

import { BtnPrimary } from "../common/CustomModules";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../libs/utils/api";
import toast from "react-hot-toast";
import { useRef } from "react";

const ContactForm = () => {
   const formRef = useRef(null);

   // submit form data
   const { mutate, isPending, error } = useMutation({
      mutationFn: (data) => postData("contact_us", data),
      onSuccess: (data) => {
         if (data.status === "success") {
            toast.success(data.message);

            // clear form
            formRef.current.reset();
         }
      },
      onError: () => {
         toast.error("Send Failed!");
      },
   });

   const handleFromSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);

      const data = {
         full_name: formData.get("full_name"),
         email: formData.get("email"),
         company: formData.get("company"),
         subject: formData.get("subject"),
         message: formData.get("message"),
      };

      if (data) {
         mutate(data);
      } else {
         toast.error("Please fill all the required fields!");
      }
   };

   return (
      <section className="my-8 lg:my-12 bg-dark-secondary p-4 lg:p-10 rounded-2xl text-blue-500">
         <form ref={formRef} onSubmit={handleFromSubmit}>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-8">
               <div className="">
                  <label
                     htmlFor="name"
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Full name *
                  </label>
                  <input
                     className="dark_input_style"
                     required
                     type="text"
                     placeholder="Full Name"
                     name="full_name"
                  />
                  <span className="text-red-500 text-sm">
                     {error?.response?.data?.message?.full_name?.map(
                        (error) => error + " "
                     )}
                  </span>
               </div>
               <div className="">
                  <label
                     htmlFor="email"
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Your email *
                  </label>
                  <input
                     className="dark_input_style"
                     type="email"
                     required
                     placeholder="Your Email"
                     name="email"
                  />
                  <span className="text-red-500 text-sm">
                     {error?.response?.data?.message?.email?.map(
                        (error) => error + " "
                     )}
                  </span>
               </div>
               <div className="">
                  <label
                     htmlFor="company"
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Company *
                  </label>
                  <input
                     name="company"
                     className="dark_input_style"
                     required
                     type="text"
                     placeholder="Company Name"
                  />
                  <span className="text-red-500 text-sm">
                     {error?.response?.data?.message?.company?.map(
                        (error) => error + " "
                     )}
                  </span>
               </div>
               <div className="">
                  <label
                     htmlFor="subject"
                     className="block text-slate-300 font-semibold mb-2"
                  >
                     Subject *
                  </label>
                  <input
                     className="dark_input_style"
                     required
                     type="text"
                     placeholder="Subject"
                     name="subject"
                  />
                  <span className="text-red-500 text-sm">
                     {error?.response?.data?.message?.subject?.map(
                        (error) => error + " "
                     )}
                  </span>
               </div>
            </div>
            <div className="mt-8">
               <label
                  htmlFor="subject"
                  className="block text-slate-300 font-semibold mb-2"
               >
                  Message *
               </label>
               <textarea
                  className="dark_input_style w-full bg-dark-blue1 rounded-lg px-3 py-3.5 focus:outline-none resize-none"
                  rows="6"
                  placeholder="Write your message"
                  name="message"
                  required
               ></textarea>
               <span className="text-red-500 text-sm">
                  {error?.response?.data?.message?.message?.map(
                     (error) => error + " "
                  )}
               </span>
            </div>
            <div className="mt-6 flex justify-center items-center">
               <BtnPrimary disabled={isPending}>
                  {isPending ? "Sending..." : "Send Message"}
               </BtnPrimary>
            </div>
         </form>
      </section>
   );
};

export default ContactForm;
