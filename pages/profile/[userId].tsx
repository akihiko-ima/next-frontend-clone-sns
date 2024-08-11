import Image from "next/image";
import { GetServerSideProps } from "next";
import React from "react";

import { PostType, Profile } from "@/types/types";
import apiClient from "@/lib/apiClient";

type Props = {
  profile: Profile;
  posts: PostType[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postResponse = await apiClient.get(`/posts/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
        posts: postResponse.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile, posts }: Props) => {
  return (
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
                {profile.user.username}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-7 pt-4">
          <span className="text-gray-600 ml-2 text-lg">
            {profile.user.username} の投稿一覧
          </span>
          <div className="flex-1 border-b border-gray-600"></div>
        </div>

        {posts.map((post: PostType) => (
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Image
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={profile.profileImageUrl}
                  width={64}
                  height={64}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {post.author.username}
                  </h2>
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
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
