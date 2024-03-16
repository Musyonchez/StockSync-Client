import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/DynamicSaasPages/ThemeSwitch2";
import Image from "next/image";
import logo_black from "../../../public/logo-tower-black.png";
import logo_white from "../../../public/logo-tower-white.png";
import Link from "next/link";
import { useRouter } from "next/router";
import emptyUser from "../../../public/emptyUser.jpeg";

import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import SuccessMessagePopup from "@/components/EventHandling/SuccessMessagePopup";

const VerticalNavbar = () => {
  const { data: session } = useSession();
  const company = session?.user?.company;
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [changeLogo, setChangeLogo] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [changeProfile, setChangeProfile] = useState(false);
  const [profile, setProfile] = useState<File | null>(null);

  const [logoMessage, setLogoMessage] = useState("");
  const [showLogoError, setShowLogoError] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [showProfileError, setShowProfileError] = useState(false);

  const [successLogoMessage, setSuccessLogoMessage] = useState("");
  const [showLogoSuccess, setShowLogoSuccess] = useState(false);

  const [successProfileMessage, setSuccessProfileMessage] = useState("");
  const [showProfileSuccess, setShowProfileSuccess] = useState(false);

  const router = useRouter();
  const { store } = router.query;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setSideMenuVisible(!isSideMenuVisible);
  };

  const handleLogoUpload = async () => {
    try {
      if (session?.user?.role === "ADMIN") {
        if (logo) {
          const formData = new FormData();
          const company = session?.user?.company;

          // Append the file with the desired name
          formData.append("file", logo, company);

          if (company) {
            formData.append("company", company);
          } else {
            // Handle the case where company is undefined
            // For example, you might want to skip appending it or provide a default value
            setLogoMessage("Company is undefined, skipping append operation");
            setShowLogoError(true);
          }

          const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            const errorMessage = await response.text();
            setLogoMessage(errorMessage);
            setShowLogoError(true);
          } else {
            setSuccessLogoMessage("Upload successful");
            setShowLogoSuccess(true);
          }
        }
      } else {
        setLogoMessage("You dont have the authority");
        setShowLogoError(true);
      }
    } catch (error) {
      setLogoMessage("Error uploading image: " + (error as Error).message);
      setShowLogoError(true);
    }
  };

  const handleProfileUpload = async () => {
    try {
      if (profile) {
        const formData = new FormData();
        const userId = session?.user?.id;

        // Append the file with the desired name
        formData.append("file", profile, userId);

        if (company) {
          formData.append("company", company);
        } else {
          // Handle the case where company is undefined
          // For example, you might want to skip appending it or provide a default value
          setProfileMessage("Company is undefined, skipping append operation");
          setShowProfileError(true);
        }

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          setProfileMessage(errorMessage);
          setShowProfileError(true);
        } else {
          setSuccessProfileMessage("Upload successful");
          setShowProfileSuccess(true);
        }
      }
    } catch (error) {
      setProfileMessage("Error uploading image:" + (error as Error).message);
      setShowProfileError(true);
    }
  };

  return (
    <>
      <div
        className={`sm:flex hidden ${
          isSideMenuVisible ? "fixed" : "relative"
        } sm:flex-col pt-2 pl-2 sm:min-w-40 bg-gray-100 dark:bg-black h-screen overflow-x-hidden overflow-y-auto scrollbar`}
      >
        <div className=" flex items-center justify-between">
          <div className="w-60 h-34 mb-2">
            <Link href="/">
              {mounted && (
                <>
                  {resolvedTheme === "dark" ? (
                    <Image
                      src={logo_white}
                      alt="Logo for dark theme"
                      width={120}
                      height={60}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  ) : (
                    <Image
                      src={logo_black}
                      alt="Logo for a white theme"
                      width={120}
                      height={60}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                </>
              )}
            </Link>
          </div>
          <div>
            {session?.user?.role === "ADMIN" && (
              <button onClick={() => setChangeLogo(true)} className="p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {changeLogo && (
          <div
            className=" absolute py-10 bg-slate-100 dark:bg-black p-2"
            style={{ width: "295px" }}
          >
            <div className=" flex justify-between items-center">
              <h1 className=" text-xl font-bold">Logo Change</h1>
              <button onClick={() => setChangeLogo(false)}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              ></label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="logo"
                id="logo"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                placeholder="Enter New Logo"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <button
                onClick={handleLogoUpload}
                className=" bg-green-500 w-full py-2 rounded-md text-xl font-bold text-slate-100 "
              >
                Change logo
              </button>
            </div>
          </div>
        )}
        <div className="mb-4">
          <hr className="mb-3" />
          <h1 className="capitalize font-bold text-lg">{store}</h1>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className="mb-2">Manage</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/dashboard`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                <p>Dashboard</p>
              </li>
            </Link>
            <Link href={`/${store}/products`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>Products</p>
              </li>
            </Link>
            <Link href={`/${store}/orders`}>
              <li className=" flex space-x-3">
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M280 240a8 8 0 01-8-8V48h-57.25a65.42 65.42 0 00-6.5-9.81C196.72 23.88 179.59 16 160 16c-37.68 0-64 29.61-64 72v144c0 25 20.34 40 40 40a39.57 39.57 0 0040-40V80h-32v152a7.75 7.75 0 01-8 8c-2.23 0-8-1.44-8-8V88c0-19.34 8.41-40 32-40 29.69 0 32 30.15 32 39.38v138.75c0 17.45-5.47 33.23-15.41 44.46C166.5 282 152.47 288 136 288s-30.5-6-40.59-17.41C85.47 259.36 80 243.58 80 226.13V144H48v82.13c0 51.51 33.19 89.63 80 93.53V468a12 12 0 0012 12h312a12 12 0 0012-12V240z" />
                  <path d="M308 208h146.31a2 2 0 001.42-3.41L307.41 56.27a2 2 0 00-3.41 1.42V204a4 4 0 004 4z" />
                </svg>
                <p>Orders</p>
              </li>
            </Link>

            <Link href={`/${store}/invoice`}>
              <li className=" flex space-x-3">
                <svg
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1 8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3-8.4-.1-17.4 1.8-23.6 5.5-5.7 3.4-8.1 7.3-8.1 12.8 0 3.7 1.3 6.5 7.3 10.1 6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6 12.1 7.6 22.4 19.7 22.7 38.2.3 19.3-9.6 33.3-22.9 41.6-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9-2.1-.7-4.2-1.4-6.2-2.1-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4 13.6 4.6 24.6 8.4 36.3 8.7 9.1.3 17.9-1.7 23.7-5.3 5.1-3.2 7.9-7.3 7.8-14-.1-4.6-1.8-7.8-7.7-11.6-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7-12-7.2-22.6-18.9-22.7-37.3-.1-19.4 10.8-32.8 23.8-40.5 7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z" />
                </svg>
                <p>Invoice</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Actions</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/actions/selling`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <p>Selling</p>
              </li>
            </Link>
            <Link href={`/${store}/actions/writeoffs`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6 w-6"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                </svg>
                <p>Writeoffs</p>
              </li>
            </Link>
            <Link href={`/${store}/actions/restocking`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-6 w-6"
                >
                  <path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" />
                </svg>
                <p>Restocking</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Records</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/records/transactions`}>
              <li className=" flex space-x-3">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M668.6 320c0-4.4-3.6-8-8-8h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 00-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.5-1.1.9-2.4.9-3.7zM157.9 504.2a352.7 352.7 0 01103.5-242.4c32.5-32.5 70.3-58.1 112.4-75.9 43.6-18.4 89.9-27.8 137.6-27.8 47.8 0 94.1 9.3 137.6 27.8 42.1 17.8 79.9 43.4 112.4 75.9 10 10 19.3 20.5 27.9 31.4l-50 39.1a8 8 0 003 14.1l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3l-47.8 37.4C770.7 146.3 648.6 82 511.5 82 277 82 86.3 270.1 82 503.8a8 8 0 008 8.2h60c4.3 0 7.8-3.5 7.9-7.8zM934 512h-60c-4.3 0-7.9 3.5-8 7.8a352.7 352.7 0 01-103.5 242.4 352.57 352.57 0 01-112.4 75.9c-43.6 18.4-89.9 27.8-137.6 27.8s-94.1-9.3-137.6-27.8a352.57 352.57 0 01-112.4-75.9c-10-10-19.3-20.5-27.9-31.4l49.9-39.1a8 8 0 00-3-14.1l-156.8-38.3c-5-1.2-9.9 2.6-9.9 7.7l-.8 161.7c0 6.7 7.7 10.5 12.9 6.3l47.8-37.4C253.3 877.7 375.4 942 512.5 942 747 942 937.7 753.9 942 520.2a8 8 0 00-8-8.2z" />
                </svg>
                <p>Transactions</p>
              </li>
            </Link>
            <Link href={`/${store}/records/writeoffs`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6 w-6"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                </svg>
                <p>Writeoffs</p>
              </li>
            </Link>
            <Link href={`/${store}/records/restockings`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="h-6 w-6"
                >
                  <path d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z" />
                </svg>
                <p>Restocking</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Preferences</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <li>
              <ThemeSwitch />
            </li>
            <Link href={`/${store}/preferences/FAQ`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                <p>FAQ</p>
              </li>
            </Link>
            <Link href={"/signout"}>
              {" "}
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Log out</p>
              </li>
            </Link>
          </ul>
        </div>
        {session?.user?.role === "ADMIN" && (
          <div className="mb-4">
            <hr className="mb-5" />
            <h2 className="mb-2">Admin</h2>
            <ul className="ml-2 flex flex-col space-y-2">
              <Link href={`/${store}/admin/users`}>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <p>Users</p>
                </li>
              </Link>
              <Link href={`/${store}/admin/products`}>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Products</p>
                </li>
              </Link>
            </ul>
          </div>
        )}

        {mounted && (
          <div className="mb-4 relative">
            <hr className="mb-5" />
            <div className="flex w-full justify-between items-center">
              <img
                src={session?.user?.imageURL}
                alt="Product Image"
                className="w-24 h-24"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = emptyUser.src;
                }}
              />
              <div>
                <button onClick={() => setChangeProfile(true)} className="p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p className="">
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <p>{session?.user?.role}</p>
            </div>
          </div>
        )}
        {showLogoError && (
          <ErrorMessagePopup
            message={logoMessage}
            onClose={() => setShowLogoError(false)}
          />
        )}
        {showProfileError && (
          <ErrorMessagePopup
            message={profileMessage}
            onClose={() => setShowProfileError(false)}
          />
        )}
        {showLogoSuccess && (
          <SuccessMessagePopup
            message={successLogoMessage}
            onClose={() => setShowLogoSuccess(false)}
          />
        )}
        {showProfileSuccess && (
          <SuccessMessagePopup
            message={successProfileMessage}
            onClose={() => setShowProfileSuccess(false)}
          />
        )}
      </div>
      {changeProfile && (
        <div
          className=" absolute bottom-0 left-0 py-10 bg-slate-100 dark:bg-black p-2"
          style={{ width: "295px" }}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" text-xl font-bold">Profile Change</h1>
            <button onClick={() => setChangeProfile(false)}>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
            ></label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              name="profile"
              id="profile"
              onChange={(e) => setProfile(e.target.files?.[0] || null)}
              placeholder="Enter New profile"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              onClick={handleProfileUpload}
              className=" bg-green-500 w-full py-2 rounded-md text-xl font-bold text-slate-100 "
            >
              Change profile
            </button>
          </div>
        </div>
      )}

      <div
        className={`sm:flex-col ${
          isSideMenuVisible ? "flex" : "hidden"
        } flex-col sm:flex-col p-10 mt-4 w-screen`}
      >
        <div className=" flex items-center justify-between">
          <div className="w-60 h-34 mb-2">
            <Link href="/">
              {mounted && (
                <>
                  {resolvedTheme === "dark" ? (
                    <Image
                      src={logo_white}
                      alt="Logo for dark theme"
                      width={120}
                      height={60}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  ) : (
                    <Image
                      src={logo_black}
                      alt="Logo for a white theme"
                      width={120}
                      height={60}
                      priority
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                </>
              )}
            </Link>
          </div>
          <div>
            <button onClick={() => setChangeLogo(true)} className="p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        {changeLogo && (
          <div
            className=" absolute px-2 py-10 w-full bg-slate-100 dark:bg-black"
            // style={{ width: "495px" }}
          >
            <div className=" flex justify-between items-center">
              <h1 className=" text-xl font-bold">Logo Change</h1>
              <button onClick={() => setChangeLogo(false)}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
              ></label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                name="logo"
                id="logo"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                placeholder="Enter New Logo"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <button
                onClick={handleLogoUpload}
                className=" bg-green-500 w-full py-2 rounded-md text-xl font-bold text-slate-100 "
              >
                Change logo
              </button>
            </div>
          </div>
        )}
        <div className="mb-4">
          <hr className="mb-5" />
          <h1 className="capitalize font-bold text-lg">{store}</h1>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className="mb-2">Manage</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/dashboard`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                <p>Dashboard</p>
              </li>
            </Link>
            <Link href={`/${store}/products`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>Products</p>
              </li>
            </Link>
            <Link href={`/${store}/orders`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                  />
                </svg>
                <p>Orders</p>
              </li>
            </Link>

            <Link href={`/${store}/invoice`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <p>Invoice</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Actions</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/actions/selling`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                <p>Selling</p>
              </li>
            </Link>
            <Link href={`/${store}/actions/writeoffs`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Writeoffs</p>
              </li>
            </Link>
            <Link href={`/${store}/actions/restocking`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Restocking</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Records</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <Link href={`/${store}/records/transactions`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                <p>Transactions</p>
              </li>
            </Link>
            <Link href={`/${store}/records/writeoffs`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Writeoffs</p>
              </li>
            </Link>
            <Link href={`/${store}/records/restockings`}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Restocking</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mb-4">
          <hr className="mb-5" />
          <h2 className=" mb-2">Preferences</h2>
          <ul className="ml-2 flex flex-col space-y-2">
            <li>
              <ThemeSwitch />
            </li>
            <Link href={`/${store}/preferences/FAQ`}>
              <li className=" flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
                <p>FAQ</p>
              </li>
            </Link>
            <Link href={"/signout"}>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Log out</p>
              </li>
            </Link>
          </ul>
        </div>
        {session?.user?.role === "ADMIN" && (
          <div className="mb-4">
            <hr className="mb-5" />
            <h2 className="mb-2">Admin</h2>
            <ul className="ml-2 flex flex-col space-y-2">
              <Link href={`/${store}/admin/users`}>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <p>Users</p>
                </li>
              </Link>
              <Link href={`/${store}/admin/products`}>
                <li className="flex space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Products</p>
                </li>
              </Link>
            </ul>
          </div>
        )}
        {mounted && (
          <div className="mb-4 relative">
            <hr className="mb-5" />
            <div className="flex w-full justify-between items-center">
              <img
                src={session?.user?.imageURL}
                alt="Product Image"
                className="w-24 h-24"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = emptyUser.src;
                }}
              />
              <div>
                <button onClick={() => setChangeProfile(true)} className="p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p className="">
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <p>{session?.user?.role}</p>
            </div>
          </div>
        )}
        {showLogoError && (
          <ErrorMessagePopup
            message={logoMessage}
            onClose={() => setShowLogoError(false)}
          />
        )}
        {showProfileError && (
          <ErrorMessagePopup
            message={profileMessage}
            onClose={() => setShowProfileError(false)}
          />
        )}
        {showLogoSuccess && (
          <SuccessMessagePopup
            message={successLogoMessage}
            onClose={() => setShowLogoSuccess(false)}
          />
        )}
        {showProfileSuccess && (
          <SuccessMessagePopup
            message={successProfileMessage}
            onClose={() => setShowProfileSuccess(false)}
          />
        )}
      </div>
      {changeProfile && (
        <div
          className=" absolute bottom-0 left-0 py-10 bg-slate-100 dark:bg-black p-2"
          style={{ width: "295px" }}
        >
          <div className=" flex justify-between items-center">
            <h1 className=" text-xl font-bold">Profile Change</h1>
            <button onClick={() => setChangeProfile(false)}>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-semibold dark:text-white text-gray-600 mb-1"
            ></label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              name="profile"
              id="profile"
              onChange={(e) => setProfile(e.target.files?.[0] || null)}
              placeholder="Enter New profile"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              onClick={handleProfileUpload}
              className=" bg-green-500 w-full py-2 rounded-md text-xl font-bold text-slate-100 "
            >
              Change profile
            </button>
          </div>
        </div>
      )}

      <button className="sm:hidden absolute top-1 right-2" onClick={toggleMenu}>
        {isSideMenuVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default VerticalNavbar;
