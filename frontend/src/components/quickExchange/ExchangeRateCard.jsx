import Image from "next/image";
import { CustomCardSquareSm } from "../common/CustomModules";
// import { BtcCurrency } from "../../app/assets/all-images";
import { getImageBasePath } from "../../libs/utils/getImageBasePath";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const ExchangeRateCard = ({
   data,
   baseCurrency,
   exchangeRate,
   isLoadingExchangeRate,
   handleBuyAndSellClick,
}) => {
   return (
      <>
         <div className="flex justify-center items-center mb-8">
            <p className="bg-dark-blue1 rounded-full px-8 py-3 text-center">
               {isLoadingExchangeRate
                  ? "Loading..."
                  : exchangeRate?.label
                  ? exchangeRate?.label
                  : "No exchange rate available"}
            </p>
         </div>
         <section className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 z-50">
            {data?.length > 0 &&
               data.map((item, index) => {
                  const {
                     id,
                     image,
                     coin_name,
                     symbol,
                     reserve_balance,
                     // market_rate,
                     // price_type,
                     // sell_adjust_price,
                     // buy_adjust_price,
                     // minimum_tx_amount,
                     // wallet_id,
                     exchange_sell_rate,
                     exchange_buy_rate,
                  } = item;

                  if (symbol !== baseCurrency) {
                     return (
                        <CustomCardSquareSm
                           key={index}
                           bodyClasses="p-4 text-center"
                        >
                           <div className="space-y-2">
                              <p className="bg-dark-blue1 rounded-full p-1.5">
                                 1 {baseCurrency} For
                              </p>
                              <div className="w-16 h-16 mx-auto">
                                 <Image
                                    className="w-full h-full object-contain"
                                    src={`${getImageBasePath(
                                       imgBasePath
                                    )}assets/img/crypto/${image}`}
                                    width={200}
                                    height={200}
                                    alt="Card Image"
                                    loading="lazy"
                                 />
                              </div>

                              <p className="text-lg font-medium">{coin_name}</p>
                              <div className="flex items-center text-left justify-between">
                                 <span>Buy Rate</span>
                                 <strong>{exchange_buy_rate}</strong>
                              </div>
                              <div className="flex items-center text-left justify-between">
                                 <span>Sell Rate</span>
                                 <strong>{exchange_sell_rate}</strong>
                              </div>
                              <div className="flex items-center text-left justify-between">
                                 <span>Reserve</span>
                                 <strong>{reserve_balance}</strong>
                              </div>

                              <div className="flex items-center justify-center gap-2">
                                 <button
                                    type="button"
                                    className="text-md px-5 py-1 rounded-md bg-cyan-700 hover:bg-cyan-600 transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                       handleBuyAndSellClick("buy", item)
                                    }
                                 >
                                    Buy
                                 </button>
                                 <button
                                    type="button"
                                    className="text-md px-5 py-1 rounded-md bg-blue-800 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                                    onClick={() =>
                                       handleBuyAndSellClick("sell", item)
                                    }
                                 >
                                    Sell
                                 </button>
                              </div>
                           </div>
                        </CustomCardSquareSm>
                     );
                  }
               })}
         </section>
         {/* <div className="text-center mt-6 md:mt-8">
            <BtnPrimary classes={'group'}>
               Load More
               <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                  &#10230;
               </span>
            </BtnPrimary>
         </div> */}
      </>
   );
};

export default ExchangeRateCard;
