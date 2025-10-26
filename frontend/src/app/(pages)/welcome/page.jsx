import LightingComponentLogin from "../../../components/common/LightingComponentLogin";
import WelcomeUser from "../../../components/registration/WelcomeUser";

const Registration = () => {
   return (
      <div className="container_section_sm h-screen isolate bg-dark-blue w-full rounded-3xl relative my-20 xl:my-24 3xl:my-28">
         <LightingComponentLogin />
         <div className="py-4 lg:p-6 max-w-lg mx-auto flex justify-center items-center h-full">
            <WelcomeUser />
         </div>
      </div>
   );
};

export default Registration;
export const metadata = {
   title: "Nishu | Welcome",
};
