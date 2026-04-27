import { PostType } from "@/types";
import { serverFetch } from "@/lib/serverApiClient";
import NavBar from "@/components/nav-bar";
import { PostForm } from "@/components/post-form";
import { PostCard } from "@/components/post-card";
import { Sparkles } from "lucide-react";

export default async function Home() {
  let posts: PostType[] = [];
  try {
    posts = await serverFetch("/posts/get-latest-post");
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="min-h-screen container max-w-2xl mx-auto">
      <NavBar />
      <main className="px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ホーム</h1>
        </div>

        <div className="space-y-4">
          <PostForm />

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
              最近の投稿
            </h2>
            {posts.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-dashed border-primary/20">
                <Sparkles className="h-8 w-8 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">まだ投稿がありません</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  最初の投稿をしてみましょう
                </p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
