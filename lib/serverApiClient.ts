import { cookies } from "next/headers";

export async function serverFetch(path: string, options: RequestInit = {}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "X-JWT-Authorization": `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`HTTP Error ${res.status}: ${errorBody}`);
  }

  return res.json();
}
