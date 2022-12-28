import Image from "next/image";
import Footer from "../../app/client/footer";
import Nav from "../../app/client/nav";

const jobs = [
  {
    name: "Replicant",
    date: "Sep-Dec 2022",
    location: "Bay Area, SF",
    logo: "/replicant.png",
  },
  {
    name: "Trend Micro",
    date: "Jan-Apr 2022",
    location: "Ottawa, Canada",
    logo: "/trendmicro.png",
  },
  {
    name: "myKaarma",
    date: "May-Aug 2021",
    location: "Kitchener, Canada",
    logo: "/mykaarma.png",
  },
  {
    name: "Ascend Canada",
    date: "Jan-Apr 2020",
    location: "Toronto, Canada",
    logo: "/ascend.png",
  },
];

export default function Employment() {
  return (
    <div className="mx-10 grid grid-cols-1">
      <Nav />
      <div className="m-10" />
      <div className="flex justify-center">
        <div className="xs:11/12 sm:w-10/12 lg:w-7/12 2xl:w-5/12">
          <div>
            <div className="mb-9 flex flex-row justify-start gap-5">
              <div className="flex flex-col justify-center">
                <div className="w-fit pt-1 pb-2 px-2 rounded-lg bg-[#8A817C] shadow-lg">
                  <p className="w-fit text-5xl text-white">{"history"}</p>
                </div>
              </div>
              <div className="relative w-24 h-24 md:w-32 md:h-32 ml-2 flex justify-center rounded-full">
                <Image
                  src="/rocket.png"
                  alt="Picture of the something nice"
                  fill
                  style={{ objectFit: "contain", borderRadius: ".5rem" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              {jobs.map((job) => (
                <div key={job.name} className="mx-1">
                  <div className="flex flex-row justify-start">
                    <div className="m-1 mr-2">
                      <div className="relative w-10 h-10 lg:w-12 lg:h-12 md:flex md:justify-center rounded-full">
                        <Image
                          src={job.logo}
                          alt="Picture of the something nice"
                          fill
                          style={{ objectFit: "cover", borderRadius: ".5rem" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-row-2">
                      <div>
                        <h1 className="text-xl">{job.name}</h1>
                      </div>
                      <div>
                        <h1 className="text-l">{`${job.date} | ${job.location}`}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 ml-1">
                    <p className="text-md">
                      {
                        "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Let raset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                      }
                    </p>
                  </div>
                  <div className="m-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
