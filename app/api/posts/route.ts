import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${BASE_URL}/posts/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-JWT-Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
