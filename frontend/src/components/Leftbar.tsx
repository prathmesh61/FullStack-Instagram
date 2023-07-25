import { GoHome, GoPeople } from "react-icons/go";
import { SlSpeedometer } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { BiTrendingUp } from "react-icons/bi";
import { Link } from "react-router-dom";
const Leftbar = () => {
  return (
    <div className="flex flex-col items-start gap-8">
      <Link to="/" className="flex items-center gap-2">
        <GoHome className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Home</h3>
      </Link>
      <Link to="/users" className="flex items-center gap-2">
        <GoPeople className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">People</h3>
      </Link>
      <Link to="/explore" className="flex items-center gap-2">
        <SlSpeedometer className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Explore</h3>
      </Link>
      <Link to="/profile/:id" className="flex items-center gap-2">
        <CgProfile className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Profile</h3>
      </Link>
      <Link to="/trend" className="flex items-center gap-2">
        <BiTrendingUp className="text-white w-[16px] h-[16px] cursor-pointer" />
        <h3 className="text-white text-[14px] font-semibold">Trending</h3>
      </Link>
    </div>
  );
};

export default Leftbar;
