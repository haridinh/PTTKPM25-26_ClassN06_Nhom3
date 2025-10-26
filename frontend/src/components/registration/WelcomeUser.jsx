"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WelcomeUser = () => {
   const router = useRouter();
   const [seconds, setSeconds] = useState(5);

   // 5 seconds timer to redirect to the login page
   useEffect(() => {
      const timer = setInterval(() => {
         setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds === 0) {
         localStorage.removeItem("welcomemsg");
         router.push("/");
      }

      return () => clearInterval(timer);
   }, [seconds]);

   const welcomeMessage =
      typeof window !== "undefined" && localStorage.getItem("welcomemsg");

   if (typeof window !== "undefined" && !welcomeMessage) router.push("/");

   return (
      <>
         {welcomeMessage && (
            <div className="bg-[#3767a6] p-5 text-center rounded-lg">
               <h1 className="text-3xl">{welcomeMessage}</h1>

               <p className="mt-5 mb-10">
                  {" "}
                  You will be redirected to the login page in {seconds}{" "}
                  seconds....{" "}
               </p>
            </div>
         )}
      </>
   );
};

export default WelcomeUser;
