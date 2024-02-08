import Link from "next/link";
import styles from "./menu-links.module.scss";

export const MenuLinks: () => JSX.Element = () => {
  return (
    <ul className={styles.menuLinksList}>
      <li>
        <Link href="/auth/login">
          <p>Login</p>
        </Link>
      </li>
      <li>
        <Link href="/auth/register">
          <p>Register</p>
        </Link>
      </li>
      <li>
        <Link href="/skirmishes">
          <p>Skirmishes</p>
        </Link>
      </li>
    </ul>
  );
};
