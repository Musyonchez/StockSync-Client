import React from "react";
import Image from "next/image";
import Link from "next/link";
import hero_image from "../../../public/why_image.svg";
import { useSession, signIn, signOut } from "next-auth/react";

const Why = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col lg:flex-row-reverse pt-10">
      <div className="flex flex-col flex-1 justify-center items-center lg:items-start lg:ml-16">
        <h1 className="font-bold sm:text-6xl text-2xl text-center lg:text-start text-emerald-500 dark:text-white mb-4">
          Why
          <span>
            <br />
          </span>
          StockSync
          <span className="max-lg:hidden">
            <br />
          </span>
          Innovations?
        </h1>
        <p className="text-emerald-800 dark:text-white max-lg:px-5 lg:w-96 lg:pr-10 text-center lg:text-start mb-2">
          &ldquo;Experience effortless control and real-time insights with
          StockSync Innovations, offering a user-friendly interface and
          customizable reports to elevate your inventory management to new
          heights.&rdquo;
        </p>
        <div className="space-x-5">
          <Link href="/contact">
            <button className="bg-white dark:bg-black rounded-3xl py-2 px-4 border-black dark:border-white border-2">
              Learn more &rarr;
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-1">
        <Image className="mx-auto" src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Why;
