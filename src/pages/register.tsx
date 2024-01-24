import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

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

  // Handle registration logic
  const handleRegister = async () => {
    await signIn();
    // Redirect after registration (useEffect will handle the redirection)
  };

  return (
    <div>
      {/* Your registration page content */}
      <button
        onClick={handleRegister}
        className="bg-emerald-300 sm:rounded-md p-2 sm:ml-3"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
