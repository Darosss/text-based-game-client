"use client";

import styles from "./login-form.module.scss";
import { FormEvent } from "react";
import { fetchBackendApi } from "@/api/fetch";
import { useRouter } from "next/navigation";
import { Button } from "../common/button";
import { User } from "@/api/types";

type LoginResponse = User;

type LoginFetchBody = {
  email: string;
  username: string;
  password: string;
};

export const RegisterForm = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    if (!email || !password) return;

    await fetchBackendApi<LoginResponse, LoginFetchBody>({
      url: "auth/register",
      method: "POST",
      body: {
        email: `${email}`,
        username: `${username}`,
        password: `${password}`,
      },
      notification: { pendingText: "Trying to register. Please wait" },
    }).then((response) => {
      const data = response?.body.data;
      if (!data) return;

      router.push("login");
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
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" required />
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
          Register
        </Button>
      </div>
    </form>
  );
};