import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../components/navigation";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text based game",
  description: "Text based game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navigation />
          <ToastContainer />
          {children}
        </div>
      </body>
    </html>
  );
}
