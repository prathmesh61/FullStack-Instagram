import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import Avatar from "react-avatar";
import UserPosts from "./UserPosts";

const TimeLine = () => {
  const { loginUser } = useGetStrogeItem();

  return (
    <div className="">
      <textarea
        placeholder="What's on your mind?"
        cols={60}
        rows={2}
        className="textarea  textarea-bordered focus:outline-none"
      ></textarea>
      <div className="flex justify-between gap-2 w-[480px] mt-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1 cursor-pointer">
          <Avatar name={loginUser?.user.name} round={true} size="30" />

          {loginUser?.user.name}
        </h3>
        <button className="px-8 py-1 rounded-md text-white text-sm bg-blue-400">
          Post{" "}
        </button>
      </div>
      <UserPosts />
    </div>
  );
};

export default TimeLine;
