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
  const [error, setError] = useState<string | null>(null);

  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (isClient) {
      if (session && session.user) {
        window.location.href = "/";
      }
    }
  }, [session, isClient, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      company,
    })
      .then(() => {
        if (isClient) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setError(
          "Invalid credentials. Please check your email, password, and company."
        );
      });
  };

  return (
    <div className=" flex flex-col h-screen">
      <HorizontalNavbar />
      <div className="flex-grow dark:bg-gray-800 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-700 p-8 rounded-lg w-full h-full flex flex-col justify-center items-center"
        >
          <label className=" flex flex-col text-sm font-medium text-gray-700 dark:text-white w-full sm:w-96">
            Email:
            <input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full sm:w-96"
            />
          </label>
          <br/>
          <label className=" flex flex-col text-sm font-medium text-gray-700 dark:text-white w-full sm:w-96">
            Company:
            <input
              type="text"
              value={company}
              required
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full sm:w-96"
            />
          </label>
          <br/>
          <label className=" flex flex-col text-sm font-medium text-gray-700 dark:text-white w-full sm:w-96">
            Password:
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full sm:w-96"
            />
          </label>
          <br/>
          <button
            type="submit"
            className="mt-4 p-2 bg-emerald-500 text-white rounded-md dark:bg-emerald-700 w-full sm:w-96"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
