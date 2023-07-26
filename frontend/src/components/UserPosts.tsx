import { useQuery, QueryClient } from "react-query";
import { useApi } from "../hooks/useApi";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";

const UserPosts = () => {
  const queryClient = new QueryClient();
  const { loginUser } = useGetStrogeItem();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      useApi.get(`/my-posts/${loginUser?.user.id}`).then((res) => {
        return res.data;
      }),
    onSuccess() {
      queryClient.invalidateQueries("posts");
    },
  });
  console.log(data);

  return <div>UserPosts</div>;
};

export default UserPosts;
