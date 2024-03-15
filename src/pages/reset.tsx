import React, { useEffect, useState } from "react";
import { User } from "@/types/user";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { firstTimeResetUserRequest } from "@/actions/users/firstTimeResetUser";
import { RootState } from "@/store/reducers/reducers";

const FirstTimeReset = () => {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const store = "users";

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const firsttimeresetuser = useSelector(
    (state: RootState) => state.firsttimeresetuser.data
  );
  const loading = useSelector(
    (state: RootState) => state.firsttimeresetuser.loading
  );
  const error = useSelector(
    (state: RootState) => state.firsttimeresetuser.error
  );

  const handleResetPassword = async () => {

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      // Check if password and confirm password are not empty
      if (password.trim() && confirmPassword.trim()) {
        if (session?.user?.id) {
          // Check if userId is not undefined
          dispatch(
            firstTimeResetUserRequest(
              session?.user?.id,
              password,
              session?.user?.company,
              store // Assuming 'store' is the correct variable for the user type
            )
          );
        }
      } else {
        console.error(`Password or confirm password is empty.`);
      }
      await signOut({ callbackUrl: "/" }); // Redirects to the homepage after signing out
    } catch (error) {
      console.error("Error resetting password:", error);
    }
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

          <p className="text-sm text-gray-600 mb-4 text-center">
            To enhance the security of your account, please reset your password.
          </p>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
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
            onClick={handleResetPassword}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeReset;
