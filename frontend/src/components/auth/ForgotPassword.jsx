import { BtnPrimary } from "../common/CustomModules";

const ForgotPassword = () => {
  return (
    <div className="px-4 py-6 md:px-8">
      <div className="w-full max-w-md mx-auto text-center my-6">
        <h2 className="font-semibold text-3xl mb-4  ">Enter Your Password!</h2>
        <p className="text-whiten">
          This page is password protected. If you are the website admin, or have
          access to this page, please type your password below.
        </p>
      </div>
      <form action="#" className="space-y-6">
        <input
          className="dark_input_style"
          required
          type="text"
          placeholder="Enter Your Password"
        />

        <div className="mt-6 flex justify-center items-center max-w-[200px] mx-auto">
          <BtnPrimary classes={"w-full"}>Login</BtnPrimary>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
