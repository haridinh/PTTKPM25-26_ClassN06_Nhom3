import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function PopoverModal({
  width,
  position,
  children,
  buttonComponent = null,
}) {
  return (
    <Popover>
      {({ open }) => (
        <Fragment>
          <Popover.Button className="!block focus:outline-none">
            {buttonComponent}
          </Popover.Button>
          <div className="absolute px-4 z">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`z-[999] transform w-screen max-w-[250px] min-h-fit max-h-96  absolute right-0 top-6 bg-white dark:bg-slate-700 overflow-x-hidden overflow-y-auto p-4 rounded-lg ${width} ${position}`}
              >
                {children}
              </Popover.Panel>
            </Transition>
          </div>
        </Fragment>
      )}
    </Popover>
  );
}
