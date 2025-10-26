"use client";
import HomeTopSlider from "./../components/slider/HomeTopSlider";
import MerchantManagement from "./../components/home/MerchantManagement";
import InvestmentPlan from "./../components/home/InvestmentPlan";
import OurPriorityCustomers from "./../components/home/OurPriorityCustomers";
import FAQ from "./../components/home/FAQ";
import PaymentWeAccept from "./../components/home/PaymentWeAccept";
import OurInvestorRanking from "./../components/home/OurInvestorRanking";
// import OurServices from "../components/common/OurServices";
// import LightingComponentExLarge from "../components/common/LightingComponentExLarge";
import AboutCompanyHome from "../components/about/index";
import WhyChoose from "../components/common/WhyChoose";

const Home = () => {
   return (
      <>
         <HomeTopSlider />
         <div className="relative isolate overflow-hidden">
            {/* <LightingComponentExLarge /> */}

            <AboutCompanyHome />
            <MerchantManagement />
            <InvestmentPlan />
            <WhyChoose />
            <OurPriorityCustomers />
            <PaymentWeAccept />
            <FAQ />
            <OurInvestorRanking />
         </div>
      </>
   );
};

export default Home;

// export const metadata = {
//    title: "Nishu | Home",
// };
