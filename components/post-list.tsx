import Link from "next/link";

import { MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostType } from "@/types";

export type PersonalPostType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

type Props = {
  posts: PersonalPostType[];
};

export function PostList({ posts }: Props) {
  if (posts.length === 0) return <p>投稿はまだありません</p>;
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center mb-2">
            <div>
              <p className="font-semibold">{post.author.username}</p>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
          <p className="text-gray-700 break-words">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
