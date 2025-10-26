'use client';
import { useEffect, useState } from 'react';

const GoToTop = () => {
   const [isVisible, setIsVisible] = useState(false);
   const goToBtn = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };
   const listentToScroll = () => {
      let heightToHidden = 250;
      const winScroll =
         document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToHidden) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };
   useEffect(() => {
      window.addEventListener('scroll', listentToScroll);
      return () => window.removeEventListener('scroll', listentToScroll);
   }, []);
   return (
      <>
         {isVisible && (
            <div className="scroll_to_top_button flex justify-end fixed right-4 bottom-4 z-[1000] ">
               <button
                  type="button"
                  onClick={goToBtn}
                  className="to_top_btn inline-block relative animate-bounce"
               >
                  <span className="to_top_arrow inline-block "></span>
               </button>
            </div>
         )}
      </>
   );
};

export default GoToTop;
