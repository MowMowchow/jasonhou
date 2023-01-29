"use client";

import Link from "next/link";
import {
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from "../../config/settings";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="m-8 md:mt-36 md:mb-24 flex justify-center">
        <h1>{"~~~~~~   ~~~~~~"}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:w-5/12 w-7/12">
          <div className="flex justify-center">
            <ul className="text-normal font-poppins list-none leading-loose">
              <li className="text-center">
                <Link href={"/resume.pdf"}>resume</Link>
              </li>
              <li className="text-center">
                <Link href={"/employment"}>projects</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="text-normal list-none leading-loose">
              <li className="text-center">
                <Link href={GITHUB_PROFILE_URL}>github</Link>
              </li>
              <li className="text-center">
                <Link href={LINKEDIN_PROFILE_URL}>linkedin</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="text-normal list-none leading-loose">
              <li className="text-center">
                <Link href={"/dump"}>blog</Link>
              </li>
              <li className="text-center">
                <Link href={"/???"}>arcade</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="text-normal list-none leading-loose">
              <li className="text-center">
                <Link href={"/arcade/fordle"}>???</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="m-10" />
    </div>
  );
}
