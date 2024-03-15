import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          // Redirect to the previous page or home if no previous page is stored
          const previousPage = sessionStorage.getItem("previousPage");
          if (previousPage) {
            window.location.href = previousPage;
          } else {
            window.location.href = "/";
          }
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        // Handle the error and stay on the login page
        console.error("Login failed:", error);
        // Optionally, display an error message to the user
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
          <br />
          <label className="flex flex-col text-sm font-medium text-gray-700 dark:text-white w-full sm:w-96">
            Password:
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border dark:border-gray-600 rounded-md w-full sm:w-96"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </label>
          <br />
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
          <br />
          <p className="text-lg mb-4 text-center">
            Have you{" "}
            <Link
              href="/recover"
              className="text-emerald-500 dark:text-emerald-400 underline"
            >
              forgotten your password
            </Link>
            .
          </p>
          <br />
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
