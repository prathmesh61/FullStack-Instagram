import { useQuery, QueryClient } from "react-query";
import { useApi } from "../hooks/useApi";
import { CiViewTimeline } from "react-icons/ci";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import Post from "./Post";
import { Key } from "react";

const UserPosts = () => {
  const queryClient = new QueryClient();
  const { loginUser } = useGetStrogeItem();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      useApi.get(`/my-posts/${loginUser?.user.id}`).then((res) => {
        return res.data;
      }),
    onSuccess() {},
  });
  // console.log(data.posts.map((item) => item.id));
  queryClient.invalidateQueries("posts");
  return (
    <div>
      <p className="text-2xl font-bold text-gray-400 mt-12 text-left flex items-center gap-1 mb-4">
        Timeline Post
        <CiViewTimeline size={25} className="cursor-pointer text-gray-400" />
      </p>
      {data?.posts?.map((item) => (
        <div className="mb-20" key={item.id}>
          <Post post={item} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
