import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function LogoutPage() {
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
    // Redirect after logout (useEffect will handle the redirection)
  };

  return (
    <div>
      {/* Your logout page content */}
      <button
        onClick={handleLogout}
        className="bg-red-500 sm:rounded-md p-2 whitespace-nowrap w-full text-center"
      >
        Sign out
      </button>
    </div>
  );
}
