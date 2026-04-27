"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import useToast from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Mail } from "lucide-react";

export function PostForm() {
  const router = useRouter();
  const [postText, setPostText] = useState("");
  const [flyingLetters, setFlyingLetters] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const { toastSucces, toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

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

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postText }),
      });

      if (res.status === 401) {
        toastError("ログインしてください");
        return;
      }
      if (!res.ok) throw new Error();

      toastSucces("投稿成功");
      setPostText("");
      router.refresh();
    } catch {
      toastError("投稿に失敗しました");
    }
  };

  return (
    <>
      <Card className="p-5 shadow-sm border-t-2 border-t-primary/40 bg-card">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="今何してる？"
            className="min-h-[90px] resize-none text-sm focus-visible:ring-primary/50"
            maxLength={140}
          />
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium tabular-nums ${
                postText.length > 120
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {postText.length} / 140
            </span>
            <Button
              type="submit"
              disabled={!postText.trim()}
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5"
            >
              <Send className="h-3.5 w-3.5" />
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
          <Mail className="h-8 w-8 text-primary" />
        </div>
      ))}
    </>
  );
}
