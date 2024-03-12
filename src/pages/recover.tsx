import React, { useEffect, useState } from "react";
import { User } from "@/types/user";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordRecoveryEmailUserRequest } from "@/actions/users/sendPasswordRecoveryEmailUser";
import { updateNewPasswordRecoveryUserRequest } from "@/actions/users/updateNewPasswordRecoveryUser";
import { RootState } from "@/store/reducers/reducers";

const RecoverPassword = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [temporaryAccessKey, setTemporaryAccessKey] = useState("");
  const [isActiveButtonActive, setIsActiveButtonActive] = useState(true);
  const [isGetTemporaryAKActive, setIsGetTemporaryAKActive] = useState(false);
  const [timer, setTimer] = useState(90); // New state for the timer
  const store = "users";

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const sendpasswordrecoveryemailuser = useSelector(
    (state: RootState) => state.sendpasswordrecoveryemailuser.data
  );
  const loadingemail = useSelector(
    (state: RootState) => state.sendpasswordrecoveryemailuser.loading
  );
  const erroremail = useSelector(
    (state: RootState) => state.sendpasswordrecoveryemailuser.error
  );

  const recoverpassworduser = useSelector(
    (state: RootState) => state.updatenewpasswordrecoveryuser.data
  );
  const loadingpassword = useSelector(
    (state: RootState) => state.updatenewpasswordrecoveryuser.loading
  );
  const errorpassword = useSelector(
    (state: RootState) => state.updatenewpasswordrecoveryuser.error
  );

  const handleSendPasswordRecoveryEmail = async () => {
    console.log("Sending  email...");
    try {
      console.log(
        "sendPasswordRecoveryEmailUserRequest passed",
        email,
        company
      );
      if (email) {
        dispatch(sendPasswordRecoveryEmailUserRequest(email, company));
      } else {
        console.error(`session ID or Session Email is empty.`);
      }
    } catch (error) {
      console.error("Error sending Email:", error);
    }
  };

  const handleResetPassword = async () => {
    console.log("Resetting password...");

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      // Check if password and confirm password are not empty
      if (password.trim() && confirmPassword.trim()) {
        if (email) {
          // Check if userId is not undefined
          dispatch(
            updateNewPasswordRecoveryUserRequest(
              email,
              temporaryAccessKey,
              password,
              session?.user?.company,
              store // Assuming 'store' is the correct variable for the user type
            )
          );
        }
      } else {
        console.error(`Password or confirm password is empty.`);
      }
      // await signOut({ callbackUrl: "/" }); // Redirects to the homepage after signing out
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleGetTemporaryAccessKey = async () => {
    setIsActiveButtonActive(false);
    setIsGetTemporaryAKActive(true);

    // Start the timer
    setTimer(90); // Reset the timer to 90 seconds
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000); // Decrement the timer every second

    await new Promise((resolve) => setTimeout(resolve, 90000)); // Wait for 90 seconds
    clearInterval(timerId); // Clear the interval when done
    setIsActiveButtonActive(true);
  };


  return (
    <div className="flex flex-col h-screen">
      <HorizontalNavbar />

      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Welcome to <span className=" text-emerald-600">Soltace</span> First
            Time Password Reset
          </h2>

          <div className=" text-center">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-sm flex justify-start font-medium text-gray-600"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="company"
                className="text-sm flex justify-start font-medium text-gray-600"
              >
                Company:
              </label>
              <input
                type="company"
                id="company"
                value={company}
                required
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <p className={`${isGetTemporaryAKActive ? "flex" : "hidden"} mb-1`}>
              Checkk your email for a mesage with the Temporary Access Key
              attached
            </p>
            <button
              onClick={() => {
                handleGetTemporaryAccessKey();
                handleSendPasswordRecoveryEmail();
              }}
              className={`${
                isActiveButtonActive
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white mb-1 px-4 py-2 rounded`}
              disabled={!isActiveButtonActive}
            >
              Get Temporary Access Key
            </button>
            <p
              className={`${
                isActiveButtonActive ? " hidden" : " cursor-not-allowed"
              } text-black rounded`}
            >
              Resend in {timer}s
            </p>
          </div>

          <div
            className={`${
              isGetTemporaryAKActive ? "flex" : "hidden"
            } flex flex-col`}
          >
            {" "}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                New Password:
              </label>
              <div className=" relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm Password:
              </label>
              <div className=" relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button
              onClick={handleSendPasswordRecoveryEmail}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
