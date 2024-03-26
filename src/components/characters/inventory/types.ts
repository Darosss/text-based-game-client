import { ApiDataNotNullable } from "@/api/fetch";
import { Inventory } from "@/api/types";
import { UseFetchReturnType } from "@/hooks/useFetch";

export type ApiInventoryState = ApiDataNotNullable<Inventory>;

export type ApiInventoryFetchData = UseFetchReturnType<
  Inventory,
  unknown
>["fetchData"];
