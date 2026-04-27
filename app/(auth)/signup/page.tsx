"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/auth";
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
import { UserPlus } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setUser } = useAuth();
  const { toastSucces, toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) throw new Error();
      const { user } = await res.json();
      setUser(user);
      toastSucces("アカウントを作成しました。");
      router.push("/");
    } catch {
      toastError("登録に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">新規登録</CardTitle>
          <CardDescription>アカウントを作成して始めましょう</CardDescription>
          <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-0.5 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
              />
            </svg>
            <p className="text-sm leading-relaxed">
              このサイトではメール認証を行っていません。
              <br />
              <span className="font-semibold">
                実在しないメールアドレスで登録していただいて大丈夫です。
              </span>
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">
                ユーザー名
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
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
              登録する
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              すでにアカウントをお持ちの方は
            </span>{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-semibold"
            >
              ログイン
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
