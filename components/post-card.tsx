import Link from "next/link";

import { MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PostType } from "@/types";

interface PostCardProps {
  post: PostType;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <Link href={`/profile/${post.author.username}`}>
          <Avatar className="h-12 w-12 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {post.author.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/profile/${post.author.username}`}
              className="font-bold hover:underline text-foreground"
            >
              {post.author.username}
            </Link>
            <span className="text-sm text-muted-foreground">
              @{post.author.username}
            </span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {formattedDate}
            </span>
          </div>

          <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed mb-3">
            {post.content}
          </p>

          <div className="flex items-center gap-6 text-muted-foreground">
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
              <MessageCircle className="h-4 w-4 group-hover:fill-primary/20" />
              <span className="text-sm">0</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group">
              <Heart className="h-4 w-4 group-hover:fill-red-500/20" />
              <span className="text-sm">0</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
