import Cookies from "js-cookie";
import { Button } from "../common/button";
import { COOKIE_TOKEN_NAME } from "@/api/fetch";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../app/auth/auth-context";

export const LogoutButton = () => {
  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();
  const handleOnLogout = () => {
    Cookies.remove(COOKIE_TOKEN_NAME);

    setIsLoggedIn(false);
    router.replace("/auth/login");
  };

  return <Button onClick={handleOnLogout}> Logout </Button>;
};
