import { createContext, useContext } from "react";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";
import { User } from "@/api/types";
import { ApiDataNotNullable } from "@/api/fetch";

type ApiUser = ApiDataNotNullable<User>;

type ApiStateType<ApiData, FetchResponseData, FetchBodyData = unknown> = {
  api: ApiData;
  fetchData: UseFetchReturnType<FetchResponseData, FetchBodyData>["fetchData"];
};

type ApiUserType = ApiStateType<ApiUser, User>;

type UserContextType = {
  apiUser: ApiUserType;
};

type UserContextProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({
  children,
}: UserContextProps): React.JSX.Element => {
  const { api: userApi, fetchData: fetchUserData } = useFetch<User>({
    url: "profile",
    method: "GET",
  });

  if (userApi.isPending === null || !userApi.responseData.data)
    return <>Loading</>;
  return (
    <UserContext.Provider
      value={{
        apiUser: {
          api: userApi.responseData as ApiUser,
          fetchData: fetchUserData,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): Required<UserContextType> => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return userContext as UserContextType;
};
