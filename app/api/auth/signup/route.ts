import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL;
  const body = await req.json();

  // 1. アカウント登録
  const registerRes = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!registerRes.ok) {
    const error = await registerRes.text();
    return NextResponse.json({ error }, { status: registerRes.status });
  }

  // 2. 登録直後にログインしてトークンを取得（/auth/register はトークンを返さない）
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  if (!loginRes.ok) {
    const error = await loginRes.text();
    return NextResponse.json({ error }, { status: loginRes.status });
  }

  const { token } = await loginRes.json();

  // 3. ユーザー情報取得
  const meRes = await fetch(`${BASE_URL}/users/me`, {
    headers: { "X-JWT-Authorization": `Bearer ${token}` },
  });
  const { user } = await meRes.json();

  // 4. Cookie 発行してユーザー情報を返す
  const response = NextResponse.json({ user });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
