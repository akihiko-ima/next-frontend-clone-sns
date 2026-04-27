import Link from "next/link";

import { MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    timeZone: "Asia/Tokyo",
  });

  return (
    <Card className="p-5 transition-all hover:shadow-md hover:border-primary/20 group">
      <div className="flex gap-4">
        <Link href={`/profile/${post.authorId}`} className="shrink-0">
          <Avatar className="h-11 w-11 ring-2 ring-primary/15 group-hover:ring-primary/40 transition-all">
            <AvatarImage src={post.profile.profileImageUrl} alt="User Icon" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {post.author.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href={`/profile/${post.authorId}`}
              className="font-semibold hover:text-primary transition-colors text-foreground"
            >
              @{post.author.username}
            </Link>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>

          <p className="text-foreground whitespace-pre-wrap break-words leading-relaxed mb-3 text-sm">
            {post.content}
          </p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-all group/btn text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-500 transition-all group/btn text-sm">
              <Heart className="h-4 w-4" />
              <span>0</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
