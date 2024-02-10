"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
export const COOKIE_TOKEN_NAME = "auth-token-game-backend";

const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type ApiResponse<ResponseT> = {
  data: ResponseT | null;
  isPending: boolean;
  error: string | null;
};

type FetchDataParams<BodyType = unknown> = {
  customUrl?: string;
  customBody?: BodyType;
};

export type UseFetchReturnType<ResponseT, BodyT> = {
  api: ApiResponse<ResponseT>;
  fetchData: (
    params?: FetchDataParams<BodyT>
  ) => Promise<ResponseT | undefined>;
};

type UseFetchParams<BodyType> = {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: BodyType;
};

type UseFetchOptions = {
  manual?: boolean;
};

export const useFetch = <ResponseT, BodyT = unknown>(
  params: UseFetchParams<BodyT>,
  options?: UseFetchOptions
): UseFetchReturnType<ResponseT, BodyT> => {
  const { url, method, body } = params;
  const { manual } = options || {};
  const authToken = Cookies.get(COOKIE_TOKEN_NAME);

  const [data, setData] = useState<ResponseT | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @param customUrl - in case when need to fetch other url
   */
  const fetchData = useCallback(
    async (params?: FetchDataParams<BodyT>) => {
      const { customBody, customUrl } = params || {};
      setIsPending(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        };
        const response = await fetch(
          BASE_BACKEND_URL + `${customUrl ? customUrl : url}`,
          {
            method: !method ? "GET" : method,
            headers,
            body: customBody
              ? JSON.stringify(customBody)
              : body
              ? JSON.stringify(body)
              : undefined,
          }
        );

        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
        return json as ResponseT;
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    },
    [authToken, body, method, url]
  );

  useEffect(() => {
    if (!manual) fetchData();
  }, [fetchData, manual]);

  return { api: { data, isPending, error }, fetchData };
};
