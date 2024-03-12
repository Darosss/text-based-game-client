"use client";
import Navigation from "@/components/navigation";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./auth/auth-context";
import styles from "./layout.module.scss";
import { ReactNode } from "react";
import { UserContextProvider } from "@/components/user/user-context";
import { UserDetails } from "@/components/user/user-details";

type LayoutContentProps = {
  children: ReactNode;
};

export const LayoutContent = ({ children }: LayoutContentProps) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Navigation />
        <div className={styles.userDetailsWrapper}>
          <UserDetails />
        </div>
        <ToastContainer />
        <div className={styles.contentWrapper}>{children}</div>
      </UserContextProvider>
    </AuthContextProvider>
  );
};
