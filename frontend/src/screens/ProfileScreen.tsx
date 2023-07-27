import { QueryClient, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Header from "../components/Header";
import Avatar from "react-avatar";

const ProfileScreen = () => {
  const { id } = useParams();
  const queryClient = new QueryClient();
  //   const { loginUser } = useGetStrogeItem();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: () =>
      useApi.get(`/profile/${id}`).then((res) => {
        return res.data;
      }),
    onSuccess() {},
  });
  queryClient.invalidateQueries("UserProfile");
  console.log(data);

  return (
    <div className="mx-10 md:mx-15">
      <Header />
      <div className="flex flex-col items-center justify-start mt-10 w-[500px] h-[300px] mx-auto border-2 p-2">
        <div className="flex gap-4 justify-evenly  w-full items-center">
          <Avatar name={data?.user?.name} size="80" round={true} />
          <div className="flex flex-col ">
            <p className="text-lg font-semibold text-white">
              {data?.user?.name}
            </p>
            <p className="text-sm text-white">{data?.user?.email}</p>
            <div className="flex items-center justify-around mt-2 gap-2">
              <Link
                to="/"
                className="text-xs bg-blue-500 px-3 py-1 cursor-pointer text-white rounded-md"
              >
                Create Post
              </Link>
              <Link
                to="/all-posts"
                className="text-xs bg-blue-500 px-3 py-1 cursor-pointer text-white rounded-md"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
