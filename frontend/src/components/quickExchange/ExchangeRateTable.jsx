import Image from "next/image";
import { BtnPrimary } from "../common/CustomModules";
import { BrandLogoPng } from "../../app/assets/all-images";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../libs/utils/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { convertGMTDate } from "../../libs/utils/dateConverter";
import { getImageBasePath } from "../../libs/utils/getImageBasePath";

// image base path
const imgBasePath = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

function sliceHash(hashValue) {
   return hashValue?.slice(0, 13);
}

const ExchangeRateTable = ({ tableTitle }) => {
   const [currentPage, setCurrentPage] = useState(1);
   const [transactionData, setTransactionData] = useState([]);

   // get transaction data
   const { data, isLoading } = useQuery({
      queryKey: [`quick_exchange/transaction?page_no=${currentPage}`],
      queryFn: fetchData,
      select: (data) => data.data,
   });

   const handlePagination = debounce(() => {
      setCurrentPage((prev) => prev + 1);
   }, 300);

   const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);

      toast.success("Copied to clipboard");
   };

   // update transaction data
   useEffect(() => {
      if (data) {
         setTransactionData((prev) => [...prev, ...data.transaction]);
      }
   }, [data]);

   return (
      <div className="container_section_sm bg-dark-blue3 rounded-3xl px-4 xl:px-6 2xl:px-8 py-8 xl:py-12 my-8 lg:my-12">
         <h1 className="section_heading_xl mb-6">{tableTitle && tableTitle}</h1>
         <div className="overflow-x-auto ">
            <table className="text-left">
               <thead className=" p-3">
                  <tr className="bg-dark-tertiary">
                     <th className="">GMT</th>
                     <th className="">Sell</th>
                     <th className="">Sell Transaction</th>
                     <th className="">Buy</th>
                     <th className="">Buy Transaction</th>
                     <th className="">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {transactionData?.length > 0 &&
                     transactionData.map((item, index) => {
                        const {
                           admin_send_hash,
                           buy_amount,
                           buy_coin_img,
                           buy_coin_name,
                           buy_coin_url,
                           request_date,
                           sell_amount,
                           sell_coin_img,
                           sell_coin_name,
                           sell_coin_url,
                           status,
                           user_send_hash,
                        } = item;
                        return (
                           <tr key={index}>
                              <td>{convertGMTDate(request_date)}</td>
                              <td>
                                 <div className="flex items-center gap-3">
                                    <Image
                                       src={`${getImageBasePath(
                                          imgBasePath
                                       )}assets/img/crypto/${sell_coin_img}`}
                                       alt="flag img"
                                       width={22}
                                       height={22}
                                    />
                                    <span className="">{sell_amount}</span>
                                 </div>
                              </td>
                              <td title={user_send_hash}>
                                 <span
                                    onClick={() =>
                                       copyToClipboard(user_send_hash)
                                    }
                                    className="cursor-pointer"
                                 >
                                    {sliceHash(user_send_hash)}
                                 </span>
                              </td>
                              <td>
                                 <div className="flex items-center gap-3">
                                    <Image
                                       src={`${getImageBasePath(
                                          imgBasePath
                                       )}assets/img/crypto/${buy_coin_img}`}
                                       alt="flag img"
                                       width={22}
                                       height={22}
                                    />
                                    <span className="">{buy_amount}</span>
                                 </div>
                              </td>
                              <td>{sliceHash(admin_send_hash)}</td>
                              <td>
                                 <div
                                    className={`${
                                       status === 0
                                          ? "bg-yellow-600"
                                          : "bg-green-700"
                                    } text-center px-3 py-2 rounded-full`}
                                 >
                                    {status === 0 ? "Pending" : "Success"}
                                 </div>
                                 {/* <div className="bg-green-700 text-center p-2 rounded-full">
                      success
                    </div> */}
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>

         {transactionData?.length < data?.totalDataRows && (
            <div className="text-center flex justify-center gap-3 mt-6 md:mt-8">
               <BtnPrimary
                  disabled={isLoading}
                  onClick={handlePagination}
                  classes={"group"}
               >
                  {isLoading ? "Loading..." : "Load More"}
                  {!isLoading && (
                     <span className="pl-1 transition-all duration-200 group-hover:pl-2">
                        &#10230;
                     </span>
                  )}
               </BtnPrimary>
            </div>
         )}
      </div>
   );
};

export default ExchangeRateTable;
