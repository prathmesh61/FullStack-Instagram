import { useMutation, useQueryClient } from "react-query";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
import { useState } from "react";
const CreatePost = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { loginUser } = useGetStrogeItem();
  // console.log(post);
  const newPost = async () => {
    try {
      const res = await useApi.put(`/newpost`, {});

      // console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.stack);
    }
  };
  const mutation = useMutation(["newPost"], newPost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("newPost", { exact: true });
      toast.success("Post created successfully");
    },
  });
  return <div>CreatePost</div>;
};

export default CreatePost;
