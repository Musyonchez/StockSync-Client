import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import HorizontalNavbar from "@/components/HorizontalNavbar";

const LogoutPage: React.FC = () => {
  const { data: session } = useSession();

  // Check if window is defined (client side)
  const isClient = typeof window !== "undefined";

  // Use effect to handle redirection after logout
  useEffect(() => {
    if (isClient) {
      // Redirect to home if user is not signed in
      if (!session || !session.user) {
        window.location.href = "/";
      }
    }
  }, [session, isClient]);

  // Handle logout logic
  const handleLogout = async () => {
    await signOut();
    if (isClient) {
      // Redirect to home if user is not signed in
      if (!session || !session.user) {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <HorizontalNavbar />
    <div className="dark:bg-gray-800 h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg text-center">
        <p className="text-2xl font-semibold mb-4">Logout Confirmation</p>
        <p className="text-lg mb-4">
          Are you sure you want to sign out? Click the button below to confirm.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 sm:rounded-md p-2 whitespace-nowrap w-full text-center text-white"
        >
          Sign out
        </button>
      </div>
    </div>
    </>
  );
};

export default LogoutPage;
