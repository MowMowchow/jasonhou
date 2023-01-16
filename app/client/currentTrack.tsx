"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CurrentTrack,
  CurrentTrackResponse,
} from "../../internal/models/spotify";
import { setCustomTimeout } from "../../internal/utils";

// type currentTrackBlobProps = { show: Boolean };
export default function CurrentTrackBlob() {
  const artistCap = 3;
  let [currentTrackToggle, setCurrentTrackToggle] = useState<boolean>(false);
  let [currentTrack, setCurrentTrack] = useState<CurrentTrack>(
    {} as CurrentTrack
  );

  const getCurrentTrack = async () => {
    try {
      const response = await fetch(
        "https://z1y2tedpka.execute-api.us-east-1.amazonaws.com/dev/getCurrentTrack"
      );
      const responseBody: CurrentTrackResponse = await response.json();
      setCurrentTrack(responseBody.item);
      await setCustomTimeout(5);
      setCurrentTrackToggle((prevState) => !prevState);
    } catch (error) {
      console.log("ERROR FETCHING SPOTIFY INFO");
    }
  };
  useEffect(() => {
    getCurrentTrack();
  }, [currentTrackToggle]);

  return Object.keys(currentTrack).length > 0 && currentTrack?.name ? (
    <>
      <div className="mt-5 flex flex-row justify-center">
        <div className="rounded-lg shadow-lg bg-stone-200 px-2.5 py-1.5 w-fit">
          <div className="flex flex-row justify-start">
            <div className="mr-4">
              <div className="relative w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 md:flex md:justify-center shadow-md">
                <Image
                  src={
                    currentTrack?.album?.images?.[0].url
                      ? currentTrack.album.images?.[0].url
                      : ""
                  }
                  alt="Picture of the something nice"
                  fill
                  style={{ objectFit: "cover", borderRadius: ".1rem" }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1 text-sm text-stone-800">
              <ul className="transition ease-in-out delay-50 hover:text-rose-700">
                <Link
                  href={
                    currentTrack?.external_urls?.spotify
                      ? currentTrack.external_urls.spotify
                      : ""
                  }
                >
                  {currentTrack.name ? currentTrack.name : ""}
                </Link>
              </ul>
              <ul>
                {currentTrack.artists.map((artist, ind) =>
                  ind < artistCap ? (
                    <Link
                      key={artist.name}
                      href={
                        artist?.external_urls?.spotify
                          ? artist.external_urls.spotify
                          : ""
                      }
                    >
                      {artist?.name ? (
                        <li className="inline-block transition ease-in-out delay-50 hover:text-sky-600">
                          {artist.name}
                        </li>
                      ) : (
                        ""
                      )}
                      {ind < currentTrack.artists.length - 1 &&
                      ind < artistCap - 1
                        ? ", "
                        : ""}
                    </Link>
                  ) : (
                    <>{ind < currentTrack.artists.length - 1 ? "" : " ..."}</>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex flex-row justify-start">
        <div className="relative w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 md:flex md:justify-center bg-white">
          <Image
            src={"/drums.png"}
            alt="Picture of the something nice"
            fill
            style={{ objectFit: "cover", borderRadius: ".1rem" }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p>{"nothing at the moment"}</p>
        </div>
      </div>
    </>
  );
}
