import { Rubik } from "next/font/google";
import "./style/style.scss";
import "./globals.css";
import TopHeader from "./../components/common/TopHeader";
import Footer from "./../components/common/Footer";
import GoToTop from "./../components/common/GoToTop";
import TanstackProvider from "./../providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import BgContext from "../contexts/BgContextProvider";

// base url
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// media base url
const mediaBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const rubik = Rubik({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
   let data = null;

   try {
      const response = await axios.get(`${baseUrl}setting`, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      data = response.data.data;
   } catch (error) {
      console.error("Error fetching data:", error);
   }

   return (
      <html lang="en" dir="">
         <head>
            <link
               rel="apple-touch-icon"
               sizes="180x180"
               href={`${mediaBaseUrl}${data?.favicon}`}
            />
            <link
               rel="icon"
               type="image/png"
               sizes="32x32"
               href={`${mediaBaseUrl}${data?.favicon}`}
            />
            <link
               rel="icon"
               type="image/png"
               sizes="16x16"
               href={`${mediaBaseUrl}${data?.favicon}`}
            />
            <link rel="manifest" href="/site.webmanifest" />
         </head>
         <body className={rubik.className}>
            <Toaster toastOptions={{ duration: 3500 }} position="top-right" />
            <TanstackProvider>
               <TopHeader />
               <BgContext>{children}</BgContext>
               <GoToTop />
               <Footer />
            </TanstackProvider>
         </body>
      </html>
   );
}
