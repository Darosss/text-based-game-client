"use client";

import styles from "./login-form.module.scss";
import Cookies from "js-cookie";
import { FormEvent } from "react";
import { COOKIE_TOKEN_NAME, fetchBackendApi } from "@/api/fetch";
import { useRouter } from "next/navigation";
import { Button } from "../common/button";
import { useAuthContext } from "../../app/auth/auth-context";

type LoginResponse = {
  email: string;
  token: string;
  expirationTime: string;
};

type LoginFetchBody = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();

  const { setIsLoggedIn } = useAuthContext();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;

    await fetchBackendApi<LoginResponse, LoginFetchBody>({
      url: "auth/login",
      method: "POST",
      body: { email: `${email}`, password: `${password}` },
      notification: { pendingText: "Trying to log in. Please wait" },
    }).then((response) => {
      const data = response?.body.data;

      if (!data) return;
      Cookies.set(COOKIE_TOKEN_NAME, data.token, {
        expires: new Date(data.expirationTime),
        sameSite: "strict",
      });
      setIsLoggedIn(true);

      router.push("/");
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Email</label>
        {/* TODO: make it email */}
        <input type="text" name="email" placeholder="Email" required />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div>
        <Button type="submit" defaultButtonType="primary">
          Login
        </Button>
      </div>
    </form>
  );
};
