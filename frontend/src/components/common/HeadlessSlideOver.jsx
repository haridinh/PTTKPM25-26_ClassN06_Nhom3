import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function HeadlessSlideOver({ open, setOpen, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-[1000] inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-blue-950/80 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative w-screen max-w-[250px]">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute group right-3.5 top-3"
                >
                  <div className="relative flex items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all duration-200  bg-transparent ring-red-300 ring-[2px] ring-opacity-50 shadow-md">
                    <div
                      className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center -rotate-[45deg]`}
                    >
                      <div
                        className={` h-[2px] w-1/2 rounded transform transition-all duration-300 origin-right delay-75 -rotate-90 -translate-y-[1px] bg-red-300`}
                      ></div>
                      <div className={` h-[2px] rounded bg-red-300`}></div>
                      <div
                        className={` h-[2px] w-1/2 rounded self-end transform transition-all duration-300 origin-left delay-75 -rotate-90 translate-y-[1px] bg-red-300`}
                      ></div>
                    </div>
                  </div>
                </button>
              </Transition.Child>
              <div className="h-full bg-dark-primary/95  overflow-hidden pb-6">
                <div className="w-full h-[95%]  mt-16 relative px-8 overflow-y-auto ">
                  {children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
