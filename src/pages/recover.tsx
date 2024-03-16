import React, { useEffect, useState } from "react";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordRecoveryEmailUserRequest } from "@/actions/users/sendPasswordRecoveryEmailUser";
import { updateNewPasswordRecoveryUserRequest } from "@/actions/users/updateNewPasswordRecoveryUser";
import { RootState } from "@/store/reducers/reducers";
import ErrorMessagePopup from "@/components/EventHandling/ErrorMessagePopup";
import LoadingMessagePopup from "@/components/EventHandling/LoadingMessagePopup";

const RecoverPassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [temporaryAccessKey, setTemporaryAccessKey] = useState("");
  const [isActiveButtonActive, setIsActiveButtonActive] = useState(true);
  const [isGetTemporaryAKActive, setIsGetTemporaryAKActive] = useState(false);
  const [timer, setTimer] = useState(90); // New state for the timer

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetMessage, setResetMessage] = useState("");
  const [showResetError, setShowResetError] = useState(false);

  const [sendRecoveryMessage, setSendRecoveryMessage] = useState("");
  const [showSendRecoveryError, setShowSendRecoveryError] = useState(false);

  const [
    showSendpasswordrecoveryemailuserError,
    setShowSendpasswordrecoveryemailuserError,
  ] = useState(true);
  const [
    showUpdatenewpasswordrecoveryuserError,
    setShowUpdatenewpasswordrecoveryuserError,
  ] = useState(true);

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
    try {
      if (email) {
        dispatch(sendPasswordRecoveryEmailUserRequest(email, company));
      } else {
        setSendRecoveryMessage(`session ID or Session Email is empty.`);
        setShowSendRecoveryError(true);
      }
    } catch (error) {
      setSendRecoveryMessage("Error sending Email:" + (error as Error).message);
      setShowSendRecoveryError(true);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setResetMessage("Passwords do not match");
      setShowResetError(true);
      return;
    }
    try {
      // Check if password and confirm password are not empty
      if (password.trim() && confirmPassword.trim()) {
        if (email) {
          try {
            dispatch(
              updateNewPasswordRecoveryUserRequest(
                email,
                temporaryAccessKey,
                password,
                company
              )
            );
          } catch (error) {
            setResetMessage(
              "Error resting password:" + (error as Error).message
            );
            setShowResetError(true);
          }
          setTemporaryAccessKey("");
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        setResetMessage(`Password or confirm password is empty.`);
        setShowResetError(true);
      }
      // await signOut({ callbackUrl: "/" }); // Redirects to the homepage after signing out
    } catch (error) {
      setResetMessage("Error resetting password:" + (error as Error).message);
      setShowResetError(true);
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
                placeholder="Enter your Email"
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
                placeholder="Enter your company name"
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
            <div className="mb-2">
              <label
                htmlFor="temporaryAccessKey"
                className="text-sm flex justify-start font-medium text-gray-600"
              >
                Temporary Access Key:
              </label>
              <input
                type="temporaryAccessKey"
                id="temporaryAccessKey"
                value={temporaryAccessKey}
                required
                onChange={(e) => setTemporaryAccessKey(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your Access Key"
              />
            </div>
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your New Password"
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
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Confirm your new password"
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
              onClick={handleResetPassword}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
      {erroremail && showSendpasswordrecoveryemailuserError && (
        <ErrorMessagePopup
          message={erroremail}
          onClose={() => setShowSendpasswordrecoveryemailuserError(false)}
        />
      )}
      {loadingemail && <LoadingMessagePopup />}
      {errorpassword && showUpdatenewpasswordrecoveryuserError && (
        <ErrorMessagePopup
          message={errorpassword}
          onClose={() => setShowUpdatenewpasswordrecoveryuserError(false)}
        />
      )}
      {loadingpassword && <LoadingMessagePopup />}
      {showResetError && (
        <ErrorMessagePopup
          message={resetMessage}
          onClose={() => setShowResetError(false)}
        />
      )}{" "}
      {showSendRecoveryError && (
        <ErrorMessagePopup
          message={sendRecoveryMessage}
          onClose={() => setShowSendRecoveryError(false)}
        />
      )}
    </div>
  );
};

export default RecoverPassword;
