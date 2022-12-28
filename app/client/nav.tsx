"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "info", href: "/", hoverColor: "hover:bg-indigo-500" },
  { name: "dump", href: "dump", hoverColor: "hover:bg-sky-500" },
  {
    name: "employment",
    href: "employment",
    hoverColor: "hover:bg-emerald-500",
  },
  { name: "???", href: "extras", hoverColor: "hover:bg-rose-500" },
];
export default function Nav() {
  return (
    <>
      <div className="m-2 md:m-8" />
      <div className="flex justify-end md:justify-center">
        <Popover className="md:w-7/12 lg:w-2/5">
          <nav>
            <div className="hidden md:flex md:justify-around">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className={`px-2 py-1 rounded-lg transition ease-in-out delay-75 ${item.hoverColor} hover:text-white hover:shadow-lg duration-200`}
                >
                  <Link
                    href={item.href}
                    className="font-poppins font-normal text-2xl"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="md:hidden mx-10 my-7 md:m-0">
              <Popover.Button className="outline-none">
                <div className="px-2 py-1 rounded-lg transition ease-in-out delay-75 hover:bg-indigo-500 hover:text-white duration-200 ">
                  <h1 className="font-poppins font-normal text-2xl">
                    {"more+"}
                  </h1>
                </div>
              </Popover.Button>
            </div>
          </nav>
          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="md:hidden absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition">
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-end px-5 pt-4">
                  <Popover.Button className="outline-none">
                    <div className="px-2 py-1 rounded-lg transition ease-in-out delay-75 hover:bg-teal-500 hover:text-white duration-200 ">
                      <h1 className="font-poppins font-normal text-3xl">
                        <XMarkIcon className="h-6 w-6" />
                      </h1>
                    </div>
                  </Popover.Button>
                </div>
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
}
