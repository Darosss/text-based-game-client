import Link from "next/link";
import styles from "./menu-links.module.scss";
import { LogoutButton } from "../auth/logout-button";
import { useAuthContext } from "../../app/auth/auth-context";
import { appRoutesList } from "./app-routes-list";
import { usePathname } from "next/navigation";

export const MenuLinks: () => JSX.Element = () => {
  const { isLoggedIn } = useAuthContext();

  const pathname = usePathname();
  return (
    <ul className={styles.menuLinksList}>
      {appRoutesList
        .filter(({ onlyForLoggedIn }) => isLoggedIn === onlyForLoggedIn)
        .map(({ href, name }) => (
          <li
            key={href}
            className={`${pathname.includes(href) ? styles.active : ""}`}
          >
            <Link href={href}>
              <p>{name}</p>
            </Link>
          </li>
        ))}
      {isLoggedIn ? (
        <li>
          <LogoutButton />
        </li>
      ) : null}
    </ul>
  );
};
