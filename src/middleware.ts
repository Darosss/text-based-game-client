import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_TOKEN_NAME } from "./hooks/useFetch";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_TOKEN_NAME)?.value;
  const path = request.nextUrl.pathname;

  if (token && (path === "/auth/login" || path === "/auth/register"))
    return NextResponse.redirect(new URL("/overview", request.url));
  else if (!token && (path === "/auth/login" || path === "/auth/register"))
    return;
  else if (token) {
    return;
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
export const config = {
  matcher: ["/skirmishes", "/overview", "/auth/login", "/auth/register"],
};
