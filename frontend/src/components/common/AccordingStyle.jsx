const AccordingStyle = ({ data }) => {
   return (
      <div className="container_section my-8 xl:my-10">
         {data?.length > 0 &&
            data.map((item, index) => {
               return (
                  <div key={index} className="according_style_two pb-4">
                     <details className="transition duration-500 bg-dark-blue2  cursor-pointer border-l-8 border-cyan-600 rounded-md overflow-hidden ">
                        <summary className="bg-dark-blue">
                           <header className="flex items-center justify-between mx-3">
                              <div className="flex items-center gap-1">
                                 <div className="hidden md:block">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 text-sm flex items-center justify-center">
                                       {index + 1}
                                    </div>
                                 </div>
                                 <h1 className="py-6 px-2 text-whiten text-lg lg:text-xl">
                                    {item?.question}
                                 </h1>
                              </div>
                              <div>
                                 <svg
                                    width={20}
                                    height={20}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                 >
                                    <path
                                       fill="#c6c6c6"
                                       d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
                                    />
                                 </svg>
                              </div>
                           </header>
                        </summary>
                        <div className="content text-base px-5 md:pl-16">
                           <p>{item?.answer}</p>
                        </div>
                     </details>
                  </div>
               );
            })}
      </div>
   );
};

export default AccordingStyle;
