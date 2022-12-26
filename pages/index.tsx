import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "info", href: "" },
  { name: "dump", href: "dump" },
  { name: "employment", href: "employment" },
  { name: "???", href: "???" },
];

export default function Example() {
  return (
    <div className="grid grid-cols-1">
      <div className="m-10" />
      <div className="flex justify-center">
        <Popover className="md:w-7/12 lg:w-2/5">
          <nav>
            <div className="hidden md:flex md:justify-around">
              {navigation.map((item) => (
                <div className="px-2 py-1 rounded-lg transition ease-in-out delay-75 hover:bg-purple-500 duration-700">
                  <Link
                    href={item.href}
                    className="font-poppins font-normal text-2xl hover:text-white duration-500"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="md:hidden flex justify-end">
              <Popover.Button className="outline-none">
                <div className="px-2 py-1 rounded-lg transition ease-in-out delay-75 hover:bg-teal-500 duration-700 ">
                  <h1 className="font-poppins font-normal text-3xl hover:text-white duration-500">
                    more+
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
            <Popover.Panel className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-end px-5 pt-4">
                  <Popover.Button className="outline-none">
                    <div className="px-2 py-1 rounded-lg transition ease-in-out delay-75 hover:bg-teal-500 duration-700 ">
                      <h1 className="font-poppins font-normal text-3xl hover:text-white duration-500">
                        <XMarkIcon className="h-6 w-6" />
                        {/* more+ */}
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
      <div className="m-32" />
      <div className="flex justify-center">
        <div className="grid grid-cols-2">
          {/* <div className="relative w-full h-full flex flex-row justify-center"> */}
          {/* <div className="relative w-full h-full flex flex-col justify-center"> */}
          <div className="relative w-96 h-96">
            <Image
              src="/he_cycling.png"
              alt="Picture of the something nice"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-start">
              <div>
                <div className="relative">
                  <div className="absolute bottom-4 left-0">
                    <h3 className="">Hi I'm,</h3>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl">
                    Jason Hou
                  </h1>
                </div>
              </div>
              <div className="mt-12">
                <p>
                  When I'm not writing code I'm biking, when I'm not biking I'm
                </p>
                <p>- interested in databases and cloud infra</p>
                <p>- skilled at AWS, typescript, golang, python... (more )</p>

                <p>- listening to (do actual spotify)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
