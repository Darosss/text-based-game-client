import Cookies from "js-cookie";
import { Button } from "../common/button";
import { COOKIE_TOKEN_NAME } from "@/api/fetch";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const handleOnLogout = () => {
    Cookies.remove(COOKIE_TOKEN_NAME);
    router.replace("/auth/login");
  };

  return <Button onClick={handleOnLogout}> Logout </Button>;
};
