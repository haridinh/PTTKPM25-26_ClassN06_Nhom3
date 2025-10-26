// import TopBanner from "../../../components/banner/TopBanner";
// import AboutOurCompany from "../../../components/common/AboutOurCompany";
// import {
//    AboutUs,
//    UserPlus,
//    SecurityProtected,
//    Support,
// } from "../../assets/all-images";
// import OurServices from "../../../components/common/OurServices";
import JoinNishue from "../../../components/common/JoinNishue";
import OurRates from "./../../../components/common/OurRates";
import B2xCalculator from "./../../../components/common/B2xCalculator";
import AboutB2X from "./../../../components/B2X/index";
import Difference from "./../../../components/common/Difference";

const B2X = () => {
   return (
      <>
         <AboutB2X />
         <OurRates />
         <Difference />
         <B2xCalculator />
         <JoinNishue />
      </>
   );
};

export default B2X;
export const metadata = {
   title: "Nishu | B2X",
};
