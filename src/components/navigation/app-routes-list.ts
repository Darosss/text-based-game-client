export type AppRouteType = {
  href: string;
  name: string;
  onlyForLoggedIn: boolean;
};

export const appRoutesList: AppRouteType[] = [
  { href: "/auth/login", name: "Login", onlyForLoggedIn: false },
  { href: "/auth/register", name: "Register", onlyForLoggedIn: false },
  { href: "/overview", name: "Overview", onlyForLoggedIn: true },
  { href: "/skirmishes", name: "Skirmishes", onlyForLoggedIn: true },
  { href: "/dungeons", name: "Dungeons", onlyForLoggedIn: true },
  { href: "/leaderboards", name: "Leaderboards", onlyForLoggedIn: true },
];
