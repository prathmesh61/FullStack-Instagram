import { QueryClient, useQuery } from "react-query";
import { useApi } from "../hooks/useApi";
import Post from "../components/Post";
import Header from "../components/Header";
import { SlSpeedometer } from "react-icons/sl";

const AllPostsScreen = () => {
  const queryClient = new QueryClient();
  //   const { loginUser } = useGetStrogeItem();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["all-posts"],
    queryFn: () =>
      useApi.get(`/all-posts`).then((res) => {
        return res.data;
      }),
    onSuccess() {},
  });
  queryClient.invalidateQueries("all-posts");
  return (
    <div className="mx-10 md:mx-15">
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-2xl font-bold text-gray-400 mt-12 text-left flex items-center gap-1 mb-4">
          Explore
          <SlSpeedometer className="text-white w-[16px] h-[16px] cursor-pointer" />
        </p>
        {data?.posts?.map((item: { id: Key | null | undefined }) => (
          <div className="mb-20">
            <Post key={item.id} post={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPostsScreen;
