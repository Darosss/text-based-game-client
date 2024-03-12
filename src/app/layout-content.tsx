"use client";
import Navigation from "@/components/navigation";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./auth/auth-context";
import styles from "./layout.module.scss";
import { ReactNode } from "react";

type LayoutContentProps = {
  children: ReactNode;
};

export const LayoutContent = ({ children }: LayoutContentProps) => {
  return (
    <AuthContextProvider>
      <Navigation />
      <ToastContainer />
      <div className={styles.contentWrapper}>{children}</div>
    </AuthContextProvider>
  );
};
