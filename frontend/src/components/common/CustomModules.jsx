/* ====== Card Modules (CustomCardSquare) ====== */
export const CustomCardSquare = ({ children, outerClasses, bodyClasses }) => {
   return (
      <div className={`w-full p-2 rounded-xl bg-dark-blue2 ${outerClasses}`}>
         <div className="rounded-xl p-0.5 bg_conic_gradient ">
            <div
               className={`rounded-[calc(0.75rem-1px)] bg-dark-blue2 ${bodyClasses}`}
            >
               {children}
            </div>
         </div>
      </div>
   );
};
export const CustomCardSquareSm = ({ children, outerClasses, bodyClasses }) => {
   return (
      <div className={`w-full p-2 rounded-xl bg-dark-blue2 ${outerClasses}`}>
         <div className="rounded-xl p-0.5 bg_conic_gradient_sm ">
            <div
               className={`rounded-[calc(0.75rem-1px)] bg-dark-blue2 ${bodyClasses}`}
            >
               {children}
            </div>
         </div>
      </div>
   );
};
/* ====== Card Modules ====== */
export const CustomCard = ({ children, outerClasses, bodyClasses }) => {
   return (
      <div className={`w-full p-2 rounded-3xl bg-dark-blue2 ${outerClasses}`}>
         <div className="rounded-3xl p-0.5 bg_conic_gradient ">
            <div
               className={`rounded-[calc(1.5rem-1px)] bg-dark-blue2 ${bodyClasses}`}
            >
               {children}
            </div>
         </div>
      </div>
   );
};
/* ====== CustomCard60Deg ====== */
export const CustomCard60Deg = ({ children, outerClasses, bodyClasses }) => {
   return (
      <div className={`w-full p-2 rounded-3xl bg-dark-blue2 ${outerClasses}`}>
         <div className="rounded-3xl p-0.5 bg_conic_gradient_60 ">
            <div
               className={`rounded-[calc(1.5rem-1px)] bg-dark-blue2 ${bodyClasses}`}
            >
               {children}
            </div>
         </div>
      </div>
   );
};
/* ====== Card Modules ====== */
export const CustomCard45Deg = ({ children, outerClasses, bodyClasses }) => {
   return (
      <div className={`w-full p-2 rounded-3xl bg-dark-blue2 ${outerClasses}`}>
         <div className="rounded-3xl p-0.5 bg_conic_gradient_45 ">
            <div
               className={`rounded-[calc(1.5rem-1px)] bg-dark-blue2 ${bodyClasses}`}
            >
               {children}
            </div>
         </div>
      </div>
   );
};

/* ====== Button Modules ====== */

export const BtnPrimary = ({ children, classes, onClick, type, disabled }) => {
   return (
      <button
         type={type}
         onClick={onClick}
         className={`btn_primary ${classes}`}
         disabled={disabled}
      >
         {children}
      </button>
   );
};

/* ====== ****** ====== */
export const BtnPrimaryOutline = ({ children, classes, onClick }) => {
   return (
      <button
         type={``}
         onClick={onClick}
         className={`btn_primary_outline ${classes}`}
      >
         {children}
      </button>
   );
};
/* ====== ****** ====== */
export const BtnPrimaryOutline2 = ({ children, classes, onClick }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className={`text-md px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-blue-700 transition-all duration-300 ease-in-out border border-blue-400  ${classes}`}
      >
         {children}
      </button>
   );
};
