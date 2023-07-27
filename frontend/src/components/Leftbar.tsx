import { GoHome, GoPeople } from "react-icons/go";
import { SlSpeedometer } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { BiTrendingUp } from "react-icons/bi";
import { Link } from "react-router-dom";
const Leftbar = () => {
  return (
    <div className="flex flex-col items-start gap-8">
      <Link
        to="/"
        className="flex items-center justify-center gap-2 hover:bg-gray-600/50 px-2 py-1 hover:rounded-md"
      >
        <GoHome className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Home</h3>
      </Link>
      <Link
        to="/users"
        className="flex justify-center  items-center gap-2 hover:bg-gray-600/50 px-2 py-1 hover:rounded-md"
      >
        <GoPeople className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">People</h3>
      </Link>
      <Link
        to="/all-posts"
        className="flex  justify-center items-center gap-2 hover:bg-gray-600/50 px-2 py-1 hover:rounded-md"
      >
        <SlSpeedometer className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Explore</h3>
      </Link>
      <Link
        to="/profile/:id"
        className="flex justify-center  items-center gap-2 hover:bg-gray-600/50 px-2 py-1 hover:rounded-md"
      >
        <CgProfile className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Profile</h3>
      </Link>
      <Link
        to="/trending"
        className="flex justify-center  items-center gap-2 hover:bg-gray-600/50 px-3 py-1 hover:rounded-md"
      >
        <BiTrendingUp className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Trending</h3>
      </Link>
    </div>
  );
};

export default Leftbar;
