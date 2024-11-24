import { API_ENDPOINTS } from "@/constants";
import { TErrorResponse } from "@/types";
import { TEvent } from "../types";

type TFetchSearchedEvents = {
  urlSearchParams: URLSearchParams;
};

export async function fetchSearchedEvents({
  urlSearchParams,
}: TFetchSearchedEvents): Promise<TEvent[]> {
  const response = await fetch(
    `${API_ENDPOINTS.EVENT.SEARCH.GET_ALL}?${urlSearchParams}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const error = (await response.json()) as TErrorResponse;

    throw new Error(error.detail);
  }

  return await response.json();
}
