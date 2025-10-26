"use client";
import { Disclosure } from "@headlessui/react";

export default function Collapse() {
  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl px-4 md:px-0 text-red-600">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-whiten px-4 py-3 text-left text-base font-semibold  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Overview</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${
                  open
                    ? "rotate-180 transform transition-all duration-300 ease-in"
                    : ""
                } h-5 w-5 transition-all duration-300 ease-in`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm bg-white ">
              If you're unhappy with your purchase for any reason, email us
              within 90 days and we'll refund you in full, no questions asked.
              If you're unhappy with your purchase for any reason, email us
              within 90 days and we'll refund you in full, no questions asked.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* <Disclosure as="div" className="mt-4">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg border px-4 py-3 text-left text-base font-semibold text-dark-secondary focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Specifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${
                  open
                    ? "rotate-180 transform transition-all duration-300 ease-in"
                    : ""
                } h-5 w-5 text-dark-secondary transition-all duration-300 ease-in`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              No.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-4">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg border px-4 py-3 text-left text-base font-semibold text-dark-secondary focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Ask a question</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${
                  open
                    ? "rotate-180 transform transition-all duration-300 ease-in"
                    : ""
                } h-5 w-5 text-dark-secondary transition-all duration-300 ease-in`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Yes.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */}
    </div>
  );
}
