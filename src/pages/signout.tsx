import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import HorizontalNavbar from "@/components/HorizontalNavbar";

const LogoutPage: React.FC = () => {
  const { data: session } = useSession();

  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (isClient) {
      if (!session || !session.user) {
        window.location.href = "/";
      }
    }
  }, [session, isClient]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirects to the homepage after signing out
    if (isClient) {
      if (!session || !session.user) {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className=" flex flex-col h-screen">
      <HorizontalNavbar />
      <div className="dark:bg-gray-800 flex flex-col items-center justify-center h-full">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg text-center">
          <p className="text-2xl font-semibold mb-4">Logout Confirmation</p>
          <p className="text-lg mb-4">
            Are you sure you want to sign out? Click the button below to
            confirm.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 sm:rounded-md p-2 whitespace-nowrap w-full text-center text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
