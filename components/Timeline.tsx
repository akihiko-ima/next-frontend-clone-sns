import React, { useEffect, useState } from "react";

import Post from "./Post";
import apiClient from "@/lib/apiClient";
import useToast from "@/hooks/useToast";
import { PostType } from "@/types/types";

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  const { toastSucces, toastError } = useToast();

  // post method
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      // toast message
      toastSucces("投稿成功");
      setPostText("");
    } catch (error) {
      toastError("ログインしてください");
    }
  };

  // 投稿取得
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="How are you doing now?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostText(e.target.value)
              }
              value={postText}
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-2 bg-gray-700 hover:bg-teal-700 duration-200 text-white font-semibold py-2 px-4 rounded w-20"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* post section */}
        {latestPosts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
