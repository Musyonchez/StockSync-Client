import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import HorizontalNavbar from "@/components/HorizontalNavbar";

const RegisterPage: React.FC = () => {
  const { data: session } = useSession();

  // Check if window is defined (client side)
  const isClient = typeof window !== "undefined";

  // Use effect to handle redirection after registration
  useEffect(() => {
    if (isClient) {
      // Redirect to home if user is already signed in
      if (session && session.user) {
        window.location.href = "/";
      }
    }
  }, [session, isClient]);

  return (
    <>
      <HorizontalNavbar />
    <div className="dark:bg-gray-800 h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg text-center">
        <p className="text-2xl font-semibold mb-4">Registration is not available.</p>
        <p className="text-lg mb-4">
          Unfortunately, you cannot register yourself. If you have an account, please{" "}
          <a href="/login" className="text-emerald-500 dark:text-emerald-400 underline">
            log in
          </a>
          .
        </p>
        <p className="text-lg mb-4">

        If you don't have an account, please contact your administrator or supervisor.
        </p>
        <p className="text-lg mb-4">
          If you are a business owner, please contact us at{" "}
          <a href="/contact" className="text-emerald-500 dark:text-emerald-400 underline">
            contact
          </a>
          .
        </p>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
