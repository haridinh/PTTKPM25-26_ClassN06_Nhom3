// import LightingComponentLogin from "../../../components/common/LightingComponentLogin";
import RegistrationForm from "../../../components/registration/registration-form";

const Registration = () => {
   return (
      <div className="container_section_sm isolate bg-dark-blue w-full max-w-lg rounded-3xl relative my-20 xl:my-24 3xl:my-28">
         {/* <LightingComponentLogin /> */}
         <div className="py-4 lg:p-6">
            {/* Login Section */}
            <h2 className="font-semibold text-lg text-blue-600 my-6">
               Registration
            </h2>

            {/* Registration Section */}
            <RegistrationForm />
         </div>
      </div>
   );
};

export default Registration;
export const metadata = {
   title: "Nishu | Registration",
};
