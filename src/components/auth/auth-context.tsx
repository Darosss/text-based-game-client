"use client";

import Cookies from "js-cookie";
import { FC, createContext, useContext, useEffect, useState } from "react";
import { ApiDataNotNullable, COOKIE_TOKEN_NAME } from "@/api/fetch";
import { User } from "@/api/types";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";

type ApiUser = ApiDataNotNullable<User>;

type ApiStateType<ApiData, FetchResponseData, FetchBodyData = unknown> = {
  api: ApiData;
  fetchData: UseFetchReturnType<FetchResponseData, FetchBodyData>["fetchData"];
};

type ApiUserType = ApiStateType<ApiUser, User>;

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  apiUser: ApiUserType;
};

type AuthContextProps = {
  children: React.ReactNode;
};

const defaultApiUserData: ApiUser = {
  data: {
    id: "",
    username: "",
    email: "",
    roles: [],
    lastLogin: new Date().toISOString(),
    gold: 0,
  },
  message: "",
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { api: userApi, fetchData: fetchUserData } = useFetch<User>(
    {
      url: "profile",
      method: "GET",
    },
    { manual: true }
  );
  useEffect(() => {
    setIsLoggedIn(!!Cookies.get(COOKIE_TOKEN_NAME));
  }, []);

  useEffect(() => {
    isLoggedIn ? fetchUserData() : null;
  }, [fetchUserData, isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        //Note: temporary solution
        apiUser: {
          api: userApi.responseData.data
            ? (userApi.responseData as ApiUser)
            : defaultApiUserData,
          fetchData: fetchUserData,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): Required<AuthContextType> => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return authContext as AuthContextType;
};
