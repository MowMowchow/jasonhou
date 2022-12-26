"use client";

import Link from "next/link";
import {
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from "../../config/settings";

export default function Footer() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 w-8/12">
        <div className="flex justify-center">
          <ul className="text-normal font-poppins list-none leading-loose">
            <li>
              <Link href={"/employment"}>resume</Link>
            </li>
            <li>
              <Link href={"/employment"}>projects</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="text-normal list-none leading-loose">
            <li>
              <Link href={GITHUB_PROFILE_URL}>github</Link>
            </li>
            <li>
              <Link href={LINKEDIN_PROFILE_URL}>linkedin</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="text-normal list-none leading-loose">
            <li>
              <Link href={"/dump"}>blog</Link>
            </li>
            <li>
              <Link href={"/???"}>arcade</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="text-normal list-none leading-loose">
            <li>
              <Link href={"/???"}>???</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
