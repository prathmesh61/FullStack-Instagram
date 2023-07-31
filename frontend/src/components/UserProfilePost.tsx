import { useQuery, QueryClient } from "react-query";
import { useApi } from "../hooks/useApi";
import { CiViewTimeline } from "react-icons/ci";
import Post from "./Post";
import { useParams } from "react-router-dom";
interface itemProp {
  id: any;
  createdAt?: string;
  content?: string;
  img?: string;
  userId?: string;
  user?: { name: string; email: string };
  likesId?: string[];
  commentsId?: string[];
}
const UserProfilePost = () => {
  const queryClient = new QueryClient();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      useApi.get(`/my-posts/${id}`).then((res) => {
        return res.data;
      }),
    onSuccess() {
      queryClient.invalidateQueries("posts");
    },
  });
  // console.log(data.posts.map((item) => item.id));

  return (
    <div>
      <p className="text-2xl font-bold text-gray-400 mt-12 text-left flex items-center gap-1 mb-4">
        Timeline Post
        <CiViewTimeline size={25} className="cursor-pointer text-gray-400" />
      </p>
      {data?.posts?.map((item: itemProp) => (
        <div className="mb-20" key={item.id}>
          <Post post={item} />
        </div>
      ))}
    </div>
  );
};

export default UserProfilePost;
