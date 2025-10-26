import Link from "next/link";
import { BtnPrimary } from "../common/CustomModules";
import LightingComponentLogin from "../common/LightingComponentLogin";

const Login = ({ onClick, forgotPasswork }) => {
   return (
      <>
         <LightingComponentLogin />
         <div className="px-4 py-6 md:px-8">
            <h2 className="font-semibold text-lg text-blue-600 my-6">Login</h2>
            <form action="#" className="space-y-4">
               <div className="">
                  <label
                     htmlFor="user-name"
                     className="block text-slate-300 font-normal text-md  mb-2"
                  >
                     User Name Or Email *
                  </label>
                  <input
                     className="dark_input_style"
                     required
                     type="text"
                     placeholder="User Name or Email"
                  />
               </div>

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
                  />
               </div>
               <p className="text-sm text-slate-400">
                  <Link
                     onClick={forgotPasswork}
                     className="text-sm text-blue-600"
                     href={"/"}
                  >
                     Forgot Password
                  </Link>{" "}
                  ? Don’t Have An account ?{" "}
                  <Link
                     onClick={onClick}
                     className="text-sm text-blue-600"
                     href={"/registration"}
                  >
                     Sign up Now
                  </Link>
               </p>

               <div className="mt-6 flex justify-center items-center max-w-[200px] mx-auto">
                  <BtnPrimary onClick={() => setOpen(false)} classes={"w-full"}>
                     Login
                  </BtnPrimary>
               </div>
            </form>
         </div>
      </>
   );
};

export default Login;
