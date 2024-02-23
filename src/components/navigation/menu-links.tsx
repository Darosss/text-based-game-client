import Cookies from "js-cookie";
import Link from "next/link";
import styles from "./menu-links.module.scss";
import { COOKIE_TOKEN_NAME } from "@/api/fetch";

export const MenuLinks: () => JSX.Element = () => {
  const authToken = Cookies.get(COOKIE_TOKEN_NAME);
  return (
    <ul className={styles.menuLinksList}>
      {authToken ? (
        <>
          <li>
            <Link href="/overview">
              <p>Overview</p>
            </Link>
          </li>
          <li>
            <Link href="/skirmishes">
              <p>Skirmishes</p>
            </Link>
          </li>
          <li>
            <Link href="/dungeons">
              <p>Dungeons</p>
            </Link>
          </li>
          <li>
            <Link href="">
              <p>Logout</p>
            </Link>
          </li>
        </>
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};
