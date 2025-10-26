import Link from "next/link";

const NotFound = () => {
  return (
    <div
      div
      className="w-full max-w-md mx-auto px-8 h-[90vh] overflow-y-hidden flex justify-center items-center"
    >
      <div className="text-center">
        <h1 className="text-8xl text-blue-600 font-bold">404</h1>
        <h2 className="text-3xl text-st font-bold">Page Not Found</h2>

        <p className="my-4">
          We’re sorry, the page you requested could not be found. Please go back
          to the homepage.
        </p>
        <Link className="btn_primary" href="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
export const metadata = {
  title: "Nishu | 404",
};
