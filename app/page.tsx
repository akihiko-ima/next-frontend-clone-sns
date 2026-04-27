import { PostType } from "@/types";
import { serverFetch } from "@/lib/serverApiClient";
import { Sparkles } from "lucide-react";
import NavBar from "@/components/nav-bar";
import { PostForm } from "@/components/post-form";
import { PostCard } from "@/components/post-card";

export default async function Home() {
  let posts: PostType[] = [];
  try {
    posts = await serverFetch("/posts/get-latest-post");
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="min-h-screen container max-w-4xl mx-auto">
      <NavBar />
      <main className="container mx-auto px-4 py-8 ">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-balance">ホーム</h1>
        </div>

        <div className="space-y-6">
          <PostForm />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-muted-foreground">
              最近の投稿
            </h2>
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">まだ投稿がありません</p>
                <p className="text-sm text-muted-foreground mt-2">
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
