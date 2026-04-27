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
    <div className="min-h-screen container max-w-4xl mx-auto">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
              <div className="flex items-center">
                <Image
                  className="w-20 h-20 rounded-full mr-4"
                  alt="User Avatar"
                  src={profile.profileImageUrl}
                  width={64}
                  height={64}
                />
                <div className="ml-5">
                  <h2 className="text-2xl font-semibold mb-1">
                    {profile.username}
                  </h2>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-7 pt-4">
              <span className="text-gray-600 ml-2 text-lg">
                {profile.username} の投稿一覧
              </span>
              <div className="flex-1 border-b border-gray-600"></div>
            </div>
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">まだ投稿がありません</p>
                <p className="text-sm text-muted-foreground mt-2">
                  最初の投稿をしてみましょう
                </p>
              </div>
            ) : (
              <PostList posts={posts} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
