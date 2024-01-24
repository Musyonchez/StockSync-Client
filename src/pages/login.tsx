import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HorizontalNavbar from "@/components/HorizontalNavbar";

const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null); // State for handling errors

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
  }, [session, isClient, router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Call the signIn function with credentials
    signIn("credentials", {
      email,
      password,
      company,
    })
      .then(() => {
        // Redirect to home after successful login
        if (isClient) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        // Handle and display the error
        setError("Invalid credentials. Please check your email, password, and company.");
      });
  };
  

  return (
    <>
      <HorizontalNavbar />
    <div className="dark:bg-gray-800 h-screen flex flex-col items-center justify-center">
    <form onSubmit={handleSubmit} className=" mx-auto my-auto bg-white dark:bg-gray-700 p-8 rounded-lg w-64 sm:w-96">
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        Email:
        <input
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full"
        />
      </label>
      <br />
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        Company:
        <input
          type="text"
          value={company}
          required
          onChange={(e) => setCompany(e.target.value)}
          className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full"
        />
      </label>
      <br />
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        Password:
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full"
        />
      </label>
      <br />
      <button
        type="submit"
        className="mt-4 p-2 bg-emerald-500 text-white rounded-md dark:bg-emerald-700 w-full"
      >
        Log in
      </button>
    </form>
  </div>
  </>
  );
};

export default LoginPage;
