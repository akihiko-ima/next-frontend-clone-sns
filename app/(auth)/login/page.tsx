"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/auth";
import apiFetch from "@/lib/apiClient";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";

/*
 * User Login API Call
 */
async function loginUser(email: string, password: string) {
  return await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { toastSucces, toastError } = useToast();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // user register API
    try {
      const response = await loginUser(email, password);
      login(response.token); // set token to local storage
      toastSucces("ログイン成功");
      router.push("/");
    } catch (error) {
      console.error(error);
      toastError("メールアドレス or パスワード を確認してください。");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">ログイン</CardTitle>
          <CardDescription>
            登録したメールアドレスとパスワードを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">
                パスワード
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="h-11"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-600 h-11 text-base font-medium"
              size="lg"
            >
              ログイン
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              アカウントをお持ちでない方は
            </span>{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-semibold"
            >
              新規登録
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
