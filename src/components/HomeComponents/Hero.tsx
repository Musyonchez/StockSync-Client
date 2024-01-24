import React from "react";
import Image from "next/image";
import Link from "next/link";
import hero_image from "../../../public/hero-image.svg";
import { useSession, signIn, signOut } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col flex-1 justify-center items-center lg:items-start lg:ml-16">
        <h1 className="font-bold sm:text-6xl text-2xl text-center lg:text-start text-emerald-500 dark:text-white mb-4">
          Elevate your{" "}
          <span>
            <br />
          </span>{" "}
          Inventory{" "}
          <span className="max-lg:hidden">
            <br />
          </span>{" "}
          Management
        </h1>
        <p className="text-emerald-800 dark:text-white max-lg:px-5 lg:w-96 lg:pr-10 text-center lg:text-start mb-2">
          &ldquo;Are you grappling with the complexities of inventory
          management? Bid farewell to manual tracking and embrace StockSync
          Innovations - the epitome of seamless inventory management.&rdquo;
        </p>
        <div className="space-x-5">
          <Link href="/pricing">
            <button className="bg-white dark:bg-black rounded-3xl py-2 px-4 border-black dark:border-white border-2">
              Contact Us
            </button>
          </Link>
            <button
              onClick={() => signIn()}
              className="bg-emerald-300 rounded-3xl py-2 px-6"
            >
              Register
            </button>
        </div>
      </div>
      <div className="flex flex-1.5">
        <Image className="mx-auto" src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
