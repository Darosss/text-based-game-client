import { LoginForm } from "@/components/auth";
import styles from "./login.module.scss";

export default function LoginPage() {
  return (
    <main className={styles.loginPageWrapper}>
      <LoginForm />
    </main>
  );
}
