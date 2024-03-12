import Link from "next/link";
import styles from "./menu-links.module.scss";
import { LogoutButton } from "../auth/logout-button";
import { useAuthContext } from "../../app/auth/auth-context";

export const MenuLinks: () => JSX.Element = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <ul className={styles.menuLinksList}>
      {!isLoggedIn ? (
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
      ) : (
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
            <LogoutButton />
          </li>
        </>
      )}
    </ul>
  );
};
