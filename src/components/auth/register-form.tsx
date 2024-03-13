"use client";

import styles from "./register-form.module.scss";
import { FC, FormEvent } from "react";
import { fetchBackendApi } from "@/api/fetch";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common";
import { User } from "@/api/types";

type LoginResponse = User;

type LoginFetchBody = {
  email: string;
  username: string;
  password: string;
};

export const RegisterForm: FC = () => {
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
        <input type="text" name="email" required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" name="username" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <div>
        <Button type="submit" defaultButtonType="primary">
          Register
        </Button>
      </div>
    </form>
  );
};
