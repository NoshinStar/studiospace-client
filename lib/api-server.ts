import { headers } from "next/headers";
import { auth } from "./auth";
import { API_URL } from "./constants";

export async function serverFetch(path: string, init: RequestInit = {}) {
  let token: string | undefined;
  try {
    token = (await auth.api.getToken({ headers: await headers() }))?.token;
  } catch {}

  return fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}