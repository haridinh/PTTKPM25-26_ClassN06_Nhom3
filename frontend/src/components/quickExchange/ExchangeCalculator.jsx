import { useRouter } from "next/navigation";
import { BtnPrimary } from "../common/CustomModules";
import SelectDropdown from "./../common/SelectDropdown";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../libs/utils/api";

const ExchangeCalculator = ({
   selectedSellCurrency,
   setSelectedSellCurrency,
   selectedBuyCurrency,
   setSelectedBuyCurrency,
   amountToSell,
   setAmountToSell,
   amountToBuy,
   setAmountToBuy,
   sellInputValue,
   setSellInputValue,
   buyInputValue,
   setBuyInputValue,
   errors,
   sellCoinList,
   buyCoinList,
   handleSwap,
   setIsSwapping,
}) => {
   const router = useRouter();

   // submit data
   const { mutate, isPending, error, data } = useMutation({
      mutationFn: (data) => postData("quick_exchange/nextRequest", data),
      onSuccess: (data) => {
         if (data.status === "success") {
            const queryString = new URLSearchParams(JSON.stringify(data?.data));
            router.push(`/quick-exchange-confirm/?data=${queryString}`);
         }
      },
      onError: (error) => {
         toast.error("Submission Failed!");
      },
   });

   const handleNext = () => {
      if (
         selectedSellCurrency &&
         selectedBuyCurrency &&
         amountToSell &&
         amountToBuy
      ) {
         const data = {
            sell_coin: selectedSellCurrency,
            buy_coin: selectedBuyCurrency,
            sell_amount: amountToSell,
            buy_amount: amountToBuy,
         };

         mutate(data);
      } else toast.error("Please fill all the required fields!");
   };

   return (
      <section className="flex justify-center items-center flex-col lg:flex-row lg:items-end gap-6 lg:gap-4 my-12">
         <section className="grid grid-cols-2 gap-2 lg:gap-4  h-36 ">
            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Currency You Sell
               </label>
               <SelectDropdown
                  selected={selectedSellCurrency}
                  setSelected={setSelectedSellCurrency}
                  dropdownOptions={sellCoinList}
                  setSellInputValue={setSellInputValue}
                  setBuyInputValue={setBuyInputValue}
                  setIsSwapping={setIsSwapping}
                  setAmountToBuy={setAmountToBuy}
                  setAmountToSell={setAmountToSell}
               />
               {/* <span className="text-yellow-600 text-xs opacity-0">
            Error Message Show
          </span> */}
            </div>

            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Amount To Sell
               </label>
               <div className="relative">
                  <input
                     className="bg-dark-blue2 rounded-lg pl-3 pr-12 py-3.5 focus:outline-none w-full"
                     required
                     autoFocus
                     type="number"
                     placeholder="1"
                     onChange={(e) => {
                        amountToBuy && setAmountToBuy("");
                        buyInputValue && setBuyInputValue("");
                        setSellInputValue(e.target.value);
                     }}
                     onBlur={(e) => setAmountToSell(e.target.value)}
                     value={sellInputValue}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
                     {selectedSellCurrency}
                  </span>
               </div>
               {/* Error Message Show ( if hide this section, please use opacity-0 ) */}
               <div
                  className={`text-yellow-600 text-xs opacity-${
                     errors?.sell_coin ? 1 : 0
                  }`}
               >
                  <ul className="mt-1">
                     {errors?.sell_coin?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>

                  <ul className="mt-1">
                     {errors?.sell_amount?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>
               </div>
            </div>
         </section>

         <div className="lg:h-36  flex items-center mb-3">
            <button
               type="button"
               className="w-24 p-3 bg-dark-blue2 hover:bg-dark-blue1 rounded-lg flex justify-center items-center transition-all duration-300 ease-in-out"
               onClick={handleSwap}
            >
               <svg
                  width="28"
                  height="28"
                  viewBox="0 0 34 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M33.5317 9.48893L27.3552 15.8024C27.2117 15.9503 27.0409 16.0678 26.8527 16.1479C26.6645 16.228 26.4627 16.2693 26.2589 16.2693C26.055 16.2693 25.8532 16.228 25.6651 16.1479C25.4769 16.0678 25.3061 15.9503 25.1626 15.8024C25.0178 15.6557 24.903 15.4811 24.8246 15.2888C24.7462 15.0964 24.7058 14.8901 24.7058 14.6818C24.7058 14.4734 24.7462 14.2671 24.8246 14.0748C24.903 13.8824 25.0178 13.7079 25.1626 13.5611L28.714 9.94665H6.18541C5.77588 9.94665 5.38313 9.78036 5.09355 9.48436C4.80398 9.18836 4.64129 8.78689 4.64129 8.36828C4.64129 7.94967 4.80398 7.54821 5.09355 7.25221C5.38313 6.9562 5.77588 6.78991 6.18541 6.78991H28.714L25.1626 3.17544C24.8718 2.87823 24.7085 2.47512 24.7085 2.0548C24.7085 1.63448 24.8718 1.23137 25.1626 0.934156C25.4533 0.636943 25.8477 0.469971 26.2589 0.469971C26.6701 0.469971 27.0644 0.636943 27.3552 0.934156L33.5317 7.24764C33.6764 7.39437 33.7913 7.56894 33.8697 7.76128C33.948 7.95362 33.9884 8.15992 33.9884 8.36828C33.9884 8.57665 33.948 8.78295 33.8697 8.97529C33.7913 9.16763 33.6764 9.3422 33.5317 9.48893ZM27.803 22.5736H5.27438L8.82584 18.9592C9.1166 18.6619 9.27995 18.2588 9.27995 17.8385C9.27995 17.4182 9.1166 17.0151 8.82584 16.7179C8.53508 16.4207 8.14072 16.2537 7.72952 16.2537C7.31832 16.2537 6.92396 16.4207 6.6332 16.7179L0.456746 23.0313C0.312019 23.1781 0.197146 23.3526 0.118753 23.545C0.0403604 23.7373 0 23.9436 0 24.152C0 24.3604 0.0403604 24.5667 0.118753 24.759C0.197146 24.9513 0.312019 25.1259 0.456746 25.2726L6.6332 31.5861C6.77675 31.7341 6.94753 31.8515 7.13569 31.9316C7.32386 32.0117 7.52568 32.053 7.72952 32.053C7.93336 32.053 8.13519 32.0117 8.32335 31.9316C8.51152 31.8515 8.6823 31.7341 8.82584 31.5861C8.97057 31.4394 9.08544 31.2648 9.16383 31.0725C9.24223 30.8801 9.28259 30.6738 9.28259 30.4655C9.28259 30.2571 9.24223 30.0508 9.16383 29.8585C9.08544 29.6661 8.97057 29.4916 8.82584 29.3448L5.27438 25.7304H27.803C28.2125 25.7304 28.6053 25.5641 28.8949 25.2681C29.1844 24.9721 29.3471 24.5706 29.3471 24.152C29.3471 23.7334 29.1844 23.3319 28.8949 23.0359C28.6053 22.7399 28.2125 22.5736 27.803 22.5736Z"
                     fill="white"
                  />
               </svg>
            </button>
         </div>

         <section className="grid grid-cols-2 gap-2 lg:gap-4  h-36 ">
            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Currency You Buy
               </label>
               <SelectDropdown
                  dropdownOptions={buyCoinList}
                  setSelected={setSelectedBuyCurrency}
                  selected={selectedBuyCurrency}
                  setBuyInputValue={setBuyInputValue}
                  setSellInputValue={setSellInputValue}
                  setIsSwapping={setIsSwapping}
                  setAmountToBuy={setAmountToBuy}
                  setAmountToSell={setAmountToSell}
               />
               {/* Error Message Show ( if hide this section, plesae use opacity-0 ) */}
               {/* <span className="text-yellow-600 text-xs opacity-0">
            Error Message Show Here
          </span> */}
            </div>

            <div>
               <label htmlFor="name" className="block text-whiten mb-2">
                  Amount To Buy
               </label>
               <div className="relative">
                  <input
                     className="bg-dark-blue2 rounded-lg pl-3 pr-12 py-3.5 focus:outline-none w-full"
                     required
                     type="number"
                     placeholder="1"
                     onChange={(e) => {
                        amountToSell && setAmountToSell("");
                        sellInputValue && setSellInputValue("");
                        setBuyInputValue(e.target.value);
                     }}
                     onBlur={(e) => setAmountToBuy(e.target.value)}
                     value={buyInputValue}
                     disabled={false}
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
                     {selectedBuyCurrency}
                  </span>
               </div>
               {/* Error Message Show ( if hide this section, please use opacity-0 ) */}
               <span
                  className={`text-yellow-600 text-xs opacity-${
                     errors?.buy_coin ? 1 : 0
                  }`}
               >
                  <ul className="mt-1">
                     {errors?.buy_coin?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>

                  <ul className="mt-1">
                     {errors?.buy_amount?.map((error, idx) => (
                        <li key={idx}>* {error}</li>
                     ))}
                  </ul>
               </span>
            </div>
         </section>

         <div className="text-center lg:h-36  flex items-center mb-3">
            <BtnPrimary onClick={handleNext} classes={"group"}>
               Next
               <span className="pl-1 transition-all duration-200">
                  &#10230;
               </span>
            </BtnPrimary>
         </div>
      </section>
   );
};

export default ExchangeCalculator;
