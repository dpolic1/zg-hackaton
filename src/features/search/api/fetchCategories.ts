import { API_ENDPOINTS } from "@/constants";
import { TCategoryFilterItem } from "../types";
import { TErrorResponse } from "@/types";

export async function fetchCategories(): Promise<TCategoryFilterItem[]> {
  const response = await fetch(`${API_ENDPOINTS.EVENT.CATEGORIES.GET_ALL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as TErrorResponse;

    throw new Error(error.detail);
  }

  return await response.json();
}
