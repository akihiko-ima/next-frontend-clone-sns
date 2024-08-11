import Image from "next/image";
import Link from "next/link";
import React from "react";

import { PostType } from "@/types/types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.authorId}`}>
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src={post.author.Profile?.profileImageUrl}
              alt="User Avatar"
              width={64}
              height={64}
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: undefined,
                hour12: false, // 24h
              })}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
