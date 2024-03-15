import React from "react";
import Footer from "@/components/Footer";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import { Inter } from "next/font/google";
import PricingTabs from "@/components/PricingComponents/PricingTabs";

const inter = Inter({ subsets: ["latin"] });

const pricing = () => {
  return (
    <main
      className={`flex min-h-screen justify-between flex-col m-0 ${inter.className}`}
    >
      <HorizontalNavbar />
      <PricingTabs />
      <Footer />
    </main>
  );
};

export default pricing;
