import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginSection() {
  const { data: session } = useSession();

  if (session) {
    // Check if session.user is defined before accessing its properties
    if (session.user) {
      return (
       <Link href="/signout">
        <button
          className=" bg-red-500 sm:rounded-md p-2 whitespace-nowrap w-full text-center"
        >
          Sign out
        </button></Link>
      );
    }
  }

  return (
    <div className=" flex-col flex sm:flex-row w-full text-center">
     <Link href="/login"> <button
        className="whitespace-nowrap border-black dark:border-white border-2 sm:border-0 p-2 mb-2 sm:mb-0"
      >
        Log in
      </button></Link>
     <Link href="/register"> <button
        className=" bg-emerald-300 sm:rounded-md p-2 sm:ml-3"
      >
        Register
      </button></Link>
    </div>
  );
}

// import { useSession, signIn, signOut } from "next-auth/react"

// type SessionUser = {
//  id?: string;
//  name?: string | null | undefined;
//  email?: string | null | undefined;
//  image?: string | null | undefined;
//  firstName?: string | null | undefined;
//  token?: string | null | undefined;
// }

// type DefaultSession = {
//  user?: SessionUser | undefined;
// }

// // Custom hook to get the session with correct types
// function useTypedSession() {
//  const { data: session } = useSession();

//  if (session && session.user) {
//     // Check if session.user is defined before accessing its properties
//     const user: SessionUser = session.user;
//     return { session: { ...session, user }, user };
//  }

//  return { session, user: undefined };
// }

// export default function LoginSection() {
//  const { session, user } = useTypedSession();

//  if (session) {
//     // Check if session.user is defined before accessing its properties
//     if (user) {
//       return (
//         <>
//           <button
//             onClick={() => signOut()}
//             className=" bg-red-500 sm:rounded-md p-2 whitespace-nowrap w-full text-center"
//           >Sign out</button>
//           <button
//             onClick={() => console.log(user.id, user.email, user.firstName, user.token)}
//             className="bg-blue-500 sm:rounded-md p-2 mt-2 whitespace-nowrap w-full text-center text-white"
//           >
//             Log User Data
//           </button>
//         </>
//       );
//     }
//  }

//  return (
//     <div className=" flex-col flex sm:flex-row w-full text-center">
//       <button onClick={() => signIn()} className="whitespace-nowrap border-black dark:border-white border-2 sm:border-0 p-2 mb-2 sm:mb-0">
//         Log in
//       </button>
//       <button onClick={() => signIn()} className=" bg-emerald-300 sm:rounded-md p-2 sm:ml-3">
//         Register
//       </button>
//     </div>
//  );
// }
