import Image from "next/image";
import { notFound } from "next/navigation";

import { Profile } from "@/types";
import { serverFetch } from "@/lib/serverApiClient";
import { PersonalPostType, PostList } from "@/components/post-list";
import NavBar from "@/components/nav-bar";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  let profile: Profile | null = null;
  let posts: PersonalPostType[] = [];

  try {
    const [profileRes, postsRes] = await Promise.all([
      serverFetch(`/users/profile/${userId}`),
      serverFetch(`/posts/${userId}`),
    ]);
    profile = profileRes.profile;
    posts = postsRes;
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (!profile) notFound();

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container max-w-2xl mx-auto px-4 py-8">
        {/* プロフィールカード */}
        <div className="rounded-xl overflow-hidden shadow-sm border mb-6">
          <div className="h-28 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/10" />
          <div className="bg-card px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="ring-4 ring-card rounded-full shrink-0">
                <Image
                  className="w-20 h-20 rounded-full object-cover"
                  alt="User Avatar"
                  src={profile.profileImageUrl}
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {profile.username}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
          </div>
        </div>

        {/* 投稿一覧 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            投稿一覧
          </h3>
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-dashed border-primary/20">
              <p className="text-muted-foreground font-medium">まだ投稿がありません</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                最初の投稿をしてみましょう
              </p>
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </main>
    </div>
  );
}
