import { authClient } from "./auth-client";
import { API_URL } from "./constants";

export async function clientFetch(
  path: string,
  init: RequestInit = {}
) {
  const { data } = await authClient.token();

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(data?.token
        ? { Authorization: `Bearer ${data.token}` }
        : {}),
    },
  });
}