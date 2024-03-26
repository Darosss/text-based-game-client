import { ApiDataNotNullable } from "@/api/fetch";
import { CharacterTypesAlias } from "@/api/types";
import { UseFetchReturnType } from "@/hooks/useFetch";

export type ApiCharacterState = ApiDataNotNullable<CharacterTypesAlias>;

export type ApiCharacterFetchData = UseFetchReturnType<
  CharacterTypesAlias,
  unknown
>["fetchData"];
