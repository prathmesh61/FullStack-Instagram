import { QueryClient, useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Header from "../components/Header";
import Avatar from "react-avatar";
import { FcAbout } from "react-icons/fc";
import UserProfilePost from "../components/UserProfilePost";
import { AiOutlineLink } from "react-icons/ai";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const { id } = useParams();
  const queryClient = new QueryClient();
  //   const { loginUser } = useGetStrogeItem();
  const { isLoading, isError, data } = useQuery({
    queryKey: "UserProfile",
    queryFn: () =>
      useApi.get(`/profile/${id}`).then((res) => {
        return res.data;
      }),
    onSuccess() {
      queryClient.invalidateQueries("UserProfile");
    },
  });

  // followe user funcation
  const { loginUser } = useGetStrogeItem();

  // console.log(post);
  const follow = async () => {
    try {
      const res = await useApi.put(`/follow/${id}`, {
        yourID: loginUser?.user.id,
      });

      // console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.stack);
    }
  };
  const mutation = useMutation(follow, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Done!");
      queryClient.invalidateQueries("UserProfile");
    },
  });

  return (
    <div className="mx-10 md:mx-15">
      <Header />
      <div className="flex flex-col items-center justify-center mt-10  mx-auto  p-2">
        <div className="flex gap-4 justify-evenly   items-center w-[500px] h-[100px] ">
          <Avatar
            name={data?.user?.name.toUpperCase()}
            size="80"
            round={true}
          />
          <div className="flex flex-col ">
            <p className="text-2xl font-semibold text-white">
              {data?.user?.name.toUpperCase()}
            </p>
            <p className="text-sm text-white">{data?.user?.email}</p>
          </div>
          <div className="flex items-center justify-around mt-2 gap-2">
            <Link
              to="/"
              className="text-xs bg-blue-500 px-3 py-1 cursor-pointer text-white rounded-md"
            >
              Create Post
            </Link>
            <button
              className="text-xs bg-blue-500 px-3 py-1 cursor-pointer text-white rounded-md"
              onClick={mutation.mutate}
            >
              {data?.user?.followers.includes(loginUser?.user?.id)
                ? "Unfollow"
                : "Follow"}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-md">
            <FcAbout size={25} className="inline-block mr-1" />
            Business|Marketing|Mindset
          </p>
          <Link to="marketerPratham.com" className="text-md underline">
            <AiOutlineLink size={25} className="inline-block mr-1" />
            {data?.user?.email}
          </Link>
          <p className="text-md flex justify-evenly items-center gap-2">
            <span className="flex items-center text-white">
              Followers({data?.user?.followers.length})
            </span>
            <span className="text-white flex items-center">
              Following({data?.user?.following.length})
            </span>
          </p>
        </div>
        <UserProfilePost />
      </div>
    </div>
  );
};

export default ProfileScreen;
