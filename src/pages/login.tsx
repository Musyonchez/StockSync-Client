import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to home if user is already signed in
  if (session && session.user) {
    router.push("/");
    return null;
  }

  // Handle login logic
  const handleLogin = async () => {
    await signIn();
    // Optionally, you can redirect the user after login
    router.push("/");
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
}
