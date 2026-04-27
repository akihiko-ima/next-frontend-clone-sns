import { MessageCircle, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  if (posts.length === 0) return <p className="text-muted-foreground text-sm">投稿はまだありません</p>;
  console.log(posts);

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="p-5 transition-all hover:shadow-md hover:border-primary/20 group"
        >
          <div className="flex gap-4">
            <Avatar className="h-11 w-11 shrink-0 ring-2 ring-primary/15 group-hover:ring-primary/40 transition-all">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {post.author.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-semibold text-foreground text-sm">
                  @{post.author.username}
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Tokyo",
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground break-words leading-relaxed mb-3">
                {post.content}
              </p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-all text-sm">
                  <MessageCircle className="h-4 w-4" />
                  <span>0</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-500 transition-all text-sm">
                  <Heart className="h-4 w-4" />
                  <span>0</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
