import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to home if user is already signed in
  if (session && session.user) {
    router.push("/");
    return null;
  }

  // Handle register logic
  const handleRegister = async () => {
    await signIn();
    // Optionally, you can redirect the user after registration
    router.push("/");
  };

  return (
    <div>
      {/* Your register page content */}
      <button
        onClick={handleRegister}
        className="bg-emerald-300 sm:rounded-md p-2 sm:ml-3"
      >
        Register
      </button>
    </div>
  );
}
