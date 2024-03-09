import { createContext, useContext } from "react";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";
import { YourMerchantResponseData } from "@/api/types";
import { ApiDataNotNullable } from "@/api/fetch";

type MerchantApi = ApiDataNotNullable<YourMerchantResponseData>;

type ApiStateType<ApiData, FetchResponseData, FetchBodyData = unknown> = {
  api: ApiData;
  fetchData: UseFetchReturnType<FetchResponseData, FetchBodyData>["fetchData"];
};

type MerchantApiType = ApiStateType<MerchantApi, YourMerchantResponseData>;

type MerchantContextType = {
  apiMerchant: MerchantApiType;
};

type MerchantContextProps = {
  children: React.ReactNode;
};

export const MerchantContext = createContext<MerchantContextType | null>(null);

export const MerchantContextProvider = ({
  children,
}: MerchantContextProps): React.JSX.Element => {
  const { api: merchantApi, fetchData: fetchMerchantData } =
    useFetch<YourMerchantResponseData>({
      url: "merchants/your-merchant",
      method: "GET",
    });

  if (merchantApi.isPending === null || !merchantApi.responseData.data)
    return <>Loading</>;
  return (
    <MerchantContext.Provider
      value={{
        apiMerchant: {
          api: merchantApi.responseData as MerchantApi,
          fetchData: fetchMerchantData,
        },
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchantContext = (): Required<MerchantContextType> => {
  const merchantContext = useContext(MerchantContext);
  if (!merchantContext) {
    throw new Error(
      "useMerchantContext must be used within a MerchantContextProvider"
    );
  }
  return merchantContext as MerchantContextType;
};
