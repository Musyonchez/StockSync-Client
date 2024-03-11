import React from "react";
import FirstTimeReset from "@/components/ResetPassword/FirstTimeReset";
import ForgotReset from "@/components/ResetPassword/ForgotReset";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
const reset = () => {
  const { data: session } = useSession();

  const company = session?.user?.company;
  const user = session?.user as User;

  if (user?.firstsignin) {
    return <FirstTimeReset />;
  } else {
    return <ForgotReset />;
  }
};

export default reset;
