'use client';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';

const people = [
   { id: 1, name: '1 Months' },
   { id: 2, name: '2 Months' },
   { id: 3, name: '3 Months' },
   { id: 4, name: '4 Months' },
   { id: 5, name: '5 Months' },
   { id: 6, name: '6 Months' },
];

export default function ComboDropdownList({ width }) {
   const [selected, setSelected] = useState(people[0]);
   const [query, setQuery] = useState('');

   const filteredPeople =
      query === ''
         ? people
         : people.filter((person) =>
              person.name
                 .toLowerCase()
                 .replace(/\s+/g, '')
                 .includes(query.toLowerCase().replace(/\s+/g, ''))
           );

   return (
      <div className={`${width}`}>
         <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
               <div className="relative w-full cursor-default overflow-hidden text-left shadow-sm sm:text-sm  rounded-lg dark:border-form-strokedark dark:bg-form-input dark:shadow-none">
                  <Combobox.Input
                     className="w-full border-none py-3.5 pl-3 pr-10 text-sm leading-5  focus:ring-0  tv appearance-none border border-brand-tertiary rounded  text-whiten  focus:outline-none focus:shadow-outline bg-dark-blue2 dark:text-white  dark:border-form-strokedark dark:bg-form-input dark:shadow-none"
                     displayValue={(person) => person.name}
                     onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
                     <svg
                        className="fill-cyan-500 dark:fill-slate-300"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M12.8324 12.4523C12.8855 12.5054 12.9277 12.5684 12.9564 12.6378C12.9852 12.7071 13 12.7815 13 12.8566C13 12.9316 12.9852 13.006 12.9564 13.0754C12.9277 13.1447 12.8855 13.2077 12.8324 13.2608L9.40418 16.689C9.35112 16.7422 9.2881 16.7843 9.21874 16.8131C9.14937 16.8418 9.07502 16.8566 8.99993 16.8566C8.92485 16.8566 8.8505 16.8418 8.78113 16.8131C8.71177 16.7843 8.64875 16.7422 8.59569 16.689L5.16744 13.2608C5.06023 13.1536 5 13.0082 5 12.8566C5 12.7049 5.06023 12.5595 5.16744 12.4523C5.27466 12.3451 5.42007 12.2849 5.57169 12.2849C5.72331 12.2849 5.86873 12.3451 5.97594 12.4523L8.99993 15.477L12.0239 12.4523C12.077 12.3992 12.14 12.357 12.2094 12.3283C12.2787 12.2995 12.3531 12.2847 12.4282 12.2847C12.5033 12.2847 12.5776 12.2995 12.647 12.3283C12.7163 12.357 12.7794 12.3992 12.8324 12.4523ZM5.97594 6.40431L8.99993 3.3796L12.0239 6.40431C12.1311 6.51153 12.2766 6.57176 12.4282 6.57176C12.5798 6.57176 12.7252 6.51153 12.8324 6.40431C12.9396 6.2971 12.9999 6.15169 12.9999 6.00007C12.9999 5.84844 12.9396 5.70303 12.8324 5.59582L9.40418 2.16758C9.35112 2.11445 9.2881 2.07231 9.21874 2.04355C9.14937 2.0148 9.07502 2 8.99993 2C8.92485 2 8.8505 2.0148 8.78113 2.04355C8.71177 2.07231 8.64875 2.11445 8.59569 2.16758L5.16744 5.59582C5.06023 5.70303 5 5.84844 5 6.00007C5 6.15169 5.06023 6.2971 5.16744 6.40431C5.27466 6.51153 5.42007 6.57176 5.57169 6.57176C5.72331 6.57176 5.86873 6.51153 5.97594 6.40431Z" />
                     </svg>
                  </Combobox.Button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
               >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-whiten dark:bg-form-strokedark py-1 text-base shadow_sm  ring-1  focus:outline-none sm:text-sm z-99999">
                     {filteredPeople.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-blue-800">
                           Nothing found.
                        </div>
                     ) : (
                        filteredPeople?.length > 0 &&
                        filteredPeople.map((person) => (
                           <Combobox.Option
                              key={person.id}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                       ? 'bg-blue-200 dark:bg-boxdark-2 text-blue-900'
                                       : 'text-gray-900 dark:text-slate-400'
                                 }`
                              }
                              value={person}
                           >
                              {({ selected, active }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected
                                             ? 'font-medium'
                                             : 'font-normal '
                                       }`}
                                    >
                                       {person.name}
                                    </span>
                                    {selected ? (
                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                          <svg
                                             /* className={`${
                                active
                                  ? "fill-white"
                                  : "fill-blue-700 dark:fill-whiten"
                              }`} */
                                             xmlns="http://www.w3.org/2000/svg"
                                             height="16"
                                             width="14"
                                             viewBox="0 0 448 512"
                                          >
                                             <path
                                                fill="#1e40af"
                                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                             />
                                          </svg>
                                       </span>
                                    ) : null}
                                 </>
                              )}
                           </Combobox.Option>
                        ))
                     )}
                  </Combobox.Options>
               </Transition>
            </div>
         </Combobox>
      </div>
   );
}
