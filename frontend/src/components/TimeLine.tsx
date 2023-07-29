import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import Avatar from "react-avatar";
import UserPosts from "./UserPosts";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
const TimeLine = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { loginUser } = useGetStrogeItem();
  // console.log(post);
  const newPost = async () => {
    try {
      const res = await useApi.post(`/newpost`, {
        content: content,
        id: loginUser?.user.id,
      });

      // console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.stack);
    }
  };
  const mutation = useMutation(["newPost"], newPost, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Post created successfully");
      setContent("");
      queryClient.invalidateQueries("newPost");
    },
  });

  return (
    <div className="">
      <textarea
        placeholder="What's on your mind?"
        cols={60}
        rows={2}
        className="textarea  textarea-bordered focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex justify-between gap-2 w-[480px] mt-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1 cursor-pointer">
          <Avatar name={loginUser?.user.name} round={true} size="30" />

          {loginUser?.user.name}
        </h3>
        <button
          className="px-8 py-1 rounded-md text-white text-sm bg-blue-400"
          onClick={mutation.mutate}
        >
          Post
        </button>
      </div>
      <UserPosts />
    </div>
  );
};

export default TimeLine;
