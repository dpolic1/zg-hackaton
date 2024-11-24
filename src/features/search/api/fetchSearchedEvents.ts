import { API_ENDPOINTS, APP_BACKEND_URL } from "@/constants";
import { TErrorResponse } from "@/types";
import { TEvent } from "../types";

type TFetchSearchedEvents = {
  urlSearchParams: URLSearchParams;
};

export async function fetchSearchedEvents({
  urlSearchParams,
}: TFetchSearchedEvents): Promise<TEvent[]> {

  const url = urlSearchParams.size ? `${API_ENDPOINTS.EVENT.SEARCH.GET_ALL}?${urlSearchParams.toString()}` : `${APP_BACKEND_URL}/events/search`;

  const response = await fetch(url,
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
