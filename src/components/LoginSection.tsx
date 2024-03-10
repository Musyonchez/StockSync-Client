import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginSection() {
  const { data: session } = useSession();

  if (session) {
    if (session.user) {
      return (
        <div className=" flex-col flex w-full text-center">
          <Link href="/signout">
            <button className=" bg-red-500 md:rounded-md p-2 whitespace-nowrap w-full text-center">
              Sign out
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className=" flex-col flex md:flex-row w-full text-center">
      <Link href="/login">
        <button className="whitespace-nowrap max-md:w-full border-black dark:border-white border-2 md:border-0 p-2 mb-2 md:mb-0">
          Log in
        </button>
      </Link>
      <Link href="/register">
        <button className=" bg-emerald-300 max-md:w-full md:rounded-md p-2 md:ml-3">
          Register
        </button>
      </Link>
    </div>
  );
}
