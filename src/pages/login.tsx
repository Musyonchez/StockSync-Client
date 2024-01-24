import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const LoginPage: React.FC = () => {
  const { data: session } = useSession();

  // Check if window is defined (client side)
  const isClient = typeof window !== "undefined";

  // Use effect to handle redirection after login
  useEffect(() => {
    if (isClient) {
      // Redirect to home if user is already signed in
      if (session && session.user) {
        window.location.href = "/";
      }
    }
  }, [session, isClient]);

  // Handle login logic
  const handleLogin = async () => {
    await signIn();
    // Redirect after login (useEffect will handle the redirection)
  };

  return (
    <div>
      {/* Your login page content */}
      <button
        onClick={handleLogin}
        className="whitespace-nowrap border-black dark:border-white border-2 sm:border-0 p-2 mb-2 sm:mb-0"
      >
        Log in
      </button>
    </div>
  );
};

export default LoginPage;
