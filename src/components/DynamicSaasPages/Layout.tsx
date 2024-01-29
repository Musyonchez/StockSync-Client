import React from "react";
import VerticalNavbar from "./VerticalNavbar";
import Footer from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" flex flex-col min-w-screen justify-between">
      <div className=" max-sm:flex-row-reverse sm:flex">
        <div className=" max-sm:w-screen">
          <VerticalNavbar />
        </div>
        <main className=" h-screen max-sm:w-screen sm:w-full overflow-y-auto scrollbar pb-4 max-sm:pr-2 max-sm:pt-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
