import Experience from "@/components/HomeComponents/Experience";
import Hero from "@/components/HomeComponents/Hero";
import HorizontalNavbar from "@/components/HorizontalNavbar";
import Why from "@/components/HomeComponents/Why";
import Features from "@/components/HomeComponents/Features";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { User } from "@/types/user";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col m-0 ${inter.className}`}>
      <HorizontalNavbar />
      <Hero />
      <Why />
      <Features />
      <Experience />
      <Footer />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  const user = session?.user as User;

  if (user?.firstsignin) {
    return {
      redirect: {
        destination: "/reset",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
