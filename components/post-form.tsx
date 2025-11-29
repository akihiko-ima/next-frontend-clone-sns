"use client";

import React, { useState } from "react";

import apiFetch from "@/lib/apiClient";
import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Mail } from "lucide-react";

/*
 * Publish Post API Call
 */
export async function publishPost(postText: string) {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    throw new Error("ログイン情報がありません。再ログインしてください。");
  }
  try {
    const res = await apiFetch("/posts/post", {
      method: "POST",
      headers: {
        "X-JWT-Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ content: postText }),
    });
    return res;
  } catch (error: any) {
    console.error("Failed to publish post", error);
    throw new Error(error.message ?? "投稿に失敗しました。");
  }
}

export function PostForm() {
  const [postText, setPostText] = useState("");
  const [flyingLetters, setFlyingLetters] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const { toastSucces, toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    // --- ログインチェック ---
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toastError("ログインしてください");
      return;
    }

    // --- アニメーション発動 ---
    const buttonRect = (e.currentTarget as HTMLFormElement)
      .querySelector('button[type="submit"]')
      ?.getBoundingClientRect();

    if (buttonRect) {
      const letterId = Date.now();

      setFlyingLetters((prev) => [
        ...prev,
        {
          id: letterId,
          x: buttonRect.left + buttonRect.width / 2,
          y: buttonRect.top + buttonRect.height / 2,
        },
      ]);

      setTimeout(() => {
        setFlyingLetters((prev) =>
          prev.filter((letter) => letter.id !== letterId)
        );
      }, 1500);
    }

    // --- 投稿処理 ---
    try {
      await publishPost(postText);
      toastSucces("投稿成功");
      setPostText("");
    } catch (error) {
      toastError("投稿に失敗しました");
    }
  };

  return (
    <>
      <Card className="p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="今何してる？"
            className="min-h-[80px] resize-none text-base"
            maxLength={140}
          />
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                postText.length > 120
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              文字数制限 : {postText.length}/140
            </span>
            <Button
              type="submit"
              disabled={!postText.trim()}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              投稿する
            </Button>
          </div>
        </form>
      </Card>

      {flyingLetters.map((letter) => (
        <div
          key={letter.id}
          className="fixed pointer-events-none z-50 animate-fly-away"
          style={{
            left: `${letter.x}px`,
            top: `${letter.y}px`,
          }}
        >
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
      ))}
    </>
  );
}
