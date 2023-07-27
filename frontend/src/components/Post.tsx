import Avatar from "react-avatar";
import { useGetStrogeItem } from "../hooks/useGetStrogeItem";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
type postType = {
  post: {
    createdAt: string;
    content: string;
    img: string;
    id: string;
    userId: string;
    user: {
      name: string;
      email: string;
    };
    likesId: string[];
    commentsId: string[];
  };
};
const Post = ({ post }: postType) => {
  // console.log(post);

  const { loginUser } = useGetStrogeItem();
  return (
    <div className="flex flex-col mt-4 w-[400px] p-4 border-2 border-gray-800 rounded-md">
      <Link
        to={`/profile/${post?.userId}`}
        className="flex justify-between items-center"
      >
        <h3 className="text-sm font-semibold text-gray-500 flex items-center gap-1 cursor-pointer">
          <Avatar name={post?.user.name} round={true} size="20" />
          {post?.user.name}
        </h3>
        <h3 className="text-xs font-semibold text-gray-500 flex items-center gap-1 cursor-pointer">
          {post?.createdAt}
        </h3>
      </Link>
      <div className="mt-2 lg">
        <h2 className="text-white/75 text-md font-semibold">{post?.content}</h2>
      </div>
      {post?.img && (
        <div className="w-[350px] h-full  mt-4">
          <img src={post?.img} alt={post?.content} className="object-cover" />
        </div>
      )}
      <div className="flex gap-4 items-center mt-4">
        <div className="flex items-center gap-1">
          <AiOutlineHeart size={25} className="cursor-pointer text-gray-400" />
          {post?.likesId.length}
        </div>
        <div className="flex items-center gap-1">
          <BiCommentDetail size={25} className="cursor-pointer text-gray-400" />
          {post?.commentsId.length}
        </div>
      </div>
    </div>
  );
};

export default Post;
