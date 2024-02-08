"use client";

import { FormEvent, useEffect } from "react";
import { COOKIE_TOKEN_NAME, useFetch } from "@/hooks/useFetch";
import styles from "./login-form.module.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "../common/button";

type LoginResponse = {
  email: string;
  token: string;
};

type LoginFetchBody = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<LoginResponse, LoginFetchBody>(
    {
      url: "auth/login",
      method: "POST",
    },
    { manual: true }
  );
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;

    await fetchData({
      customBody: { email: `${email}`, password: `${password}` },
    });
  }

  useEffect(() => {
    if (data) {
      Cookies.set(COOKIE_TOKEN_NAME, data.token);
      router.push("/");
    }
  }, [data, router]);

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
