"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import TopBanner from "../banner/TopBanner";
import ExchangeCalculator from "../quickExchange/ExchangeCalculator";
import ExchangeRateCard from "../quickExchange/ExchangeRateCard";
import ExchangeRateTable from "../quickExchange/ExchangeRateTable";
import { fetchData, postData } from "../../libs/utils/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import SpinnerLoader from "../customLoader/SpinnerLoader";
import { RxCrossCircled } from "react-icons/rx";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const QuickExchangeMain = () => {
   // states
   const [sellCoinList, setSellCoinList] = useState([]);
   const [buyCoinList, setBuyCoinList] = useState([]);

   const [selectedSellCurrency, setSelectedSellCurrency] = useState("");
   const [selectedBuyCurrency, setSelectedBuyCurrency] = useState("");

   const [amountToSell, setAmountToSell] = useState("");
   const [amountToBuy, setAmountToBuy] = useState("");

   const [sellInputValue, setSellInputValue] = useState("");
   const [buyInputValue, setBuyInputValue] = useState("");

   const [errors, setErrors] = useState(null);

   const [isSwapping, setIsSwapping] = useState(false);

   const [transactionMessage, setTransactionMessage] = useState(null);

   // handle swapping currency
   function handleSwap() {
      // setIsSwapping(true);
      setAmountToBuy(amountToSell);
      setAmountToSell(amountToBuy);
      setBuyInputValue(sellInputValue);
      setSellInputValue(buyInputValue);
      setSelectedSellCurrency(selectedBuyCurrency);
      setSelectedBuyCurrency(selectedSellCurrency);
      // handleSwapApi();
   }

   const updateBuyCoinList = debounce(async (baseCoin) => {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
         const response = await axios.get(
            `${baseURL}/quick_exchange/support_coins?sell_currency=${baseCoin}`
         );
         setBuyCoinList(response.data.data);
      } catch (error) {
         return error.response.data;
      }
   }, 300);

   // buy and sell button click handler
   const handleBuyAndSellClick = (type, item) => {
      setIsSwapping(true);
      setAmountToBuy("");
      setAmountToSell("");
      setBuyInputValue("");
      setSellInputValue("");
      if (type === "buy") {
         setSelectedBuyCurrency(item.symbol);
         setSelectedSellCurrency(
            quickExchangeData?.quick_exchange_content?.baseCoin?.symbol
         );
         updateBuyCoinList(
            quickExchangeData?.quick_exchange_content?.baseCoin?.symbol
         );
      } else {
         setSelectedSellCurrency(item.symbol);
         setSelectedBuyCurrency(
            quickExchangeData?.quick_exchange_content?.baseCoin?.symbol
         );
         updateBuyCoinList(
            quickExchangeData?.quick_exchange_content?.baseCoin?.symbol
         );
      }
   };

   // swapping api
   //  const handleSwapApi = debounce(async () => {
   //     const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
   //     try {
   //        const response = await axios.get(
   //           `${baseURL}/quick_exchange/support_coins?sell_currency=${selectedBuyCurrency}`
   //        );
   //        setSelectedSellCurrency(selectedBuyCurrency);
   //        setSelectedBuyCurrency(selectedSellCurrency);
   //        setBuyCoinList(response.data.data);
   //     } catch (error) {
   //        return error.response.data;
   //     }
   //  }, 300);

   // get quick exchange main data
   const { data: quickExchangeData, isLoading } = useQuery({
      queryKey: ["quick_exchange"],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   // set default selected currency
   useEffect(() => {
      if (quickExchangeData !== undefined) {
         setSellCoinList(quickExchangeData?.quick_exchange_content?.activeCoin);
         setSelectedSellCurrency(
            quickExchangeData?.quick_exchange_content?.activeCoin[0]?.symbol
         );
      }
   }, [quickExchangeData]);

   // get buy exchange rate
   const {
      data: exchangeRate,
      mutate: getExchangeRate,
      isPending: isLoadingExchangeRate,
   } = useMutation({
      mutationFn: (data) => postData("quick_exchange/rate", data),
      onSuccess: (res) => {
         setErrors(null);
         if (!buyInputValue) {
            setBuyInputValue(res.data.buy_amount);
            setAmountToBuy(res.data.buy_amount);
         } else if (!sellInputValue) {
            setSellInputValue(res.data.sell_amount);
            setAmountToSell(res.data.sell_amount);
         } else {
            setBuyInputValue(res.data.buy_amount);
            setAmountToBuy(res.data.buy_amount);
            setSellInputValue(res.data.sell_amount);
            setAmountToSell(res.data.sell_amount);
         }
      },

      onError: (res) => {
         setErrors(res.response.data.message);
      },
   });

   // call buy rate
   useEffect(() => {
      if (
         amountToSell &&
         !amountToBuy &&
         selectedSellCurrency &&
         selectedBuyCurrency
      ) {
         const data = {
            buy_amount: 0,
            sell_amount: amountToSell,
            buy_coin: selectedBuyCurrency,
            sell_coin: selectedSellCurrency,
         };

         getExchangeRate(data);
      }
   }, [amountToSell]);

   //  call sell rate
   useEffect(() => {
      if (
         amountToBuy &&
         !amountToSell &&
         selectedSellCurrency &&
         selectedBuyCurrency
      ) {
         const data = {
            buy_amount: amountToBuy,
            sell_amount: 0,
            buy_coin: selectedBuyCurrency,
            sell_coin: selectedSellCurrency,
         };

         getExchangeRate(data);
      }
   }, [amountToBuy]);

   // get all supported coin list
   const { data: supportedCoinList, refetch } = useQuery({
      queryKey: [
         `quick_exchange/support_coins?sell_currency=${selectedSellCurrency}`,
      ],
      queryFn: fetchData,
      enabled: !!selectedSellCurrency,
      select: (data) => data.data,
   });

   // handle transaction message
   const handleTransactionMsg = () => {
      localStorage.removeItem("transaction_quickexchange");
      setTransactionMessage(null);
   };

   // get supported coin list
   useEffect(() => {
      if (!isSwapping && supportedCoinList) {
         setBuyCoinList(supportedCoinList);
         setSelectedBuyCurrency(supportedCoinList[0].symbol);
      }
   }, [supportedCoinList]);

   // get transaction message
   useEffect(() => {
      if (typeof window !== "undefined") {
         const transactionMessage = localStorage.getItem(
            "transaction_quickexchange"
         );

         transactionMessage && setTransactionMessage(transactionMessage);
      }
   }, []);

   if (isLoading) return <SpinnerLoader />;

   return (
      <>
         <TopBanner
            title={
               quickExchangeData?.quick_exchange_cms
                  ?.quick_exchange_banner_title
            }
            routeLink={"Quick Exchange"}
            bannerSrc={`${imgBasePath}${quickExchangeData?.quick_exchange_cms?.image}`}
         />

         {transactionMessage && (
            <div className="w-11/12 sm-w-8/12 rounded-lg text-center mx-auto mt-5 bg-[#3767a6] py-10 relative">
               <h1 className="text-2xl"> {transactionMessage} </h1>

               <button
                  onClick={handleTransactionMsg}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-[0.5]"
               >
                  <RxCrossCircled size={28} />
               </button>
            </div>
         )}

         <section className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-12 my-8 lg:my-12">
            <section className="w-full max-w-[450px] mx-auto text-center">
               <h1 className="section_heading_xl mb-3">
                  {quickExchangeData?.quick_exchange_cms?.quick_exchange_header}
               </h1>
               <p className="text-sm">
                  {
                     quickExchangeData?.quick_exchange_cms
                        ?.quick_exchange_content
                  }
               </p>
            </section>
            <ExchangeCalculator
               selectedSellCurrency={selectedSellCurrency}
               setSelectedSellCurrency={setSelectedSellCurrency}
               selectedBuyCurrency={selectedBuyCurrency}
               setSelectedBuyCurrency={setSelectedBuyCurrency}
               amountToSell={amountToSell}
               setAmountToSell={setAmountToSell}
               amountToBuy={amountToBuy}
               setAmountToBuy={setAmountToBuy}
               sellInputValue={sellInputValue}
               setSellInputValue={setSellInputValue}
               buyInputValue={buyInputValue}
               setBuyInputValue={setBuyInputValue}
               errors={errors}
               sellCoinList={sellCoinList}
               buyCoinList={buyCoinList}
               handleSwap={handleSwap}
               setIsSwapping={setIsSwapping}
            />
            <ExchangeRateCard
               data={quickExchangeData?.quick_exchange_content?.activeCoin}
               baseCurrency={
                  quickExchangeData?.quick_exchange_content?.baseCoin?.symbol
               }
               exchangeRate={exchangeRate?.data}
               isLoadingExchangeRate={isLoadingExchangeRate}
               handleBuyAndSellClick={handleBuyAndSellClick}
            />
         </section>
         <ExchangeRateTable
            tableTitle={
               quickExchangeData?.quick_exchange_cms?.transaction_header
            }
         />
      </>
   );
};

export default QuickExchangeMain;
