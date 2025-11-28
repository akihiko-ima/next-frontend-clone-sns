export default async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL;
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`HTTP Error ${res.status}: ${errorBody}`);
  }

  return res.json();
}
