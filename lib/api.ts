import { API_BASE } from "@/lib/api-base";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}
