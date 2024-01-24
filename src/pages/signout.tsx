import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to home if user is not signed in
  if (!session || !session.user) {
    router.push("/");
    return null;
  }

  // Handle logout logic
  const handleLogout = async () => {
    await signOut();
    // Optionally, you can redirect the user after logout
    router.push("/");
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
