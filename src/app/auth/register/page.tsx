import { RegisterForm } from "@/components/auth/register-form";
import styles from "./register.module.scss";

export default async function Register() {
  return (
    <main className={styles.registerPageWrapper}>
      <RegisterForm />
    </main>
  );
}
