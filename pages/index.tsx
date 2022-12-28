import Image from "next/image";
import Footer from "../app/client/footer";
import Nav from "../app/client/nav";

const navigation = [
  { name: "info", href: "", hoverColor: "bg-indigo-500" },
  { name: "dump", href: "dump", hoverColor: "bg-sky-500" },
  { name: "employment", href: "employment", hoverColor: "bg-emerald-500" },
  { name: "???", href: "???", hoverColor: "bg-rose-500" },
];

export default function Info() {
  return (
    <div className="mx-10 grid grid-cols-1">
      <Nav />
      <div className="m-0 sm:m-4 md:m-16" />
      <div>
        <div className="flex flex-row justify-center">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-row justify-center w-full">
                <div className="hidden md:visible relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 md:flex md:justify-center rounded-full">
                  <Image
                    src="/he_cycling.png"
                    alt="Picture of the something nice"
                    fill
                    style={{ objectFit: "cover", borderRadius: ".5rem" }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-start mb-16 md:m-0">
                  <div className="relative">
                    <div className="absolute bottom-1 md:bottom-4 left-0">
                      <h3 className="text-normal">{"Hi! I'm"}</h3>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl">
                      {"Jason Hou"}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <div className="md:hidden relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex justify-center">
                    <Image
                      src="/he_cycling.png"
                      alt="Picture of the something nice"
                      fill
                      style={{ objectFit: "cover", borderRadius: ".5rem" }}
                    />
                  </div>
                </div>
                <div className="mt-16 md:mt-12">
                  <p className="text-normal">
                    {
                      "When I'm not writing code I'm riding my bike, when I'm not riding my bike I'm"
                    }
                  </p>
                  <ul className="text-normal list-none list-inside">
                    <li>{"- interested in databases and cloud infra"}</li>
                    <li>
                      {"- skilled at AWS, typescript, golang, python... (more)"}
                    </li>
                    <li>{"- listening to something that sounds cool"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
